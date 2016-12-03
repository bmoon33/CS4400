<?php

    session_start();
    include_once("db.php");

    $user = $_SESSION['username'];

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);
    $name = $myArray[0]["Name"];
    $dateVal = date('m/d/Y');

   
        
    $sql = "INSERT INTO Apply (Project_name, Student_name, `Date`, Status) 
            VALUES ('$name', '$user', '$dateVal', 'Pending')";
    $result = mysqli_query($conn, $sql);
    
    if (!$result) {
        print "Error";
        exit();
    }





?>