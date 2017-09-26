<?php
if(empty($_POST['fb_ID'])){
    $output['errors'][] = 'Missing fb_ID';
    die();
}

$conn = mysqli_connect($servername, $username, $password, $dbname);

$query = "SELECT `first_name`, `fav_genre`, `about_me` FROM `users` WHERE `fb_ID` = '{$_POST['fb_ID']}'";

$result = null;

$result = mysqli_query($conn, $query);

if(empty($result)){
    $output['errors'][] = 'database error. It is possible that the user does not have a fb_ID on our records yet.';
} else {
    if(mysqli_affected_rows($conn)){
        //TODO: maybe check if there is more than one matching player (because that would be bad)
        $output['data'] = [];
        $output['success'] = true;

        //is it bad to use a while loop here? (because there should only be 1 row)
        //I'm just gonna see if I can get by without using a loop at all
        $row = mysqli_fetch_assoc($result);
        $output['data'][] = $row;
    } else {
        $output['errors'][] = 'no data';
    }
}