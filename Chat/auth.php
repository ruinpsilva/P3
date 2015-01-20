<?php
	//Iniciar Sessao (isto é obrigatório sempres que se usam sessões)
	session_start();
	require_once('no-cache-headers.php');
	require_once('config.php');
	// Verificar se existe sessao activa
	// se nao existir definida a variavel $_SESSION['SESS_MEMBER_ID']
	// redirecciona para pagina de acesso negado
	if(!isset($_SESSION['SESS_FIRST_NAME']) || (trim($_SESSION['SESS_FIRST_NAME']) == '')) {
		header("location: access-denied.php");
		exit();
	}
	// Caso exista verifica se a sessao já expirou
	// converte para inteiro
	$exp_time = intval($_SESSION["SESS_EXP_TIME"]);
    if (time() < $exp_time) {
    	//echo('ok2');
        // Sessão ainda válida.
        // refrescar o tempo de expiração
		// o SESSION_TIMEOUT esta definido em config.php
        $_SESSION["SESS_EXP_TIME"] = time() + SESSION_TIMEOUT;
    } else {
    	//echo('ok3');
        /* Session expirada; força o logout. */
        header('location: logout.php');
        exit();
    }
?>
