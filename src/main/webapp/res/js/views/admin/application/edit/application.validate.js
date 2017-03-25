$(function(){
	
	//validate application name
	$('input[name=appName]').on('change',function(){
		$('font[name=appNameNullMsg]').hide();
		$('font[name=appNameLengthMsg]').hide();
		$('font[name=appNameErrorMsg]').hide();
		$('font[name=appNameSuccessMsg]').hide();
	
		var appName =  $('#applicationForm').find('input[name=appName]').val().trim();
		$('#applicationForm').find('input[name=appName]').val(appName);
		if(appName==''){
			$('font[name=appNameNullMsg]').show();
		}
		
		if(appName.length>100){
			$('font[name=appNameLengthMsg]').show();
	     }
	});

	//validate appinfo
    $('textarea[name=appInfo]').on('change',function(){
    	$('font[name=appInfoLengthMsg]').hide();
		var appInfo =  $('#applicationForm').find('textarea[name=appInfo]').val().trim();
		$('#applicationForm').find('textarea[name=appInfo]').val(appInfo);
		if(appInfo.length>250){
       		 $('font[name=appInfoLengthMsg]').show();
       	}
    });
    
    //validate authentication
   	$('#applicationForm').find('input[name=authenBy]').on('change',function(){
   		$('font[name=appAuthenNullMsg]').hide();
   		var authentication = [];
   	   	$('#applicationForm').find('input[name=authenBy]:checked').each(function(i){
   		        authentication.push($(this).val());
   		});
   	   	
   	   	if(authentication.length==0){
   	   		 $('font[name=appAuthenNullMsg]').show();
   	   	}
   	});
   	
   	//validate role application name
	$('#roleApplicationDialog').find('input[name=roleName]').on('change',function(){
		$('font[name=appRoleNullMsg]').hide();
		$('font[name=appRoleLengthMsg]').hide();
		$('font[name=appRoleErrorMsg]').hide();
		var appRoleName = $('#roleApplicationDialog').find('input[name=roleName]').val().trim();
		$('#roleApplicationDialog').find('input[name=roleName]').val(appRoleName);
		
		if(appRoleName==''){
			$('#roleApplicationDialog').find('font[name=appRoleNullMsg]').show();
		}
		
		if(appRoleName.length>100){
			$('#roleApplicationDialog').find('font[name=appRoleLengthMsg]').show();
		}
	});
	
	//validate role application desc
	$('#roleApplicationDialog').find('textarea[name=roleDesc]').on('change',function(){
		$('font[name=appRoleDescLengthMsg]').hide();
		var roleDesc = $('#roleApplicationDialog').find('textarea[name=roleDesc]').val().trim();
		$('#roleApplicationDialog').find('textarea[name=roleDesc]').val(roleDesc);
		if(roleDesc.length>250){
			$('#roleApplicationDialog').find('font[name=appRoleDescLengthMsg]').show();
		}
	});
	
	//validate eligible role choice
	$('select[name=roleName]').on('change',function(){
		$('#eligibleDialog').find('font[name=appRoleErrorMsg]').hide();
		$('#eligibleDialog').find('font[name=appRoleNoItemMsg]').hide();
	});
	
	//app owner team name validate
	$('#appOwnerTeamDialog').find('input[name=teamName]').on('change',function(){
		
		$('#appOwnerTeamDialog').find('font[name=teamNameNullMsg]').hide();
		$('#appOwnerTeamDialog').find('font[name=teamNameErrorMsg]').hide();
		$('#appOwnerTeamDialog').find('font[name=teamNameLengthMsg]').hide();
		
		var teamName = $('#appOwnerTeamDialog').find('input[name=teamName]').val().trim();
		$('#appOwnerTeamDialog').find('input[name=teamName]').val(teamName);
		
		if(teamName==''){
			$('#appOwnerTeamDialog').find('font[name=teamNameNullMsg]').show();
		}
		
		if(teamName.length>100){
			$('#appOwnerTeamDialog').find('font[name=teamNameLengthMsg]').show();
		}
		
	});
	
	//custodian team name validate
	$('#custodianTeamDialog').find('input[name=teamName]').on('change',function(){
		$('#custodianTeamDialog').find('font[name=teamNameNullMsg]').hide();
		$('#custodianTeamDialog').find('font[name=teamNameErrorMsg]').hide();
		$('#custodianTeamDialog').find('font[name=teamNameLengthMsg]').hide();
		
		var teamName = $('#custodianTeamDialog').find('input[name=teamName]').val().trim();
		$('#custodianTeamDialog').find('input[name=teamName]').val(teamName);
		
		if(teamName==''){
			$('#custodianTeamDialog').find('font[name=teamNameNullMsg]').show();
		}
		
		if(teamName.length>100){
			$('#custodianTeamDialog').find('font[name=teamNameLengthMsg]').show();
		}
	});
    
});