<?php



// esta funcao tem que ser chamada antes de qualquer output
session_start();
// nao queremos cache desta página
require_once('no-cache-headers.php');
// se uma sessao autenticada nao permitir re-login
// redireccionar para página principal de membro autenticado
if (isset($_SESSION['SESS_MEMBER_ID'])) {
	header('location: member-index.php');
	exit();
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Chat Login</title>
<link href="chatStyleDark.css" rel="stylesheet" type="text/css" />
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>
<body>
<p>&nbsp;</p>
<div id="nickWrap">
            <h1>Welcome to the Chat Room!</h1>
            </br>
            <h2>SIGN IN</h2>
            <form id="loginForm" method="post" action="login-exec.php" name="loginForm">
                <input size="20" id="login" placeholder="username" name = "login"></input>
                </p>
                <input size="20" id="password" placeholder="password" type="password" name="password">
                </p>
                <input id="btnGoForLogin" type="submit" value = "GO Chat!"></input>
            </form>
            </br>
            <p>Don't have an account?</p>
            <h2>SIGN UP</h2>
                <input id="btnGoForAccount" type="button" value="Create Account" href="register-form.php">
                <input id="btnCallChat" type="submit" href="indexchat.html" value="Chat"/>
                <h4 class='err'>Registe-se <a href='register-form.php'> aqui</a
        </div>
</body>
</html>
