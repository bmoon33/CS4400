<?php

    include_once("db.php");

    $sql = "SELECT Name, 'Project' as Type FROM Project";
    $result = mysqli_query($conn, $sql);
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $out[] = $row;
    }


    $sql = "SELECT Name, 'Course' as Type FROM Course";
    $result = mysqli_query($conn, $sql);

    while ($row = mysqli_fetch_assoc($result)) {
        $out[] = $row;
    }


    echo json_encode($out);



?>