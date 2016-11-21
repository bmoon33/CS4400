<?php
	include_once("db.php");

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);
//Name, description, advisormeail, advisor_name, estnstudents, desgination_name
    $name = $myArray[0]["projectname"];
    $desc = $myArray[0]["description"];
    $advname = $myArray[0]["advisorname"];
    $advemail = $myArray[0]["advisoremail"];
    $desname = $myArray[0]["desname"];
    $eststudent = $myArray[0]["eststudent"];

    $sql = "SELECT * FROM Projects WHERE ProjectName = '$name'";
    $result = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($result);

    if ($count > 0) {
    	print "Project exists";
    	exit();
    }

//create table SQL had this constraint so no need here?
/*
    $sql = "SELECT * FROM Designation WHERE Name = '$desname'";
    $result = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($result);

    if ($count == 0) {
    	print "Designation does not exist";
    	exit();
    }
*/

    $sql = "INSERT INTO Projects (ProjectName, Description, AdvisorName, AdvisorEmail, DesName, EstStudent) VALUES ('$name', '$desc', '$advname', '$advemail', '$desname', '$eststudent')";
    $result = mysqli_query($conn, $sql);

    if (!$result) {
    	print "Error";
    	exit();
    }


?>
