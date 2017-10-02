<?php
$output['debugging_messages'][]='In php_mailer.php';
$output['debugging_messages'][]="I think that the action is {$_GET['action']}";
//include phpmailerautoload.php
require 'phpmailer/PHPMailer/PHPMailerAutoload.php';
require_once 'php_mailer_connect.php';
//require 'mailTemplates/mail_scripts/apply_script.php';
//require 'mailTemplates/apply_mail_template.php';

//require 'player_data_api/feedback_script.php';




//create an instance of php mailer
$mail = new PHPMailer();

//set a host
$mail->Host = "smtp.gmail.com";

// enable SMTP
$mail->isSMTP();

//set authentication to true
$mail->SMTPAuth = true;

// set login details for gmail account
$mail->Username = $hidden_email;
$mail->Password = $hidden_password;

//set type of protection
$mail->SMTPSecure = "ssl"; //or we can use TLS

//set a port
$mail->Port = 465; //or 587 if TLS

//set the subject
$mail->Subject = "BoarGameScout Event!";

//set html to true
$mail->isHTML(true);

//set the body
$mail->Body = $apply_body;



// set who is sending an email
$mail->setFrom($hidden_email, 'BoardGameScout');

// set where we are sending email(recipiants)
$mail->addAddress($applicant_email);
$output['debugging_messages'][]='I think that the $applicant_email is '.$applicant_email;

//send an email
if($mail->send()) {
    $output['debugging_messages'][] = 'mail was sent';
    $output['success'] = true;
}
else
	$output['errors'][] = "problem sending email";

?>