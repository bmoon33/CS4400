<?php

    include_once("../authentication/db.php");
    mysqli_set_charset($conn, 'utf8');

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);

    $name = $myArray[0]["name"];
    $advisor = $myArray[0]["advisor"];
    $email = $myArray[0]["email"];
    $studentCount = $myArray[0]["studentcount"];
    $description = $myArray[0]["description"];
    $designation = $myArray[0]["designation"]["Name"];
    $dept = $myArray[0]["dept"]["Name"];
    $major = $myArray[0]["major"]["Name"];
    $year = $myArray[0]["year"]["Name"];




    $sql = "SELECT * FROM Project WHERE Name = '$name'";
    $result = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($result);

    if ($count > 0) {
        print "Project exists";
        exit();
    }

    $sql = "INSERT INTO Project (Name, Description, Advisor_name, Advisor_email, Designation_name, Estimated_Num_of_Students) 
            VALUES ('$name', '$description', '$advisor', '$email', '$designation', '$studentCount')";

    $result = mysqli_query($conn, $sql) or die ("error inserting into Project");

    foreach($myArray[0]["category"] as $key => $value) {
            $cat = $value["Name"];
            $sql = "INSERT INTO Project_is_Category (Project_name, Category_name)
                    VALUES('$name', '$cat')";

            $result = mysqli_query($conn, $sql) or die ("error inserting into Project_is_Category");
    }

    $sql = "INSERT INTO Project_requirement (Name, Year_requirement, Major_requirement, Department_requirement) 
            VALUES ('$name', '$year', '$major', '$dept')";
    $result = mysqli_query($conn, $sql) or die ("error inserting requirements");



?>