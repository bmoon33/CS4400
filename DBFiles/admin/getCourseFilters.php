<?php

    include_once("../authentication/db.php");
    mysqli_set_charset($conn, 'utf8');



    $sql = "SELECT DISTINCT Category_name AS Name FROM Course_is_Category ";
    $result = mysqli_query($conn, $sql);
    $out = array();
    


    while ($row = mysqli_fetch_assoc($result)) {
        $out["Category"][] = $row;
    }

    $sql = "SELECT DISTINCT Designation_name AS Name FROM Course ";
    $result = mysqli_query($conn, $sql);
    


    while ($row = mysqli_fetch_assoc($result)) {
        $out["Designation"][] = $row;
    }



    echo json_encode($out);

?>