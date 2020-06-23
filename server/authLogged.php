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
            if ($logged_id = $auth -> logged($decoded['token'], $decoded['id'])) {
                $res['logged'] = true;
                $res['data'] = $logged_id;
            }
        } catch (Exception $e) {
            $res['data'] = $e -> getMessage();
        }
        echo json_encode($res);
    }
