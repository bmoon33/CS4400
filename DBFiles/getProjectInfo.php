<?php

    include_once("db.php");

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);
    $name = $myArray[0]["name"];


    $sql = "SELECT * FROM Project WHERE Name = '$name'";
    $result = mysqli_query($conn, $sql);

    while ($row = mysqli_fetch_assoc($result)) {
        $out[] = $row;
    }

    echo json_encode($out);
    //echo $myArray;

?>