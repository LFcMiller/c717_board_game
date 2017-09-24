<?php

if(empty($_POST['fb_ID'])){
    $output['errors'][] = 'I need to know who to search for! (Hint: make sure the value is \'fb_ID\'';
    die();
}

$conn = mysqli_connect($servername, $username, $password, $dbname);

//thanks, Tim!
$query =
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

$result = null;

$result = mysqli_query($conn, $query);

print_r($result);
//TODO: how can I tell the difference between a database error and a player who hasn't played anything?

//TODO: keep working on this