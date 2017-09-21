<?php
$keys_we_are_looking_for = /*don't forget facebook ID!*/ ['game_name','general_details', 'numPlayers', 'street_address', 'city', 'state','zip','date','time', 'lat', 'lon'];

$post_data = [];

//this will look though the post data for each of the keys we are looking for.
foreach($keys_we_are_looking_for as $key) {
    if(array_key_exists($key, $_POST)){
        $post_data[$key] = $_POST[$key];
    } //TODO: Here is where I can make error statements about missing data from the front end.
}
//TODO: I also have to map the user who created the event to the created event as a host. To do that, I am planning on requiring the client to send their facebook id along with their event details.
//TODO: Then use the facebook ID to get our user ID
//print_r($post_data);

$output['data'] = [];

//$output['data'][] = 'I see that you tried to add a game of '.$post_data['gameName'];

$new_event_query = "INSERT INTO `events` SET `game_name` = '{$post_data['game_name']}', `general_details` = '{$post_data['general_details']}', `street_address` = '{$post_data['street_address']}', `city` = '{$post_data['city']}',`state`='{$post_data['state']}',`zip`='{$post_data['zip']}',`lat`='{$post_data['lat']}',`lon`='{$post_data['lon']}',`date`='{$post_data['date']}',`time`='{$post_data['time']}'";
//print($new_event_query);

$result = null;
$result = mysqli_query($conn, $new_event_query);

if(empty($result)){
    $output['errors'][] = 'database error';
} else {
    //make sure 1 row was affected
    if(mysqli_affected_rows($conn)){
        $output['success'] = true;

        $output['event_ID'] = mysqli_insert_id($conn);
    } else{
        $output['errors'] = 'trouble inserting the event';
    }
}

