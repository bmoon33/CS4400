<?php

    include_once("../authentication/db.php");
    mysqli_set_charset($conn, 'utf8');

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);

    $name = $myArray[0]["name"];
    $number = $myArray[0]["number"];
    $instructor = $myArray[0]["instructor"];
    $studentCount = $myArray[0]["studentcount"];
    $designation = $myArray[0]["designation"]["Name"];




    $sql = "SELECT * FROM Course WHERE Name = '$name'";
    $result = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($result);

    if ($count > 0) {
        print "Course exists";
        exit();
    }

    $sql = "SELECT * FROM Course WHERE CourseNumber = '$number'";
    $result = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($result);

    if ($count > 0) {
        print "Course exists";
        exit();
    }



    $sql = "INSERT INTO Course (Course_number, Name, Instructor, Designation_name, Est_Num_Students) 
            VALUES ('$number', '$name', '$instructor', '$designation', '$studentCount')";
    $result = mysqli_query($conn, $sql) or die ("error");

    foreach($myArray[0]["category"] as $key => $value) {
            $cat = $value["Name"];
            $sql = "INSERT INTO Course_is_Category (Course_name, Category_name)
                    VALUES('$name', '$cat')";
            $result = mysqli_query($conn, $sql) or die ("error");
    }



?>