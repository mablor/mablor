function ajax_call(args) {
	//var elem;
	var method = (args.type ? args.type : 'GET');
	var data = (args.data ? args.data : {});
	if( method == 'POST' ){
		data = JSON.stringify( data );
	}
	$.ajax( {
		url: 'https://mablor.ddns.net'+args.url,
		type: method,
		beforeSend: function() {
			if ( args.element ) {
				$("#"+args.element).attr("disabled",true);
				//$("#"+args.element).attr("class",$("#"+args.element).attr("class")+" spin");
				//elem = $("#"+args.element).html();
				//$("#"+args.element).empty().append($('<img></img>').attr('src','/images/inprogress-small.gif'));
			}
			if ( args.target ) {
				$("#"+args.target).empty().append($('<img></img>').attr('src','/images/inprogress.gif'));
			}
			if ( args.beforeSend ) {
				args.beforeSend();
			}
		},
		data: data,
	    contentType: "application/json; charset=utf-8",
	    dataType: "json", //text json
		async: args.async ? args.async : "true",
		success: function(data) {
			//alert( JSON.stringify(data) );
			if ( args.element ) {
				$("#"+args.element).attr("disabled",false);
				//$("#"+args.element).attr("class",$("#"+args.element).attr("class").replace(" spin", "") );
				//$("#"+args.element).empty().append(elem);
			}
			args.success( data );
		},
		error: function( data ) {
			if ( args.element ) {
				alert('Error in ajax call' );
				$("#"+args.element).attr("disabled",false);
				$("#"+args.element).attr("class",$("#"+args.element).attr("class").replace(" spin", "") );
			}
			if ( args.error ) {
				args.error( data );
			}
		},
	});
}
