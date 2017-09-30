<?php

if(empty($_POST['user_ID']) || empty($_POST['event_ID'])){
	$output['errors'][] = 'Missing input';
	if(empty($_POST['user_ID']))
		$output['errors'][] = 'user ID';
	if(empty($_POST['event_ID']))
		$output['errors'][] = 'event ID';
	return;
}

// $first_name = $_POST['first_name'];
// $email = $_POST['email'];
// $fb_ID = $_POST['fb_ID'];

$query = "SELECT `role`, `first_name`, `email` FROM users_to_events AS u2e
   JOIN users AS u 
   ON u.user_ID = u2e.player_ID
   JOIN events AS e
   ON e.event_ID = u2e.event_ID
 WHERE u2e.event_ID = 1";

//$query = "SELECT `*` FROM `users` JOIN ('users','users_to_events') ON `users.user_ID` = `users_to_events.user_ID` WHERE `user_ID` = $_POST['user_ID']

$result = mysqli_query($conn, $query);

$applicants = [];
$host = null;

if($result){
	if(mysqli_num_rows($result)){
		while($row = mysqli_fetch_assoc($result)){
			if($row['role']==='host'){
				$host = $row;
				$host_name = $host['first_name'];
				$host_email = $host['email'];
			} else if($row['role']==='applicant'){
				$applicants[] = $row;
				$applicant_name = $row['first_name'];
				$applicant_email = $row['email'];
			}
		}
	}
}
json_encode($result);
?>
