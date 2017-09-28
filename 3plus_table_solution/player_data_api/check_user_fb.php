<?php
if(empty($_POST['fb_ID'])){
    $output['errors'][] = 'missing fb_ID';
    return;
}

$conn = mysqli_connect($servername, $username, $password, $dbname);

if(mysqli_connect_errno()){
    $output['errors'][] = "problem connecting to database: ".mysqli_connect_errno();
    return;
}

$check_on_user_query = "SELECT `user_ID` FROM `users` WHERE `fb_ID` = {$_POST['fb_ID']}";

$result = null;
$user_ID = null;

$result = mysqli_query($conn, $check_on_user_query);

if(empty($result)){
    $output['errors'][]='database error';
} else {
    if(mysqli_num_rows($result)){
        //this is the part where we simply return the id of the existing user
        $user_ID = mysqli_fetch_assoc($result)['user_ID'];
        $output['success'] = true;
        $output['data']['user_ID'] = $user_ID;

    } else {
        //this is the part where we make a new row for this user
        require_once('create_new_user.php');
    }
}