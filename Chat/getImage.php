<?php
    $username= $_GET['user'];
    require_once('config.php');
	require_once('functions.php');
    $link = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
	if(!$link) {
		die('Falha na ligacao à BD: ' . mysql_error());
	}

    $sqry="SELECT imagem FROM users WHERE username='".$username."'";
    $query = $link->query($sqry);
    $row = mysqli_fetch_array($query);
    $content = $row['imagem'];
    echo $content;
?>
