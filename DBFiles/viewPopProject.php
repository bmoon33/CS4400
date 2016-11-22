<?php

	session_start();
	include_once("db.php");


    //$user = $_SESSION['username'];

    $sql = "SELECT ProjectName, Count(*) as applicationcount from Applications Group By ProjectName Order By applicationcount Desc Limit 10";
    $result = mysqli_query($conn, $sql);
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
	    $out[] = $row;
	}

    echo json_encode($out);


?>
