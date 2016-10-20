<?php
	include_once("db.php");

	$sql = "SELECT * FROM Users";
	$result = mysqli_query($conn, $sql);
	$outp = "";
	if (mysqli_num_rows($result) > 0) {
		while ($row = mysqli_fetch_assoc($result)) {
			if ($outp != "") {$outp .= ",";}
			$outp .= '{"Name":"'  . $row["Name"] . '",';
		    $outp .= '"Major":"'   . $row["Major"]        . '",';
		    $outp .= '"Age":"'. $row["Age"]     . '"}'; 
		}
	}
	$outp ='{"users":['.$outp.']}';
	echo($outp);
?>
