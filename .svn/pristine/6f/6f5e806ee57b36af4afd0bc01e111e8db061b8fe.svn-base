var appOwnerPersonList = [];
var appOwnerPersonTeamList = [];
var appOwnerTeamList = [];
$(function(){
	
	var appOwnerPersonDialog = $('#appOwnerPersonDialog');
	var appOwnerTeamDialog = $('#appOwnerTeamDialog');
	
	 $(appOwnerPersonDialog).dialog({
         autoOpen: false,draggable : false,resizable : false, 
         width : 800
     });
	 
	 $(appOwnerTeamDialog).dialog({
         autoOpen: false,draggable : false,resizable : false, 
         width : 800
     });
	 
	 $('#dialog-warning-change-type').dialog({
		autoOpen: false,draggable : false,resizable : false,
	 });
 
	$('#dialog-confirm').dialog({
		autoOpen: false,draggable : false,resizable : false,
	})
	 
	$("#dialog-error-please-fill").dialog({
		autoOpen: false,draggable : false,resizable : false,
		buttons : {
			Close : function(){
				$(this).dialog("close");
	    	}
	    }
	});
	
	 $("#dialog-success").dialog({
         autoOpen: false,draggable : false,resizable : false, 
         modal: true,
         buttons: {
	 		Close:function() {
	 			$(this).dialog("close");
	 		}
         }
	 });
	 
	 $("#dialog-error-create").dialog({
         autoOpen: false,draggable : false,resizable : false, 
         modal: true,
         buttons: {
	 		Close:function() {
	 			$(this).dialog("close");
	 		}
         }
	 });
		 
    $(appOwnerPersonDialog).find(".auto-username-fullname").autocomplete({
    	select : function(event, ui) {
    		$(appOwnerPersonDialog).find("input[name=usernameShow]").val(ui.item.label);
		    $(appOwnerPersonDialog).find("input[name=username]").val(ui.item.username);
		    $(appOwnerPersonDialog).find("input[name=name]").val(ui.item.name);
		    $(appOwnerPersonDialog).find("span[name=selectUser]").text(ui.item.name);
		    $(appOwnerPersonDialog).find("input[name=userId]").val(ui.item.userId);
		    $(appOwnerPersonDialog).find('div[name=showSelectUser]').show();
		    resetAppOwnerErrorTextPerson();
		},
		change: function(event, ui) {
			
		}
    });
  
    $(appOwnerTeamDialog).find(".auto-username-fullname").autocomplete({
    	select : function(event, ui) {
    		$(appOwnerTeamDialog).find("input[name=usernameShow]").val(ui.item.label);
    		$(appOwnerTeamDialog).find("input[name=username]").val(ui.item.username);
    		$(appOwnerTeamDialog).find("input[name=name]").val(ui.item.name);
    		$(appOwnerTeamDialog).find("span[name=selectUser]").text(ui.item.name);
    		$(appOwnerTeamDialog).find("input[name=userId]").val(ui.item.userId);
    		$(appOwnerTeamDialog).find('div[name=showSelectUser]').show();
    		resetAppOwnerErrorTextTeam();
    	},
    	change: function(event, ui) {
    		
    	}
    });
    
	$(".header-content-appowner").click(function () {
		$content = $('.content-appowner');
		$content.slideToggle(200,function(){
			if($content.is(":visible")){ 
				$('#appOwnerPanel').find('button[name=show]').removeClass("hide");
				$('#appOwnerPanel').find('button[name=saveBtn]').removeClass("hide");
			}
			else{ 
				$('#appOwnerPanel').find('button[name=show]').addClass("hide");
				$('#appOwnerPanel').find('button[name=saveBtn]').addClass("hide");
			}
		});
	});
	 
	
	$("#appOwnerPanel").find('input[name=minimum]').on('change keyup', function() {
		var val = $("#appOwnerPanel").find('input[name=minimum]').val();
		var max = $("#appOwnerPanel").find('input[name=minimum]').attr("max");
		var min = $("#appOwnerPanel").find('input[name=minimum]').attr("min");
		
		if(val==''){
			$("#appOwnerPanel").find('input[name=minimum]').val(min);
			return;
		}
		
		val = parseInt(val);
		max = parseInt(max);
		min = parseInt(min);
		
		if(val>max){
			val = max;
		}
		
		if(val<min){
			val = min;
		}
		
		$("#appOwnerPanel").find('input[name=minimum]').val(val);
	});	
    
	//render part
	$('#appOwnerPanel').find('div[name=minimum]').hide();
	var appOwnerType = $('#appOwnerPanel').find('input[name=appOwnerType]:checked').val();
	var approveType;
	if(appOwnerType=='person'){
		$('#appOwnerPanel').find('div[name=appTeamApproveType]').hide();
		$('#appOwnerPanel').find('table[name=appOwnerTeamTable]').hide();

		approveType = $('#appOwnerPanel').find('input[name=appPersonApproveType]:checked').val();
		
		if(approveType == '2'){
			$('#appOwnerPanel').find('div[name=minimum]').show();
		}
	}
	else if(appOwnerType=='team'){
		$('#appOwnerPanel').find('div[name=appPersonApproveType]').hide();
		$('#appOwnerPanel').find('table[name=appOwnerPersonTable]').hide();
		approveType = $('#appOwnerPanel').find('input[name=appTeamApproveType]:checked').val();
	}
	
	$('#appOwnerPanel').find('input[name=appPersonApproveType]').change(function(){
		$('#appOwnerPanel').find('div[name=minimum]').hide();
		
		var appOwnerType = $('#appOwnerPanel').find('input[name=appOwnerType]:checked').val();
		var approveType = $('#appOwnerPanel').find('input[name=appPersonApproveType]:checked').val();
		
		if(appOwnerType=='person'){
			//minimum = 2
			if(approveType=='2'){
				$('#appOwnerPanel').find('div[name=minimum]').show();
				var minVal = $('#appOwnerPanel').find('input[name=minimum]').attr('min');
				 $('#appOwnerPanel').find('input[name=minimum]').val(minVal);
			}
		}
	});
	
	$('#appOwnerPanel').find('input[name=appOwnerType]').change(function(){
		resetAppOwnerErrorTextPerson();
		resetAppOwnerErrorTextTeam();
		var tempType = $('#appOwnerPanel').find('input[name=appOwnerType]:checked').val();
		var radios =  $('#appOwnerPanel').find('input[name=appOwnerType]');
		if(tempType=='person'){
			$(radios).filter('[value=team]').prop('checked', true);
		}
		if(tempType=='team'){
			$(radios).filter('[value=person]').prop('checked', true);
		}
		
		
		$('#dialog-warning-change-type').dialog('open');
		
		$("#dialog-warning-change-type").dialog({
			autoOpen: false,draggable : false,resizable : false, 
			modal: true,
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		var swapType = $('#appOwnerPanel').find('input[name=appOwnerType]:checked').val();
					var radioType =  $('#appOwnerPanel').find('input[name=appOwnerType]');
					if(swapType=='person'){
						$(radioType).filter('[value=team]').prop('checked', true);
					}
					if(swapType=='team'){
						$(radioType).filter('[value=person]').prop('checked', true);
					}
					
					var appOwnerType = $('#appOwnerPanel').find('input[name=appOwnerType]:checked').val();
					$('#appOwnerPanel').find('div[name=minimum]').hide();
					
					appOwnerPersonList = [];
					appOwnerPersonTeamList = [];
					appOwnerTeamList = [];
					reloadAppOwnerPersonTable();
					reloadAppOwnerTeamTable();
					
					if(appOwnerType=='person'){
						 var radios = $('#appOwnerPanel').find('input[name=appPersonApproveType]');
						 $(radios).filter('[value=1]').prop('checked', true);
						 
						$('#appOwnerPanel').find('div[name=appPersonApproveType]').show();
						$('#appOwnerPanel').find('div[name=appTeamApproveType]').hide();
						$('#appOwnerPanel').find('table[name=appOwnerPersonTable]').show();
						$('#appOwnerPanel').find('table[name=appOwnerTeamTable]').hide();
						    
					}else if(appOwnerType=='team'){
						 var radios =  $('#appOwnerPanel').find('input[name=appTeamApproveType]');
						 $(radios).filter('[value=4]').prop('checked', true);
						
						$('#appOwnerPanel').find('div[name=appPersonApproveType]').hide();
						$('#appOwnerPanel').find('div[name=appTeamApproveType]').show();
						$('#appOwnerPanel').find('table[name=appOwnerPersonTable]').hide();
						$('#appOwnerPanel').find('table[name=appOwnerTeamTable]').show();
						    
					}
					
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
	
	//load value from table to personlist
	$.each($('table[name=appOwnerPersonTable').find('tbody tr[class!=tr0]'),function(i, elm){
		var username = $(elm).find('td[name=username]').text();
		var name = $(elm).find('td[name=enfullname]').text();
		var userId = $(elm).find('input[name=userId]').val();
		var user = {
			username : username,
			name : name,
			userId : userId
		}
		appOwnerPersonList.push(user);
	});
	
	//load value from table to teamlist
	$.each($('table[name=appOwnerTeamTable').find('tbody tr[class!=tr0]'),function(i, elm){
		var teamName = $(elm).find('td[name="teamName"]').text();
		
		appOwnerPersonTeamList = [];
		$.each($(elm).find('td span[name=appOwnerMemberSpan]'),function(j, span){
			var username = $(span).find('input[name=username]').val();
			var name = $(span).find('span[name=enfullname]').text();
			var userId = $(span).find('input[name=userId]').val();
			var user = {
				username : username,
				name : name,
				userId : userId
			}
			appOwnerPersonTeamList.push(user);
		});
		
		var team = {
				name : teamName,
				member : appOwnerPersonTeamList
		}
		
		appOwnerTeamList.push(team);
	});
	
	reloadAppOwnerPersonTable();
	reloadAppOwnerTeamTable();
	
	$("#appOwnerPanel").find('input[name=minimum]').on('change keyup', function() {
		var val = $("#appOwnerPanel").find('input[name=minimum]').val();
		var max = $("#appOwnerPanel").find('input[name=minimum]').attr("max");
		var min = $("#appOwnerPanel").find('input[name=minimum]').attr("min");
		
		if(val>max){
			val = max;
		}
		
		if(val<min){
			val = min;
		}
		
		$("#appOwnerPanel").find('input[name=minimum]').val(val);
		
	});
	
	//init hide text error
	resetAppOwnerErrorTextPerson();
	resetAppOwnerErrorTextTeam();
	
	function resetAppOwnerErrorTextPerson(){
		 $(appOwnerPersonDialog).find('font[name=userErrorMsg]').hide();
		 $(appOwnerPersonDialog).find('font[name=userNullMsg]').hide();
		 $(appOwnerPersonDialog).find('font[name=userPickMsg]').hide();
		 $('font[name=appOwnerNullMsg]').hide();
	}
	
	function resetAppOwnerErrorTextTeam(){
		 $(appOwnerTeamDialog).find('font[name=userErrorMsg]').hide();
		 $(appOwnerTeamDialog).find('font[name=userNullMsg]').hide();
		 $(appOwnerTeamDialog).find('font[name=userPickMsg]').hide();
		 $(appOwnerTeamDialog).find('font[name=teamNameLengthMsg]').hide();
		 $(appOwnerTeamDialog).find('font[name=teamNameErrorMsg]').hide();
		 $(appOwnerTeamDialog).find('font[name=teamNameNullMsg]').hide();
		 $('font[name=appOwnerNullMsg]').hide();
	}
	
	//show dialog
	$('#appOwnerPanel').find('button[name=show]').click(function() {
		
		resetAppOwnerPersonForm();
		resetAppOwnerTeamForm();
		
		appOwnerPersonTeamList = [];
		reloadAppOwnerPersonTeamTable();
		
		$(appOwnerTeamDialog).find('input[name=teamName]').removeAttr("disabled", "disabled");
		var type = $('#appOwnerPanel').find('input[name=appOwnerType]:checked').val();
		if(type=='person'){
			resetAppOwnerErrorTextPerson();
			$(appOwnerPersonDialog).dialog('open', 'position', 'center');
		}
		else if(type=='team'){
			resetAppOwnerErrorTextTeam();
			$(appOwnerTeamDialog).find('input[name=teamName]').val('');
			$(appOwnerTeamDialog).find('input[name=idx]').val('');
			$(appOwnerTeamDialog).dialog('open', 'position', 'center');
		}
	    return false;
	});
	
	$(appOwnerPersonDialog).find('.btn-form-panel button[name=addBtn]').click(function() {
		resetAppOwnerErrorTextPerson();
		var username = $(appOwnerPersonDialog).find('input[name=username]').val();
		var name = $(appOwnerPersonDialog).find('input[name=name]').val();
		var userId = $(appOwnerPersonDialog).find('input[name=userId]').val();
		var user = {
			username : username,
			name : name,
			userId : userId
		}
		
		var usernameshow = $(appOwnerPersonDialog).find('input[name=usernameShow]').val();
		
		if(usernameshow!='' && user.username==''){
			$(appOwnerPersonDialog).find('font[name=userPickMsg]').show();
			return;
		}
		
		if(usernameshow==''){
			$(appOwnerPersonDialog).find('font[name=userNullMsg]').show();
			return;
		}
		
		if(isDuplicate(user.username,appOwnerPersonList,"username")){
			$(appOwnerPersonDialog).find('font[name=userErrorMsg]').show();
			return
		}
		
		appOwnerPersonList.push(user);
		$(appOwnerPersonDialog).dialog('close');
		reloadAppOwnerPersonTable();
		
	});
	
	
	$(appOwnerPersonDialog).find('.btn-form-panel button[name=cancelBtn]').click(function() {
		resetAppOwnerErrorTextPerson();
		$(appOwnerPersonDialog).dialog('close');
		resetAppOwnerPersonForm();
	});
	
	$('#appOwnerPanel').find('table[name=appOwnerPersonTable]').on( 'click', '.deleteBtn', function () {
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		$("#dialog-confirm").dialog("open");
		
		$("#dialog-confirm").dialog({
			autoOpen: false,draggable : false,resizable : false, 
			modal: true,
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		appOwnerPersonList.splice(index-1,1);
					$("#appOwnerPanel").find('input[name=minimum]').val(appOwnerPersonList.length);
					reloadAppOwnerPersonTable();
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
	
	$('#appOwnerPanel').find('table[name=appOwnerPersonTable]').on( 'click', '.upBtn', function () {
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		index--;
		var temp;
		if(index > 0){
			temp = appOwnerPersonList[index];
			appOwnerPersonList[index] = appOwnerPersonList[index-1];
			appOwnerPersonList[index-1] = temp;
		}
		reloadAppOwnerPersonTable();
		return false;
	});
	
	$('#appOwnerPanel').find('table[name=appOwnerPersonTable]').on( 'click', '.downBtn', function () {
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		index--;
		var temp;
		if(index < appOwnerPersonList.length-1){
			temp = appOwnerPersonList[index];
			appOwnerPersonList[index] = appOwnerPersonList[index+1];
			appOwnerPersonList[index+1] = temp;
		}
		
		reloadAppOwnerPersonTable();
		return false;
	});
	
	//team
	
	//team
	$(appOwnerTeamDialog).find('table[name=personTeamTable]').on( 'click', '.deleteBtn', function () {
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		$("#dialog-confirm").dialog("open");
		$("#dialog-confirm").dialog({
			autoOpen: false,modal: true,draggable : false,resizable : false, 
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		resetAppOwnerErrorTextTeam();
	        		appOwnerPersonTeamList.splice(index-1,1);
	        		reloadAppOwnerPersonTeamTable();
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
	
	$('#appOwnerPanel').find('table[name=appOwnerTeamTable]').on( 'click', '.deleteBtn', function () {
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		$("#dialog-confirm").dialog("open");
		
		$("#dialog-confirm").dialog({
			autoOpen: false,draggable : false,resizable : false, 
			modal: true,
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		appOwnerTeamList.splice(index-1,1);
					reloadAppOwnerTeamTable();
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
	
	$('#appOwnerPanel').find('table[name=appOwnerTeamTable]').on( 'click', '.upBtn', function () {
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		index--;
		var temp;
		if(index >0){
			temp = appOwnerTeamList[index];
			appOwnerTeamList[index] = appOwnerTeamList[index-1];
			appOwnerTeamList[index-1] = temp;
		}
		reloadAppOwnerTeamTable();
		return false;
	});
	
	$('#appOwnerPanel').find('table[name=appOwnerTeamTable]').on( 'click', '.downBtn', function () {
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		index--;
		var temp;
		if(index < appOwnerTeamList.length-1){
			temp = appOwnerTeamList[index];
			appOwnerTeamList[index] = appOwnerTeamList[index+1];
			appOwnerTeamList[index+1] = temp;
		}
		reloadAppOwnerTeamTable();
		return false;
	});
	
	$('#appOwnerPanel').find('table[name=appOwnerTeamTable]').on( 'click', '.editBtn', function () {
		resetAppOwnerTeamForm();
		resetAppOwnerErrorTextTeam();
		var index = $(this).closest('td').parent()[0].sectionRowIndex - 1;
		var team = appOwnerTeamList[index];
		
		$(appOwnerTeamDialog).find('input[name=teamName]').val(team.name);
		$(appOwnerTeamDialog).find('input[name=teamName]').attr("disabled", "disabled");
		$(appOwnerTeamDialog).find('input[name=idx]').val(index);
		appOwnerPersonTeamList = team.member.slice();
		reloadAppOwnerPersonTeamTable();
		$(appOwnerTeamDialog).dialog('open');
		return false;
		
	});
	
	$(appOwnerTeamDialog).find('.btn-form-panel button[name=addBtn]').click(function() {
		resetAppOwnerErrorTextTeam();
		var idx = $(appOwnerTeamDialog).find('input[name=idx]').val();
		var username = $(appOwnerTeamDialog).find('input[name=username]').val();
		var name = $(appOwnerTeamDialog).find('input[name=name]').val();
		var userId = $(appOwnerTeamDialog).find('input[name=userId]').val();
		var user = {
			username : username,
			name : name,
			userId : userId
		}
		

		var usernameshow = $(appOwnerTeamDialog).find('input[name=usernameShow]').val();
		
		if(usernameshow!='' && user.username==''){
			$(appOwnerTeamDialog).find('font[name=userPickMsg]').show();
			return;
		}
		
		if(usernameshow=='') {
			$(appOwnerTeamDialog).find('font[name=userNullMsg]').show();
			return;
		}
		
		if(isDuplicate(user.username,appOwnerPersonTeamList,"username")){
			$(appOwnerTeamDialog).find('font[name=userErrorMsg]').show();
			return;
		}
		
		if(isDuplicateOtherTeam(user.username,appOwnerTeamList,idx,"member","username")){
			$(appOwnerTeamDialog).find('font[name=userErrorMsg]').show();
			return;
		}
		
		appOwnerPersonTeamList.push(user);
		
		resetAppOwnerTeamForm();
		reloadAppOwnerPersonTeamTable();
	});
	
	
	$(appOwnerTeamDialog).find('.btn-form-panel button[name=resetBtn]').click(function() {
		var index = $(appOwnerTeamDialog).find('input[name=idx]').val();
		
		if(!index){
			$(appOwnerTeamDialog).find('input[name=teamName]').val('');
		}
		resetAppOwnerErrorTextTeam();
		resetAppOwnerTeamForm();
	});
	
	$(appOwnerTeamDialog).find('.btn-dialog-panel button[name=cancelBtn]').click(function() {
		resetAppOwnerErrorTextTeam();
		$(appOwnerTeamDialog).dialog('close');
	});
	
	$(appOwnerTeamDialog).find('.btn-dialog-panel button[name=saveBtn]').click(function() {
		resetAppOwnerErrorTextTeam();
		var teamName = $(appOwnerTeamDialog).find('input[name=teamName]').val().trim();
		$(appOwnerTeamDialog).find('input[name=teamName]').val(teamName);
		var team = {
				name : teamName,
				member : appOwnerPersonTeamList
		}
		
		var index = $(appOwnerTeamDialog).find('input[name=idx]').val();
		
		if(team.name==''){
			$(appOwnerTeamDialog).find('font[name=teamNameNullMsg]').show();
			return;
		}
		
		if(team.name.length>100){
			$(appOwnerTeamDialog).find('font[name=teamNameLengthMsg]').show();
			return;
		}
		
		if(appOwnerPersonTeamList.length==0){
			$(appOwnerTeamDialog).find('font[name=userNullMsg]').show();
			return;
		}
		
		if(index) {
			// save for edit
			appOwnerTeamList[index] = team;
		} else {
			// save for new
			if(isDuplicate(team.name,appOwnerTeamList,"name")){
				$(appOwnerTeamDialog).find('font[name=teamNameErrorMsg]').show();
				return;
			}
			appOwnerTeamList.push(team);
		}
		
		resetAppOwnerTeamForm();
		$(appOwnerTeamDialog).dialog('close');
		reloadAppOwnerTeamTable();
	});
	
	//save new table
	$('#appOwnerPanel').find('button[name=saveBtn]').click(function(){
		
		var appOwnerMinimum = $('#appOwnerPanel').find('input[name=minimum]').val();
	    var appOwnerType = $('#appOwnerPanel').find('input[name=appOwnerType]:checked').val();
	    var appId = $('#applicationForm').find('input[name=appId]').val();
    	var appOwnerApproveType;
    	if(appOwnerType=='person'){
    		appOwnerApproveType = $('div[name=appPersonApproveType]').find('input[name=appPersonApproveType]:checked').val();
    		if(appOwnerPersonList.length==0){
    			$('#dialog-error-please-fill').dialog("open");
    			$('font[name=appOwnerNullMsg]').show();
    			return;
    		}
    	}
    	else if(appOwnerType=='team'){
    		appOwnerApproveType = $('div[name=appTeamApproveType]').find('input[name=appTeamApproveType]:checked').val();
    		if(appOwnerTeamList.length==0){
    			$('#dialog-error-please-fill').dialog("open");
    			$('font[name=appOwnerNullMsg]').show();
    			return;
    		}
    	}
    	
    	var appOwnerList = { 	
    			personList :  appOwnerPersonList.slice(),
				teamList : appOwnerTeamList.slice() 
		}
    	
    	var dataParams = {	
    				appId : appId,
					appOwnerType : appOwnerType,
					appOwnerApproveType : appOwnerApproveType,
					appOwnerMinimum : appOwnerMinimum,
					appOwnerList : appOwnerList,
    	}

		var jsonData = JSON.stringify(dataParams);
		
    	var url = $('#appOwnerPanel').attr('action');
    	
    	$('#dialog-confirm').dialog("open");
    	
    	$('#dialog-confirm').dialog({
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		$('#dialog-confirm').dialog("close");
	        		$('#process-loader').show();
	        		$.ajax({
    					url : url,
    					type : 'PUT',
    					data : jsonData,
    					contentType : "application/json",
    					success : function(data) {
    						$('#process-loader').hide();
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
    	
	});
	
	function resetAppOwnerPersonForm(){
		$(appOwnerPersonDialog).find('input[name=username]').val('');
		$(appOwnerPersonDialog).find('input[name=name]').val('');
		$(appOwnerPersonDialog).find('input[name=usernameShow]').val('');
		$(appOwnerPersonDialog).find('span[name=selectUser]').text('');
		$(appOwnerPersonDialog).find('div[name=showSelectUser]').hide();
	}
	
	function resetAppOwnerTeamForm(){
		$(appOwnerTeamDialog).find('input[name=username]').val('');
		$(appOwnerTeamDialog).find('input[name=name]').val('');
		$(appOwnerTeamDialog).find('input[name=usernameShow]').val('');
		$(appOwnerTeamDialog).find('span[name=selectUser]').text('');
		$(appOwnerTeamDialog).find('div[name=showSelectUser]').hide();
	}
	
	function reloadAppOwnerPersonTable(){
		
		var maximum = appOwnerPersonList.length;
		var minimum = 1;
		$("#appOwnerPanel").find('input[name=minimum]').attr("min",minimum);
		$("#appOwnerPanel").find('input[name=minimum]').attr("max",maximum);
		
		var table = $('#appOwnerPanel').find('table[name=appOwnerPersonTable]');
		var tableBody = $(table).find('tbody');
		$(tableBody).find('tr[class!=tr0]').remove();
		$.each(appOwnerPersonList, function(i, user) {
			var row = $(table).find('tbody tr[class=tr0]').clone();
			$(row).removeClass('tr0');
			$(row).find('td[data-idx]').text(++i);
			$(row).find('td[data-username]').text(user.username);
			$(row).find('td[data-enfullname]').text(user.name);
			
			console.log(i);
			if(i==1){
				$(row).find('.upBtn').attr("disabled", "disabled");
				$(row).find('.upBtn').addClass("fadeBtn");
			}
			
			if(i==appOwnerPersonList.length){
				$(row).find('.downBtn').attr("disabled", "disabled");
				$(row).find('.downBtn').addClass("fadeBtn");
			}
			
			$(row).show();
			$(tableBody).append($(row));
		});
	}
	
	function reloadAppOwnerPersonTeamTable(){
		var table = $(appOwnerTeamDialog).find('table[name=personTeamTable]');
		var tableBody = $(table).find('tbody');
		$(tableBody).find('tr[class!=tr0]').remove();
		$.each(appOwnerPersonTeamList, function(i, user) {
			var row = $(table).find('tbody tr[class=tr0]').clone();
			$(row).removeClass('tr0');
			$(row).find('td[data-idx]').text(++i);
			$(row).find('td[data-username]').text(user.username);
			$(row).find('td[data-enfullname]').text(user.name);
			$(row).show();
			$(tableBody).append($(row));
		});
	}
	
	function reloadAppOwnerTeamTable(){
		var table = $('#appOwnerPanel').find('table[name=appOwnerTeamTable]');
		var tableBody = $(table).find('tbody');
		$(tableBody).find('tr[class!=tr0]').remove();
		$.each(appOwnerTeamList, function(i, team) {
			var row = $(table).find('tbody tr[class=tr0]').clone();
			$(row).removeClass('tr0');
			$(row).find('td[data-idx]').text(++i);
			$(row).find('td[data-teamname]').text(team.name);
			var member_name = "";
			$.each(team.member,function(j,user){
				member_name += (j+1)+". "+user.name;
				if(j<team.member.length-1){
					member_name += "<br />";
				}
			});
			
			$(row).find('td[data-teammember]').html(member_name);
			
			if(i==1){
				$(row).find('.upBtn').attr("disabled", "disabled");
				$(row).find('.upBtn').addClass("fadeBtn");
			}
			if(i==appOwnerTeamList.length){
				$(row).find('.downBtn').attr("disabled", "disabled");
				$(row).find('.downBtn').addClass("fadeBtn");
			}
			
			$(row).show();
			$(tableBody).append($(row));
		});
	}
});