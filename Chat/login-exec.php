<?php


	//Iniciar Sessao (isto é obrigatório sempre que se usam sessões)
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
	$login 		= clean($_POST['login'],$link);
	$password 	= clean($_POST['password'],$link);

	//validacao do formulario
	if($login == '') {
		$errmsg_arr[] = 'Login ID (preenchimento obrigatório)';
		$errflag = true;
	}
	if($password == '') {
		$errmsg_arr[] = 'Password (preenchimento obrigatório)';
		$errflag = true;
	}

	//se existirem erros -> redireccionar para a seguinte página
	if($errflag) {
		// guardar erros de validacao numa variavel de sessao
		$_SESSION['ERRMSG_ARR'] = $errmsg_arr;
		// força a escrita e encerramento da sessao
		session_write_close();
		// redirecciona para o formulario de login
		header("location: login-form.php");
		exit();
	}

	//cria query SQL
	$qry="SELECT * FROM users WHERE username='$login' AND pwd='".md5($_POST['password'])."'";
	$result = $link->query($qry);

	//Verifica se existe $resultado
	if($result) {
		if($result->num_rows == 1) {
			//Login com Sucesso
			// regera um novo ID para a sessão (previne um determinado tipo de ataque)
			session_regenerate_id();
			$member = $result->fetch_assoc();
			$_SESSION['SESS_FIRST_NAME'] = $member['nome'];
			$_SESSION['SESS_LAST_NAME'] = $member['apelido'];
            $_SESSION['SESS_USERNAME'] = $member['username'];
			$_SESSION['SESS_EXP_TIME'] = time() + SESSION_TIMEOUT;
			// forca escrita e encerramento da sessao
			session_write_close();
			//redirecciona para página de login
            //AQUI VAI TER QUE ENTRAR DIRECTAMENTE NO CHAT-------------------------------------
			header("location: http://localhost:3000");
			exit();
		}else {
			//Login failed
			header("location: login-failed.php");
			exit();
		}
	}else {
		die("SQL Query falhou");
	}
?>
