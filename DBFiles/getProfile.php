<?php

    session_start();
	include_once("db.php");


    $user = $_SESSION['username'];

    $sql = "SELECT Major, Year FROM User WHERE Username = '$user'";
    $result = mysqli_query($conn, $sql);
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
	    $out[] = $row;
	}

	$major = $out[0]["Major"];

	$sql = "SELECT Dept_name FROM Major WHERE Name = '$major'";
	$result = mysqli_query($conn, $sql);
	while ($row = mysqli_fetch_assoc($result)) {
	    $out[0]["Dept_name"] = $row["Dept_name"];
	}

    echo json_encode($out);


?>