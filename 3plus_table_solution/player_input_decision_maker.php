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
        array_push($output['errors'],'I don\'t even know what action you want the back end to do. (Hint: make sure you specify the \'action\' in the query string of your ajax url.)');
}

print(json_encode($output));