<?php

    class AuthSys {

         protected $conn;
         
         public function __construct($pdo){
             $this -> conn = $pdo;
         }

         public function signin() {}

         public function login($username, $password) {
             try {
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
                $user_id = $row['id'];
                $token = bin2hex(random_bytes(30));
                $q = "INSERT INTO UtentiLoggati (session_id, user_id, token) VALUES (:sessionid, :userid, :token)";
                $rq = $this -> conn -> prepare($q);
                $rq -> bindParam(":sessionid", $session_id, PDO::PARAM_STR); 
                $rq -> bindParam(":userid", $user_id, PDO::PARAM_INT); 
                $rq -> bindParam(":token", $token, PDO::PARAM_STR   ); 
                $rq -> execute();

                return $token;

            } catch (PDOException $e) {
                return $e -> getMessage();
            }
         }

         public function logout() {}

         public function logged($token) {
             try {
                 $q = "SELECT * FROM UtentiLoggati WHERE token = :token";
                 $rq = $this -> conn -> prepare($q);
                 $rq -> bindParam(":token", $token, PDO::PARAM_STR);
                 $rq -> execute();
    
                 if ($rq -> rowCount() === 0) {
                    throw new Exception("Errore nella validazione");    
                 } else {
                     return true;
                 }
             } catch(PDOException $e) {
                return $e -> getMessage();
             }
         }
    }