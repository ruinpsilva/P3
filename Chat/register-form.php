<?php
// esta funcao tem que ser chamada antes de qualquer output
session_start();
// nao queremos cache desta página
require_once('no-cache-headers.php');
// se uma sessao autenticada nao permitir registo
// redireccionar para página principal de membro autenticado
if (isset($_SESSION['SESS_MEMBER_ID'])) {
	header('location: http://localhost:3000');
	exit();
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Registo de Novo Utilizador</title>
        <link href="chatStyleDark.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
    <p>&nbsp;</p>
        <form id="regForm" name="regForm" method="post" action="register-exec.php">
            <h1>Join us and Chat with us!</h1>
            <fieldset id=fs1>
                </p>
                <input type="text" id="fname" name="fname" placeholder="First Name"/>
                </p>
                <input type="text" id="lname" name="lname" placeholder="Last Name"/>
                <p></p>
                <input type="text" id="login" name="login" placeholder="Username"/>
                <p></p>
                <input type="password" id="password" name="password" placeholder="Password"/>
                <p></p>
                <input type="password" id="cpassword" name="cpassword" placeholder="Confirm password"/>
                <p></p>
                <p id="smallInfo">All fields are Required!</p>
                <p></p>
                <p >Profile picture</p>
                <input type="file" id="imagem" name="imagem" placeholder="Insere imagem" value="uploud"/>
                <input type="submit" name="Submit" value="Sign up"/>
                <p></p>
                </br>
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
            </fieldset>
        </form>
    </body>
</html>
