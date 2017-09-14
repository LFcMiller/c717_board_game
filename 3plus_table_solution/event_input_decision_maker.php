<?php
//The ajax calls from the front end should point to this php script, but with a query string in the url to specify the action
//this script will then figure out what to do, and then do it.
    //Well, technically, it will ask one of its minion scripts within the event_data_api folder to do it, but you get the idea.

//(this script and its subsidiaries are inspired by the php_SGTserver prototype.)

if(empty($_GET['action']/* check if the get superglobal variable 'action' is empty*/)){
    exit('no action specified');
}

//require the mysql_connect.php file.  Make sure your properly configured it!
require_once('mysql_connect.php');