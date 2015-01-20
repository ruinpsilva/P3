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
    //$username= Domingos;
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
    <h1>Perfil</h1>
    <br/>
    <img src="getImage.php?id=1" width="175" height="200" />
    <p>First Name:
    <input type="text" id="fname" name="fname" value="<?php echo $row->nome?>" readonly/>
    </p>
    <p>Last Name: <input type="text" id="fname" name="fname" value="<?php echo $row->apelido?>" readonly/>
    </p>
    <p>Username : <input type="text" id="fname" name="fname" value="<?php echo $row->username?>" readonly</p>
    <p>Password : <input type="password" value="<? echo $row->pwd?>" readonly/> </p>

    <br/>
       <p>
        <input type="button" value="Change Perfil" actions="re"/>      
         <input type="submit" action="http://localhost:3000?u=<? echo $username ?>" value="Go Chat" />
         </p>
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