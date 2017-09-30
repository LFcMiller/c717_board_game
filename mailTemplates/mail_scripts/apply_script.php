<?php

$output['debugging_messages'][]='started apply_script';

if(empty($_POST['user_ID']) || empty($_POST['event_ID'])){
	$output['errors'][] = 'Missing input';
	if(empty($_POST['user_ID']))
		$output['errors'][] = 'user ID';
	if(empty($_POST['event_ID']))
		$output['errors'][] = 'event ID';
	return;
}

$get_new_applicants_email_query = "SELECT `first_name`, `email` FROM `users` WHERE `user_ID` = {$_POST['user_ID']}";
$email_result = null;
$email_result = mysqli_query($conn, $get_new_applicants_email_query);

if($email_result && mysqli_num_rows($email_result)){
	$email_result_assoc = mysqli_fetch_assoc($email_result);
    $applicant_email = $email_result_assoc['email'];
    $applicant_name = $email_result_assoc['first_name'];
    $output['debugging_messages'][]='found the applicant\'s email! it is '.$applicant_email;
    $output['debugging_messages'][]='found the applicant\'s first name! it is '.$applicant_name;
} else{
    $output['errors'][]='database error: '.mysqli_error($conn);
    return;
}

$query = "SELECT `role`, `first_name`, `email` FROM users_to_events AS u2e
   JOIN users AS u 
   ON u.user_ID = u2e.player_ID
   JOIN events AS e
   ON e.event_ID = u2e.event_ID
 WHERE u2e.event_ID = {$_POST['event_ID']}";

//$query = "SELECT `*` FROM `users` JOIN ('users','users_to_events') ON `users.user_ID` = `users_to_events.user_ID` WHERE `user_ID` = $_POST['user_ID']

$result = mysqli_query($conn, $query);

$applicants = [];
$host = null;


if($result){
    $output['debugging_messages'][]='result was truthy!';
	if(mysqli_num_rows($result)){
//        $output['debugging_messages']['non-hosts_I_found'] = 0;
		while($row = mysqli_fetch_assoc($result)){
			if($row['role']==='host'){
				$host = $row;
				$host_name = $host['first_name'];
				$host_email = $host['email'];
                $output['debugging_messages'][]='found the host! his name is '.$host_name;
                $output['debugging_messages'][]='found the host! his email is '.$host_email;
                //TODO: revisit this success
                $output['success'] = true;
			} else if($row['role']==='applicant'){
//                $output['debugging_messages'][]='found someone who isnt the host';
//                $output['debugging_messages']['non-hosts_I_found']+=1;
//				$applicants[] = $row;
//				$applicant_name = $row['first_name'];
//				$applicant_email = $row['email'];
			}
		}
	}
}