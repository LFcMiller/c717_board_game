console.log('Contact Us Loaded');

$(document).ready(function(){
	$(".submitButton").on('click', submitButtonInit);
});

function submitButtonInit(){
		
	console.log('contact ajax called');
	$.ajax({
		url: './3plus_table_solution/player_input_decision_maker.php?action=sendDevFeedback',
		method: 'POST',
		dataType: 'json',
		data: {
			name: $(".name").val(),
			email: $(".email").val(),
			message: $(".message").val()
		},
		success: function(response){
			console.log('success with contact ajax',response);
		},
		error: function(response){
			console.log('error with contact ajax',response);
		}
	});
}