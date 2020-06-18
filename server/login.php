<?php 

    include __DIR__ . "/connect.php";
    header('Content-Type: application/json');
    $res  = [
        "error" => false,
        "data" => ""
    ];
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    if ($contentType === 'application/json' && $_SERVER['REQUEST_METHOD'] === "POST") {   

        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content, true);

        try {
            $token = $auth -> login($decoded['username'], $decoded['password']);
            $res['data'] = $token;
        } catch (Exception $e) {
            $res['error'] = true;
            $res['data'] = $e -> getMessage();
        }
        echo json_encode($res);
    }

 
