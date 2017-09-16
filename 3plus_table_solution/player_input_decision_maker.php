<?php
if(empty($_GET['action']/* check if the get superglobal variable 'action' is empty*/)){
    exit('no action specified');
}

//require the mysql_connect.php file.  Make sure you properly configured it!
require_once('mysqlConnect.php');

$conn = mysqli_connect($servername, $username, $password, $dbname);

$output = [
    'success'=> false, //we assume we will fail
    'errors'=>[]
];

switch($_GET['action']){
    case 'addUser':
        include_once('player_data_api/create_new_user.php');
        break;


    default:
        array_push($output['errors'],'I don\'t even know what action you want the back end to do. (Hint: make sure you specify the \'action\' in the query string of your ajax url.)');
}

print(json_encode($output));