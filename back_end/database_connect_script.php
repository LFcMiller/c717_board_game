<?php

require_once('mysqlConnect.php');

$conn = mysqli_connect($servername, $username, $password, $dbname);

//if connection to the database is falsy, output the error and stop immediately!
if (!$conn){
    $output['errors'][] = 'problem connecting to database: '.mysqli_connect_error();
    die(json_encode($output));
}