<?php

    function checkRequirements ($conn, $user, $name) {
        $sql = "SELECT Major_requirement AS Major, Year_requirement AS Year, Department_requirement as Dept
                FROM Project NATURAL JOIN Project_requirement
                WHERE Name = '$name'";
        $result = mysqli_query($conn, $sql);
        $out = mysqli_fetch_assoc($result);

        $majorReq = $out["Major"];
        $yearReq = $out["Year"];
        $deptReq = $out["Dept"];

        $sql = "SELECT * FROM User WHERE Username = '$user'";
        $result = mysqli_query($conn, $sql) or die ("Can't connect");
        $out = mysqli_fetch_assoc($result);


        $userMajor = $out["Major"];
        $userYear = $out["Year"];

        $sql = "SELECT Dept_name FROM Major WHERE Name = '$userMajor'";
        $result = mysqli_query($conn, $sql);
        $out = mysqli_fetch_assoc($result);

        $userDept = $out["Dept_name"];

        $substr = ' students only';

        $yearBool = false;
        $majorBool = false;
        $deptBool = false;

        $pos = stripos($yearReq, $substr);
        if ($pos === false) {
            $yearBool = true;
        } else {
            $yearBool = trim($userYear) == trim(substr($yearReq, 0, $pos));
        }

        $pos = stripos($majorReq, $substr);
        if ($pos === false) {
            $majorBool = true;
        } else {
            $majorBool = trim($userMajor) == trim(substr($majorReq, 0, $pos));
        }

        $pos = stripos($deptReq, $substr);
        if ($pos === false) {
            $deptBool = true;
        } else {
            $deptBool = trim($userDept) == trim(substr($deptReq, 0, $pos));
        }

        return ($deptBool || $majorBool) && $yearBool;
    }

    session_start();
    include_once("../authentication/db.php");

    $user = $_SESSION['username'];

    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);
    $name = $myArray[0]["Name"];
    $dateVal = date('m/d/Y');

    if (checkRequirements($conn, $user, $name)) {
        $sql = "INSERT INTO Apply (Project_name, Student_name, `Date`, Status) 
                VALUES ('$name', '$user', '$dateVal', 'Pending')";
        $result = mysqli_query($conn, $sql);
    
        if (!$result) {
            print "Error";
            exit();
        }
    } else {
        print "Requirements error";
        exit();
    }





?>