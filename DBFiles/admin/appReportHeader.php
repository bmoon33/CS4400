<?php

    session_start();
    include_once("../authentication/db.php");


    $sql = "SELECT COUNT( * ) AS AppCount, SUM( 
                    CASE WHEN STATUS =  'Accepted' THEN 1 
                    ELSE 0 END ) AS AcceptTotal
                    FROM Apply";
    $result = mysqli_query($conn, $sql);
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $out = $row;
    }

    echo json_encode($out);


?>
