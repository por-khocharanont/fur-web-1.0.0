var listfile;
var cachRecord=[];
function  clickFunction(rows,appRoleId,appId,appName,appRoleName){
	var requestToken;
			if(duplicateRoleIdgrid(appRoleId)){
			// Duplicate
			}else{
			$.when(
					$.ajax({
						url : '/fur-web/userrequest/individual/ListpathAppfileByRoleappId',
					    type : 'GET',
					    data : {'appRoleId':appRoleId,'appId':appId},
					    contentType: "application/json; charset=utf-8",
					    success : function(data) {
					    	listfile=data;
					    },
					    error : function(jqXHR, textStatus, errorThrown) {
					    }
				    }),
					$.ajax({
						url : '/fur-web/userrequest/app/authenType',
					    type : 'GET',
					    data : {'appRoleId':appRoleId,'appId':appId},
					    contentType: "application/json; charset=utf-8",
					    success : function(data) {
					    	requestToken=data;
					    },
					    error : function(jqXHR, textStatus, errorThrown) {
					    }
				    })
			).then(function() {
				if(requestToken!=null&&requestToken!=''){
					if(requestToken=='1'){
			    		$("span[name='requestToken']").text('Request Token');
			    		$("span[name='requestToken']").show();
			    	}else{
			    		$("span[name='requestToken']").hide();
			    	}
					$('#selectAppDialog').dialog('open');
					$("input[name='confirTxtApp']").attr('disabled',true);
					$("input[name='confirTxtApp']").val(appName);
					$("input[name='rolconfirApp']").attr('disabled',true);
					$("input[name='rolconfirApp']").val(appRoleName);
					$("input[name='hidappRoleId']").val(appRoleId);
					$("input[name='hidappId']").val(appId);
					$("textarea[name='remarkConfirm']").val('');
				}
				
			});
			
			
			
	  }
		
	}
//function  PrePareuploadfile(rowsId){
//	
//	alert("hello upload");
//		
//	}
 function duplicateRoleIdgrid(appRoleId){
	var rows = $("#appjqGrid").jqGrid('getRowData');
	var dup = false;
	if(rows!=null){
		$.each(rows,function(i,v){
			if(v.appRoleId==appRoleId){
				dup =true;
			}
		});
	}
	return dup;
   }