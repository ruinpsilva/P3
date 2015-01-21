<?php
    require_once('auth.php');
    require_once('no-cache-headers.php');
    //Incluir definicoes de acesso a BD
    require_once('config.php');
    // algumas funcoes
    require_once('functions.php');
    // conect to mysql server
    $link = new mysqli(DB_HOST, DB_USER,DB_PASSWORD, DB_DATABASE);
    if(!$link){
        die('Falha de ligacao a BD:' . mysl_error());
    }

    $username=$_SESSION['SESS_USERNAME'];
    $sqry="SELECT * FROM users WHERE username='$username'";
    $resultset= $link->query($sqry);
    if($link->erno){
        echo ("ERRO na Query :".$connect->error);
        exit();
    }
    $row= $resultset->fetch_object();
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
    <div id="ProfileChange">
        <h1>Welcome to the A.M.A.L.I.A.</h1>
        <h1> Project Chat Room!</h1>
        <h2>Profile</h2>
        <form enctype='multipart/form-data' id="ChangeForm" name="regForm" method="POST" action="profile-exec.php">
            <fieldset id=fs1>
                First Name
                <input type="text" id="fname" name="fname" placeholder="First Name" value="<?php echo $row->nome ?>" />
                </p>
                Last Name
                <input type="text" id="lname" name="lname" placeholder="Last Name" value="<?php echo $row->apelido?>" />
                <p></p>
                Username
                <input type="text" id="login" name="login" placeholder="Username" value="<?php echo $row->username?>" readonly maxlength="8"/>
                <p id="smallInfo">All fields are Required!</p>
                <p></p>
                <p>Profile picture</p>
                <input type="file" id="imagem" name="imagem" accept="image/jpeg" />
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <input type="submit" name="Submit" value="Save" />
                <input id="CancelChanges" type="button" name="cancel" value="Cancel" onclick="window.location.href='http://localhost:8081/P3/chat/perfil.php'" />
                <br/>
                <br/>
                <br/>
                <input type="button" id="DeleteButton" name="remove" value="Delete acount" onclick="window.location.href='http://localhost:8081/P3/chat/elemina.php'" />
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

    </div>
</body>
</html>
