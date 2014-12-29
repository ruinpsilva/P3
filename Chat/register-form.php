<?php
// esta funcao tem que ser chamada antes de qualquer output
session_start();
// nao queremos cache desta página
require_once('no-cache-headers.php');
// se uma sessao autenticada nao permitir registo
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
<title>Registo de Novo Utilizador</title>
<link href="loginmodule.css" rel="stylesheet" type="text/css" />
</head>
<body>
<?php
	if( isset($_SESSION['ERRMSG_ARR']) && is_array($_SESSION['ERRMSG_ARR']) && count($_SESSION['ERRMSG_ARR']) >0 ) {
		echo '<ul class="err">';
		foreach($_SESSION['ERRMSG_ARR'] as $msg) {
			echo '<li>',$msg,'</li>';
		}
		echo '</ul>';
		unset($_SESSION['ERRMSG_ARR']);
	}
?>
<form id="regForm" name="regForm" method="post" action="register-exec.php">
  <table width="300" border="0" align="center" cellpadding="2" cellspacing="0">
    <tr>
      <th> Nome </th>
      <td><input name="fname" type="text" class="textfield" id="fname" /></td>
    </tr>
    <tr>
      <th> Apelido </th>
      <td><input name="lname" type="text" class="textfield" id="lname" /></td>
    </tr>
    <tr>
      <th width="124">Username</th>
      <td width="168"><input name="login" type="text" class="textfield" id="login" /></td>
    </tr>
    <tr>
      <th>Password</th>
      <td><input name="password" type="password" class="textfield" id="password" /></td>
    </tr>
    <tr>
      <th>Confirme Password </th>
      <td><input name="cpassword" type="password" class="textfield" id="cpassword" /></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><input type="submit" name="Submit" value="Register" /></td>
    </tr>
  </table>
  <?php include('footer.inc'); ?>
</form>
</body>
</html>
