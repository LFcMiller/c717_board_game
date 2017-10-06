<?php

// check if the get superglobal variable 'action' is empty
if(empty($_GET['action'])){
    $output['errors'][] = 'no action specified';
    die(json_encode($output));
}

//connect to the database
require_once('database_connect_script.php');

$output = [
    'success'=> false, //we assume we will fail
    'errors'=>[]
];

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
        //retrieving past activity is included inside of send_public_profile_info.php itself
        break;

    case 'pastActivity':
        include_once('player_data_api/retrieve_past_activity.php');
        break;

    case 'sendDevFeedback':
        include_once('player_data_api/feedback_script.php');
        break;


    default:
        array_push($output['errors'],'No action specified. (Hint: make sure you specify the \'action\' in the query string of your ajax url.)');
}

print(json_encode($output));