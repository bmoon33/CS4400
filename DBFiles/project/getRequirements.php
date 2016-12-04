<?php

    include_once("../authentication/db.php");
    mysqli_set_charset($conn, 'utf8');

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);
    $name = $myArray[0]["Name"];


   
        
    $sql = "SELECT * FROM Project_requirement WHERE Name = '$name'";
    $result = mysqli_query($conn, $sql);
    


    while ($row = mysqli_fetch_assoc($result)) {
        $out[] = $row;
    }


    echo json_encode($out);

?>