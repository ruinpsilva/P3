<?php
	//Sessoes
	session_start();

	//Acesso a BD
    require_once('auth.php');
	require_once('config.php');
	// algumas funcoes
	require_once('functions.php');

	//Array para erros de validacao
	$errmsg_arr = array();

	//flag de validacao
	$errflag = false;
    $usernameuse= $_SESSION['SESS_USERNAME'];
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
        if($errflag) {
		$_SESSION['ERRMSG_ARR'] = $errmsg_arr;
		header("location:profileChange-form.php");
		exit();
	}


$image = addslashes(file_get_contents($_FILES['imagem']['tmp_name']));
        if(empty($image)){
       $qry= "UPDATE users SET username='$login',nome='$fname',apelido='$lname',pwd='".md5($_POST['password'])."' WHERE username='$usernameuse'";
        }
        else{
            $qry= "UPDATE users SET username='$login',nome='$fname',apelido='$lname',pwd='".md5($_POST['password'])."',imagem='$image' WHERE username='$usernameuse'";
        }
	   $result = $link->query($qry);
        header("location:login-form.php");
		exit();
    }
?>
