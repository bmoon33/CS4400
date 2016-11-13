<?php
	$host = "130.207.114.51";
	$user = "cs4400_Team_27";
	$pass = "Gu5l1OFj";
	$db_name = "cs4400_Team_27";
	//Connect
	$conn = mysqli_connect($host, $user, $pass) or die("Could not connect");
	$db = mysqli_select_db($conn, $db_name) or die("Could not connect");



?>