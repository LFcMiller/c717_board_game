<?php
if(empty($_POST['fb_ID'])){
    $output['errors'][] = 'missing fb_ID';
    die();
}

$keys_we_are_looking_for = ['first_name', 'fav_genre', 'about_me'];

$things_to_update = [];

foreach($keys_we_are_looking_for as $key){
    if(array_key_exists($key, $_POST)){
        $things_to_update[$key] = $_POST[$key];
        print("I think the key is ".$key);
    }
}

if(empty($things_to_update)){
    $output['errors'][] = 'nothing to update';
    die();
}

$query = "UPDATE `users` SET";

foreach($things_to_update as $key => $value){
    $queryArr[] = " `{$key}` = '{$value}'";
}
$query.= implode(',' , $queryArr)." WHERE `fb_ID` = '{$_POST['fb_ID']}';";

print($query);