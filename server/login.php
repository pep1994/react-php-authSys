<?php 

    include __DIR__ . "/connect.php";
    header('Content-Type: application/json');
    $res  = [
        "error" => false,
        "data" => ""
    ];
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    if ($contentType === 'application/json' ) {   

        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content, true);

        try {
            $user = $auth -> login($decoded['username'], $decoded['password']);
            $res['data'] = $user;
        } catch (PDOException $e) {
            $res['error'] = true;
            $res['data'] = "Errore interno, riprovare più tardi";
        } catch (Exception $e) {
            $res['error'] = true;
            $res['data'] = $e -> getMessage();
        }
        
        echo json_encode($res);
    }

 
