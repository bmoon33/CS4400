<?php

	session_start();
	include_once("db.php");


    //$user = $_SESSION['username'];
//how to put top 3 majors?
    $sql = "SELECT ProjectName, Count(*) as applicationcount, Sum(Case When Status = 'Accepted' Then 1 Else 0 End ) / Count(*) * 1.0 As AcceptPercent from Applications Group By ProjectName";
    $result = mysqli_query($conn, $sql);
   $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
	    $out[] = $row;
	}

    echo json_encode($out);


?>
