<?php

    class AuthSys {

         protected $conn;
         
         public function __construct($pdo){
             $this -> conn = $pdo;
         }

         public function clean($input, $type){

            switch ($type) {
                case 'str':
                    $cleanInput = filter_var($input, FILTER_SANITIZE_STRING);
                    break;
                case 'int':
                    $cleanInput = filter_var($input, FILTER_SANITIZE_NUMBER_INT);
                    break;
                
                default:
                    $cleanInput = filter_var($input, FILTER_SANITIZE_STRING);
                    break;
            }

            return $cleanInput;
         }

         public function addUser($username, $password, $name, $email) {
             try {
                 $q = "INSERT INTO Utenti (username, password, nome, email) VALUES (:uname, :pwd, :nome, :email)";
                 $rq = $this -> conn -> prepare($q);
                 $rq -> bindParam(":uname", $username, PDO::PARAM_STR);
                 $rq -> bindParam(":pwd", $password, PDO::PARAM_STR);
                 $rq -> bindParam(":nome", $name, PDO::PARAM_STR);
                 $rq -> bindParam(":email", $email, PDO::PARAM_STR);
                 $rq -> execute();
             } catch(PDOException $e) {
                 return $e -> getMessage();
             }
         }

         public function checkInput($post) {
             // controllo se l'username contiene solo caratteri alfa-numerici
             if (!ctype_alnum($post['username'])) {
                 throw new Exception("L'username contiene caratteri non validi");
             }

             if (!mb_strlen($post['username'] >= 6) && !mb_strlen($post['username'] <= 12)){
                throw new Exception("L'username deve essere compreso tra i 6 e 12 caratteri");
             }
             
            // controllo che la password sia lunga almeno 8 caratteri
            if (!mb_strlen($post['password']) >= 8) {
                throw new Exception("La password deve essere lunga almeno 8 caratteri");
            }

            // controllo che la password contenga almeno una lettera minuscola
            if (!preg_match('/[a-z]/', $post['password'])) {
                throw new Exception("La password deve contenere almeno una lettera minuscola");
            }

            // controllo che la password contenga almeno una lettera maiuscola
            if (!preg_match('/[A-Z]/', $post['password'])) {
                throw new Exception("La password deve contenere almeno una lettera maiuscola");
            }

            // controllo che la password contenga almeno un numero
            if (!preg_match('/[0-9]/', $post['password'])) {
                throw new Exception("La password deve contenere almeno un numero");
            }

            // controllo che la password sia uguale alla conferma 
            if (strcmp($post['password'], $post['re_pwd']) !== 0 ) {
                throw new Exception("Password e conferma non corrispondono");
            }

            // controllo che la password sia uguale alla conferma 
            if (strcmp($post['password'], $post['re_pwd']) !== 0 ) {
                throw new Exception("Password e conferma non corrispondono");
            }

            if (preg_match('/[0-9@#§\+\[\]\ç\*\?\!\$\"\'\^\<\>\%\&\/\(\)\=\~]/', $post['name'])) {
                throw new Exception("Il nome inserito non è valido");
            }

            if (mb_strlen($post['name']) == 0) {
                throw new Exception("Nome vuoto");
            }

            // controllo email
            if (!filter_var($post['email'], FILTER_VALIDATE_EMAIL)) {
                throw new Exception("Email non valida");
            }
            // if (filter_var($post['email'], FILTER_VALIDATE_EMAIL)) {
            //     throw new Exception("Email non valida");
            // }
         }


         public function signin($post) {
            foreach ($post as $key => $value) {
                $post[$key] = trim($this -> clean($value, 'str'));
            }
            try{
                // controllo che l'username non sia già presente nel db
                $q = "SELECT * FROM Utenti WHERE username = :username";
                $rq = $this -> conn -> prepare($q);
                $rq -> bindParam(":username", $post['username'], PDO::PARAM_STR);
                $rq -> execute();
                if ($rq -> rowCOunt() > 0) {
                    throw new Exception("Username già esistente");                   
                }
            } catch (PDOException $e) {
                return $e -> getMessage();
            }
            // controllo che tutti i valori degli input siano corretti
            $this -> checkInput($post);

            // creo password criptata
            $pwd_hash = password_hash($post['password'], PASSWORD_DEFAULT);

            // inserisco l'utente nel db
            $this -> addUser($post['username'], $pwd_hash, $post['name'],
            $post['email']);

            return true;
         }


         public function login($username, $password) {
             
                $q = "SELECT * FROM Utenti WHERE username = :username";
                $rq = $this -> conn -> prepare($q);
                $rq -> bindParam(":username", $username, PDO::PARAM_STR); 
                $rq -> execute();

                if ($rq -> rowCount() === 0) {
                    throw new Exception("Username non valido");    
                }
                $row = $rq -> fetch(PDO::FETCH_ASSOC);

                if (!password_verify($password, $row['password'])) {
                   throw new Exception("Password non corretta");
                }
                
                $user_id = $row['id'];
                $q = "DELETE FROM UtentiLoggati WHERE user_id = :id";
                $rq = $this -> conn -> prepare($q);
                $rq -> bindParam(":id", $user_id, PDO::PARAM_INT);
                $rq -> execute();

                $session_id = session_id();
                $token = bin2hex(random_bytes(30));
                $q = "INSERT INTO UtentiLoggati (session_id, user_id, token) VALUES (:sessionid, :userid, :token)";
                $rq = $this -> conn -> prepare($q);
                $rq -> bindParam(":sessionid", $session_id, PDO::PARAM_STR); 
                $rq -> bindParam(":userid", $user_id, PDO::PARAM_INT); 
                $rq -> bindParam(":token", $token, PDO::PARAM_STR); 
                $rq -> execute();
                $user = compact('user_id', 'token');

                return $user;
  
         }

         public function logout($token) {
            try {
                $q = "DELETE FROM UtentiLoggati WHERE token = :token";
                $rq = $this -> conn -> prepare($q);
                $rq -> bindParam(":token", $token, PDO::PARAM_STR);
                $rq -> execute();
            } catch(PDOException $e) {
               return $e -> getMessage();
            }
         }

         public function logged($token) {
             try {
                 $q = "SELECT * FROM UtentiLoggati WHERE token = :token";
                 $rq = $this -> conn -> prepare($q);
                 $rq -> bindParam(":token", $token, PDO::PARAM_STR);
                 $rq -> execute();
    
                 if ($rq -> rowCount() === 0) {
                    throw new Exception("Errore nella validazione");    
                 } else {
                     $row = $rq -> fetch(PDO::FETCH_ASSOC);
                     $user_id = $row['user_id']; 
                     return $user_id;
                 }
             } catch(PDOException $e) {
                return "Errore, riprovare più tardi";
             }
         }
    }