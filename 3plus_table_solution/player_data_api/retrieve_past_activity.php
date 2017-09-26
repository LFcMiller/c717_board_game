<?php

if(empty($_POST['fb_ID'])){
    $output['errors'][] = 'I need to know who to search for! (Hint: make sure the value is \'fb_ID\'';
    die();
}

$conn = mysqli_connect($servername, $username, $password, $dbname);

//thanks, Tim!
$past_activity_query =
    "
SELECT e.`game_name` AS game_name, COUNT(e.`event_ID`) AS frequency

	FROM `users` AS u
	JOIN `users_to_events` AS ue ON u.`user_ID`=ue.`player_ID`
	JOIN `events` AS e ON ue.`event_ID`=e.`event_ID`

	WHERE u.`fb_ID`={$_POST['fb_ID']}
	AND ue.`role` IN ('host','attendee')
	AND e.`date`<CURDATE()

	GROUP BY game_name
;
    ";

$past_activity_result = null;

$past_activity_result = mysqli_query($conn, $past_activity_query);

if(empty($past_activity_result)){
    $output['errors'][] = 'couldn\'t find past activity for this user';
    //TODO: how can I tell the difference between a database error and a player who hasn't played anything?
} else {
    //this is the not empty part, where things get done
    if(mysqli_num_rows($past_activity_result)){
        $output['data']['past_games'] = [];

        while($row = mysqli_fetch_assoc($past_activity_result)){
            $output['data']['past_games'][] = $row;
        }
    } else {
        $output['errors'][] = 'no past activity data';
    }

}
