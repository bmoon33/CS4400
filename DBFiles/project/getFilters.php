<?php

    include_once("../authentication/db.php");




    $sql = "SELECT * FROM Designation";
    $result = mysqli_query($conn, $sql);
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $out["Designation"][] = $row;
    }

    $sql = "SELECT * FROM Category";
    $result = mysqli_query($conn, $sql);

    while ($row = mysqli_fetch_assoc($result)) {
        $out["Category"][] = $row;
    }

    $sql = "SELECT Name FROM Major";
    $result = mysqli_query($conn, $sql);

    while ($row = mysqli_fetch_assoc($result)) {
        $out["Major"][] = $row;
    }

    echo json_encode($out);



?>