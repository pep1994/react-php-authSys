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
            $auth -> logout($decoded['token'], $decoded['id']);
            $res['data'] = "Logout effettuato con successo";
        } catch (Exception $e) {
            $res['error'] = true;
            $res['data'] = $e -> getMessage();
        }
        echo json_encode($res);
    }
