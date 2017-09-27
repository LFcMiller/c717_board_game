<?php
if(empty($_POST['zip'])){
    $output['errors'][] = 'missing zip code';
    return;
}

$conn = mysqli_connect($servername, $username, $password, $dbname);

$query =
    "SELECT `event_ID`, `game_name`, `general_details`, `lat`, `lng`, `date`,`time` FROM `events` WHERE `zip` = '{$_POST['zip']}' AND `date` >= CURDATE()";
//TODO: also check if the game is full based on number of attendees

$result = null;

$result = mysqli_query($conn, $query);

if(empty($result)){
    $output['errors'][] = 'database error';
} else {
    if(mysqli_num_rows($result)){
        $output['data'] = [];
        $output['success'] = true;

        while($row = mysqli_fetch_assoc($result)){
            //g is for 12 hour format without leading zeroes. i is for minutes. A is for an uppercase AM or PM
            $row['time'] = date('g:i A', strtotime($row['time']));
            $output['data'][] = $row;
        }
    } else {
        $output['errors'][]='no data';
    }
}