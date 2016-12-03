<?php

    session_start();
    include_once("db.php");

    $user = $_SESSION['username'];
    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);

    $projectName = $myArray[0]["Name"];

    $sql = "SELECT Status FROM Apply WHERE Project_name = '$projectName' AND Student_name = '$user'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) < 1) {
        print "noApp";
        return;
        exit();
    }



    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $out[] = $row;
    }

    $status = $out[0]["Status"];


    if ($status == 'Rejected') {
        print "reject";
        exit();
    } elseif ($status == 'Pending') {
        print "pending";
        exit();
    } else {
        print "accept";
        exit();
    }



?>