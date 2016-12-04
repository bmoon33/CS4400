<?php


    include_once("../authentication/db.php");



    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);

    $username = $myArray[0]["Username"];
    $appname = $myArray[0]["Name"];


    
    $sql = "UPDATE Apply SET Status = 'Rejected'
            WHERE Project_name = '$appname' AND Student_name = '$username'";

    $result = mysqli_query($conn, $sql) or die("Can't connect");


?>
