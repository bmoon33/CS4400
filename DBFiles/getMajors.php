<?php

	include_once("db.php");



    $sql = "SELECT * FROM Major";
    $result = mysqli_query($conn, $sql);
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
	    $out[] = $row;
	}

    echo json_encode($out);


?>