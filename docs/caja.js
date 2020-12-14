
function setImporte(c){
    $("#iimporte").val($("#iimporte").val() + c);    
}
function delImporte(c){
    $("#iimporte").val($("#iimporte").val().slice(0,-1));    
}
function setDetalle( dx ){
    $("#idetalle").val( $("#d"+dx).text());    
}

$(function(){
});

function setCuentasGasto( cuentas ){
	//alert( JSON.stringify(cuentas) );
    $("#sde").empty();
    $("#sa").empty();
    setCuentasSelect( "sde", cuentas, 'G', 2 /* comida */ ); //gastos
    setCuentasSelect( "sde", cuentas, 'H' ); //vacaciones
    setCuentasSelect( "sa", cuentas, 'A', 37 ); //DBank 22 /* abn */ ); //activo, cajas
    //setCuentasSelect( "sde", cuentas, 'X', 22 ); //test
    //setCuentasSelect( "sa", cuentas, 'X', 22 ); //test
}

function setCuentasTx( cuentas ){
	//alert( JSON.stringify(cuentas) );
    $("#sde").empty();
    $("#sa").empty();
    setCuentasSelect( "sde", cuentas, '*', 2 /* comida */ ); 
    setCuentasSelect( "sa", cuentas, '*', 22 /* abn */ ); 
}

function setCuentasSelect( select, cuentas, tipo, selected ){
	for (var i=0; i<cuentas.length; ++i ) {
        if( tipo == '*' || cuentas[i].tipo == tipo ){
    		var option = $('<option></option>').attr("value",cuentas[i].id).text( cuentas[i].detalle);
            if ( selected != null && cuentas[i].id == selected ) { //comida
                option.attr("selected","selected");
            }
            $("#"+select).append(option);
        }
    }
}

function setCuentas( setCuentas2 ) {
	ajax_call( {
        url: '/caja/caja/get_cuentas',
		success: function(data) { 
            //alert('Cuentas: '+JSON.stringify(data) ); 
            setCuentas2( data.cuentas ); 
        },
		error: function(xhr, status, error) {	
            alert('Error geting Cuentas: '+JSON.stringify(xhr) ); 
        }
	});
};

function setDetalle( det ){
    //alert( det);
    $("#idetalle").val( det );    
}

function setDetalles2( detalles ){
	//alert( JSON.stringify(detalles) );
	for (var i=0,j=1; i<detalles.length && i<20; ++i, ++j ) {
        var b = "#d"+j;
    	$(b).html(detalles[i].detalle);
    	//alert( detalles[i].detalle + '-' + b );
        $(b).bind('click',new Function("","setDetalle('"+detalles[i].detalle+"');"));
	}
};

function setDetalles( ) {
	ajax_call( {
        url: '/caja/caja/get_top_likely_detalles?n=20',
		success: function(data) { 
            //alert('Cuentas: '+JSON.stringify(data) ); 
            setDetalles2( data.detalles ); 
        },
		error: function(xhr, status, error) {	
            alert('Error geting Detalles: '+JSON.stringify(xhr) ); 
        }
	});
};

function save(){
    cuenta_de = $("#sde").val();
    cuenta_a = $("#sa").val();
    fecha = $("#fecha").val();
      //deta := deta+'%20';
    var url = '/caja/caja/grabar_gasto'
      + '?importe=' + $("#iimporte").val()
      + ';cuenta_a=' + cuenta_a
      + ';cuenta_de=' + cuenta_de
      + ';detalle=' + $("#idetalle").val();
      + ';fecha=' + fecha ;
    alert( url );
	ajax_call( {
        url: url,
		success: function(data) { 
            //alert('Cuentas: '+JSON.stringify(data) ); 
           save2( data ); 
        },
		error: function(xhr, status, error) {	
            alert('Error saving: '+JSON.stringify(xhr) ); 
        }
	});
    //save2('test');
}
function save2( data ){
    //alert('Save: '+JSON.stringify(data) ); 
    $("#iimporte").val('');
    $("#idetalle").val('');
}
