<?php
$all_event_select_query = 'SELECT * FROM `events`';

$conn = mysqli_connect($servername, $username, $password, $dbname);

$result = null;

$result = mysqli_query($conn, $all_event_select_query);

//check if $result is empty

if (empty($result)) {
    //if it is, add 'database error to errors
//    array_push($output['errors'], 'database error');
    $output['errors'][] = 'database error';
}else{
    //check if any data came back
    if(mysqli_num_rows($result)) {
        //get the data key ready to be filled up with data
        $output['data'] = [];
        //success can be true now
        $output['success'] = true;
        //while loop to collect all the data
        while ($row = mysqli_fetch_assoc($result)) {
            //add each row of data to the $output['data'] array
            array_push($output['data'], $row);
        }
    } else {
        //if not, put an error in the errors array (even though success is true)
        array_push($output['errors'],'no data');
    }

}