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
<title>Formulário de Login</title>
<link href="loginmodule.css" rel="stylesheet" type="text/css" />
</head>
<body>
<p>&nbsp;</p>
<form id="loginForm" name="loginForm" method="post" action="login-exec.php">
  <table width="300" border="0" align="center" cellpadding="2" cellspacing="0">
    <tr>
      <td width="112"><b>Login</b></td>
      <td width="188"><input name="login" type="text" class="textfield" id="login" /></td>
    </tr>
    <tr>
      <td><b>Password</b></td>
      <td><input name="password" type="password" class="textfield" id="password" /></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><input type="submit" name="Submit" value="Login" /></td>
    </tr>
  </table>
</form>
<h4 class='err'>Registe-se <a href='register-form.php'> aqui</a></h4>
<?php
include('footer.inc');
?>
</body>
</html>
