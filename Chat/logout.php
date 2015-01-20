<?php
	//Sessoes
	session_start();
	// unset de todas as vars de sessao
	session_unset();
	// se for pretendido fazer unset uma a uma


		//unset($_SESSION['SESS_MEMBER_ID']);
		//unset($_SESSION['SESS_FIRST_NAME']);
		//unset($_SESSION['SESS_LAST_NAME']);
		//unset($_SESSION['SESS_EXP_TIME']);
		//unset($_SESSION['ERRMSG_ARR']);

	// uma alternativa que "limpa" todas as vars de sessao
		//	$_SESSION = array();

		session_unset();
		session_destroy();

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Logout Succesfull</title>
    <link href="chatStyleDark.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <h1>Logout Succesfull</h1>
    <p align="center">&nbsp;</p>
    <h4 align="center" class="err">Your logout was succesfull <br>
    Come back soon.</h4>
    <form id="goLogBtn">
	    <input id="btnGo2" type="button" onclick="window.location.href='http://localhost:8081/P3/chat/login-form.php'"  value="Login"/>
	</form>
</body>
</html>
