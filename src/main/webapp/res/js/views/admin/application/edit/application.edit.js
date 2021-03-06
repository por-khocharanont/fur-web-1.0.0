function isDuplicate(value,arr,key){
	var isDup = false;
	$.each(arr, function(i,obj) {
		if(key!=null){
//			if(obj[key] == value){
			if(obj[key].toUpperCase() === value.toUpperCase()){
				isDup = true;
			}
		}else{
//			if(obj == value){
			if(obj.toUpperCase() === value.toUpperCase()){
				isDup = true;
			}
		}
	}); 
	return isDup;
}

function isDuplicateOtherTeam(value,arr,idx,object,key){
	var isDup = false;
	$.each(arr, function(i,obj) {
		if(i!=idx || idx==''){
			$.each(obj[object],function(j,person){
//				if(person[key] == value){
				if(person[key].toUpperCase() === value.toUpperCase()){
					isDup = true;
				}
			});
		}
	}); 
	return isDup;
}

var roleApplicationTemp = [];

$(document).on("keypress", ":input:not(textarea)", function(event) {
    return event.keyCode != 13;
});


$(document).ready(function () {
	
	$applicationForm = $('#applicationForm');
	var appId = $applicationForm.find('input[name=appId]').val();

	var oldFileNameList = [];
	
	$.each($('#fileTemplateList').find('div'),function(i,elm){
		var fileName = $(elm).find('input[name=fileName]').val();
		oldFileNameList.push(fileName);
	});
	var deleteFileNameList = [];
	
	var deleteImgUrl = $('img[name=deleteFile').attr('src');
	var current_total_file = $('#fileTotal').val();
	var new_total_file = ($('div[name=browseBtn]').find('.upload').length) - 1;
	//checkCountFile
	checkLengthFileTemplate(current_total_file,new_total_file);
	
	var isFileDupe = false;
	$('#fileUpload').MultiFile({
		accept : 'xls|xlsx|doc|docx|txt|zip|rar|7z',
		max	: 3,
		maxfile : 1000,
		list : '#fileTemplateList',
		STRING: {	
			remove: '<img class="delete" src="/fur-web/res/img/icon/delete.png">',
			denied: 'รองรับประเภทไฟล์แบบ .xls ,.xlsx ,.doc ,.docx ,.txt ,.zip ,.rar ,.7z',
			duplicate: 'ตรวจสอบพบชื่อไฟล์ซ้ำ กรุณาตรวจสอบชื่อไฟล์',
			toobig: 'ไฟล์มีขนาดเกิน 1 mb',
			toomany: 'ไฟล์เกินจำนวนที่กำหนด 3 ไฟล์'
		},
		onFileSelect: function(element, value, master_element) {
			isFileDupe =  false;
			if(isDuplicate(value,oldFileNameList,null)){
				isFileDupe = true;
			}
		},
		afterFileSelect: function(element, value, master_element) {
			
			var id = $(element).attr('id');
			if(isDuplicate(value,oldFileNameList,null)){
				$('input[name=fileUpload]').remove('#'+id);
				$('div[class=MultiFile-label]').each(function(i,elm){
					var title = $(elm).find('span[class=MultiFile-title]').text();
					if(title==value){
						$(elm).remove();
					}
				});
				alert('ไฟล์อัพโหลดซ้ำ');
			}
			
			new_total_file = ($('div[name=browseBtn]').find('.upload').length) - 1;
			checkLengthFileTemplate(current_total_file,new_total_file);
			
			
		},
		afterFileRemove: function(element, value, master_element) {
			var new_total_file = ($('div[name=browseBtn]').find('.upload').length) - 1;
			checkLengthFileTemplate(current_total_file,new_total_file);
		},
		error : function(s){
			if(isFileDupe){
				s = 'ตรวจสอบพบชื่อไฟล์ซ้ำ กรุณาตรวจสอบชื่อไฟล์\n' + s;
			}
			alert(s);
		}
	});
	
	$applicationForm.find('img[name=deleteFile]').click(function(){
		var id = $(this).attr('id');
		var objFile = $(this).prev();				
		var fileName = objFile.val();
		deleteFileNameList.push(fileName);
		$('#fileTemplate'+id).hide();
		
		current_total_file -= 1;
		checkLengthFileTemplate(current_total_file,new_total_file);
		
		var idx = oldFileNameList.indexOf(fileName);
		if(idx > -1){
			oldFileNameList.splice(idx,1);
		}
		
	});
	
	function checkLengthFileTemplate(currentCount,newCount){
		currentCount = parseInt(currentCount);
		newCount = parseInt(newCount);
		if(3 > (currentCount + newCount)){
			$("div[name=browseBtn]").addClass("btn-primary");
			$("div[name=browseBtn]").show();
		}
		else{
			$("div[name=browseBtn]").hide();
			$("div[name=browseBtn]").removeClass("btn-primary");
		}
	}
	
	var oldAppName = $('#applicationForm').find('input[name=appName]').val();
	var appNameDup = false;
	
	resetApplicationErrorText();
	
    function resetApplicationErrorText(){
    	$('font[name=appNameErrorMsg]').hide();
		$('font[name=appNameSuccessMsg]').hide();
		$('font[name=appNameLengthMsg]').hide();
		$('font[name=appNameNullMsg]').hide();
		$('font[name=appInfoLengthMsg]').hide();
		$('font[name=appAuthenNullMsg]').hide();
    }
    
	 $('#applicationForm').find('input[name=appName]').on('blur',function(){
		 var appName =  $('#applicationForm').find('input[name=appName]').val().trim();
		 $('#applicationForm').find('input[name=appName]').val(appName);
		 var appNameUrl = $('#applicationForm').find('input[name=appName]').attr('action');
		 isValidApplicationName(appName,appNameUrl,function(){});
	});
	 
	 function isValidApplicationName(appName,appNameUrl, func){
    	resetApplicationErrorText();
    	
    	if(appName==''){
    		$('font[name=appNameNullMsg]').show();
    		func(false);
    		return;
    	}
    	
    	if(appName.length>100){
    		$('font[name=appNameLengthMsg]').show();
    		func(false);
    		return;
    	}
    	
    	if( appName.toLowerCase() == oldAppName.toLowerCase()){
    		func(true);
    		return;
    	}
    	
    	var dataParams = $.param({ appName : appName });
        $.ajax({
            url : appNameUrl,
            type : 'GET',
            data : dataParams,
            success : function(data) {
            	if(data.length>0 && appName!=''){
            		$('font[name=appNameErrorMsg]').show();
            		func(false);
            		return;
            	}
            	else{
            		$('font[name=appNameSuccessMsg]').show();
            		func(true);
            		return;
            	}
            },
            error : function(jqXHR, textStatus, errorThrown) {
            	return false;
            }
        });
    }
	
	$(".header-content-app").click(function () {
	    $content = $('.content-app');
	    $content.slideToggle(200,function(){
	    	if($content.is(":visible")){ 
	    		$content.removeClass("show");
	    	}
	    });
	});
	 
	$applicationForm.find('button[name=saveBtn]').click(function(){
		var isValidForm = true;
		var appNameUrl = $applicationForm.find('input[name=appName]').attr('action');
		var appName = $applicationForm.find('input[name=appName]').val();
		var appInfo = $applicationForm.find('textarea[name=appInfo]').val();
		var applicationType = $applicationForm.find('input[name=applicationType]:checked').val();
		var status = $applicationForm.find('input[name=status]:checked').val();
		var authentication = [];
		
		
		 isValidApplicationName(appName,appNameUrl,function(isValid){
			 	console.log(isValid);
			 	isValidForm = isValid;
				if(appInfo.length>250){
		       		 $('font[name=appInfoLengthMsg]').show();
		       		 isValidForm = false;
		       	}
		       	var authentication = [];
		       	$('#applicationForm').find('input[name=authenBy]:checked').each(function(i){
		   	        authentication.push($(this).val());
		   	    });
		       	
		       	if(authentication.length==0){
		       		 $('font[name=appAuthenNullMsg]').show();
		       		 isValidForm = false;
		       	}
			 
			if(!isValidForm){
		    	$("#dialog-error-please-fill").dialog("open");
		    }
		    else{
	    		$('#dialog-confirm').dialog("open");
	        	$('#dialog-confirm').dialog({
	        		buttons : [{
	    				text : "Confirm",
	    	        	click : function(){
	    	        		var appName = $applicationForm.find('input[name=appName]').val();
	        				var appInfo = $applicationForm.find('textarea[name=appInfo]').val();
	        				var applicationType = $applicationForm.find('input[name=applicationType]:checked').val();
	        				var status = $applicationForm.find('input[name=status]:checked').val();
	        				var authentication = [];
	        			    	
	        			        $applicationForm.find('input[name=authenBy]:checked').each(function(i){
	        			        	authentication[i] = $(this).val();
	        			        });
	        			        
	        			        var application = {
	        			        		appId : appId,
	        			        		appName : appName,
	        			        		appInfo : appInfo,
	        			        		applicationType : applicationType,
	        			        		status : status,
	        			        		authentication : authentication
	        			        }
	        			        
	        			    	var url = $applicationForm.attr("action");
	        					var jsonData = JSON.stringify(application);
	        					var deleteFile = JSON.stringify(deleteFileNameList);
	        					
	        					 $applicationForm.find('input[name=jsonData]').val(jsonData);
	        					 $applicationForm.find('input[name=deleteFile]').val(deleteFile);
	        					 $('#dialog-confirm').dialog("close");
	        					 $('#process-loader').show();
	        					 $applicationForm.ajaxSubmit({
	        						success : function(data) {
	        							$('#process-loader').hide();
	        							oldAppName = appName;
	        							resetApplicationErrorText();
	            						$("#dialog-success").dialog("open");
	        							
	        						},
	        						error : function(jqXHR, textStatus, errorThrown) {
	        							$('#process-loader').hide();
	            						$("#dialog-error-create").dialog("open");
	        						}
	        					 });
	        				
	    	        	}
	    	        },{
	    	        	text : "Cancel",
	    	        	class : "red-btn",
	    	        	click : function(){
	    	        		$(this).dialog("close");
	    	        	}
	    	        }]	
	        	});
	    	}
		 });
		
	});
	
	
	$("#dialog-error-create").dialog({
        autoOpen: false,modal: true,draggable : false,resizable : false,
        buttons: {
        	Close:function(){
        		$(this).dialog("close");
        	}
        }
	});
	
	$("#dialog-success").dialog({
        autoOpen: false,modal: true,draggable : false,resizable : false,
        buttons: {
        	Close:function(){
        		$(this).dialog("close");
        	}
        }
	});
	
	$('#dialog-confirm').dialog({
		autoOpen: false,modal: true,draggable : false,resizable : false,
	});
	
	$("#dialog-error-please-fill").dialog({
        autoOpen: false,modal: true,draggable : false,resizable : false,
        buttons: {
        	Close:function(){
        		$(this).dialog("close");
        	}
        }
	});

	$("#dialog-error-delete-role").dialog({
        autoOpen: false,modal: true,draggable : false,resizable : false,
        buttons: {
        	Close:function(){
        		$(this).dialog("close");
        	}
        }
	});
	
	//role application part
	var roleApplicationDialog = $('#roleApplicationDialog');
	
	$(roleApplicationDialog).dialog({
	    autoOpen: false,modal: true,draggable : false,resizable : false,
	    width: 800
	});
	
	//load value from role table
	$.each($('table[name=roleTable').find('tbody tr[class!=tr0]'),function(i, elm){
		var appRoleName = $(elm).find('td[name=appRoleName]').text();
		var appRoleDesc = $(elm).find('td[name=appRoleDesc]').text();
		var appRoleId =  $(elm).find('input[name=appRoleId]').val();
		var role = {
			appRoleName : appRoleName,
			appRoleDesc : appRoleDesc,
			appRoleId : appRoleId
		}
		roleApplicationTemp.push(role);
	});
	
	function resetRoleApplicationErrorText(){
		$(roleApplicationDialog).find('font[name=appRoleNullMsg]').hide();
		$(roleApplicationDialog).find('font[name=appRoleLengthMsg]').hide();
		$(roleApplicationDialog).find('font[name=appRoleDescLengthMsg]').hide();
		$(roleApplicationDialog).find('font[name=appRoleErrorMsg]').hide();
	};
	
	$(".header-content-approle").click(function () {
	    $content = $('.content-roleapp');
	    $content.slideToggle(200,function(){
	    	if($content.is(":visible")){ 
	    		$('#rolePanel').find('button[name=openAppRoleDialog]').removeClass("hide");
	    	}
	    	else{ 
	    		$('#rolePanel').find('button[name=openAppRoleDialog]').addClass("hide");
	    	}
	    });
	});
	
	$('#rolePanel').find('button[name=openAppRoleDialog]').click(function(){
		resetRoleApplicationErrorText();
		resetRoleApplicationForm();
		$(roleApplicationDialog).dialog("open");
		return false;
	});
	
	var oldRoleName = "";
	
	$('#rolePanel').find('table[name=roleTable]').on( 'click', '.editBtn', function () {
		resetRoleApplicationErrorText();
		resetRoleApplicationForm();
		var index = $(this).closest('td').parent()[0].sectionRowIndex - 1;
		var role = roleApplicationTemp[index];
		
		oldRoleName = role.appRoleName;
		$(roleApplicationDialog).find('input[name=roleName]').val(role.appRoleName);
		$(roleApplicationDialog).find('textarea[name=roleDesc]').val(role.appRoleDesc);
		$(roleApplicationDialog).find('input[name=appRoleId]').val(role.appRoleId);
		$(roleApplicationDialog).find('input[name=idx]').val(index);
		$(roleApplicationDialog).dialog('open');
		return false;
		
	});
	
	$(roleApplicationDialog).find('.btn-dialog-panel button[name=saveBtn]').click(function() {
		resetRoleApplicationErrorText();
		var roleName = $(roleApplicationDialog).find('input[name=roleName]').val().trim();
		$(roleApplicationDialog).find('input[name=roleName]').val(roleName);
		
		var roleDesc = $(roleApplicationDialog).find('textarea[name=roleDesc]').val();
		var appRoleId = $(roleApplicationDialog).find('input[name=appRoleId]').val();
		
		var role = {
			appId : appId,
			appRoleId : appRoleId,
			appRoleName : roleName,
			appRoleDesc : roleDesc
		}
		
		var canAdd = true;
		
		if(role.appRoleName==''){
			$(roleApplicationDialog).find('font[name=appRoleNullMsg]').show();
			canAdd = false;
		}
		
		if(role.appRoleName.length>100){
			$(roleApplicationDialog).find('font[name=appRoleLengthMsg]').show();
			canAdd = false;
		}
		
		if(role.appRoleDesc.length>250){
			$(roleApplicationDialog).find('font[name=appRoleDescLengthMsg]').show();
			canAdd = false;
		}
		
		if(!canAdd){
			return;
		}
		
		var index = $(roleApplicationDialog).find('input[name=idx]').val();
		if(index){
			
			if(oldRoleName!=roleName){
				if(isDuplicate(role.appRoleName,roleApplicationTemp,'appRoleName')){
					$(roleApplicationDialog).find('font[name=appRoleErrorMsg]').show();
					return;
				}
			}
			
			var url = $(this).attr("action");
			var jsonData = JSON.stringify(role);
			
			//
			$('#dialog-confirm').dialog("open");
        	$('#dialog-confirm').dialog({
        		buttons : [{
    				text : "Confirm",
    	        	click : function(){
    	        		$('#process-loader').show();
    	    			$.ajax({
    	    				url : url,
    	    				type : 'PUT',
    	    				data : jsonData,
    	    				success : function(data) {
    	    					$('#process-loader').hide();
    	    					roleApplicationTemp[index] = role;
    	    					reloadRoleTable();
    	    					resetRoleApplicationForm();
    	    					$('#dialog-confirm').dialog("close");
								$(roleApplicationDialog).dialog('close');
								$("#dialog-success").dialog("open");
    	    				},
    	    				error : function(jqXHR, textStatus, errorThrown) {
    	    					$('#process-loader').hide();
    	    					$("#dialog-error-please-fill").dialog("open");
    	    					resetRoleApplicationForm();
    	    					$('#dialog-confirm').dialog("close");
								$(roleApplicationDialog).dialog('close');
    	    				}
    	    	    	});
    	    			
    	        	}
    	        },{
    	        	text : "Cancel",
    	        	class : "red-btn",
    	        	click : function(){
    	        		$(this).dialog("close");
    	        	}
    	        }]	
        	});
			//
			
		} 
		else {
			if(isDuplicate(role.appRoleName,roleApplicationTemp,'appRoleName')){
				$(roleApplicationDialog).find('font[name=appRoleErrorMsg]').show();
				return;
			}

			var url = $(this).attr("action");
			var jsonData = JSON.stringify(role);
			
			//
			$('#dialog-confirm').dialog("open");
			$('#dialog-confirm').dialog({
				buttons : [{
					text : "Confirm",
					click : function(){
						$('#process-loader').show();
						$.ajax({
							url : url,
							type : 'POST',
							data : jsonData,
							dataType : 'json',
							success : function(data) {
								$('#process-loader').hide();
								role.appRoleId = data.appRoleId;
								roleApplicationTemp.push(role);
								reloadRoleTable();
								resetRoleApplicationForm();
								$('#dialog-confirm').dialog("close");
								$(roleApplicationDialog).dialog('close');
								$("#dialog-success").dialog("open");
							},
							error : function(jqXHR, textStatus, errorThrown) {
								$('#process-loader').hide();
								console.log('error');
								resetRoleApplicationForm();
								$('#dialog-confirm').dialog("close");
								$(roleApplicationDialog).dialog('close');
							}
				    	});
					}
				},{
					text : "Cancel",
					class : "red-btn",
					click : function(){
						$(this).dialog("close");
					}
				}]	
			});
			//
		}
	});
	
	$(roleApplicationDialog).find('.btn-dialog-panel button[name=cancelBtn]').click(function() {
		resetRoleApplicationErrorText();
		$(roleApplicationDialog).dialog('close');
		resetRoleApplicationForm();
	});
	
	$('table[name=roleTable]').on( 'click', '.deleteBtn', function () {
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		var tr = $(this).closest('tr');
		var id = $(tr).find('input[name=appRoleId]').val();
		var url = $(tr).find('input[name=appRoleId]').attr("action") + "/" + id;
		
		$("#dialog-confirm").dialog("open");
		
		 $("#dialog-confirm").dialog({
		        autoOpen: false,modal: true,draggable : false,resizable : false, 
		    	buttons : [{
					text : "Confirm",
		        	click : function(){
		        		$("#dialog-confirm").dialog("close");
		        		$.ajax({
			 				url : url,
			 				type : 'DELETE',
			 				success : function(data) {
			 					if(!data){
			 						roleApplicationTemp.splice(index-1,1);
				 					reloadRoleTable();
				 					$("#dialog-success").dialog("open");
			 					}
			 					else{
			 						$('#deleteRoleTextError').text(data.message);
			 						$("#dialog-error-delete-role").dialog("open");
			 					}
			 				},
			 				error : function(jqXHR, textStatus, errorThrown) {
			 					$("#dialog-error-delete-role").dialog("open");
			 				}
			 	    	});
		        	}
		        },{
		        	text : "Cancel",
		        	class : "red-btn",
		        	click : function(){
		        		$(this).dialog("close");
		        	}
		        }]	
		    });
		
	});
	
	function resetRoleApplicationForm(){
		$(roleApplicationDialog).find('font[name=textError]').text('');
		$(roleApplicationDialog).find('input[name=roleName]').val('');
		$(roleApplicationDialog).find('textarea[name=roleDesc]').val('');
		$(roleApplicationDialog).find('input[name=idx]').val(null);
	}
	
	function reloadRoleTable(){
		var roleTable = $('#rolePanel').find('table[name=roleTable]');
		var roleTableBody = $(roleTable).find('tbody');
		$(roleTableBody).find('tr[class!=tr0]').remove();
		
		$.each(roleApplicationTemp, function(i, role) {
			var row = $(roleTable).find('tbody tr[class=tr0]').clone();
			$(row).removeClass('tr0');
			$(row).find('td[data-idx]').text(++i);
			$(row).find('td[data-rolename]').text(role.appRoleName);
			$(row).find('td[data-roledesc]').text(role.appRoleDesc);
			$(row).find('input[name=appRoleId]').val(role.appRoleId);
			
			if(role.appRoleName=='Default'){
				$(row).find('button').hide();
			}
			
			$(row).show();
			$(roleTableBody).append($(row));
		});
	}

});

