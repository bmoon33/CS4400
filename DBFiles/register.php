<?php
	include_once("db.php");

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);

    $user = $myArray[0]["user"];
    $email = $myArray[0]["email"];
    $password = $myArray[0]["password"];

    $sql = "SELECT * FROM User WHERE UserName = '$user'";
    $result = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($result);

    if ($count > 0) {
    	print "User exists";
    	exit();
    }

    $sql = "SELECT * FROM Students WHERE GTemail = '$email'";
    $result = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($result);

    if ($count > 0) {
    	print "Email exists";
    	exit();
    }

    $sql = "INSERT INTO Students (GTemail, UserName) VALUES ('$email', '$user')";
    $result = mysqli_query($conn, $sql);

    if (!$result) {
    	print "Error";
    	exit();
    }

    $sql = "INSERT INTO User VALUES ('$user', '$password', 'Student')";
    $result = mysqli_query($conn, $sql);

    if (!$result) {
    	print "Error";
    	exit();
    }


?>