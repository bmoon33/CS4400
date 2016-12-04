<?php

    include_once("db.php");
    mysqli_set_charset($conn, 'utf8');

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);
    $name = $myArray[0]["Name"];
    $type = $myArray[0]["Type"];

    if ($type == 'Course') {
        $sql = "SELECT * FROM Course WHERE Name = '$name'";
        $result = mysqli_query($conn, $sql) or die ("can't connect");
    } else {
        $sql = "SELECT * FROM Project WHERE Name = '$name'";
        $result = mysqli_query($conn, $sql) or die ("can't connect");
    }

    $out = array();


    // while ($row = mysqli_fetch_assoc($result)) {
        $out[] = mysqli_fetch_assoc($result);
    // }


    echo json_encode($out);
    // echo js$out["Name"];

?>