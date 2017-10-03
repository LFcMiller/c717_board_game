console.log('Contact Us Loaded');

$(document).ready(function(){
	$(".submitButton").on('click', submitButtonInit);
});

function submitButtonInit(){
		
	console.log('contact ajax called');
	$.ajax({
		url: './back_end/player_input_decision_maker.php?action=sendDevFeedback',
		method: 'POST',
		dataType: 'json',
		data: {
			name: $(".name").val(),
			email: $(".email").val(),
			message: $(".message").val()
		},
		success: function(response){
			console.log('success with contact ajax',response);
			$(".responseText").text("Thank you for getting into contact with us! We'll get back to you soon.")
		},
		error: function(response){
			console.log('error with contact ajax',response);
		}
	});
}