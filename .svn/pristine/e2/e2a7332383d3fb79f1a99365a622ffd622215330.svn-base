/**
 * ACIM main script
 */

/* default propertie*/
var appConf = {
		jqgrid : {
			rowNum : 20
		},
		ajaxFromOption : {
			
		}
	};

function converToTwoDigit(num){
	if(num<10){
		return '0'+num;
	}
	
	return num;
}

function convertDateFormat(timestamp){
	   if(!timestamp){
		   return "";
	   }
	   var dt = new Date(timestamp);
	   var dd = dt.getDate();
	   dd = converToTwoDigit(dd);
	   var MM = dt.getMonth()+1;
	   MM = converToTwoDigit(MM);
	   var yyyy = dt.getFullYear();
	   
	   return dd+'/'+MM+'/'+yyyy;
}

function convertDateFormatWithTime(timestamp){
	   if(!timestamp){
		   return "";
	   }
	   var dt = new Date(timestamp);
	   var dd = dt.getDate();
	   dd = converToTwoDigit(dd);
	   var MM = dt.getMonth()+1;
	   MM = converToTwoDigit(MM);
	   var yyyy = dt.getFullYear();
	   var hh = dt.getHours();
	   hh = converToTwoDigit(hh);
	   var mm = dt.getMinutes();
	   mm = converToTwoDigit(mm);
	   var ss = dt.getSeconds();
	   ss = converToTwoDigit(ss);
	   return dd+'/'+MM+'/'+yyyy+' '+hh+':'+mm+':'+ss;
}


$(function () {
	
	$("[type='number']").keypress(function (evt) {
	    evt.preventDefault();
	});
	
	var tokenCsrf = $("meta[name='_csrf']").attr("content");
	var headerNameCsrf = $("meta[name='_csrf_header']").attr("content");
	var headerCsrf = {};
	headerCsrf[headerNameCsrf] = tokenCsrf;
	// setup Ajax for CSRF
	$.ajaxSetup({
	    headers : headerCsrf,
	    contentType: "application/json; charset=utf-8",
	    beforeSend: function(xhr) {
//	    	$("#process-loader").show();
	    },
	    complete: function(jqXHR, textStatus) {
			if(jqXHR.responseText.indexOf('frmLogin') > 0) {
				$.confirm({
					'title' : 'Session',
				    'message' : 'Session Expired, กรุณา login ใหม่อีกครั้ง',
				    'buttons' : {
					    'OK' : {
					    	'class' : 'blue',
					    	'action': function(){ 
					    		window.location.href = $('#linkHome').attr('href')
					    	}
					     }
					}	
				}); 
			 }
	     }
	});
	
});