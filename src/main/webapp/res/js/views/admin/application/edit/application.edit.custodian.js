var custodianPersonList = [];
var custodianPersonTeamList = [];
var custodianTeamList = [];

var custodianPersonACCList = [];
var custodianPersonTeamACCList = [];
var custodianTeamACCList = [];

var custodianPersonBackOfficeList = [];
var custodianPersonTeamBackOfficeList = [];
var custodianTeamBackOfficeList = [];

var custodianPersonBranchList = [];
var custodianPersonTeamBranchList = [];
var custodianTeamBranchList = [];

var custodianPersonOutletList = [];
var custodianPersonTeamOutletList = [];
var custodianTeamOutletList = [];

$(function(){
	
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
	
    $('#custodianPanel').find('table[name=custodianPsersonTable]').show();
    $('#custodianPanel').find('table[name=custodianTeamTable]').show();
	$('#custodianPanel').find('div[name=cusPersonApproveType]').show();
	$('#custodianPanel').find('div[name=cusTeamApproveType]').show();

	$('#custodianPanel').find('div[name=minimum]').hide();
	
	//render part
	var custodianType = $('#custodianPanel').find('input[name=custodianType]:checked').val();
	var approveType = $('#custodianPanel').find('input[name=cusPersonApproveType]:checked').val();
	if(custodianType=='person'){
		$('#custodianPanel').find('div[name=cusTeamApproveType]').hide();
		$('#custodianPanel').find('table[name=custodianTeamTable]').hide();
		if(approveType=='2'){
			$('#custodianPanel').find('div[name=minimum]').show();
		}
	}
	if(custodianType=='team'){
		$('#custodianPanel').find('div[name=cusPersonApproveType]').hide();
		$('#custodianPanel').find('table[name=custodianPersonTable]').hide();
	}
	
	var navType = "1";
	
	$('.nav-menu-bar').click(function() {
	    $('.nav-menu-bar').removeClass('link-active');
	    $(this).addClass('link-active');
	    var value = $(this).attr("value");
	    navType = value;
	    reloadCustodianPersonTable();
	    reloadCustodianPersonTeamTable();
	    reloadCustodianTeamTable();
	    return false;
	});
	
	$(custodianPersonDialog).dialog({
		autoOpen: false, modal: true,draggable : false,resizable : false, 
	    width: 800
	});
	
	$(custodianTeamDialog).dialog({
		autoOpen: false, modal: true,draggable : false,resizable : false, 
	    width: 800
	});
	
	//reload data
	custodianPersonList = jQuery.parseJSON($('input[name=custodianList]').val());
	if(custodianPersonList==null) custodianPersonList=[];
	custodianTeamList = jQuery.parseJSON($('input[name=custodianTeamList]').val());
	if(custodianTeamList==null) custodianTeamList=[];
	custodianPersonTeamList = [];

	custodianPersonACCList = jQuery.parseJSON($('input[name=custodianACCList]').val());
	if(custodianPersonACCList==null) custodianPersonACCList=[];
	custodianTeamACCList = jQuery.parseJSON($('input[name=custodianACCTeamList]').val());
	if(custodianTeamACCList==null) custodianTeamACCList=[];
	custodianPersonTeamACCList = [];
	
	custodianPersonBackOfficeList = jQuery.parseJSON($('input[name=custodianBackOfficeList]').val());
	if(custodianPersonBackOfficeList==null) custodianPersonBackOfficeList=[];
	custodianTeamBackOfficeList = jQuery.parseJSON($('input[name=custodianBackOfficeTeamList]').val());
	if(custodianTeamBackOfficeList==null) custodianTeamBackOfficeList=[];
	custodianPersonTeamBackOfficeList = [];
	
	
	custodianPersonBranchList = jQuery.parseJSON($('input[name=custodianBranchList]').val());
	if(custodianPersonBranchList==null) custodianPersonBranchList=[];
	custodianTeamBranchList = jQuery.parseJSON($('input[name=custodianBranchTeamList]').val());
	if(custodianTeamBranchList==null) custodianTeamBranchList=[];
	custodianPersonTeamBranchList = [];

	custodianPersonOutletList = jQuery.parseJSON($('input[name=custodianOutletList]').val());
	if(custodianPersonOutletList==null) custodianPersonOutletList = [];
	custodianTeamOutletList = jQuery.parseJSON($('input[name=custodianOutletTeamList]').val());
	if(custodianTeamOutletList==null) custodianTeamOutletList = [];
	custodianPersonTeamOutletList = [];
	
	reloadCustodianPersonTable();
	reloadCustodianTeamTable();
	
	
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
	
	$('#custodianPanel').find('input[name=cusPersonApproveType]').change(function(){
		$('#custodianPanel').find('div[name=minimum]').hide();
		
		var custodianType = $('#custodianPanel').find('input[name=custodianType]:checked').val();
		var approveType = $('#custodianPanel').find('input[name=cusPersonApproveType]:checked').val();
		
		if(custodianType=='person'){
			//minimum = 2
			if(approveType=='2'){
				setMaxminCustodian();
				var minVal = $('#custodianPanel').find('input[name=minimum]').attr('min');
				$('#custodianPanel').find('input[name=minimum]').val(minVal);
				$('#custodianPanel').find('div[name=minimum]').show();
			}
		}
	});
	
	$(".header-content-custodian").click(function () {
		$content = $('.content-custodian');
		$content.slideToggle(200,function(){
			if($content.is(":visible")){ 
				$('#custodianPanel').find('button[name=show]').removeClass("hide");
				$('#custodianPanel').find('button[name=saveBtn]').removeClass("hide");
			}
			else{ 
				$('#custodianPanel').find('button[name=show]').addClass("hide");
				$('#custodianPanel').find('button[name=saveBtn]').addClass("hide");
			}
		});
	});
	 
	
	$('#custodianPanel').find('input[name=custodianType]').change(function(){
		resetCustodianErrorTextPerson();
		resetCustodianErrorTextTeam();
		var tempType = $('#custodianPanel').find('input[name=custodianType]:checked').val();
		var radios =  $('#custodianPanel').find('input[name=custodianType]');
		if(tempType=='person'){
			$(radios).filter('[value=team]').prop('checked', true);
		}
		if(tempType=='team'){
			$(radios).filter('[value=person]').prop('checked', true);
		}
		
		
		$('#dialog-warning-change-type').dialog('open');
		
		$("#dialog-warning-change-type").dialog({
			autoOpen: false, modal: true,draggable : false,resizable : false, 
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		var swapType = $('#custodianPanel').find('input[name=custodianType]:checked').val();
					var radioType =  $('#custodianPanel').find('input[name=custodianType]');
					if(swapType=='person'){
						$(radioType).filter('[value=team]').prop('checked', true);
					}
					if(swapType=='team'){
						$(radioType).filter('[value=person]').prop('checked', true);
					}
					
					$('#custodianPanel').find('div[name=minimum]').hide();
					var custodianType = $('#custodianPanel').find('input[name=custodianType]:checked').val();
					
					custodianPersonList = [];
					custodianPersonTeamList = [];
					custodianTeamList = [];
					
					custodianPersonACCList = [];
					custodianPersonTeamACCList = [];
					custodianTeamACCList = [];

					custodianPersonBackOfficeList = [];
					custodianPersonTeamBackOfficeList = [];
					custodianTeamBackOfficeList = [];

					custodianPersonBranchList = [];
					custodianPersonTeamBranchList = [];
					custodianTeamBranchList = [];

					custodianPersonOutletList = [];
					custodianPersonTeamOutletList = [];
					custodianTeamOutletList = [];
					
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
	
	
	//init value
	resetCustodianErrorTextPerson();
	resetCustodianErrorTextTeam();
	
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
		var custodianListTemp = setCustodianListByType(navType);
		
		var username = $(custodianPersonDialog).find('input[name=username]').val();
		var name = $(custodianPersonDialog).find('input[name=name]').val();
		var userId = $(custodianPersonDialog).find('input[name=userId]').val();
		var user = {
			username : username,
			enfullname : name,
			userId : userId
		}
		
		var usernameshow = $(custodianPersonDialog).find('input[name=usernameShow]').val();
		
		if(usernameshow!='' && user.username==''){
			$(custodianPersonDialog).find('font[name=userPickMsg]').show();
			return;
		}
		
		if(user.username==''){
			$(custodianPersonDialog).find('font[name=userNullMsg]').show();
			return;
		}
		if(isDuplicate(user.username,custodianListTemp,"username")){
			$(custodianPersonDialog).find('font[name=userErrorMsg]').show();
			return;
		}
		
		custodianListTemp.push(user);
		$(custodianPersonDialog).dialog('close');
		reloadCustodianPersonTable();
	});
	
	$(custodianPersonDialog).find('.btn-form-panel button[name=cancelBtn]').click(function() {
		resetCustodianErrorTextPerson();
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
		
		var custodianListTemp = setCustodianListByType(navType);
		
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		$("#dialog-confirm").dialog("open");
		
		$("#dialog-confirm").dialog({
			autoOpen: false, modal: true,draggable : false,resizable : false, 
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		custodianListTemp.splice(index-1,1);
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
		
		var custodianListTemp = setCustodianListByType(navType);
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		index--;
		var temp;
		if(index > 0){
			temp = custodianListTemp[index];
			custodianListTemp[index] = custodianListTemp[index-1];
			custodianListTemp[index-1] = temp;
		}
		reloadCustodianPersonTable();
		return false;
	});
	
	$('#custodianPanel').find('table[name=custodianPersonTable]').on( 'click', '.downBtn', function () {
		
		var custodianListTemp = setCustodianListByType(navType);
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		index--;
		var temp;
		if(index < custodianListTemp.length-1){
			temp = custodianListTemp[index];
			custodianListTemp[index] = custodianListTemp[index+1];
			custodianListTemp[index+1] = temp;
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
		
		var custodianTeamListTemp = setCustodianTeamListByType(navType);
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		$("#dialog-confirm").dialog("open");
		
		$("#dialog-confirm").dialog({
			autoOpen: false, modal: true,draggable : false,resizable : false, 
			buttons : [{
				text : "Confirm",
	        	click : function(){
	        		custodianTeamListTemp.splice(index-1,1);
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
		
		var custodianTeamListTemp = setCustodianTeamListByType(navType);
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		index--;
		var temp;
		if(index >0){
			temp = custodianTeamListTemp[index];
			custodianTeamListTemp[index] = custodianTeamListTemp[index-1];
			custodianTeamListTemp[index-1] = temp;
		}
		reloadCustodianTeamTable();
		return false;
	});
	
	$('#custodianPanel').find('table[name=custodianTeamTable]').on( 'click', '.downBtn', function () {
		
		var custodianTeamListTemp = setCustodianTeamListByType(navType);
		var index = $(this).closest('td').parent()[0].sectionRowIndex;
		
		index--;
		var temp;
		if(index < custodianTeamListTemp.length-1){
			temp = custodianTeamListTemp[index];
			custodianTeamListTemp[index] = custodianTeamListTemp[index+1];
			custodianTeamListTemp[index+1] = temp;
		}
		reloadCustodianTeamTable();
		return false;
	});
	
	$('#custodianPanel').find('table[name=custodianTeamTable]').on( 'click', '.editBtn', function () {
		resetCustodianErrorTextTeam();
		var custodianTeamListTemp = setCustodianTeamListByType(navType);
		
		resetCustodianTeamForm();
		var index = $(this).closest('td').parent()[0].sectionRowIndex - 1;
		var team = custodianTeamListTemp[index];
		
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
		var custodianTeamTempList = setCustodianTeamListByType(navType);
		var username = $(custodianTeamDialog).find('input[name=username]').val();
		var name = $(custodianTeamDialog).find('input[name=name]').val();
		var userId = $(custodianTeamDialog).find('input[name=userId]').val();
		var user = {
			username : username,
			enfullname : name,
			userId : userId
		}
		
		if(isDuplicate(user.username,custodianPersonTeamList,"username")){
			$(custodianTeamDialog).find('font[name=userErrorMsg]').show();
			return;
		}
		
		var idx = $(custodianTeamDialog).find('input[name=idx]').val();
		if(isDuplicateOtherTeam(user.username,custodianTeamTempList,idx,"member","username")){
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
		resetCustodianrPersonForm();
		$(custodianTeamDialog).dialog('close');
	});
	
	$(custodianTeamDialog).find('.btn-dialog-panel button[name=saveBtn]').click(function() {
		resetCustodianErrorTextTeam();
		var custodianTeamTempList = setCustodianTeamListByType(navType);
		
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
			$(custodianTeamDialog).find('font[name=teamNameLength]').show();
			return;
		}
		
		if(custodianPersonTeamList.length==0){
			$(custodianTeamDialog).find('font[name=userNullMsg]').show();
			return;
		}
		
		if(index) {
			// save for edit
			custodianTeamTempList[index] = team;
		} else {
			// save for new
			if(isDuplicate(team.name,custodianTeamTempList,"name")){
				$(custodianTeamDialog).find('font[name=teamNameErrorMsg]').show();
				return;
			}
			custodianTeamTempList.push(team);
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
	
	//save new table
	$('#custodianPanel').find('button[name=saveBtn]').click(function(){

		
		
		var custodianMinimum = $('#custodianPanel').find('input[name=minimum]').val();
	    var custodianType = $('#custodianPanel').find('input[name=custodianType]:checked').val();
	    var appId = $('#applicationForm').find('input[name=appId]').val();
    	var custodianApproveType;
    	if(custodianType=='person'){
    		custodianApproveType = $('div[name=cusPersonApproveType]').find('input[name=cusPersonApproveType]:checked').val();
    		if(custodianPersonList.length==0){
    			$('#dialog-error-please-fill').dialog("open");
    			$('font[name=custodianNullMsg]').show();
    			return;
    		}
    	}
    	else if(custodianType=='team'){
    		custodianApproveType = $('div[name=cusTeamApproveType]').find('input[name=cusTeamApproveType]:checked').val();
    		if(custodianTeamList.length==0){
    			$('#dialog-error-please-fill').dialog("open");
    			$('font[name=custodianNullMsg]').show();
    			return;
    		}
    	}
    	
    	var custodianList = { 	personList :  custodianPersonList.slice(),
				teamList : custodianTeamList.slice() }
    	
    	var custodianACCList = { 	personList :  custodianPersonACCList.slice(),
				teamList : custodianTeamACCList.slice() }

    	var custodianBackOfficeList = { 	personList :  custodianPersonBackOfficeList.slice(),
				teamList : custodianTeamBackOfficeList.slice() }
    	
    	var custodianBranchList = { 	personList :  custodianPersonBranchList.slice(),
				teamList : custodianTeamBranchList.slice() }
    	
    	var custodianOutletList = { 	personList :  custodianPersonOutletList.slice(),
				teamList : custodianTeamOutletList.slice() }

    	var dataParams = {	
    			appId : appId,
    			custodianType : custodianType,
		    	custodianApproveType : custodianApproveType,
		    	custodianMinimum : custodianMinimum,
		    	custodianList : custodianList,
		    	custodianACCList : custodianACCList,
		    	custodianBackOfficeList : custodianBackOfficeList,
		    	custodianBranchList : custodianBranchList,
		    	custodianOutletList : custodianOutletList
    	}
    	
		var jsonData = JSON.stringify(dataParams);
		
    	console.log(jsonData);
    	var url = $('#custodianPanel').attr('action');
    	
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
		
		setMaxminCustodian();
		var custodianList = setCustodianListByType(navType);
		
		var table = $('#custodianPanel').find('table[name=custodianPersonTable]');
		var tableBody = $(table).find('tbody');
		$(tableBody).find('tr[class!=tr0]').remove();
		$.each(custodianList, function(i, user) {
			var row = $(table).find('tbody tr[class=tr0]').clone();
			$(row).removeClass('tr0');
			$(row).find('td[data-idx]').text(++i);
			$(row).find('td[data-username]').text(user.username);
			$(row).find('td[data-enfullname]').text(user.enfullname);
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
			$(row).find('td[data-enfullname]').text(user.enfullname);
			$(row).show();
			$(tableBody).append($(row));
		});
	}

	function reloadCustodianTeamTable(){
		var custodianList = setCustodianTeamListByType(navType);
		var table = $('#custodianPanel').find('table[name=custodianTeamTable]');
		var tableBody = $(table).find('tbody');
		$(tableBody).find('tr[class!=tr0]').remove();
		$.each(custodianList, function(i, team) {
			if(team.teamName){
				team.name = team.teamName;
			}
			var row = $(table).find('tbody tr[class=tr0]').clone();
			$(row).removeClass('tr0');
			$(row).find('td[data-idx]').text(++i);
			$(row).find('td[data-teamname]').text(team.name);
			var member_name = "";
			$.each(team.member,function(i,user){
				member_name += (i+1)+". "+user.enfullname;
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

