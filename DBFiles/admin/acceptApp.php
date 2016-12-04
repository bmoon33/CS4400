<?php


    include_once("../authentication/db.php");


    //$user = $_SESSION['username'];

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);

    $username = $myArray[0]["Username"];
    $appname = $myArray[0]["Name"];

    echo 


    
    $sql = "UPDATE Apply SET Status = 'Accepted'
            WHERE Project_name = '$appname' AND Student_name = '$username'";

    $result = mysqli_query($conn, $sql) or die("Can't connect");


?>
