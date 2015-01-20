<?php

  $id = $_GET['id'];
  // do some validation here to ensure id is safe
$link = new mysqli(DB_HOST, DB_USER,DB_PASSWORD, DB_DATABASE);
    if(!$link){
        die('Falha de ligacao a BD:' . mysl_error());
    }

  $sql = "SELECT imagem FROM users WHERE username='Domingos'";
  $resultset= $link->query($sql);
  $row = mysql_fetch_assoc($resultset);

  header("Content-type: image/jpeg");
  echo $row['imagem'];
?>