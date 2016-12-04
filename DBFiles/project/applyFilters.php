<?php

    include_once("../authentication/db.php");

    function getProjects($title, $Dname, $categories, $major, $year, $conn, &$out) {

        $first = True;


        $sql = "SELECT DISTINCT Project_name as Name, 'Project' as Type FROM Project_is_Category AS PIC 
                JOIN Project AS P ON P.Name = PIC.Project_name 
                JOIN Project_requirement As PR ON PR.Name = P.Name ";


        if ($Dname) {
            if ($first) {
                $first = False;
                $sql .= "WHERE Designation_name = '$Dname' ";
            } else {
                $sql .= "AND Designation_name = '$Dname' ";
            }
        }

        if ($title) {
            $title .= "%";
            if ($first) {
                $first = False;
                $sql .= "WHERE Project_name LIKE '$title' ";
            } else {
                $sql .= "AND Project_name LIKE '$title' ";
            }
        }

        if ($categories) {
            if ($first) {
                $first = False;
                $sql .= "WHERE Category_name IN ('$categories') ";
            } else {
                $sql .= "AND Category_name IN ('$categories') ";
            }
        }

        if ($major) {
            if ($first) {
                $first = False;
                $sql .= "WHERE Major_requirement IN ($major) ";
            } else {
                $sql .= "AND Major_requirement IN ($major) ";
            }
        }

        if ($year) {
            if ($first) {
                $first = False;
                $sql .= "WHERE Year_requirement IN ($year) ";
            } else {
                $sql .= "AND Year_requirement IN ($year) ";
            }
        }
        
        $result = mysqli_query($conn, $sql);


        while ($row = mysqli_fetch_assoc($result)) {
            $out[] = $row;
        }


    }

    function getCourses($title, $Dname, $categories, $major, $year, $conn, &$out) {

        $first = True;

        if ($major || $year) {
            return;
        }

        $sql = "SELECT DISTINCT Course_name as Name, 'Course' as Type FROM Course_is_Category AS CIC 
                JOIN Course AS C ON C.Name = CIC.Course_name ";

        if ($title) {
            $title .= "%";
            if ($first) {
                $first = False;
                $sql .= "WHERE Course_name LIKE '$title' ";
            } else {
                $sql .= "AND Course_name LIKE '$title' ";
            }
        }

        if ($Dname) {
            if ($first) {
                $first = False;
                $sql .= "WHERE Designation_name = '$Dname' ";
            } else {
                $sql .= "AND Designation_name = '$Dname' ";
            }
        }

        if ($categories) {
            if ($first) {
                $first = False;
                $sql .= "WHERE Category_name IN ('$categories') ";
            } else {
                $sql .= "AND Category_name IN ('$categories') ";
            }
        }

        $result = mysqli_query($conn, $sql);


        while ($row = mysqli_fetch_assoc($result)) {
            $out[] = $row;
        }

    }


    $jsonText = file_get_contents('php://input');
    $decodedText = html_entity_decode($jsonText);
    $myArray = json_decode('[' . $decodedText . ']', true);
    $categories = array();
    $title = $myArray[0]["title"];
    $Dname = $myArray[0]["designation"]["Name"];
    $filterType = $myArray[0]["filterType"];
    $major = $myArray[0]["major"]["Name"];
    $year = $myArray[0]["year"];


    foreach($myArray[0]["category"] as $key => $value) {
            array_push($categories, $value["Name"]);
    }

    $categories = implode("','",$categories);

    if ($major) {
        $major = "'" . $major ." students only', 'no major requirement for this project'";
    } 
    if ($year) {
        $year = "'" . $year ." students only', 'no year requirement for this project'";;
    }

    $out = array();





    if ($filterType == "Both") {

        getProjects($title, $Dname, $categories, $major, $year, $conn, $out);
        getCourses($title, $Dname, $categories, $major, $year, $conn, $out);
    } elseif($filterType == "Project") {
        getProjects($title, $Dname, $categories, $major, $year, $conn, $out);
    } else {
        getCourses($title, $Dname, $categories, $major, $year, $conn, $out);
    }

    echo json_encode($out);

?>