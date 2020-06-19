<?php
    session_start();
    include __DIR__ . "/authSys.php";
    $dsn = "mysql:host=localhost;dbname=auth_system;charset=utf8";
    try{
        $PDO_conn = new PDO($dsn, 'root', 'root');
        $PDO_conn -> setAttribute(PDO::ATTR_ERRMODE, ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        return $e -> getMessage();
    }

    $auth = new AuthSys($PDO_conn);