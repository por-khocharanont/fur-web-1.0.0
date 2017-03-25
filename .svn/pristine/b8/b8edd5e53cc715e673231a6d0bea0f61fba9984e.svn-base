var eligibleList = [];
var roleEligibleList = [];
var orgEligibleList =[];
var defaultRole = { appRoleName : 'Default' , appRoleDesc : 'Default Role Application'};

$(function(){
	
	$('#dialog-confirm').dialog({
		autoOpen: false,modal: true,draggable : false,resizable : false,
	});
	
	$applicationForm = $('#applicationForm');
	var appId = $applicationForm.find('input[name=appId]').val();
	
	var eligibleDialog = $('#eligibleDialog');
	
    $(eligibleDialog).find('.auto-orgname').autocomplete({
        select : function(event, ui) {
        	 $(eligibleDialog).find("input[name=orgNameShow]").val(ui.item.label);
        	 $(eligibleDialog).find("input[name=orgname]").val(ui.item.orgdesc);
        	 $(eligibleDialog).find("input[name=orgcode]").val(ui.item.orgcode);
        	 $(eligibleDialog).find("span[name=selectOrgName]").text(ui.item.orgdesc);
        	 $(eligibleDialog).find('div[name=showSelectOrg]').show();
        	 resetOrgEligibleErrorText();
        },
        change: function(event, ui) {
        }
	});
	
	$(eligibleDialog).dialog({
	    autoOpen: false,modal: true,draggable : false,resizable : false,
	    width: 1200
	});
	
	$('#dialog-error-create').dialog({
		autoOpen: false,modal: true,draggable : false,resizable : false,
	});
	
	//load value from eligible table
	$.each($('table[name=eligibleTable').find('tbody tr[class!=tr0]'),function(i, elm){
		var orgname = $(elm).find('td[name=orgname]').text();
		var orgcode =  $(elm).find('input[name=orgcode]').val();
		roleEligibleList = [];
		$.each($(elm).find('td span[name=eligibleSpan]'),function(j, span){
			var eligibleId = $(span).find('input[name=eligibleId]').val();
			var appRoleName = $(span).find('span[name=appRoleName]').text();
			var appRoleId = $(span).find('input[name=appRoleId]').val();
			var role = {
					appRoleName : appRoleName,
					eligibleId : eligibleId,
					appRoleId : appRoleId
				}
			roleEligibleList.push(role);
		});
		var eligible = {
				orgname : orgname,
				orgcode : orgcode,
				roles : roleEligibleList.slice()
		}
		eligibleList.push(eligible);
	});
	
	function resetRoleEligibleErrorText(){
		$(eligibleDialog).find('font[name=appRoleErrorMsg]').hide();
		$(eligibleDialog).find('font[name=appRoleNoItemMsg]').hide();
	};
	
	function resetOrgEligibleErrorText(){
		$(eligibleDialog).find('font[name=orgNameErrorMsg]').hide();
		$(eligibleDialog).find('font[name=orgNameNullMsg]').hide();
		$(eligibleDialog).find('font[name=orgNamePickMsg]').hide();
	};
	
	function resetEligibleErrorText(){
		resetOrgEligibleErrorText();
		resetRoleEligibleErrorText();
	};
	
	$(".header-content-eligible").click(function () {
	    $content = $('.content-eligible');
	    $content.slideToggle(200,function(){
	    	if($content.is(":visible")){ 
	    		$('#eligiblePanel').find('button[name=openEligibleDialog]').removeClass("hide");
	    	}
	    	else{ 
	    		$('#eligiblePanel').find('button[name=openEligibleDialog]').addClass("hide");
	    	}
	    });
	});
	
	$('#eligiblePanel').find('button[name=openEligibleDialog]').click(function(){
		resetEligibleErrorText();
		resetRoleEligible();
		roleEligibleList = [];
		orgEligibleList = [];
		roleEligibleList.push(defaultRole);
		reloadRoleEligibleTable();
		reloadOrgEligibleTable();
		$(eligibleDialog).find('input[name=orgNameShow]').removeAttr("disabled", "disabled");
		$(eligibleDialog).find('div[name=showSelectOrg]').hide();
		$(eligibleDialog).find('div[name=eligibleAddOrgPanel]').show();
		$(eligibleDialog).find('div[name=eligibleOrgPanel]').attr("class","col-md-6");
		$(eligibleDialog).find('div[name=eligibleRolePanel]').attr("class","col-md-6");
		var options = $(eligibleDialog).find('select[name=roleName]');
		
		options.find('option[class!=option0]').remove();

		$.each(roleApplicationTemp, function(i, role) {
//			if(role.appRoleName!='Default'){
				var option = options.find('option[class=option0]').clone();
				$(option).removeClass('option0');
				$(option).text(role.appRoleName);
				$(option).val(role.appRoleName);
				$(option).show();
				$(options).append(option);
//			}
		});
		
		//set default option
		$(options).prop("selectedIndex", 1); 
		$(eligibleDialog).dialog("open");
		return false;
	});
	
	$(eligibleDialog).find('.btn-form-panel button[name=addRoleBtn]').click(function(){
		resetRoleEligibleErrorText();
		var roleName = $(eligibleDialog).find('select[name=roleName]').val();
		
		var canAdd = true;
		
		if(roleName=='0'){
			$(eligibleDialog).find('font[name=appRoleNoItemMsg]').show();
			canAdd = false;
		}
		
		if(isDuplicate(roleName,roleEligibleList,"appRoleName")){
			$(eligibleDialog).find('font[name=appRoleErrorMsg]').show();
			canAdd = false;
		}
		
		if(!canAdd){
			return;
		}
		var options = $(eligibleDialog).find('select[name=roleName]');
		$(options).prop("selectedIndex", 1); 
		
		var role = {
				appRoleName : roleName
		}
		roleEligibleList.push(role);
		reloadRoleEligibleTable();
	});
	
	$(eligibleDialog).find('.btn-form-panel button[name=addOrgBtn]').click(function(){
		resetOrgEligibleErrorText();
		var orgname = $(eligibleDialog).find('input[name=orgname]').val();
		var orgcode = $(eligibleDialog).find('input[name=orgcode]').val();
		
		var canAdd = true;
		var organize = { orgname : orgname,
					orgcode : orgcode
				  }
		
		var orgnameshow = $(eligibleDialog).find('input[name=orgNameShow]').val();
		
		if(orgnameshow!='' && orgname==''){
			$(eligibleDialog).find('font[name=orgNamePickMsg]').show();
			return;
		}
		
		if(orgnameshow==''){
			$(eligibleDialog).find('font[name=orgNameNullMsg]').show();
			return;
		}
		
		if(isDuplicate(orgname,orgEligibleList,"orgname")){
			$(eligibleDialog).find('font[name=orgNameErrorMsg]').show();
			return;
		}
		

		if(isDuplicate(orgname,eligibleList,"orgname")){
			$(eligibleDialog).find('font[name=orgNameErrorMsg]').show();
			return;
		}
		
		if(isDuplicate(orgname,orgEligibleList,"orgname")){
			$(eligibleDialog).find('font[name=orgNameErrorMsg]').show();
			return;
		}
		
		$(eligibleDialog).find('input[name=orgname]').val('');
		$(eligibleDialog).find('input[name=orgcode]').val('');
		$(eligibleDialog).find('input[name=orgNameShow]').val('');
		orgEligibleList.push(organize);
		reloadOrgEligibleTable();
	});
	
	$(eligibleDialog).find('.btn-form-panel button[name=resetRoleBtn]').click(function(){
		resetRoleEligibleErrorText();
		var index = $(eligibleDialog).find('input[name=idx]').val();
		var options = $(eligibleDialog).find('select[name=roleName]');
		$(options).prop("selectedIndex", 1); 
	});
	
	$(eligibleDialog).find('.btn-form-panel button[name=resetOrgBtn]').click(function(){
		resetOrgEligibleErrorText();
		$(eligibleDialog).find('input[name=orgname]').val('');
		$(eligibleDialog).find('input[name=orgcode]').val('');
		$(eligibleDialog).find('input[name=orgNameShow]').val('');
	});
	
	$(eligibleDialog).find('table[name=organizeTable]').on( 'click', '.deleteOrgBtn', function () {
		resetOrgEligibleErrorText();
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		$("#dialog-confirm").dialog("open");
		$("#dialog-confirm").dialog({
			autoOpen: false,modal: true,draggable : false,resizable : false, 
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		orgEligibleList.splice(index-1,1);
	        		reloadOrgEligibleTable();
	        		reloadEligibleTable();
	        		$(this).dialog("close");
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
	
	$(eligibleDialog).find('table[name=roleEligibleTable]').on( 'click', '.deleteRoleBtn', function () {
		resetRoleEligibleErrorText();
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		$("#dialog-confirm").dialog("open");
		$("#dialog-confirm").dialog({
			autoOpen: false,modal: true,draggable : false,resizable : false, 
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		roleEligibleList.splice(index-1,1);
	        		reloadRoleEligibleTable();
	        		reloadEligibleTable();
	        		$(this).dialog("close");
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
	
	$(eligibleDialog).find('.btn-dialog-panel button[name=saveBtn]').click(function(){
		resetEligibleErrorText();
		
		var index = $(eligibleDialog).find('input[name=idx]').val();
		var url = $(this).attr("action");
		if(index){//edit
			var orgname = $(eligibleDialog).find('input[name=orgname]').val();
			var orgcode = $(eligibleDialog).find('input[name=orgcode]').val();
			
			var eligible = {
					orgname : orgname,
					orgcode : orgcode,
					roles : roleEligibleList.slice(),
			}
			
			if(eligible.orgname==''){
				$(eligibleDialog).find('font[name=orgNameNullMsg]').show();
				return;
			}
			
			var postDataList = [];
			$.each(roleEligibleList,function(i,role){
				var data = {
						appRoleName : role.appRoleName,
						orgcode : orgcode,
						orgname : orgname
				}
				postDataList.push(data);
			});
			var data = {
					appId : appId,
					orgcode : orgcode,
					orgname : orgname,
					eligible : postDataList
			}
			
			var jsonData = JSON.stringify(data);
			$("#dialog-confirm").dialog("open");
			
			$("#dialog-confirm").dialog({
				autoOpen: false,modal: true,draggable : false,resizable : false, 
				buttons : [{
					text : "Confirm",
		        	click : function(){
		        		$("#dialog-confirm").dialog("close");
		        		$('#process-loader').show();
		        		$.ajax({
							url : url,
							type : 'PUT',
							data : jsonData,
							success : function(data) {
								$('#process-loader').hide();
								roleEligibleList = [];
								$.each(data.eligible,function(i,role){
									roleEligibleList.push(role)
								});
								
								eligible.roles = roleEligibleList.slice();
								eligibleList[index] = eligible;
								reloadEligibleTable();
								resetRoleEligible();
								$("#dialog-success").dialog("open");
								$("#dialog-confirm").dialog("close");
								$(eligibleDialog).dialog('close');
								
							},
							error : function(jqXHR, textStatus, errorThrown) {
								$('#process-loader').hide();
								$("#dialog-error-create").dialog("open");
								$("#dialog-confirm").dialog("close");
								$(eligibleDialog).dialog('close');
								
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
		else{//insert
			var canAdd = true;
			if(orgEligibleList.length>0){
				$.each(orgEligibleList,function(i,org){
					if(isDuplicate(org.orgname,eligibleList,"orgname")){
						$(eligibleDialog).find('font[name=orgNameErrorMsg]').show();
						return;
					}
				});
				
				$.each(orgEligibleList,function(i,org){
					var postDataList = [];
					$.each(roleEligibleList,function(i,role){
						var data = {
								appRoleName : role.appRoleName,
								orgcode : org.orgcode,
								orgname : org.orgname
						}
						postDataList.push(data);
					});
					
					
					
					var data = {
							appId : appId,
							orgcode : org.orgcode,
							orgname : org.orgname,
							eligible : postDataList
					}
					
					var jsonData = JSON.stringify(data);
					
					//
					$("#dialog-confirm").dialog("open");
					
					$("#dialog-confirm").dialog({
						autoOpen: false,modal: true,draggable : false,resizable : false, 
						buttons : [{
							text : "Confirm",
				        	click : function(){
				        		$('#process-loader').show();
								$.ajax({
									url : url,
									type : 'POST',
									data : jsonData,
									success : function(data) {
										$('#process-loader').hide();
										roleEligibleList = [];
										$.each(data.eligible,function(i,role){
											roleEligibleList.push(role)
										});
										
										var eligible = {
											orgname : org.orgname,
											orgcode : org.orgcode,
											roles : roleEligibleList.slice(),
										}
										
										eligible.roles = roleEligibleList.slice();
										eligibleList.push(eligible);
										reloadEligibleTable();
										$("#dialog-confirm").dialog("close");
										$(eligibleDialog).dialog('close');
										$("#dialog-success").dialog("open");
									},
									error : function(jqXHR, textStatus, errorThrown) {
										$('#process-loader').hide();
										$("#dialog-error-create").dialog("open");
										$("#dialog-confirm").dialog("close");
										$(eligibleDialog).dialog('close');
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
				});
				
//				resetRoleEligible();
//				reloadEligibleTable();
//				$(eligibleDialog).dialog('close');
					
			}else{
				$(eligibleDialog).find('font[name=orgNameNullMsg]').show();
				return;
			}
			
		}
	});
	

	$(eligibleDialog).find('.btn-dialog-panel button[name=cancelBtn]').click(function(){
		resetEligibleErrorText();
		resetRoleEligible();
		$(eligibleDialog).dialog('close');
		
	});
	
	$('table[name=eligibleTable]').on( 'click', '.deleteBtn', function () {
		var index = $(this).closest('td').parent()[0].sectionRowIndex-1;
		
		var url = $(this).attr("action");
		
		var idList = [];
		$.each(eligibleList[index].roles,function(i,role){
			idList.push(role.eligibleId);
		});
		
		$("#dialog-confirm").dialog("open");
		
		$("#dialog-confirm").dialog({
			autoOpen: false,modal: true,draggable : false,resizable : false, 
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		var jsonData = JSON.stringify(idList);
	        		$("#dialog-confirm").dialog("close");
					$.ajax({
						url : url,
						type : 'DELETE',
						data : jsonData,
						success : function(data) {
							eligibleList.splice(index,1);
							reloadEligibleTable();
							$("#dialog-success").dialog("open");
						},
						error : function(jqXHR, textStatus, errorThrown) {
							$("#dialog-delete-error").dialog("open");
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
	
	$('#roleApplicationDialog').find('.btn-dialog-panel button[name=saveBtn]').click(function() {
		var url =  $('#eligiblePanel').find('div[name=reloadEligible]').attr('action');
		url += "/"+appId;
		$('#process-loader').show();
		$.ajax({
			url : url,
			type : 'GET',
			success : function(data) {
				$('#process-loader').hide();
				eligibleList = [];
				$.each(data,function(i,obj){
					var eligible = {
							orgname : obj.orgdesc,
							orgcode : obj.orgcode,
							roles : obj.eligible
					}
					
					eligibleList.push(eligible);
				});
				reloadEligibleTable();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('#process-loader').hide();
				$("#dialog-error-create").dialog("open");
			}
		});
	});
	
	$('#eligiblePanel').find('table[name=eligibleTable]').on( 'click', '.editBtn', function () {
		$(eligibleDialog).find('div[name=showSelectOrg]').hide();
		$(eligibleDialog).find('div[name=eligibleAddOrgPanel]').hide();
		$(eligibleDialog).find('div[name=eligibleOrgPanel]').attr("class","col-md-12");
		$(eligibleDialog).find('div[name=eligibleRolePanel]').attr("class","col-md-12");

		var index = $(this).closest('td').parent()[0].sectionRowIndex - 1;
		
		resetEligibleErrorText();
		resetRoleEligible();
		
		var eligible = eligibleList[index];
		
		roleEligibleList = eligible.roles.slice();
		
		reloadRoleEligibleTable();
		
		
		var options = $(eligibleDialog).find('select[name=roleName]');
		options.find('option[class!=option0]').remove();
		
		$.each(roleApplicationTemp, function(i, role) {
//			if(role.appRoleName!='Default'){
				var option = options.find('option[class=option0]').clone();
				$(option).removeClass('option0');
				$(option).text(role.appRoleName);
				$(option).val(role.appRoleName);
				$(option).show();
				$(options).append(option);
//			}
		});
		
		var options = $(eligibleDialog).find('select[name=roleName]');
		$(options).prop("selectedIndex", 1); 
		
		$(eligibleDialog).find('input[name=orgNameShow]').val(eligible.orgname);
		$(eligibleDialog).find('input[name=orgname]').val(eligible.orgname);
		$(eligibleDialog).find('input[name=orgcode]').val(eligible.orgcode);
		$(eligibleDialog).find('input[name=orgNameShow]').attr("disabled", "disabled");
		
		
		$(eligibleDialog).find('input[name=idx]').val(index);
		$(eligibleDialog).dialog('open');
		
	});
	
	function resetRoleEligible(){
		$(eligibleDialog).find('input[name=idx]').val(null);
		$(eligibleDialog).find("input[name=orgname]").val('');
		$(eligibleDialog).find("input[name=orgNameShow]").val('');
		$(eligibleDialog).find("span[name=selectOrgName]").text('');
		$(eligibleDialog).find('div[name=showSelectOrg]').hide();
	}
	
	function reloadEligibleTable(){
		
		var table = $('#eligiblePanel').find('table[name=eligibleTable]');
		var eligibleTableBody = $(table).find('tbody');
		$(eligibleTableBody).find('tr[class!=tr0]').remove();
		$.each(eligibleList, function(i, eligible) {
			var row = $(table).find('tbody tr[class=tr0]').clone();
			$(row).removeClass('tr0');
			$(row).find('td[data-idx]').text(++i);
			$(row).find('td[data-orgname]').text(eligible.orgname);
			$(row).find('input[name=orgcode]').val(eligible.orgcode);
			var role_text = "";
			$.each(eligible.roles,function(i,role){
				role_text += (i+1)+". "+role.appRoleName;
				if(i<eligible.roles.length-1){
					role_text += '<br />';
				}
				
			});
			
			$(row).find('td[data-role]').html(role_text);
			$(row).show();
			$(eligibleTableBody).append($(row));
		});
	}
	
	function reloadOrgEligibleTable(){
		var table = $(eligibleDialog).find('table[name=organizeTable]');
		var orgEligibleTableBody = $(table).find('tbody');
		$(orgEligibleTableBody).find('tr[class!=tr0]').remove();
		$.each(orgEligibleList, function(i, org) {
			var row = $(table).find('tbody tr[class=tr0]').clone();
			$(row).removeClass('tr0');
			$(row).find('td[data-idx]').text(++i);
			$(row).find('td[data-orgname]').text(org.orgname);
			
			$(row).show();
			$(orgEligibleTableBody).append($(row));
		});
	}
	
	function reloadRoleEligibleTable(){
		var table = $(eligibleDialog).find('table[name=roleEligibleTable]');
		var roleEligibleTableBody = $(table).find('tbody');
		$(roleEligibleTableBody).find('tr[class!=tr0]').remove();
		$.each(roleEligibleList, function(i, role) {
			var row = $(table).find('tbody tr[class=tr0]').clone();
			$(row).removeClass('tr0');
			$(row).find('td[data-idx]').text(++i);
			$(row).find('td[data-rolename]').text(role.appRoleName);
			if(role.appRoleName=='Default'){
				$(row).find('button').hide();
			}
			$(row).show();
			$(roleEligibleTableBody).append($(row));
		});
	}
	
});