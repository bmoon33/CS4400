<?php

    session_start();
    include_once("db.php");

    $user = $_SESSION['username'];

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);
    $categories = array();
    $title = $myArray[0]["title"];
    $Dname = $myArray[0]["designation"]["Name"];
    // echo $categories;
    $first = True;

    $sql = "SELECT DISTINCT Project_name as Name, 'Project' as Type FROM Project_is_Category AS PIC 
            JOIN Project AS P ON P.Name = PIC.Project_name 
            WHERE ";

    if ($Dname) {
        if ($first) {
            $first = False;
            $sql .= "Designation_name = '$Dname' ";
        } else {
            $sql .= "AND Designation_name = '$Dname' ";
        }
    }

    if ($title) {
        $title .= "%";
        if ($first) {
            $first = False;
            $sql .= "Name LIKE '$title' ";
        } else {
            $sql .= "AND Name LIKE '$title' ";
        }
    }

    foreach($myArray[0]["category"] as $key => $value) {
        array_push($categories, $value["Name"]);
    }

    $match = implode("','",$categories);

    if ($match) {
        if ($first) {
            $first = False;
            $sql .= "Category_name IN ('$match') ";
        } else {
            $sql .= "AND Category_name IN ('$match') ";
        }
    }
    
    $result = mysqli_query($conn, $sql);

    
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $out[] = $row;
    }

    echo json_encode($out);
    // echo $sql;


?>