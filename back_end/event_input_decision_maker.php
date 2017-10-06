<?php
//The ajax calls from the front end should point to this php script, but with a query string in the url to specify the action
//this script will then figure out what to do, and then do it.
    //Well, technically, it will ask one of its minion scripts within the event_data_api folder to do it, but you get the idea.

//(this script and its subsidiaries are inspired by the php_SGTserver prototype.)

if(empty($_GET['action']/* check if the get superglobal variable 'action' is empty*/)){
    $output['errors'][] = 'no action specified';
    die(json_encode($output));
}

require_once('database_connect_script.php');

$output = [
    'success'=> false, //we assume we will fail
    'errors'=>[]
];

//check the GET superglobal so you know what the front end is asking you to do

switch($_GET['action']){
    case 'readByZip':
        include_once('event_data_api/send_events_by_zip.php');
        break;
    case 'newEvent':
        include_once('event_data_api/create_new_event.php');
        break;
    case 'applyToEvent':
        include_once('event_data_api/apply_script.php');
        break;

    //this action can be useful for debugging, but should not be callable for security purposes.
//    case 'readAll':
//        include_once('event_data_api/send_all_events.php');
//        break;

    default:
        array_push($output['errors'],'I don\'t even know what action you want the back end to do. (Hint: make sure you specify the \'action\' in the query string of your ajax url.)');
}

print(json_encode($output));