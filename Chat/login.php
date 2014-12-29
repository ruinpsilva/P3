<?php

//start the session mechanism
session_start();


//verify if there is an active session with a logged user
if(isset($_SESSION['username'])){
    // redirect to index.php and exit the login
    // echo("logged as " . $_SESSION['username']);
    header("location:indexchat.php");
    session_commit();
    exit();
}

// no user logged, verify if there is a username
else if(isset($_GET['username'])){
    $_SESSION['username'] = $_GET['username'];
    // redirect to index.php and exit the login
    // echo("new login as " . $_SESSION['username']);
    header("location:indexchat.php");
    session_commit();
    exit();
}



?>

<html>
    <head>
        <title>Chat para o Worms</title>
        <meta charset="utf-8">
        <meta http-equiv="Default-Style" content="Dark">

        <link rel="stylesheet" href="css/chatStyleDark.css" title="Dark"/>
        <link rel="Alternate stylesheet" href="css/chatStyleLight.css" title="Light"/>
        <style>

        </style>
    </head>
    <body>
        <div id="nickWrap">
            <h1>Welcome to the Chat Room!</h1>
            </br>
            <h2>SIGN IN</h2>
            <p id="nickError"></p>
            <form id="setNick" method="POST" action="login.php">
                <input size="20" id="nickname" placeholder="username"></input>
                </p>
                <input size="20" id="nickpass" placeholder="password">
                </p>
                <input id="btnGoForLogin" type="submit" value = "GO Chat!"></input>
            </form>
            </br>
            <p>Don't have an account?</p>
            <h2>SIGN UP</h2>
            <form id="setAccount">
                <input size="20" id="nicknameAc" placeholder="username">
                </p>
                <input size="20" id="nickpassAc" placeholder="password">
                </p>
                <input id="btnGoForAccount" type="submit" value="Create Account">
            </form>
        </div>

        <div id="contentWrap">
            <div id="chatWrap">
                <div id="chat"></div>
                <form id="send-message">
                    <input size="25" id="message"></input>
                    <input type="submit" value="Send"></input>
                    <p id="infoToChat">Press enter to send</p>
                </form>
            </div>
            <div id="users"></div>
        </div>


        <script src="http://code.jquery.com/jquery-latest.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script src="chatApp.js"></script>
    </body>
</html>

<!--
<html>
    <head>

    </head>
    <body>
        <p>login as <a href="login.php?username=red">red</a></p>
        <p>login as <a href="login.php?username=green">green</a></p>
        <p>login as <a href="login.php?username=blue">blue</a></p>
    </body>
</html>-->
