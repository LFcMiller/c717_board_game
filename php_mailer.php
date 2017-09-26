<?php
//include phpmailerautoload.php
require 'phpmailer/PHPMailer/PHPMailerAutoload.php';
require 'mailTemplates/apply_mail_template.php';
require 'mailTemplates/accepted_mail_template.php';
require 'mailTemplates/contact_mail_template.php';
require 'mailTemplates/confirmation_mail_template.php';

//create an instance of php mailer
$mail = new PHPMailer();

//set a host
$mail->Host = "smtp.gmail.com";

// enable SMTP
$mail->isSMTP();

//set authentication to true
$mail->SMTPAuth = true;

// set login details for gmail account
$mail->Username = "boardgamedummy@gmail.com";
$mail->Password = "TempPassword";

//set type of protection
$mail->SMTPSecure = "ssl"; //or we can use TLS

//set a port
$mail->Port = 465; //or 587 if TLS

//set the subject
$mail->Subject = "Test Email";

//set html to true
$mail->isHTML(true);

// set the body
// switch (//check for query of ajax call) {
// 	case 0:
// 		$mail->Body = $apply_body;
// 		break;
// 	case 1:
// 		$mail->Body = $accepted_body;
// 		break;
// 	case 2:
// 		$mail->Body = $confirmation_body;
// 		break;
// 	case 3:
// 		$mail->Body = $contact_body;
// 		break;
// }
$mail->Body = $apply_body;



// set who is sending an email
$mail->setFrom('boardgamedummy@gmail.com', 'BoardGameScout');

// set where we are sending email(recipiants)
$mail->addAddress('violette.austin@yahoo.com');

//send an email
if($mail->send())
	echo "mail was sent";
else
	echo "something went horribly wrong";

?>