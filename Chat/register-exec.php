<?php
	//Sessoes
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

    if(isset($_POST['submit']));{
	//"Limpar" os valores recebidos do formulario via POST
	$fname = clean($_POST['fname'],$link);
	$lname = clean($_POST['lname'],$link);
	$login = clean($_POST['login'],$link);
	$password = clean($_POST['password'],$link);
	$cpassword = clean($_POST['cpassword'],$link);
    $imagem = clean($_POST['imagem'],$link);

	//Validacoes (versao simples)
	if($fname == '') {

		$errmsg_arr[] = 'You must type your first Name';
		$errflag = true;
	}
	if($lname == '') {
		$errmsg_arr[] = 'You must type your last Name';
		$errflag = true;
	}
	if($login == '') {
		$errmsg_arr[] = 'You must type the Username';
		$errflag = true;
	}
	if($password == '') {
		$errmsg_arr[] = 'You must type the password';
		$errflag = true;
	}
	if($cpassword == '') {
		$errmsg_arr[] = 'You must type the confirmation password';
		$errflag = true;
	}
	if( strcmp($password, $cpassword) != 0 ) {
		$errmsg_arr[] = 'The passwords do not match';
		$errflag = true;
	}

	//Check for duplicate login ID
	if($login != '') {
		$qry = "SELECT * FROM users WHERE username='$login'";
		$result = $link->query($qry);
		if($result) {
			if($result->num_rows > 0) {
				$errmsg_arr[] = 'This Username is already taken, please choose another';
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
        $image = addslashes(file_get_contents($_FILES['imagem']['tmp_name']));


        //Se não: inserir novo utilizador
	$qry = "INSERT INTO users(username, nome, apelido, pwd,imagem) VALUES('$login','$fname','$lname','".md5($_POST['password'])."','".$image."')";
	$result = $link->query($qry);

	//Verificar se houve sucesso na insercao do registo
	if($result) {
		header("location: login-exec-reg.php?login=".$login);
		exit();
	}else {
		die("Erro de SQL/BD");
	}
    }
?>
