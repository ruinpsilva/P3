<?php
	//Sessões
	session_start();

	//Acesso a BD
	require_once('config.php');
	// algumas funcoes
	require_once('functions.php');

	//Array para erros de validacao
	$errmsg_arr = array();

	//flag de validacao
	$errflag = false;

	//Connect to mysql server
	$link = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
	if(!$link) {
		die('Falha na ligacao à BD: ' . mysql_error());
	}


	//"Limpar" os valores recebidos do formulario via POST
	$fname = clean($_POST['fname'],$link);
	$lname = clean($_POST['lname'],$link);
	$login = clean($_POST['login'],$link);
	$password = clean($_POST['password'],$link);
	$cpassword = clean($_POST['cpassword'],$link);

	//Validacoes (versao simples)
	if($fname == '') {
		$errmsg_arr[] = 'Nome (preenchimento obrigatório)';
		$errflag = true;
	}
	if($lname == '') {
		$errmsg_arr[] = 'Apelido (preenchimento obrigatório)';
		$errflag = true;
	}
	if($login == '') {
		$errmsg_arr[] = 'Username (preenchimento obrigatório)';
		$errflag = true;
	}
	if($password == '') {
		$errmsg_arr[] = 'Password (preenchimento obrigatório)';
		$errflag = true;
	}
	if($cpassword == '') {
		$errmsg_arr[] = 'Confirmação de Password (preenchimento obrigatório)';
		$errflag = true;
	}
	if( strcmp($password, $cpassword) != 0 ) {
		$errmsg_arr[] = 'Passwords não são iguais';
		$errflag = true;
	}

	//Check for duplicate login ID
	if($login != '') {
		$qry = "SELECT * FROM members WHERE login='$login'";
		$result = $link->query($qry);
		if($result) {
			if($result->num_rows > 0) {
				$errmsg_arr[] = 'Username já utilizado (escolha outro)';
				$errflag = true;
			}
			@$result->free_result();
		}
		else {
			die("Erro de SQL/BD");
		}
	}

	//Se existem erros de validacao redireccionar para form de registo
	if($errflag) {
		$_SESSION['ERRMSG_ARR'] = $errmsg_arr;
		session_write_close();
		header("location: register-form.php");
		exit();
	}

	//Se não: inserir novo utilizador
	$qry = "INSERT INTO members(firstname, lastname, login, passwd) VALUES('$fname','$lname','$login','".md5($_POST['password'])."')";
	$result = $link->query($qry);

	//Verificar se houve sucesso na insercao do registo
	if($result) {
		// destruir a sessão de registo
		header("location: register-success.php");
		exit();
	}else {
		die("Erro de SQL/BD");
	}
?>
