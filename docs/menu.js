//$(document).ready(function(){
    //alert("ready");
    //$('#menuGasto').class("notActive");    
//})
//window.menu = "none";
//$('#subPage').html('<iframe id="iframe" src="gasto.html" frameborder="0" width="100%" height="100%"></iframe>');


$(function(){
    var href = document.location.href;
    var page = href.substr(href.lastIndexOf('/') + 1);
    //var page = $("#iframe").attr("src");
    if( page != null) {
        page = page.substring(0,page.indexOf(".html"));
    }
    //alert(page);
    switch(page){
        case "caja":
            $('#menuItemGasto').on('click', function(event){$("#iframe").attr("src", "gasto.html");});
            $('#menuItemTx').on('click', function(event){$("#iframe").attr("src", "tx.html");});
            $('#menuItemReconciliacion').on('click', function(event){$("#iframe").attr("src", "reconciliacion.html");});
            $('#menuItemReporte').on('click', function(event){$("#iframe").attr("src", "reporte.html");});
            if($("#iframe").attr("src") == null ){
                $("#menuItemGasto").addClass( "active");
                $("#iframe").attr("src", "gasto.html");
            }
            break;
        case "gasto":
        case "tx":
            setup(page);
            break;
        default:
            break;
    }

});
    
function setNumPadClicks(){
    for(var i=0;i<=9;++i){
        $("#b"+i).bind("click",new Function("","setImporte("+i+");"));
    }
    $("#bpoint").bind("click",new Function("","setImporte('.');"));
    $("#bdelete").bind("click",new Function("","delImporte();"));        
    $("#bsave").bind("click", new Function("", 'save()' ));
}

function setDetButtonsClicks(){
    for(var i=1;i<=20;++i){
        $("#d"+i).bind("click",new Function("","setDetalle("+i+");"));
    }        
}

function setToday( id ){
    var d = new Date();
    var curr_day = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    var currentDate = curr_year 
        + "-" + (curr_month.toString().length>1?'':'0') + curr_month 
        + "-" + (curr_day.toString().length>1?'':'0') + curr_day;
    //alert( currentDate);
    $("#"+id).attr( 'value', currentDate );    
}

function setup( page ){
    //$("#iframe").attr("src",page+".html");
    var name = page.substring(0,1).toUpperCase() + page.substring(1);
    //alert( name);
    $("#menuItemGasto").removeClass( "active");
    $("#menuItemTx").removeClass( "active");
    $("#menuItemReconciliacion").removeClass( "active");
    $("#menuItemReporte").removeClass( "active");
    $("#menuItem"+name).addClass( "active");
    if( page == "gasto" ){
        setNumPadClicks();
        setDetButtonsClicks()
        setDetalles();
        setCuentas( setCuentasGasto ); 
        setToday( 'fecha' );
    }
    if( page == "tx" ){
        setNumPadClicks();
        setDetButtonsClicks()
        setDetalles();
        setCuentas( setCuentasTx ); 
        setToday( 'fecha' );
    }
}

