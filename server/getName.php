<?php

    include __DIR__ . "/connect.php";
    header('Content-Type: application/json');
    $res = [
        'error' => false,
        'data' => ""
    ];

    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
        try {
            $q = "SELECT * FROM Utenti WHERE id = :id";
            $rq = $PDO_conn -> prepare($q);
            $rq -> bindParam(":id", $_GET['id'], PDO::PARAM_INT);
            $rq -> execute();
            if ($rq -> rowCount() === 1) {
                $row = $rq -> fetch(PDO::FETCH_ASSOC);
                $res['data'] = [
                    'username' => $row['username'],
                    'name' => $row['nome']
                ];
            }
        } catch (PDOException $e) {
            $res['error'] = true;
            $res['data'] = "Errore, riprovare più tardi";
        }

        echo json_encode($res);
    }