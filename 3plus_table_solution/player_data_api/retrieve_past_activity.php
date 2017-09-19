<?php

if(empty($_POST['user_ID'])){
    $output['errors'][] = 'I need to know who to search for! (Hint: make sure the value is \'user_ID\'';
    die();
}

$conn = mysqli_connect($servername, $username, $password, $dbname);

$query = "SELECT `game_name` FROM ";//not done!