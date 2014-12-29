<?php

//start session mechanism
session_start();

//if not logged redirect to login

if(!isset($_SESSION['username'])){
    session_write_close();
    header("location:login.php");
    session_commit();
    exit();
}

//else : get user and continue to content
else{
    $user = $_SESSION['username'];
    session_commit();
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
