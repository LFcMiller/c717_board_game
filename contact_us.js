$(".submitButton").on('click', function(){
	
	$.ajax({
		url: './3plus_table_solution/player_input_decision_maker.php?action=',
		method: 'POST'
		dataType: 'json'
		data: {

		}
		success: function(response){
			console.log('success with contact ajax',response);
		}
		error: function(response){
			console.log('error with contact ajax',response);
		}
	})
})