<?php
//require_once '../php_mailer.php';

$output['debugging_messages'][]='started feedback_script';

if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message'])){
    $output['errors'][] = 'Missing input';
    if(empty($_POST['name']))
        $output['errors'][] = 'name';
    if(empty($_POST['email']))
        $output['errors'][] = 'email';
    if(empty($_POST['message']))
        $output['errors'][] = 'message';
    return;
}

$name = ($_POST['name']);
$email = $_POST['email'];
$message = $_POST['message'];

$output['debugging_messages'][]='variables needed for the feedback email should be set now.';

//print(getcwd());
require_once 'php_mailer.php';

