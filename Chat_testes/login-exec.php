<?php
session_start();
require_once('no-chache-headers.php');
require_once('config.php');
require_once('functions.php');
$errmsg_arr = array();
$errflag = false;
$link = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
if(!$link){
	die('DB connection error: ' . mysql_error());
}
$login = clean($_POST['login'],$link);
$password = clean($POST['password'],$link);
if($login == ''){
	$errmsg_arr[] = 'Login ID (reqired)';
	$errflag = true;
}
if($password == ''){
	$errmsg_arr[] = 'Password (required)';
	$errflag = true;
}
if($errflag){
	$_SESSION['ERRMSG_ARR'] = $errmsg_arr;
	session_write_close();
	header("location: login-form.php");
	exit();
}
$qry="SELECT * FROM users WHERE username='$login' AND pwd='".md5($_POST['password'])."'";
$result=$link->query($qry);
if($result){
	if($result->num_rows==1){
		session_regenerate_id();
		$member=$result->fetch_assoc();
		$_SESSION['SESS_FIRST_NAME'] = $member['nome'];
		$_SESSION['SESS_LAST_NAME'] = $member['apelido'];
		$_SESSION['SESS_USERNAME'] = $member['username'];
		$_SESSION['SESS_EXP_TIME'] = time()+SESSION_TIMEOUT;
		session_write_close();
		header("location: http://localhost:3000");
		exit();
	}else{
		header("location: login-failed.php");
		exit();
	}else{
		die("SQL Query failed");
	}
}
?>
