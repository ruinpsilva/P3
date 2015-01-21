<?php
    session_start();
    require_once('auth.php');
    require_once('no-cache-headers.php');
    //Incluir definicoes de acesso a BD
    require_once('config.php');
    // algumas funcoes
    require_once('functions.php');
    // conect to mysql server
    $link = new mysqli(DB_HOST, DB_USER,DB_PASSWORD, DB_DATABASE);
    if(!$link){
        die('Falha de ligacao a BD:' . mysl_error());
    }

    $username=$_SESSION['SESS_USERNAME'];
    $sqry="DELETE FROM users WHERE username='$username'";
    $resultset= $link->query($sqry);
    if($link->erno){
        echo ("ERRO na Query :".$connect->error);
        exit();
    }
session_destroy();
        header("location: login-form.php");

        exit();

?>

