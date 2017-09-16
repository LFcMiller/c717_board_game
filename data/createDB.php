<?php

require_once("mysqlConnect.php");

$conn = mysqli_connect($servername, $username, $password);


if(!$conn){
	die("Connection failed: " . mysqli_connect_error());
}

$sql = 'CREATE DATABASE practiceDB';

if(mysqli_query($conn, $sql)){
	echo "Database created successfully";
} else{
	echo "Error creating database: " . mysqli_error($conn);
}

//fun fact: this automatically happens when it gets to the end of the file anyway
mysqli_close($conn);

?>