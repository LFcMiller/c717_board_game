<?php
//This file should create a new database called bgb_db.
//it should then give it 3 tables that are empty, but with all the columns it needs.

require_once('mysqlConnect.php');

//make a connection

$conn = mysqli_connect($servername, $username, $password);

if(!$conn){
    die("Connection failed: " . mysqli_connect_error());
}

//delete the old database, if it's there

    //checking if the database is already there may not be working quite right.

//on second thought, this code is dangerous, so I commented it out
//$database_delete_query = "DROP DATABASE IF EXISTS `bgb_db`";
//
//if(mysqli_query($conn, $database_delete_query)) {
//    echo "out with the old, ";
//}else{
//    echo "didn\'t need to drop anything";
//};


//create a database

$database_creator_query = "CREATE DATABASE bgb_db";

if (mysqli_query($conn, $database_creator_query)){
    echo "In with the new. Database created successfully.";
} else{
    die("Error creating database: " . mysqli_error($conn));
}

//cleanup
mysqli_close($conn);


//redefine $conn to point into to database for these next few steps
$conn = mysqli_connect($servername, $username, $password, 'bgb_db');

//create the users table

$users_table_creator_query = "CREATE TABLE users (
user_ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
email VARCHAR(50)
)";

if (mysqli_query($conn, $users_table_creator_query)){
    echo "users table created successfully";
} else{
    die("Error creating users table: " . mysqli_error($conn));
}

//create the events table

$events_table_creator_query = "CREATE TABLE events (
event_ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
game_name VARCHAR(30),
general_details VARCHAR(1000),
street_address VARCHAR(50),
city VARCHAR(50),
state VARCHAR(2),
zip VARCHAR(5),
lat FLOAT(10,6),
`lon` FLOAT(10,6),
`date` DATE,
`time` TIME
)";

if (mysqli_query($conn, $events_table_creator_query)){
    echo "events table created successfully";
} else{
    die("Error creating events table: " . mysqli_error($conn));
}

//create the users_to_events table

$users_to_events_creator_query = "CREATE TABLE users_to_events (
u_2_e_ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
event_ID INT(6) UNSIGNED,
player_ID INT(6) UNSIGNED,
role ENUM('host', 'guest', 'invitee', 'applicant')
)";

if (mysqli_query($conn, $users_to_events_creator_query)){
    echo "users_to_events table created successfully";
} else{
    die("Error creating users_to_events table: " . mysqli_error($conn));
}


//clean up

mysqli_close($conn);