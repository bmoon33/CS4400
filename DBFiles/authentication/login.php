<?php

    session_start();
	include_once("db.php");

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);
    $user = $myArray[0]["user"];
    $password = $myArray[0]["password"];

    $sql = "SELECT * FROM User WHERE Username = '$user' AND Password = '$password'";
    $result = mysqli_query($conn, $sql);
    $count = mysqli_num_rows($result);

   if ($count > 0) {

        $out = mysqli_fetch_assoc($result);
        $_SESSION['username'] = $user;
        if ($out["UserType"] == "Admin") {
            $_SESSION['UserType'] = "Admin";
        } else {
            $_SESSION['UserType'] = "Student";
        }
        session_write_close();
        echo $out["UserType"];
        exit();
   }


?>