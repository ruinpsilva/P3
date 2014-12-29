<?php
	// funcao para "limpar" variaveis recebidas do formulario
	// tenta impedir "injeccao" de SQL
	function clean($str, $mysqli_link) {
		var_dump($mysqli_link);
		var_dump($str);
		$str = @trim($str); 				// remove espacos antes e depois
		// o uso de get_magic_quotes foi tornado obsoloteo em PHP 5
		// e eliminado no PHP 6
		//if(get_magic_quotes_gpc()) {
		//	$str = stripslashes($str);
		//}
		// torna uma string segura para ser utilizada como SQL query
		return $mysqli_link->real_escape_string($str);
	}

?>
