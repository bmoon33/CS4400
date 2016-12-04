<?php

	session_start();

	if (isset($_SESSION['UserType'])) {
		if ($_SESSION['UserType'] == "Admin") {
			print "Admin";
		}
	}

?>