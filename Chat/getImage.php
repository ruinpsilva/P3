<?php

  $id = $_GET['id'];
  $link = new mysqli(DB_HOST, DB_USER,DB_PASSWORD, DB_DATABASE);
    if(!$link){
        die('Falha de ligacao a BD:' . mysl_error());
    }

    $sqry="SELECT * FROM users WHERE username='Domingos'";
    $resultset= $link->query($sqry);
    if($link->erno){
        echo ("ERRO na Query :".$connect->error);
        exit();
    }
    $row= $resultset->fetch_object();
    header("content-type: image/jpeg")
    echo $row->imagem:

?>
