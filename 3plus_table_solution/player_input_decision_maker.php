<?php
//if(empty($_GET['action']/* check if the get superglobal variable 'action' is empty*/)){
//    exit('no action specified');
//}

//require the mysql_connect.php file.  Make sure you properly configured it!
require_once('mysqlConnect.php');

$output = [
    'success'=> false, //we assume we will fail
    'errors'=>[]
];

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn){
    $output['errors'][] = 'problem connecting to database: '.mysqli_connect_error();
    die(print(json_encode($output)));
}

switch($_GET['action']){
    case 'relateOrCreateUser':
        include_once('player_data_api/check_user_fb.php');
        break;

    case 'addUser':
        include_once('player_data_api/create_new_user.php');
        break;

    case 'updateProfile':
        include_once('player_data_api/update_existing_user.php');
        break;

    case 'retrievePublicProfile':
        include_once('player_data_api/send_public_profile_info.php');
        //probably put in the pastActivity part right here
        //on second thought scratch that maybe put the pastActivity stuff inside of the retrieve past activity file itself
        break;

    case 'pastActivity':
        include_once('player_data_api/retrieve_past_activity.php');
        break;


    default:
        array_push($output['errors'],'No action specified. (Hint: make sure you specify the \'action\' in the query string of your ajax url.)');
}

print(json_encode($output));