<?php


    include_once("../authentication/db.php");


    //$user = $_SESSION['username'];

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);

    $username = $myArray[0]["username"];
    $appname = $myArray[0]["appname"];



    $sql = "SELECT Apply.Project_name AS Name, Apply.Status, User.Year, User.Major, User.Username
            FROM Apply JOIN User ON Apply.Student_name = User.Username
            WHERE Apply.Project_name = '$appname' AND User.Username = '$username'";

    $result = mysqli_query($conn, $sql) or die("Can't connect");
    $out = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $out[] = $row;
    }

    echo json_encode($out);


?>
