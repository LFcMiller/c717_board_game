<?php
if(empty($_POST['user_ID'])){
    $output['errors'][] = 'No user given. (Hint: expected key \'user_ID\'';
    return;
}

$keys_we_are_looking_for = /*don't forget facebook ID!*/ ['game_name','general_details', /*'numPlayers',*/ 'street_address', 'city', 'state','zip','date','time', 'lat', 'lng'];

$post_event_data_unesc = [];

//this will look though the post data for each of the keys we are looking for.
foreach($keys_we_are_looking_for as $key) {
    if(array_key_exists($key, $_POST)){
        $post_event_data_unesc[$key] = $_POST[$key];
    }
    //Here is where I can make error statements about missing data from the front end.
    else
    {
        $output['errors']['missing key'][] = "$key";
    }
}

if(isset($output['errors']['missing key'])){
    //using return instead of die/exit will allow the script that included this script to continue.
    return;
}

//first, query the users table to make sure the person creating the event is legit

$user_table_query = "SELECT `user_ID` FROM `users` WHERE `user_ID` = '{$_POST['user_ID']}'";

$user_table_result = null;

$user_table_result = mysqli_query($conn, $user_table_query);

if(!mysqli_affected_rows($conn)){
    $output['errors'][] = 'user not found';
    return;
}

//just getting the user_ID from the associative array from the database (old code - used for when I was looking up the user based on fb_ID. It could come in handy in the future)
//$user_ID = mysqli_fetch_assoc($user_table_result)['fb_ID'];

//print_r($post_data);

//$output['data'][] = 'I see that you tried to add a game of '.$post_data['gameName'];

//second, create and store the event

//take the human readable time from the front end and make it the way mySQL wants it
$post_event_data_unesc['time'] = date('H:i:s', strtotime($post_event_data_unesc['time']));

$new_event_query = "INSERT INTO `events` SET
                    `game_name` = '".addslashes($post_event_data_unesc['game_name'])."',
                    `general_details` = '".addslashes($post_event_data_unesc['general_details'])."',
                    `street_address` = '".addslashes($post_event_data_unesc['street_address'])."',
                    `city` = '".addslashes($post_event_data_unesc['city'])."',
                    `state`='".addslashes($post_event_data_unesc['state'])."',
                    `zip`='".addslashes($post_event_data_unesc['zip'])."',
                    `lat`='".addslashes($post_event_data_unesc['lat'])."',
                    `lng`='".addslashes($post_event_data_unesc['lng'])."',
                    `date`='".addslashes($post_event_data_unesc['date'])."',
                    `time`='".addslashes($post_event_data_unesc['time'])."'
                    ;";
//print($new_event_query);

$result = null;
$result = mysqli_query($conn, $new_event_query);

if(empty($result)){
    $output['errors'][] = 'database error: '.mysqli_error($conn);
    return;
} else {
    //make sure 1 row was affected
    if(mysqli_affected_rows($conn)){
        //not true just yet, still more work to be done!
//        $output['success'] = true;

        $new_event_ID = mysqli_insert_id($conn);
        $output['data']['event_ID'] = $new_event_ID;
    } else{
        $output['errors'] = 'trouble inserting the event';
        return;
    }
}

//third and finally, map the user to the event
$mapping_query = "INSERT INTO `users_to_events` SET `event_ID` = {$new_event_ID}, `player_ID` = {$_POST['user_ID']}, `role` = 'host'";

$mapping_result = null;

$mapping_result = mysqli_query($conn, $mapping_query);

if(empty($result)){
    $output['errors'][] = 'database error mapping user to event';
} else {
    if(mysqli_affected_rows($conn)){
        //finally, we've done everything we need to do
        $output['success'] = true;
    } else {
        $output['errors'] = 'trouble mapping user to event';
    }
}