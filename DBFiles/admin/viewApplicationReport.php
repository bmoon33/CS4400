<?php

    session_start();
    include_once("../authentication/db.php");


    $sql = "SELECT Project_name as Name, AppCount, AcceptPercent, GROUP_CONCAT(name SEPARATOR '/') AS Major
            FROM (

                SELECT Project_name, COUNT( * ) AS AppCount, SUM( 
                    CASE WHEN STATUS =  'Accepted' THEN 1 
                    ELSE 0 END ) / COUNT( * ) * 1.0 AS AcceptPercent
                    FROM Apply
                    GROUP BY Project_name
                ) AS y
            
                JOIN (

                SELECT * 
                    FROM (

                        SELECT g1.tid, g1.name, g1.value, COUNT( * ) AS rank
                            FROM View1 AS g1
                            JOIN View1 AS g2 ON ( g2.value, g2.name ) >= ( g1.value, g1.name ) 
                            AND g1.tid = g2.tid
                            GROUP BY g1.name, g1.tid, g1.value
                            ORDER BY g1.tid, rank
                        ) AS t
                WHERE rank <=3
            ) AS x ON x.tid = y.Project_name
            GROUP BY Project_name
            ORDER BY Name, rank DESC";
    $result = mysqli_query($conn, $sql);
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $out[] = $row;
    }

    echo json_encode($out);


?>
