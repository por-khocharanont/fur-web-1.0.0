/**
 * 
 */
//$(function() {
//	$(".auto-appName").autocomplete({
//	    source : function(request, response) {
//	    	var $autoObj = $('.auto-appName');
//	    	var actionUrl = $autoObj.attr('action');
//	    	var dataParams = $.param({ appName : $autoObj.val() });
//	        $.ajax({
//                url : actionUrl,
//                type : 'GET',
//                data : dataParams,
//                success : function(data) {
//                    response($.map(data, function(item) {
//                        return {
//                                label : item.appName,
//                                appId : item.appId,
//                                appName : item.appName
//                        };
//                    }));
//
//                },
//                error : function(jqXHR, textStatus, errorThrown) {
//                }
//	
//	        });
//	    },
//	    minLength : 3
//	});
//});

$(function() {
	$(".auto-orgCode").autocomplete({
	    source : function(request, response) {
	    	var $autoObj = $('.auto-orgCode');
	    	var actionUrl = $autoObj.attr('action');
	    	var dataParams = $.param({ orgCode : $autoObj.val() });
	        $.ajax({
                url : actionUrl,
                type : 'GET',
                data : dataParams,
                success : function(data) {
                    response($.map(data, function(item) {
                        return {
                        	label : item.orgcode
                        };
                    }));

                },
                error : function(jqXHR, textStatus, errorThrown) {
                }
	
	        });
	    },
	    minLength : 3
	});
});

$(function() {
	$(".auto-orgName").autocomplete({
	    source : function(request, response) {
	    	var $autoObj = $('.auto-orgName');
	    	var actionUrl = $autoObj.attr('action');
	    	var dataParams = $.param({ orgName : $autoObj.val() });
	        $.ajax({
                url : actionUrl,
                type : 'GET',
                data : dataParams,
                success : function(data) {
                    response($.map(data, function(item) {
                        return {
                        	label : item.orgname,
                        	orgCode : item.orgcode
                        };
                    }));

                },
                error : function(jqXHR, textStatus, errorThrown) {
                }
	
	        });
	    },
	    minLength : 3
	});
});

$(function() {
	$(".auto-orgDesc").autocomplete({
	    source : function(request, response) {
	    	var $autoObj = $('.auto-orgDesc');
	    	var actionUrl = $autoObj.attr('action');
	    	var dataParams = $.param({ orgDesc : $autoObj.val() });
	        $.ajax({
                url : actionUrl,
                type : 'GET',
                data : dataParams,
                success : function(data) {
                    response($.map(data, function(item) {
                        return {
                        	label : item.orgcode + " : " +item.orgdesc,
                        	orgDesc : item.orgdesc,
                        	orgName : item.orgname,
                        	orgCode : item.orgcode,
                        	val : 'jokey'
                        };
                    }));

                },
                error : function(jqXHR, textStatus, errorThrown) {
                }
	
	        });
	    },
	    minLength : 3
	});
});


$(function() {
	
	/** auto complete appName */
	$.each($(".auto-appName"), function(i, elm) {
		var $autoObj = $(elm);
    	var actionUrl = $autoObj.attr('action');
		$(elm).autocomplete({
		    source : function(request, response) {
		    	var dataParams = $.param({ appName : $autoObj.val() });
		        $.ajax({
	                url : actionUrl,
	                type : 'GET',
	                data : dataParams,
	                success : function(data) {
	                    response($.map(data, function(item) {
	                        return {
	                                label : item.appName,
	                                appId : item.appId,
	                                appName : item.appName
	                        };
	                    }));

	                },
	                error : function(jqXHR, textStatus, errorThrown) {
	                }
		        });
		    },
		    minLength : 3
		});
	});
	
	/** autocomplete username/fullname */
	$.each($(".auto-username-fullname"), function(i, elm) {
		var $autoObj = $(elm);
    	var actionUrl = $autoObj.attr('action');
		$(elm).autocomplete({
	    	 source : function(request, response) {
	 	    	var dataParams = $.param({ username : $autoObj.val() });
	 	        $.ajax({
	                 url : actionUrl,
	                 type : 'GET',
	                 data : dataParams,
	                 dataType : 'json',
	                 success : function(data) {
	                     response($.map(data, function(item) {
	                    	 console.log(item);
	                         return {
								label : item.username + " : " + item.enfullname,
								username : item.username,
								name : item.enfullname,
								userId : item.userId
	                         };
	                     }));

	                 },
	                 error : function(jqXHR, textStatus, errorThrown) {
	                 }
	 	
	 	        });
	 	    },
	 	    minLength : 3
		});
	});
	
	/** autocomplete orgName */
	$.each($(".auto-orgname"), function(i, elm) {
		var $autoObj = $(elm);
    	var actionUrl = $autoObj.attr('action');
	    $(elm).autocomplete({
		        source : function(request, response) {
		        	var dataParams = $.param({ orgDesc : $autoObj.val() });
		            $.ajax({
		                    url : actionUrl,
		                    type : 'GET',
		                    data : dataParams,
		                    contentType: "application/json; charset=utf-8",
		                    success : function(data) {
		                        response($.map(data, function(item) {
		                            return {
		                                    label : item.orgcode + " : " +item.orgdesc,
		                                    orgname : item.orgname,
		                                    orgdesc : item.orgdesc,
		                                    orgcode : item.orgcode
		                            };
		                        }));
		
		                    },
		                    error : function(jqXHR, textStatus, errorThrown) {
		                    }
		
		            });
		        },
		        minLength : 3,
		        select : function(event, ui) {
		        	 $(eligibleForm).find("input[name=orgNameShow]").val(ui.item.label);
		        	 $(eligibleForm).find("input[name=orgname]").val(ui.item.orgname);
		        },
		        change: function(event, ui) {
		        }
		});
	});
    
    
});


