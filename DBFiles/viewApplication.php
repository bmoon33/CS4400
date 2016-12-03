<?php

	session_start();
	include_once("db.php");


    //$user = $_SESSION['username'];

    $sql = "SELECT Applications.ProjectName, Applications.Status, Students.year, Students.MajorName 
            FROM Applications JOIN Students ON Applications.GTemail = Students.GTemail";
    $result = mysqli_query($conn, $sql);
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
	    $out[] = $row;
	}

    echo json_encode($out);


?>
