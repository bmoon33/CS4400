<?php
	include_once("db.php");

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);
//CourseNumber, Name, instructor, Eststudent, desname
    $name = $myArray[0]["name"];
    $coursenumber = $myArray[0]["coursenumber"];
    $instructor = $myArray[0]["instructor"];
    $desname = $myArray[0]["desname"];
    $eststudent = $myArray[0]["eststudent"];

    $sql = "SELECT * FROM Course WHERE Name = '$name'";
    $result = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($result);

    if ($count > 0) {
    	print "Course exists";
    	exit();
    }

    $sql = "SELECT * FROM Course WHERE CourseNumber = '$coursenumber'";
    $result = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($result);

    if ($count > 0) {
    	print "Course exists";
    	exit();
    }
/*
    $sql = "SELECT * FROM Designation WHERE Name = '$desname'";
    $result = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($result);

    if ($count == 0) {
    	print "Designation does not exist";
    	exit();
    }
*/
    $sql = "INSERT INTO Course (CourseNumber, Name, Instructor, DesName, EstStudent) VALUES ('$coursenumber', '$name', '$instructor', '$desname', '$eststudent')";
    $result = mysqli_query($conn, $sql);

    if (!$result) {
    	print "Error";
    	exit();
    }


?>
