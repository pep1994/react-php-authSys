<?php

    include __DIR__ . "/connect.php";
    header('Content-Type: application/json');
    $res  = [
        "sign" => false,
        "data" => ""
    ];

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
        if ($contentType === 'application/json' && $_SERVER['REQUEST_METHOD'] === "POST") {
            $content = trim(file_get_contents("php://input"));
            $decoded = json_decode($content, true);
            
                try {
                    if ($signin = $auth -> signin($decoded)) {
                        $res['sign'] = true;
                        $res['data'] = "Utente regitrato correttamente";
                    }
                } catch (Exception $e) {
                    $res['data'] = $e -> getMessage();
                }
                echo json_encode($res);
            
        }
