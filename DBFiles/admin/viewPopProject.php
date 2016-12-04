<?php

	session_start();
	include_once("../authentication/db.php");



    $sql = "SELECT Project_name as Name, Count(*) as AppCount 
            FROM Apply GROUP BY Project_name ORDER BY AppCount DESC LIMIT 10";
    $result = mysqli_query($conn, $sql);
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
	    $out[] = $row;
	}

    echo json_encode($out);


?>
