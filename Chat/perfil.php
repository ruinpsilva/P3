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
<html>
        <link href="chatStyleDark.css" rel="stylesheet" type="text/css" />
        <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <h1>Profile</h1>
    <br/>
    <img src="getImage.php?id=1"/>
    <p><b>First Name:</b>&nbsp&nbsp&nbsp <i><?php echo $row->nome?></i></p>
    <p><b>Last Name:</b>&nbsp&nbsp&nbsp <i><?php echo $row->apelido?></i></p>
    <p><b>Username  :</b>&nbsp&nbsp&nbsp <i><?php echo $row->username?></i></p>

       <form id="btnperfil">
        <input id ="GCHAT"type="button" onclick="window.location.href='http://localhost:3000?u=<? echo $username ?>'" value="Go Chat" />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <input id="CHP" type="button" onclick="window.location.href='http://localhost:8081/P3/chat/Change%20Profile.php'" value="Change Profile"/>
        <input id ="LOUT" type="button" onclick="window.location.href='http://localhost:8081/P3/chat/logout.php'" value="Log Out"/>

       </form>
        
<!--
    <form action="upload.php" method="post" enctype="multipart/form-data" target="upload_target" onsubmit="startUpload();" >

                <label>File:  
                <input name="myfile" type="file" size="30" />
                </label>
                <input type="submit" name="submitBtn" class="sbtn" value="Upload" />
                <iframeid="upload_target"name="upload_target"src="#"style="width:0;height:0;border:0px solid #fff;"></iframe>
    </form>
-->
    
</html>
