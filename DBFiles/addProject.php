<?php
	include_once("db.php");

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);
//Name, description, advisormeail, advisor_name, estnstudents, designation_name
    $name = "Know Your Water Project"; //$myArray[0]["projectname"];
    $desc = "asdf"; //$myArray[0]["description"];
    $advname = "qwer";//$myArray[0]["advisorname"];
    $advemail = "qqq"; //$myArray[0]["advisoremail"];
    $desname = "Sustainable Communities"//$myArray[0]["desname"];
    $eststudent = "aaaa"; //$myArray[0]["eststudent"];

    $sql = "SELECT * FROM Project WHERE ProjectName = '$name'";
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

    $sql = "INSERT INTO Project (ProjectName, Description, Advisor_name, Advisor_email, Designation_name, Estimated_Num_of_Students) VALUES ('$name', '$desc', '$advname', '$advemail', '$desname', '$eststudent')";
    $result = mysqli_query($conn, $sql);

    if (!$result) {
    	print "Error";
    	exit();
    }


?>
