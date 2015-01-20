<?php
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");		    // data no passado
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");	// data actual
header("Cache-Control: no-store, no-cache, must-revalidate");	// controlo de cache
header("Cache-Control: post-check=0, pre-check=0", false);		// controlo de cache
header("Pragma: no-cache");						// controlo de cache
?>
