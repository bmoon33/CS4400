<?php

	session_start();
	include_once("db.php");

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);
    $major = $myArray[0]["major"];
    $year = $myArray[0]["year"];
    $user = $_SESSION['username'];

    $sql = "UPDATE Students SET MajorName = '$major', year = '$year' WHERE UserName = '$user'";
    $result = mysqli_query($conn, $sql);

    if (!$result) {
    	print "Error";
    	exit();
    }



?>