<?php
    //Acesso a BD
	require_once('auth.php');
	?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Delete Acount</title>
    <link href="chatStyleDark.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<h1>Delete Acount</h1>
	<p align="center">&nbsp;</p>

	<h4 class="err">You are sure want delete your account </h4>
	<form id="deniedBtn">
	    <input id="btnGo5" type="button" onclick="window.location.href='http://localhost:8081/P3/chat/elemina-exec.php'" value="Yes"/>
	    	    <input id="btnGo5" type="button" onclick="window.location.href='http://localhost:8081/P3/chat/login-form.php'" value="No"/>
	</form>
	</body>
</html>
