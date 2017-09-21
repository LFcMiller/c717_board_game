<?php
$zip = $_POST['zip'];

if(empty($zip)){
    $output['errors'][] = 'You didn\'t give me a zip code to search by!';
    die();
}

$conn = mysqli_connect($servername, $username, $password, $dbname);

$query =
    "SELECT `event_ID`, `game_name`, `general_details`, `lat`, `lon`, `date`,`time` FROM `events` WHERE `zip` = '$zip' AND `date` >= CURDATE()";

$result = null;

$result = mysqli_query($conn, $query);

if(empty($result)){
    $output['errors'][] = 'database error';
} else {
    if(mysqli_num_rows($result)){
        $output['data'] = [];
        $output['success'] = true;

        while($row = mysqli_fetch_assoc($result)){
            //chop off those pesky seconds while you're at it
            $row['time'] = substr($row['time'], 0, -3);
            $output['data'][] = $row;
        }
    } else {
        $output['errors'][]='no data';
    }
}