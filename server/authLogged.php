<?php

include __DIR__ . "/connect.php";
header('Content-Type: application/json');
$res  = [
    "logged" => false,
    "data" => ""
];

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    if ($contentType === 'application/json' && $_SERVER['REQUEST_METHOD'] === "POST") {
        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content, true);

        try {
            if ($logged = $auth -> logged($decoded['token'])) {
                $res['logged'] = true;
                $res['data'] = "Utente loggato";
            }
        } catch (Exception $e) {
            $res['data'] = $e -> getMessage();
        }
        echo json_encode($res);
    }
