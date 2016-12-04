<?php

	session_start();
	include_once("../authentication/db.php");

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);
    $major = $myArray[0]["major"];
    $year = $myArray[0]["year"];
    $user = $_SESSION['username'];

    $sql = "UPDATE User SET Major = '$major', year = '$year' WHERE Username = '$user'";
    $result = mysqli_query($conn, $sql);

    if (!$result) {
    	print "Error";
    	exit();
    }



?>