$(function(){
	
	var status_approve ="1";
	var status_reject ="2";
	
	//render flow
	var currentStep = $('#currentStep').val();
	$.each($('div[name=flow-box]'),function(i, elm){
		if($(elm).attr('value')!=currentStep){
			$(elm).hide();
		}
	});
	
	$('button[name=showFlowDetail]').click(function(e){
		e.preventDefault();
		var clickStep = $(this).attr('value');
		$.each($('div[name=flow-box]'),function(i, elm){
			$(elm).hide();
			if($(elm).attr('value')==clickStep){
				$(elm).show();
			}
		});
	});
	
	$("#userInfoDialog").dialog({
		autoOpen: false,modal: true,draggable : false,resizable : false, 
		width: 700,
	});
	
	$("#submitDialog").dialog({
		autoOpen: false,modal: true,draggable : false,resizable : false, 
		width: 800
	});
	
	 $("#dialog-reject-error").dialog({
		 autoOpen: false,modal: true,draggable : false,resizable : false,  
         buttons: {
        	 Close: function() {$(this).dialog("close");}
         },
      });
	 
	 $("#dialog-token-error").dialog({
		 autoOpen: false,modal: true,draggable : false,resizable : false, 
         buttons: {
        	 Close: function() {$(this).dialog("close");}
         },
      });
	 
	 $("#dialog-role-error").dialog({
		 autoOpen: false,modal: true,draggable : false,resizable : false, 
         buttons: {
        	 Close: function() {$(this).dialog("close");}
         },
      });
	 
	 $("#dialog-approve-error").dialog({
		 autoOpen: false,modal: true,draggable : false,resizable : false,  
         buttons: {
        	 Close: function() {$(this).dialog("close");}
         },
      });
	 
	 $("#dialog-success").dialog({
		 autoOpen: false,modal: true,draggable : false,resizable : false,  
         buttons: {
        	 Close: function() {
            	var actionRedirect = $('#successURL').attr('action');
            	console.log(actionRedirect);
            	window.location.href = actionRedirect;
	 			$(this).dialog("close");
            }
         },
      });
	 
	$('#detailForm').find('a').click(function(){
		var url = $(this).attr('action');
		var requestNo = $('p[name=requestNo]').text();
		window.location.href = url+requestNo;
	});
	
	$('button[name=approveBtn]').click(function() {
		var index = $(this).closest('td').parent()[0].sectionRowIndex + 1;
    	$('button[name=approveBtn][value='+index+']').addClass('btn-green');
    	$('button[name=rejectBtn][value='+index+']').removeClass('btn-danger');
    	$("#approveStatusOf"+index).val(status_approve);
    });
	
	$('button[name=rejectBtn]').click(function() {
		var index = $(this).closest('td').parent()[0].sectionRowIndex + 1;
    	$('button[name=approveBtn][value='+index+']').removeClass('btn-green');
    	$('button[name=rejectBtn][value='+index+']').addClass('btn-danger');
    	$("#approveStatusOf"+index).val(status_reject);
    });
	
	$('button[name=approveAll]').click(function() {
		$('button[name=approveBtn]').addClass('btn-green');
		$('button[name=rejectBtn]').removeClass('btn-danger');
		$('input[name=approveStatus]').val(status_approve);
    });
	
	$('button[name=rejectAll]').click(function() {
		$('button[name=approveBtn]').removeClass('btn-green');
		$('button[name=rejectBtn]').addClass('btn-danger');
		$('input[name=approveStatus]').val(status_reject);
    });
	
	$('#fileUpload').MultiFile({
		accept : 'xls|xlsx|doc|docx|txt|zip|rar|7z',
		max	: 1,
		maxfile : 1000,
		list : '#fileTemplateList',
		STRING: {	
			remove: '<img class="delete" src="/fur-web/res/img/icon/delete.png">',
			denied: 'รองรับประเภทไฟล์แบบ .xls ,.xlsx ,.doc ,.docx ,.txt ,.zip ,.rar ,.7z',
			duplicate: 'ตรวจสอบพบชื่อไฟล์ซ้ำ กรุณาตรวจสอบชื่อไฟล์',
			toobig: 'ไฟล์มีขนาดเกิน 1 mb',
			toomany: 'ไฟล์เกินจำนวนที่กำหนด 1 ไฟล์'
		},
		afterFileSelect: function(element, value, master_element) {
			var new_total_file = ($('div[name=browseBtn]').find('.upload').length) - 1;
			checkLengthFileTemplate(0,new_total_file);
		},
		afterFileRemove: function(element, value, master_element) {
			var new_total_file = ($('div[name=browseBtn]').find('.upload').length) - 1;
			checkLengthFileTemplate(0,new_total_file);
		}
	});
	
	function checkLengthFileTemplate(currentCount,newCount){
		currentCount = parseInt(currentCount);
		newCount = parseInt(newCount);
		if(1 > (currentCount + newCount)){
			$("div[name=browseBtn]").show();
		}
		else{
			$("div[name=browseBtn]").hide();
		}
	}
	
	$('button[name=submitBtn]').click(function(){
		$('font[name=remarkLengthMsg]').hide();
		$('#approveForm')[0].reset();
		
		var openSubmit = true;
		var openRoleError = false;
		var isAllReject = true;
		var currentStep = $('#currentStep').val();
		
		var requestType = $('input[name=requestType]').val();
		if(currentStep==5 && requestType!='Terminate'){
			$.each($('table[name=userListTable]').find('tbody tr'),function(i, elm){
				var tokenSerialNumber = $(elm).find('input[name=tokenSerialNumber]').val();
				var approveStatus = $(elm).find('input[name=approveStatus]').val();
				
				if(approveStatus=='1'){
					if(tokenSerialNumber!=null && tokenSerialNumber.length<=0){
						openSubmit = false;
					}
					
					isAllReject = false;
				}
				
			});
			
			var roleName = $('#detailForm').find('select[name=appRole] option:selected').text();
			if(roleName=='Default'){
				openRoleError = true;
			}
		}
		
		
		alert('check');
		return;
		
		if(openRoleError){
			if(!isAllReject){
				$("#dialog-role-error").dialog("open");	
				return;
			}
			
			$("#submitDialog").dialog("open");
			
		}
		else{
			if(openSubmit){
				$("#submitDialog").dialog("open");
			}
			else{
				 $("#dialog-token-error").dialog("open");	
			}
		}
	});
	
	$('button[name=backBtn]').click(function(){
		var actionRedirect = $(this).attr('action');
    	window.location.href = actionRedirect;
	});
	
	$('#submitDialog').find('.btn-dialog-panel button[name=cancelBtn]').click(function() {
		$('#submitDialog').dialog("close");
	});
	
	$('input[name=tokenSerialNumber]').on('blur',function(){
		var token = $(this).val().trim();
		$(this).val(token);
	});
	
	$('table[name=userListTable').find('u[name=username]').click(function(i,elm){
		
		var userInfo = $(this).next();
		var username = $(userInfo).find('input[name=username]').val();
		var enfullname = $(userInfo).find('input[name=enfullname]').val();
		var email = $(userInfo).find('input[name=email]').val();
		var phone = $(userInfo).find('input[name=phone]').val();
		var mobile = $(userInfo).find('input[name=mobile]').val();
		var organize = $(userInfo).find('input[name=organize]').val();
		var company = $(userInfo).find('input[name=company]').val();
		var position = $(userInfo).find('input[name=position]').val();
		var tokenSerialNumber = $(userInfo).find('input[name=token]').val();
		var urStatus = $(userInfo).find('input[name=status]').val();
		var urStatusText = $(userInfo).find('input[name=statusText]').val();
		var urStepRemark = $(userInfo).find('input[name=ur_step_remark]').val();
		
		$("#userInfoDialog").find('p[name=username]').text(username);
		$("#userInfoDialog").find('p[name=name]').text(enfullname);
		$("#userInfoDialog").find('p[name=email]').text(email);
		$("#userInfoDialog").find('p[name=phone]').text(phone);
		$("#userInfoDialog").find('p[name=mobile]').text(mobile);
		$("#userInfoDialog").find('p[name=organize]').text(organize);
		$("#userInfoDialog").find('p[name=company]').text(company);
		$("#userInfoDialog").find('p[name=position]').text(position);
		
		$("#userInfoDialog").find('div[name=tokenSerialLabel]').show();
		$("#userInfoDialog").find('p[name=token]').text(tokenSerialNumber);
		if(!tokenSerialNumber){
			$("#userInfoDialog").find('div[name=tokenSerialLabel]').hide();
		}
		
		$("#userInfoDialog").find('p[name=status]').text(urStatusText);
		if(urStatus=='3'){
			$("#userInfoDialog").find('p[name=status]').text(urStepRemark);
		}
		$('#userInfoDialog').dialog("open");
	});
	
	
	 $("#dialog-confirm").dialog({
		 autoOpen: false,modal: true,draggable : false,resizable : false, 
		buttons : [{
		text : "Confirm",
		click : function(){
				var urId = $('#detailForm').find('input[name=urId]').val();
	    		var userApproveList = [];
	    		
	    		var roleName = $('#detailForm').find('select[name=appRole] option:selected').text();
	    		var roleId = $('#detailForm').find('select[name=appRole] option:selected').val();
	    		
	    		$.each($('table[name=userListTable]').find('tbody tr'),function(i, elm){
	    			var urStatus = $(elm).find('input[name=urStatus]').val();
	    			var username = $(elm).find('input[name=username]').val();
	    			var tokenSerialNumber = $(elm).find('input[name=tokenSerialNumber]').val();
	    			
	    			var approveStatus = $(elm).find('input[name=approveStatus]').val();
	    			var userInfo = { username : username,
	    								approveStatus : approveStatus, 
	    								tokenSerialNumber : tokenSerialNumber };
	    			
	    			console.log(userInfo);
	    			
	    			if(urStatus!=3){
	    				userApproveList.push(userInfo);
	    			}
	    		});
	    		
	    		var urApproveObj = { urId : urId };
	    		var urApproveList = [];
	    		urApproveList.push(urApproveObj);
	    		
	    		var dataParams = {
	    				appRoleName : roleName,
	    				appRoleId : roleId,
	    				userApproveList : userApproveList,
	    				urApproveList : urApproveList
	    		};
	    		
	    	 	var jsonData = JSON.stringify(dataParams);
	    	 	console.log(jsonData);
	    	    $('#approveForm').find('input[name=jsonData]').val(jsonData);
	
	    	    $("#submitDialog").dialog("close");
				$(this).dialog("close");
	    	    $('#process-loader').show();
	    	    $("#approveForm").ajaxSubmit({
	    	    	success : function(data) {	
	    	    		$('#process-loader').hide();
	    	    		if(data){
	    	    			$("#dialog-success").dialog("open");
	    	    		}
	    	    		else{
	    	    			$("#dialog-approve-error").dialog("open");
	    	    		}
	    			},
	    			error : function() {
	    				$('#process-loader').hide();
	    				$("#dialog-approve-error").dialog("open");
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
	
	
	$('#submitDialog').find('.btn-dialog-panel button[name=saveBtn]').click(function() {
		$('font[name=remarkLengthMsg]').hide();
		var remark =  $('#approveForm').find('textarea[name=remark]').val();
		
		if(remark.length>250){
			$('font[name=remarkLengthMsg]').show();
			return;
		}
		else{
			$('font[name=remarkLengthMsg]').hide();
		}
		
		 $("#dialog-confirm").dialog("open");
		
		
	});
	
});