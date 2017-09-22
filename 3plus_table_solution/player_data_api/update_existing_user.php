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
//        print("I think the key is ".$key);
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

$result = null;
$result = mysqli_query($conn, $query);

if(empty($result)){
    $output['errors'][] = 'database error';
} else {
    if(mysqli_affected_rows($conn)){
        //TODO: build up $output['data'] with user's profile information
        $query2 = "SELECT `first_name`, `fav_genre`, `about_me` FROM `users` where `fb_ID` = '{$_POST['fb_ID']}'";
        $result2 = null;
        $result2 = mysqli_query($conn, $query2);

        if(empty($result2)){
            $output['errors'][] = 'problem retrieving updated data';
        } else {
            if(mysqli_num_rows($result2)){
                $output['data'] = [];
                $output['success'] = true;

                while($row = mysqli_fetch_assoc($result2)){
                    $output['data'][] = $row;
                }
            } else {
                $output['errors'][] = 'no data';
            }
        }

    } else {
        $output['errors'][] = 'update error';
    }

}