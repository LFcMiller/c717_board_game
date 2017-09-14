<?php
$all_event_select_query = 'SELECT * FROM `events`';

$conn = mysqli_connect($servername, $username, $password, $dbname);

$result = null;

$result = mysqli_query($conn, $all_event_select_query);

//check if $result is empty

if (empty($result)) {
    //if it is, add 'database error to errors
    array_push($output['errors'], 'database error');
}else{

}