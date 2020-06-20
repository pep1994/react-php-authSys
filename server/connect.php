<?php
    session_start();
    include __DIR__ . "/authSys.php";
    $res = [
        "error" => false,
        'data' => ""
    ];
    $dsn = "mysql:host=localhost;dbname=auth_system;charset=utf8";
    try{
        $PDO_conn = new PDO($dsn, 'root', 'root');
        $PDO_conn -> setAttribute(PDO::ATTR_ERRMODE, ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        $res['error'] = true;
        $res['data'] = "Errore interno, riprovare più tardi";
         echo json_encode($res);
         return;
    }

    $auth = new AuthSys($PDO_conn);