$(document).ready(function(){
	$(".submitButton").on('click', submitButtonInit); //apply click handler to submit button
});
/**
 * Ajax to send email information from DOM inputs to Board Game Scout email using PHP Mailer on back-end
 * @param none
 * @return {undefined}
 */
function submitButtonInit(){
	$.ajax({ //ajax call to send data pulled from inputs to back-end to route to PHP Mailer
		url: './back_end/player_input_decision_maker.php?action=sendDevFeedback',
		method: 'POST',
		dataType: 'json',
		data: {
			name: $(".name").val(),
			email: $(".email").val(),
			message: $(".message").val()
		},
		success: function(response){ //clear form, and display response text to show successful submission
			$("#name").val("");
			$("#email").val("");
			$("#message").val("");
			$(".responseText").text("Thank you for getting into contact with us! We'll get back to you soon.")
		},
		error: function(response){ //show error response to user upon submission failure
			$(".responseText").text("There was a problem sending your message, please try again.")
		}
	});
}