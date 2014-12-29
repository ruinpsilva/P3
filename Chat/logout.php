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
<title>Sessão Encerrada</title>
<link href="loginmodule.css" rel="stylesheet" type="text/css" />
</head>
<body>
<h1>Logout </h1>
<p align="center">&nbsp;</p>
<h4 align="center" class="err">A sua sessão foi encerrada. <br>
Adeus e até à próxima.</h4>
<p align="center">clique aqui para <a href="login-form.php">Login</a></p>
<?php include('footer.inc'); ?>
</body>
</html>
