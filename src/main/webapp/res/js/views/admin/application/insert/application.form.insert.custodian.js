$(function(){
	
	
	$.each($(".nav-menu-bar"), function(i, elm) {
		$(elm).click(function() {
		    $('.nav-menu-bar').removeClass('link-active');
		    $(elm).addClass('link-active');
		    	
		    var value = $(elm).attr("value");
		    
		    custodianType = value;
		    
		    reloadCustodianPersonTable();
		    reloadCustodianPersonTeamTable();
		    reloadCustodianTeamTable();
		    
		    return false;
		});
	});
	
	 $(custodianPersonDialog).find(".auto-username-fullname").autocomplete({
	    	select : function(event, ui) {
	    		$(custodianPersonDialog).find("input[name=usernameShow]").val(ui.item.label);
			    $(custodianPersonDialog).find("input[name=username]").val(ui.item.username);
			    $(custodianPersonDialog).find("input[name=name]").val(ui.item.name);
			    $(custodianPersonDialog).find("span[name=selectUser]").text(ui.item.name);
			    $(custodianPersonDialog).find("input[name=userId]").val(ui.item.userId);
			    $(custodianPersonDialog).find('div[name=showSelectUser]').show();
			    resetCustodianErrorTextPerson();
			},
			change: function(event, ui) {
				
			}
	    });
	  
	    $(custodianTeamDialog).find(".auto-username-fullname").autocomplete({
	    	select : function(event, ui) {
	    		$(custodianTeamDialog).find("input[name=usernameShow]").val(ui.item.label);
	    		$(custodianTeamDialog).find("input[name=username]").val(ui.item.username);
	    		$(custodianTeamDialog).find("input[name=name]").val(ui.item.name);
	    		$(custodianTeamDialog).find("span[name=selectUser]").text(ui.item.name);
	    		$(custodianTeamDialog).find("input[name=userId]").val(ui.item.userId);
	    		$(custodianTeamDialog).find('div[name=showSelectUser]').show();
	    		resetCustodianErrorTextTeam();
	    	},
	    	change: function(event, ui) {
	    		
	    	}
	    });
	
	$('#custodianPanel').find('div[name=cusTeamApproveType]').hide();
	$('#custodianPanel').find('table[name=custodianTeamTable]').hide();
	$('#custodianPanel').find('div[name=minimum]').hide();
	
	$(custodianPersonDialog).dialog({
		autoOpen: false, modal: true,draggable : false,resizable : false, 
	    width: 800
	});
	
	$(custodianTeamDialog).dialog({
		autoOpen: false, modal: true,draggable : false,resizable : false, 
	    width: 800
	});
	
	$('#custodianPanel').find('input[name=cusPersonApproveType]').change(function(){
		$('#custodianPanel').find('div[name=minimum]').hide();
		
		var custodianType = $('#custodianPanel').find('input[name=custodianType]:checked').val();
		var approveType = $('#custodianPanel').find('input[name=cusPersonApproveType]:checked').val();
		
		if(custodianType=='person'){
			//minimum = 2
			if(approveType=='2'){
				$('#custodianPanel').find('div[name=minimum]').show();
			}
		}
	});
	
	$("#custodianPanel").find('input[name=minimum]').on('change keyup', function() {
		var val = $("#custodianPanel").find('input[name=minimum]').val();
		var max = $("#custodianPanel").find('input[name=minimum]').attr("max");
		var min = $("#custodianPanel").find('input[name=minimum]').attr("min");
		
		if(val==''){
			$("#custodianPanel").find('input[name=minimum]').val(min);
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
		
		$("#custodianPanel").find('input[name=minimum]').val(val);
		
	});
	
	function clearCustodianTable(){
		custodianPersonList = [];
		custodianPersonTeamList = [];
		custodianTeamList = [];
		custodianPersonBackOfficeList = [];
		custodianPersonTeamBackOfficeList = [];
		custodianTeamBackOfficeList = [];
		custodianPersonACCList = [];
		custodianPersonTeamACCList = [];
		custodianTeamACCList = [];
		custodianPersonBranchList = [];
		custodianPersonTeamBranchList = [];
		custodianTeamBranchList = [];
		custodianPersonOutletList = [];
		custodianPersonTeamOutletList = [];
		custodianTeamOutletList = [];
	}
	
	$('#custodianPanel').find('input[name=custodianType]').change(function(){
		resetCustodianErrorTextPerson();
		resetCustodianErrorTextTeam();
		$('#custodianPanel').find('div[name=minimum]').hide();
		var custodianType = $('#custodianPanel').find('input[name=custodianType]:checked').val();
		var custodianList = setCustodianListByType(custodianType);
		
		clearCustodianTable();
		
		reloadCustodianPersonTable();
		reloadCustodianTeamTable();
		
		if(custodianType=='person'){
			 var radios = $('#custodianPanel').find('input[name=cusPersonApproveType]');
			 $(radios).filter('[value=1]').prop('checked', true);
			 
			$('#custodianPanel').find('div[name=cusPersonApproveType]').show();
			$('#custodianPanel').find('div[name=cusTeamApproveType]').hide();
			$('#custodianPanel').find('table[name=custodianPersonTable]').show();
			$('#custodianPanel').find('table[name=custodianTeamTable]').hide();
			
			    
		}else if(custodianType=='team'){
			 var radios =  $('#custodianPanel').find('input[name=cusTeamApproveType]');
			 $(radios).filter('[value=4]').prop('checked', true);
			
			$('#custodianPanel').find('div[name=cusPersonApproveType]').hide();
			$('#custodianPanel').find('div[name=cusTeamApproveType]').show();
			$('#custodianPanel').find('table[name=custodianPersonTable]').hide();
			$('#custodianPanel').find('table[name=custodianTeamTable]').show();
			
		}
	});
	
	function resetCustodianErrorTextPerson(){
		 $(custodianPersonDialog).find('font[name=userErrorMsg]').hide();
		 $(custodianPersonDialog).find('font[name=userNullMsg]').hide();
		 $(custodianPersonDialog).find('font[name=userPickMsg]').hide();
		 $('font[name=custodianNullMsg]').hide();
	}
	
	function resetCustodianErrorTextTeam(){
		 $(custodianTeamDialog).find('font[name=userErrorMsg]').hide();
		 $(custodianTeamDialog).find('font[name=userNullMsg]').hide();
		 $(custodianTeamDialog).find('font[name=userPickMsg]').hide();
		 $(custodianTeamDialog).find('font[name=teamNameLengthMsg]').hide();
		 $(custodianTeamDialog).find('font[name=teamNameErrorMsg]').hide();
		 $(custodianTeamDialog).find('font[name=teamNameNullMsg]').hide();
		 $('font[name=custodianNullMsg]').hide();
	}
	
	$('#custodianPanel').find('button[name=show]').click(function() {
		
		resetCustodianrPersonForm();
		resetCustodianTeamForm();
		
		custodianPersonTeamList = [];
		custodianPersonTeamBackOfficeList = [];
		custodianPersonTeamACCList = [];
		custodianPersonTeamBranchList = [];
		custodianPersonTeamOutletList = [];
		reloadCustodianPersonTeamTable();
		
		$(custodianTeamDialog).find('input[name=teamName]').removeAttr("disabled", "disabled");
		var type = $('#custodianPanel').find('input[name=custodianType]:checked').val();
		if(type=='person'){
			resetCustodianErrorTextPerson();
			 $(custodianPersonDialog).dialog('open', 'position', 'center');
		}
		else if(type=='team'){
			resetCustodianErrorTextTeam();
			$(custodianTeamDialog).find('input[name=idx]').val('');
			$(custodianTeamDialog).find('input[name=teamName]').val('');
			$(custodianTeamDialog).dialog('open', 'position', 'center');
		}
	    return false;
	});
	
	$(custodianPersonDialog).find('button[name=addBtn]').click(function() {
		resetCustodianErrorTextPerson();
		var custodianList = setCustodianListByType(custodianType);
		
		var username = $(custodianPersonDialog).find('input[name=username]').val();
		var name = $(custodianPersonDialog).find('input[name=name]').val();
		var userId = $(custodianPersonDialog).find('input[name=userId]').val();
		
		var user = {
				username : username,
				name : name,
				userId : userId
		}
		
		console.log('1234');
		
		var usernameshow = $(custodianPersonDialog).find('input[name=usernameShow]').val();
		
		if(usernameshow!='' && user.username==''){
			$(custodianPersonDialog).find('font[name=userPickMsg]').show();
			return;
		}
		
		if(user.username==''){
			$(custodianPersonDialog).find('font[name=userNullMsg]').show();
			return;
		}
		
		if(isDuplicate(user.username,custodianList,"username")){
			$(custodianPersonDialog).find('font[name=userErrorMsg]').show();
			return;
		}
		
		custodianList.push(user);
		$(custodianPersonDialog).dialog('close');
		reloadCustodianPersonTable();
	});
	
	$(custodianPersonDialog).find('.btn-dialog-panel button[name=cancelBtn]').click(function() {
		resetCustodianErrorTextTeam();
		resetCustodianrPersonForm();
		$(custodianPersonDialog).dialog('close');
	});

	function resetCustodianrPersonForm(){
		$(custodianPersonDialog).find('input[name=username]').val('');
		$(custodianPersonDialog).find('input[name=name]').val('');
		$(custodianPersonDialog).find('input[name=usernameShow]').val('');
		$(custodianPersonDialog).find('span[name=selectUser]').text('');
		$(custodianPersonDialog).find('div[name=showSelectUser]').hide();
	}
	
	$('#custodianPanel').find('table[name=custodianPersonTable]').on( 'click', '.deleteBtn', function () {
		
		var custodianList = setCustodianListByType(custodianType);
		
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		$("#dialog-confirm").dialog("open");
		
		$("#dialog-confirm").dialog({
			autoOpen: false, modal: true,draggable : false,resizable : false, 
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		custodianList.splice(index-1,1);
					reloadCustodianPersonTable();
					setMaxminCustodian();
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
	
	$('#custodianPanel').find('table[name=custodianPersonTable]').on( 'click', '.upBtn', function () {
		
		var custodianList = setCustodianListByType(custodianType);
		
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		index--;
		var temp;
		if(index > 0){
			temp = custodianList[index];
			custodianList[index] = custodianList[index-1];
			custodianList[index-1] = temp;
		}
		reloadCustodianPersonTable();
		return false;
	});
	
	$('#custodianPanel').find('table[name=custodianPersonTable]').on( 'click', '.downBtn', function () {
		var custodianList = setCustodianListByType(custodianType);
		
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		index--;
		var temp;
		if(index < custodianList.length-1){
			temp = custodianList[index];
			custodianList[index] = custodianList[index+1];
			custodianList[index+1] = temp;
		}
		
		reloadCustodianPersonTable();
		return false;
	});
	
	//team
	$(custodianTeamDialog).find('table[name=personTeamTable]').on( 'click', '.deleteBtn', function () {
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		$("#dialog-confirm").dialog("open");
		$("#dialog-confirm").dialog({
			autoOpen: false, modal: true,draggable : false,resizable : false, 
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		custodianPersonTeamList.splice(index-1,1);
	        		resetCustodianErrorTextTeam();
	        		reloadCustodianPersonTeamTable();
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
	
	$('#custodianPanel').find('table[name=custodianTeamTable]').on( 'click', '.deleteBtn', function () {
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		var custodianList = setCustodianTeamListByType(custodianType);
		
		$("#dialog-confirm").dialog("open");
		
		$("#dialog-confirm").dialog({
			autoOpen: false, modal: true,draggable : false,resizable : false, 
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		custodianList.splice(index-1,1);
					reloadCustodianTeamTable();
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
	
	$('#custodianPanel').find('table[name=custodianTeamTable]').on( 'click', '.upBtn', function () {
		
		var custodianList = setCustodianTeamListByType(custodianType);
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		index--;
		var temp;
		if(index >0){
			temp = custodianList[index];
			custodianList[index] = custodianList[index-1];
			custodianList[index-1] = temp;
		}
		reloadCustodianTeamTable();
		return false;
	});
	
	$('#custodianPanel').find('table[name=custodianTeamTable]').on( 'click', '.downBtn', function () {
		
		var custodianList = setCustodianTeamListByType(custodianType);
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		index--;
		var temp;
		if(index < custodianList.length-1){
			temp = custodianList[index];
			custodianList[index] = custodianList[index+1];
			custodianList[index+1] = temp;
		}
		reloadCustodianTeamTable();
		return false;
	});
	
	$('#custodianPanel').find('table[name=custodianTeamTable]').on( 'click', '.editBtn', function () {
		resetCustodianErrorTextTeam();
		var custodianList = setCustodianTeamListByType(custodianType);
		resetCustodianTeamForm();
		var index = $(this).closest('td').parent()[0].sectionRowIndex - 1;
		var team = custodianList[index];
		
		$(custodianTeamDialog).find('input[name=teamName]').val(team.name);
		$(custodianTeamDialog).find('input[name=teamName]').attr("disabled", "disabled");
		$(custodianTeamDialog).find('input[name=idx]').val(index);
		custodianPersonTeamList = team.member.slice();
		reloadCustodianPersonTeamTable();
		$(custodianTeamDialog).dialog('open');
		return false;
		
	});
	
	$(custodianTeamDialog).find('button[name=addBtn]').click(function() {
		resetCustodianErrorTextTeam();
		var custodianList = setCustodianTeamListByType(custodianType);
		var username = $(custodianTeamDialog).find('input[name=username]').val();
		var name = $(custodianTeamDialog).find('input[name=name]').val();
		var userId = $(custodianTeamDialog).find('input[name=userId]').val();
		
		var user = {
				username : username,
				name : name,
				userId : userId
		}
		
		
		if(isDuplicate(user.username,custodianPersonTeamList,"username")){
			$(custodianTeamDialog).find('font[name=userErrorMsg]').show();
			return;
		}
		
		var idx = $(custodianTeamDialog).find('input[name=idx]').val();
		if(isDuplicateOtherTeam(user.username,custodianList,idx,"member","username")){
			$(custodianTeamDialog).find('font[name=userErrorMsg]').show();
			return;
		}
		
		var usernameshow = $(custodianTeamDialog).find('input[name=usernameShow]').val();
		
		if(usernameshow!='' && user.username==''){
			$(custodianTeamDialog).find('font[name=userPickMsg]').show();
			return;
		}
		
		if(user.username==''){
			$(custodianTeamDialog).find('font[name=userNullMsg]').show();
			return;
		}
		
		custodianPersonTeamList.push(user);
		
		resetCustodianTeamForm();
		reloadCustodianPersonTeamTable();
	});
	
	
	$(custodianTeamDialog).find('.btn-form-panel button[name=resetBtn]').click(function() {
		var index = $(custodianTeamDialog).find('input[name=idx]').val();
		if(!index){
			$(custodianTeamDialog).find('input[name=teamName]').val('');
		}
		resetCustodianErrorTextTeam();
		resetCustodianTeamForm();
	});
	
	$(custodianTeamDialog).find('.btn-dialog-panel button[name=cancelBtn]').click(function() {
		resetCustodianErrorTextTeam();
		$(custodianTeamDialog).dialog('close');
		
	});
	
	$(custodianTeamDialog).find('.btn-dialog-panel button[name=saveBtn]').click(function() {
		resetCustodianErrorTextTeam();
		var custodianList = setCustodianTeamListByType(custodianType);
		var teamName = $(custodianTeamDialog).find('input[name=teamName]').val().trim();
		$(custodianTeamDialog).find('input[name=teamName]').val(teamName);
		var team = {
				name : teamName,
				member : custodianPersonTeamList
		}
		
		var index = $(custodianTeamDialog).find('input[name=idx]').val();
		
		if(team.name==''){
			$(custodianTeamDialog).find('font[name=teamNameNullMsg]').show();
			return;
		}
		
		if(team.name.length>100){
			$(custodianTeamDialog).find('font[name=teamNameLengthMsg]').show();
			return;
		}
		
		if(custodianPersonTeamList.length==0){
			$(custodianTeamDialog).find('font[name=userNullMsg]').show();
			return;
		}
		
		if(index) {
			// save for edit
			custodianList[index] = team;
		} else {
			// save for new
			if(isDuplicate(team.name,custodianList,"name")){
				$(custodianTeamDialog).find('font[name=teamNameErrorMsg]').show();
				return;
			}
			custodianList.push(team);
		}
		
		resetCustodianTeamForm();
		$(custodianTeamDialog).dialog('close');
		reloadCustodianTeamTable();
	});
	
	function resetCustodianTeamForm(){
		$(custodianTeamDialog).find('input[name=username]').val('');
		$(custodianTeamDialog).find('input[name=name]').val('');
		$(custodianTeamDialog).find('input[name=usernameShow]').val('');
		$(custodianTeamDialog).find('span[name=selectUser]').text('');
		$(custodianTeamDialog).find('font[name=textError]').text('');
		$(custodianTeamDialog).find('div[name=showSelectUser]').hide();
	}
	
	function setCustodianListByType(type){
		var custodianList = [];
		if(type==1){
			custodianList = custodianPersonList;
		}
		if(type==2){
			custodianList = custodianPersonBackOfficeList;
		}
		if(type==3){
			custodianList = custodianPersonACCList;
		}
		if(type==4){
			custodianList = custodianPersonBranchList;
		}
		if(type==5){
			custodianList = custodianPersonOutletList;
		}
		
		return custodianList;
	}

	function setCustodianTeamListByType(type){
		var custodianList = [];
		if(type==1){
			custodianList = custodianTeamList;
		}
		if(type==2){
			custodianList = custodianTeamBackOfficeList;
		}
		if(type==3){
			custodianList = custodianTeamACCList;
		}
		if(type==4){
			custodianList = custodianTeamBranchList;
		}
		if(type==5){
			custodianList = custodianTeamOutletList;
		}
		
		return custodianList;
	}

	function setMaxminCustodian(){
		var lengthCustodian = [custodianPersonList.length,
			                    custodianPersonBackOfficeList.length,
			                    custodianPersonACCList.length,
			                    custodianPersonBranchList.length,
			                    custodianPersonOutletList.length];
		
		var maxCustodian = [];
		$.each(lengthCustodian, function(i, length) {
			if(length>0){
				maxCustodian.push(length);
			}
		});
		
		var minMax = 1;
		var minimum = 1;
		if(maxCustodian.length>0){
			maxCustodian.sort();
			console.log(maxCustodian);
			minMax =  maxCustodian[0];
			
		}
		
		$("#custodianPanel").find('input[name=minimum]').attr("min",minimum);
		$("#custodianPanel").find('input[name=minimum]').attr("max",minMax);
		
		var val = $("#custodianPanel").find('input[name=minimum]').val();
		
		val = parseInt(val);
		if(val>minMax){
			val = minMax;
		}
		
		if(val<minimum){
			val = minimum;
		}
		
		$("#custodianPanel").find('input[name=minimum]').val(val);
		
	};


	function reloadCustodianPersonTable(){
		setMaxminCustodian();
		var type = $('#custodianPanel').find('input[name=custodianType]:checked').val();
		if(type=='person'){
			 $('a[name=default-nav]').text('Default('+custodianPersonList.length+')');
			 $('a[name=backoffice-nav]').text('Back Office('+custodianPersonBackOfficeList.length+')');
			 $('a[name=acc-nav]').text('ACC('+custodianPersonACCList.length+')');
			 $('a[name=branch-nav]').text('Branch('+custodianPersonBranchList.length+')');
			 $('a[name=outlet-nav]').text('Outlet('+custodianPersonOutletList.length+')');
		}
		else if(type=='team'){
			 $('a[name=default-nav]').text('Default('+custodianTeamList.length+')');
			 $('a[name=backoffice-nav]').text('Back Office('+custodianTeamBackOfficeList.length+')');
			 $('a[name=acc-nav]').text('ACC('+custodianTeamACCList.length+')');
			 $('a[name=branch-nav]').text('Branch('+custodianTeamBranchList.length+')');
			 $('a[name=outlet-nav]').text('Outlet('+custodianTeamOutletList.length+')');
		}
		
		var custodianList = setCustodianListByType(custodianType);
		
		var table = $('#custodianPanel').find('table[name=custodianPersonTable]');
		var tableBody = $(table).find('tbody');
		$(tableBody).find('tr[class!=tr0]').remove();
		$.each(custodianList, function(i, user) {
			var row = $(table).find('tbody tr[class=tr0]').clone();
			$(row).removeClass('tr0');
			$(row).find('td[data-idx]').text(++i);
			$(row).find('td[data-username]').text(user.username);
			$(row).find('td[data-name]').text(user.name);
			
			if(i==1){
				$(row).find('.upBtn').attr("disabled", "disabled");
				$(row).find('.upBtn').addClass("fadeBtn");
			}
			if(i==custodianList.length){
				$(row).find('.downBtn').attr("disabled", "disabled");
				$(row).find('.downBtn').addClass("fadeBtn");
			}
			
			$(row).show();
			$(tableBody).append($(row));
		});
		
	}

	function reloadCustodianPersonTeamTable(){
		var table = $(custodianTeamDialog).find('table[name=personTeamTable]');
		var tableBody = $(table).find('tbody');
		$(tableBody).find('tr[class!=tr0]').remove();
		$.each(custodianPersonTeamList, function(i, user) {
			var row = $(table).find('tbody tr[class=tr0]').clone();
			$(row).removeClass('tr0');
			$(row).find('td[data-idx]').text(++i);
			$(row).find('td[data-username]').text(user.username);
			$(row).find('td[data-name]').text(user.name);
			$(row).show();
			$(tableBody).append($(row));
		});
	}

	function reloadCustodianTeamTable(){
		
		var custodianList = setCustodianTeamListByType(custodianType);
		var table = $('#custodianPanel').find('table[name=custodianTeamTable]');
		var tableBody = $(table).find('tbody');
		$(tableBody).find('tr[class!=tr0]').remove();
		$.each(custodianList, function(i, team) {
			var row = $(table).find('tbody tr[class=tr0]').clone();
			$(row).removeClass('tr0');
			$(row).find('td[data-idx]').text(++i);
			$(row).find('td[data-teamname]').text(team.name);
			var member_name = "";
			$.each(team.member,function(i,user){
				member_name += (i+1)+". "+user.name;
				if(i<team.member.length-1){
					member_name += "<br />";
				}
			});
			$(row).find('td[data-teammember]').html(member_name);
			
			if(i==1){
				$(row).find('.upBtn').attr("disabled", "disabled");
				$(row).find('.upBtn').addClass("fadeBtn");
			}
			if(i==custodianList.length){
				$(row).find('.downBtn').attr("disabled", "disabled");
				$(row).find('.downBtn').addClass("fadeBtn");
			}
			
			$(row).show();
			$(tableBody).append($(row));
		});
		
		var type = $('#custodianPanel').find('input[name=custodianType]:checked').val();
		if(type=='person'){
			 $('a[name=default-nav]').text('Default('+custodianPersonList.length+')');
			 $('a[name=backoffice-nav]').text('Back Office('+custodianPersonBackOfficeList.length+')');
			 $('a[name=acc-nav]').text('ACC('+custodianPersonACCList.length+')');
			 $('a[name=branch-nav]').text('Branch('+custodianPersonBranchList.length+')');
			 $('a[name=outlet-nav]').text('Outlet('+custodianPersonOutletList.length+')');
		}
		else if(type=='team'){
			 $('a[name=default-nav]').text('Default('+custodianTeamList.length+')');
			 $('a[name=backoffice-nav]').text('Back Office('+custodianTeamBackOfficeList.length+')');
			 $('a[name=acc-nav]').text('ACC('+custodianTeamACCList.length+')');
			 $('a[name=branch-nav]').text('Branch('+custodianTeamBranchList.length+')');
			 $('a[name=outlet-nav]').text('Outlet('+custodianTeamOutletList.length+')');
		}
	}
	
});
