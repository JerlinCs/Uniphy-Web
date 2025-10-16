<?php
/*
Name: 			Contact Form
Written by: 	Okler Themes - (http://www.okler.net)
Version: 		3.8.0
*/
use PHPMailer\PHPMailer\PHPMailer;

session_cache_limiter('nocache');
header('Expires: ' . gmdate('r', 0));

header('Content-type: application/json');

$replyTo = "";
// Step 1 - Enable if the server requires SMTP authentication. (true/false)
$enablePHPMailer = true;

$subject = 'DSI Website Sales Enquiry';

if(isset($_POST['email'])) {

	$name = $_POST['Fname']." ".$_POST['Lname'];
	$replyTo = $_POST['email'];
	$fields = array(
		0 => array(
			'text' => 'Name',
			'val' => $name
		),
		1 => array(
			'text' => 'Email address',
			'val' => $_POST['email']
		),
		3 => array(
			'text' => 'Organisation',
			'val' => $_POST['org']
		),
		4 => array(
			'text' => 'Phone number',
			'val' => $_POST['phone-no']
		),
		5 => array(
			'text' => 'Country',
			'val' => $_POST['country']
		),
		6 => array(
			'text' => 'Message',
			'val' => $_POST['message']
		)
	);

	$message = "Hi, <br>\n We have received an Enquiry from Website. Please find the details below. <br>\n<br>\n";

	foreach($fields as $field) {
		$message .= "<b>".$field['text'].":</b> " . htmlspecialchars($field['val'], ENT_QUOTES) . "<br>\n";
	}
	$message .= "<br>\nThanks, <br>\n DSI Sales";
	// Simple Mail
	if(!$enablePHPMailer) {

		$headers = '';
		$headers .= 'From: ' . $name . ' <' . $_POST['email'] . '>' . "\r\n";
		$headers .= "Reply-To: " .  $_POST['email'] . "\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

		if (mail($to, $subject, $message, $headers)){
			$arrResult = array ('response'=>'success1111');
		} else{
			$arrResult = array ('response'=>'error');
		}

	// PHP Mailer Library - Docs: https://github.com/PHPMailer/PHPMailer
	} else {

        include("php-mailer/vendor/autoload.php");

		$mail = new PHPMailer(true);

		$response = [
			'success' => false,
			'message' => ''
		];
		//ob_start();
		$mail->SMTPDebug = 0;
		//$mail->Debugoutput = function($str, $level) {
		//	echo "Debug level $level; message: $str"; // Capture the debug message
		//};
		try {
			$mail->IsSMTP();                                      // Set mailer to use SMTP
	
			// Step 2 - If you don't receive the email, try to configure the parameters below:
			
			$mail->Host       = 'smtp.office365.com';
			$mail->SMTPAuth   = true;
			$mail->Username   = 'noreply.uniphy@digitalsoftwareinc.in';
			$mail->Password   = 'UNEmail@2023';
			$mail->SMTPSecure = 'tls';
			$mail->Port       = 587;

			// Sender info
			$mail->setFrom('noreply.uniphy@digitalsoftwareinc.in', 'No Reply');
			
			$mail->FromName = $name;
			//$mail->AddAddress('manojkumar.vijayakumar@digitalsoftwareinc.in', 'Manojkumar Vijayakumar');								  // Add a recipient
			//$mail->AddAddress('rajkumar.k@digitalsoftwareinc.com', 'Rajkumar Krishnaraj');	
			//$mail->AddAddress('vasu@digitalsoftwareinc.com', 'Vasu Mathialagan');
			$mail->AddAddress('jerlinchristin.mary@digitalsoftwareinc.in', 'Jerlin Christin Mary');	
			$mail->AddReplyTo($replyTo, $name);
	
			$mail->IsHTML(true);                                  // Set email format to HTML
	
			$mail->CharSet = 'UTF-8';
	
			$mail->Subject = $subject;
			$mail->Body    = $message;
	
			if(!$mail->Send()) {
				$response['success'] = false;
				$response['message'] = 'Message has not been sent';
			}
			else {
				$response['success'] = true;
				$response['message'] = 'Message has been sent';
				
			}
		} catch (phpmailerException $e) {
			$response['success'] = false;
			$response['message'] = $e->getMessage();
		} catch (Exception $e) {
			$response['success'] = false;
			$response['message'] = $e->getMessage();
		}
		// Capture debug output
		//$debugOutput = ob_get_clean();
		//$response['debug'] = $debugOutput;
	}

	echo json_encode($response);

} else {

    $arrResult = array ('response'=>'error', 'message' => 'no mail provided for contact. This shouldn\'t be happening');
	echo json_encode($arrResult);

}
?>
