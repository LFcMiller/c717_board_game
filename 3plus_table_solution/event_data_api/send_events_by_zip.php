<?php
$zip = $_POST['zip'];

if(empty($zip)){
    $output['errors'][] = 'You didn\'t give me a zip code to search by!';
    die();
}

$conn = mysqli_connect($servername, $username, $password, $dbname);

$query =
    "SELECT `event_ID`, `game_name`, `general_details`, `city`, `state`, `date`,`time` FROM `events` WHERE `zip` = '$zip'";

$result = null;

$result = mysqli_query($conn,$query);

if(empty($result)){
    $output['errors'][] = 'database error';
} else {
    if(mysqli_num_rows($result)){
        $output['data'] = [];
        $output['success'] = true;

        while($row = mysqli_fetch_assoc($result)){
            //TODO: use google maps api to add the cross-street to this data
            $output['data'][] = $row;
        }
    } else {
        $output['errors'][]='no data';
    }
}