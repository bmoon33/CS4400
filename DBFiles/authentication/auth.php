<?php

	session_start();
	if (isset($_SESSION['username'])) {
		print $_SESSION['username'];
	}

?>