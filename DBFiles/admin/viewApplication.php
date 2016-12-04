<?php

    session_start();
    include_once("../authentication/db.php");


    //$user = $_SESSION['username'];

    $sql = "SELECT Apply.Project_name AS Name, Apply.Status, User.Year, User.Major, User.Username
            FROM Apply JOIN User ON Apply.Student_name = User.Username";

    $result = mysqli_query($conn, $sql) or die("Can't connect");
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $out[] = $row;
    }

    echo json_encode($out);


?>
