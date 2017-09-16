<?php
$keys_we_are_looking_for = ['gameName', 'numPlayers', 'address', 'city', 'state','zip','date','time'];

$post_data = [];

//this will look though the post data for each of the keys we are looking for.
foreach($keys_we_are_looking_for as $key) {
    if(array_key_exists($key, $_POST)){
        $post_data[$key] = $_POST[$key];
    }
}

$output['data'] = [];
$output['success'] = true;

$output['data'][] = 'I see that you tried to add a game of '.$post_data['gameName'];