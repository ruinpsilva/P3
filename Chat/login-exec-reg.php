<?php
//Iniciar Sessao

session_start();

require_once('no-cache-headers.php');
//Incluir definicoes de acesso a BD
require_once('config.php');
// algumas funcoes
require_once('functions.php');
//array para "coleccionar" erros de validacao
$errmsg_arr = array();
//flag para sinalizar validacao do formulario
$errflag = false;
//Connect to mysql server
$link = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
if(!$link) {
    die('Falha de ligacao a BD: ' . mysql_error());
}
//limpar os valores recebidos por POST
$login 	= $_GET['login'];


//cria query SQL
$qry="SELECT * FROM users WHERE username='$login'";

$result = $link->query($qry);
//Verifica se existe $resultado


if($result) {
    if($result->num_rows == 1) {
        //Login com Sucesso
        // regera um novo ID para a sessao (previne um determinado tipo de ataque)
        session_regenerate_id();
        $member = $result->fetch_assoc();
        $_SESSION['SESS_FIRST_NAME'] = $member['nome'];
        $_SESSION['SESS_LAST_NAME'] = $member['apelido'];
        $_SESSION['SESS_USERNAME'] = $member['username'];
        $_SESSION['SESS_EXP_TIME'] = time() + SESSION_TIMEOUT;
        // forca escrita e encerramento da sessao
        //session_write_close();
        //redirecciona para pagina de login
        header("location:perfil.php");
        //header("location: http://localhost:3000?u=".$member['username']);
        exit();
    }
}else {
        die("SQL Query falhou");
}
?>
