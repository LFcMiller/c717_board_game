<?php
//the whole 'first_name' thing is very misleading on this branch. I know.
//$first_name = $_POST['first_name'];
//$email = $_POST['email'];
//$fb_ID = $_POST['fb_ID'];

//check if we have all the data we need from the client-side
if (empty($_POST['first_name']) || empty($_POST['email']) || empty($_POST['fb_ID'])){
    //TODO: make this a little bit cleaner
    $output['errors'][] = 'Missing input:';
    if (empty($first_name))
        $output['errors'][] = 'first name';
    if (empty($email))
        $output['errors'][] = 'email';
    if (empty($fb_ID))
        $output['errors'][] = 'facebook ID';
    return;
    $output['errors'][] = 'But it\'s ok I\'ll try to add your entry to the database anyway....for now';
}

$new_person_query = "INSERT INTO `users` SET `first_name` = '$first_name', `email`='$email', `fb_ID`='$fb_ID'";
//print($new_person_query);
$result = mysqli_query($conn, $new_person_query);

//first check if $result is empty
if(empty($result)){
    //tell the front end
    $output['errors'][] = 'database error';
} else {
    //make sure 1 row was affected
    if (mysqli_affected_rows($conn)){
        $output['success'] = true;
        $output['data']['user_ID'] = mysqli_insert_id($conn);
    }
    else{
        $output['errors'] = 'I tried inserting a new user but something went wrong';
    }
}