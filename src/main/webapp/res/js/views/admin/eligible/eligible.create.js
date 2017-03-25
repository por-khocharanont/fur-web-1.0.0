$(document).ready(function () {
	
	//temp eligible before submit
	var eligibleTemp = [];	
	
	var $form = $('#createForm');
	
	/** autocomplete appName fix status = active */
	$('.auto-appName').autocomplete({
		  select: function( event, ui ) {
			  $('#appId').val(ui.item.appId);
			  $('#appName').val(ui.item.appName);
			
			  $('#checkAllRole').prop('checked', true);
			  $('#txMsg').hide();
			  $('#txMsgApp').hide();
			  $('#txMsgApp2').hide();
			  $('#txMsgAppLength').hide();
			  checkAllRole();
			  
			  getRole(ui.item.appId);
		  },
		  change: function( event, ui ) {
			  
			  if(ui.item == null){
				  $('#div-role').hide();
				  $('#checkAllRole').prop('checked', false);
				  $('#selectRole option').remove();
				 // $('#txMsgApp').show();
				  $('#appId').val("");
			  }else{
				  $('#txMsgApp').hide();
			  }
			 
			  
		  }
	});
	
	
    
    /** autocomplete orgDesc */
    $('.auto-orgDesc').autocomplete({
	        select : function(event, ui) {
	            $('#orgDesc').val(ui.item.orgDesc);
	            $('#orgCode').val(ui.item.orgCode);
	            $('#txMsg').hide();
	            $('#txMsgOrgName').hide();
	            $('#txMsgOrgName2').hide();
	            $('#txMsgOrgNameLength').hide();
	        },
			  change: function( event, ui ) {
				  
				  if(ui.item == null){
					 // $('#txMsgOrgName').show();
					  $('#orgCode').val("");
				  }else{
					  $('#txMsgOrgName').hide();
				  }
				  
			  }
	});
    
    
    
    //Show App Role
	function getRole(appId){
		
        var actionAppRole = $('#selectRole').attr('action');
		
		//$("#div-role").hide();
		
		var strValue = "appId="+appId;
		
		$.get(actionAppRole
			, strValue
			,function(data){
				var txOption = '';
				$.each(data.applicationRoleList,function(key,val){
					txOption += '<option value="'+val["appRoleId"]+'">'+val["appRoleName"]+'</option>';							
				}); 				 				
				$("#selectRole").html(txOption);
				
				$("#div-role").show();
		});
	}
	
	
	function checkAllRole () {
	    if ($('#checkAllRole').is(':checked')) {
	    	$('#selectRole').prop('disabled', 'disabled');
	    }
	    else {
	        
	        $('#selectRole').prop('disabled', false);
	    }
	  }
	
	$('#checkAllRole').change(function(){
		
		checkAllRole(); 
	  
	});
	
	function validateForm($form) {
		
		var isValid = true;
		
		$form.find("#txMsgOrgName").hide();
		$form.find("#txMsgOrgName2").hide();
		$form.find("#txMsgApp").hide();
		$form.find("#txMsgApp2").hide();
		$form.find("#txMsgOrgNameLength").hide();
		$form.find("#txMsgAppLength").hide();
		
		//alert($form.find("#orgName").val().length);
		
		if ($form.find("#orgName").val() == "") {
			$form.find("#txMsgOrgName").show();
			$form.find("#txMsgOrgName2").hide();
			$form.find("#txMsgOrgNameLength").hide();
			isValid = false;
		}
		if ($form.find("#orgCode").val() == "" && $form.find("#orgName").val() != "") {
			$form.find("#txMsgOrgName2").show();
			$form.find("#txMsgOrgName").hide();
			$form.find("#txMsgOrgNameLength").hide();
			isValid = false;
		}
//		if ($form.find("#orgName").val().length > 100) {
//			$form.find("#txMsgOrgName").hide();
//			$form.find("#txMsgOrgName2").hide();
//			$form.find("#txMsgOrgNameLength").show();
//			isValid = false;
//		}
		
		if ($form.find("#appName").val() == "") {
			$form.find("#txMsgApp").show();
			$form.find("#txMsgApp2").hide();
			$form.find("#txMsgAppLength").hide();
			isValid = false;
		}
		
		if ($form.find("#appId").val() == "" && $form.find("#appName").val() != "") {
			$form.find("#txMsgApp2").show();
			$form.find("#txMsgApp").hide();
			$form.find("#txMsgAppLength").hide();
			isValid = false;
		}
//		if ($form.find("#appName").val().length > 100) {
//			$form.find("#txMsgApp").hide();
//			$form.find("#txMsgApp2").hide();
//			$form.find("#txMsgAppLength").show();
//			isValid = false;
//		}
		
		return isValid;

	}
	
	$('#addBtn').click(function(){
		
		$("#txMsg").hide();
		
		 var orgCode = $('#orgCode').val();
		 var orgName = $('#orgName').val();
		 var appName = $('#appName').val();
		 var appId = $('#appId').val();
		 var orgDesc = $('#orgDesc').val();
		 
		 var isValid = validateForm($form);
		 
		 if(isValid){
			 
			 if ($('#checkAllRole').is(':checked')) {
				 
				var eligibleList = [];
				var chkExist = 0;
				 
				 $("#selectRole option").each(function(){
					 var va = $(this).val();
					 var te = $(this).text();
					 
					 var eligible = {
							 orgCode : orgCode,
							 orgName : orgDesc,
							 appName : appName,
							 appRoleName : te,
							 appRoleId : va
							};
					 
					 if(!containsObject(eligible, eligibleTemp)){
						 eligibleList.push(eligible);
					 }
				 });
				 
				 if(eligibleList.length != 0){
					 
					 for (var i=0; i<eligibleList.length; i++) {
						 
						 eligibleTemp.push(eligibleList[i]);
			
					 }

				 }else{
					 $("#txMsg").show(); 
				 }

				 
			 }
			 else{
				 
				 var appRoleName = $("#selectRole option:selected").text();
				 var appRoleId = $('#selectRole').val();
				 
				 var eligible = {
						 orgCode : orgCode,
						 orgName : orgDesc,
						 appName : appName,
						 appRoleName : appRoleName,
						 appRoleId : appRoleId
						};
				 
				 if(!containsObject(eligible, eligibleTemp)){
					 
					 eligibleTemp.push(eligible);
				 }
				 else{
					 $("#txMsg").show();
				 }
				 
			 }
			 
			 
			 
			 
			 reloadEligibleTable();
		 }
		 
		 
	  
	});
	
	function reloadEligibleTable(){

		var eligibleTable = $('#eligiblePanel').find('table[name=eligibleTable]');
		var eligibleTableBody = $(eligibleTable).find('tbody');
		
		$(eligibleTableBody).find('tr[class!=tr0]').remove();
		
		
		if(eligibleTemp.length != 0){
			
			$.each(eligibleTemp, function(i, eligible) {
				var row = $(eligibleTable).find('tbody tr[class=tr0]').clone();
				$(row).removeClass('tr0');
				
				$(row).find('td[data-idx]').text(++i);
				$(row).find('td[data-orgCode]').text(eligible.orgCode);
				$(row).find('td[data-orgName]').text(eligible.orgName);
				$(row).find('td[data-appName]').text(eligible.appName);
				$(row).find('td[data-appRoleName]').text(eligible.appRoleName);
				$(row).find('td[data-appRoleId]').text(eligible.appRoleId);
				
				$(row).show();
				
				$(eligibleTableBody).append($(row));
				
				$('#eligiblePanel').show();
			});
		}
		else{
			$('#eligiblePanel').hide();
			$("#txMsg").hide();
		}
		
		
		
		
	}
	
	$('table[name=eligibleTable]').on( 'click', '.remove', function () {
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		eligibleTemp.splice(index-1,1);
		reloadEligibleTable();
	});
	
	
	$('#submitBtn').click(function(){
		
		$("#dialog-create-confirm").dialog("open");
		
	});
	
	
	 $("#dialog-create-success").dialog({
         autoOpen: false, 
         modal: true,
         buttons: {
            Close: function() {
            	
            	$(this).dialog("close");
            	
            	var actionRedirect = $('#cancelBtn').attr('href');
            	
            	window.location.href = actionRedirect;
            	
            }
         },
      });
	 
	 
	 $("#dialog-create-error").dialog({
         autoOpen: false, 
         modal: true,
         buttons: {
            Close: function() {$(this).dialog("close");}
         },
      });
	 
	 
	 $("#dialog-create-confirm").dialog({
         autoOpen: false, 
         modal: true,
         buttons : [{
	        	text : "Confirm",
	        	click : function(){

		 			var eligibleList = [];
		 			var actionUrl = $("#createForm").attr('action');
		 			
		 			$.each(eligibleTemp, function(i, eligible) {
		 				
		 				var orgCode = eligible.orgCode;
		 				
		 				var appRoleId = eligible.appRoleId;
		 				
		 				var eli = {
		 						 orgcode : orgCode,
		 						 appRoleId : appRoleId
		 						};
		 				
		 				eligibleList.push(eli);
		 			});
		 			
		 			
		 			var jsonData = JSON.stringify(eligibleList);
		 			
		 			$("#dialog-create-confirm").dialog("close");
	        		$('#process-loader').show();
		 			$.ajax({
		 	            url : actionUrl,
		 	            type : 'POST',
		 	            data : jsonData,
		 	            success : function(data) {
		 	               $("#dialog-create-success").dialog("open");
		 	               
		 	            },
		 	            error : function(jqXHR, textStatus, errorThrown) {
		 	            	$("#dialog-create-error").dialog("open");
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
	 
	 
	 function containsObject(obj, list) {
		 
		 for (var i=0; i<list.length; i++) {
			 
		     if (JSON.stringify(list[i]) === JSON.stringify(obj) ) {
		             return true;
		     }
		 }
		 
		 return false;
		 
	}
	 

   
});