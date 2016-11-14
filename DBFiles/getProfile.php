<?php

	session_start();
	include_once("db.php");


    $user = $_SESSION['username'];

    $sql = "SELECT MajorName, year FROM Students WHERE UserName = '$user'";
    $result = mysqli_query($conn, $sql);
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
	    $out[] = $row;
	}

    echo json_encode($out);



?>