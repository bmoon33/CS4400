<?php

	session_start();
	include_once("authentication/db.php");


    //$user = $_SESSION['username'];

    $sql = "SELECT Apply.Project_name, Apply.Status, User.Year, User.Major 
            FROM Apply JOIN User ON Apply.Student_name = User.Username";
    // $sql = "SELECT * FROM User WHERE Username = 'nroy45'";
    $result = mysqli_query($conn, $sql) or die("Can't connect");
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
	    $out[] = $row;
	}

    echo json_encode($out);


?>
