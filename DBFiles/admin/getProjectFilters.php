<?php

    include_once("../authentication/db.php");
    mysqli_set_charset($conn, 'utf8');



    $sql = "SELECT DISTINCT Category_name AS Name FROM Project_is_Category ";
    $result = mysqli_query($conn, $sql);
    $out = array();
    


    while ($row = mysqli_fetch_assoc($result)) {
        $out["Category"][] = $row;
    }

    $sql = "SELECT DISTINCT Designation_name AS Name FROM Project ";
    $result = mysqli_query($conn, $sql);
    


    while ($row = mysqli_fetch_assoc($result)) {
        $out["Designation"][] = $row;
    }

    $sql = "SELECT DISTINCT Major_requirement AS Name FROM Project_requirement ";
    $result = mysqli_query($conn, $sql);
    


    while ($row = mysqli_fetch_assoc($result)) {
        $out["Major"][] = $row;
    }

    $sql = "SELECT DISTINCT Year_requirement AS Name FROM Project_requirement ";
    $result = mysqli_query($conn, $sql);
    


    while ($row = mysqli_fetch_assoc($result)) {
        $out["Year"][] = $row;
    }

    $sql = "SELECT DISTINCT Department_requirement AS Name FROM Project_requirement ";
    $result = mysqli_query($conn, $sql);
    


    while ($row = mysqli_fetch_assoc($result)) {
        $out["Department"][] = $row;
    }


    echo json_encode($out);

?>