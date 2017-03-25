var listfile;
var cachRecord=[];
var requestType = new Array();
var requestBy = new Array();
function closeDialogsAll(){
				  $('#dialog-create-confirm').dialog('close');
				  $('#dialog-warning').dialog('close');
				  $('#addAplicationStd').dialog('close');
				  $('#addAplicationSpecail').dialog('close');
				  $('#selectNewAppDialog').dialog('close');
				  $('#selectTerAppDialog').dialog('close');
				  $('#selectChgAppDialog').dialog('close');
				  $('#addAplicationStd').dialog('close');
				  $('#changeAppDialog').dialog('close');
				  $('#terminalAppDialog').dialog('close');
				  $('#terUserAuthorAppDialog').dialog('close');
}
function  clickAddNewApp(appRoleId,appId,appName,appRoleName){
	var requestToken;
			if(duplicateRoleIdgridNewApp(appRoleId)){
			// Duplicate
				$("#dialog-warning").text('ตรวจสอบพบการเลือกการ Application และ Role Application นี้แล้ว');
				$("#dialog-warning").dialog('open');
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
			    		$("span[name='requestToken']").show();
			    	}else{
			    		$("span[name='requestToken']").hide();
			    	}
					$('#addAplicationStd').dialog('close');
					$('#addAplicationSpecail').dialog('close');
					$('#selectNewAppDialog').dialog('open');
					$("p[name='confirTxtApp']").text(appName);
					$("p[name='rolconfirApp']").text(appRoleName);
					$("input[name='hidappRoleId']").val(appRoleId);
					$("input[name='hidappId']").val(appId);
					$("textarea[name='remarkConfirm']").val('');
				}
				
			});
			
			
			
			}
		
}
 function firstHideCompanent(){
	 $('.radioRequestBy').hide();
	 $('.errordif').hide();
	 $('.accUr').hide();
	 $('.userDatepicker').hide();
	 $("div[name='appChange']").hide();
	 $('.userDatepickerChg').hide();
	 $("div[name='appChangePeriod']").hide();
	 $("div[name='appTerminate']").hide();
	 $("div[name='appTerminate']").hide();
	 $("div[name='previewPeriod']").hide();
	 $("div[name='preAppGridNew']").hide();
	 $("div[name='preAppGridChg']").hide();
	 $("div[name='preAppGridTer']").hide();
	 $("div[name='divremark']").hide();
	 $("div.previewPage").hide();
 }
 function DeleteRowTer (appRoleId){
	 $("#dialog-ter-confirm").val(appRoleId);
	 $("#dialog-ter-confirm").dialog('open');
 }
 
 function DeleteRowChg (appRoleId){
	 $("#dialog-chg-confirm").val(appRoleId);
	 $("#dialog-chg-confirm").dialog('open');
 }
 
 function DeleteRowNew (appRoleId){
	 $("#dialog-new-confirm").val(appRoleId);
	 $("#dialog-new-confirm").dialog('open');
 }
 
 function duplicateRoleIdgridNewApp(appRoleId){
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
 function clickaddTerApp (rows,appRoleId,appId,appName,appRoleName){
	 if(duplicateRoleIdgridTerminateApp(appRoleId)){
		 $("#dialog-warning").text('ตรวจสอบพบการเลือกการ Application และ Role Application นี้แล้ว');
		 $("#dialog-warning").dialog('open');
			// Duplicate
	 }else{
		 	$('#terminalAppDialog').dialog('close');
		 	$('#selectTerAppDialog').dialog('open');
			$("input[name='terHidappId']").val(appId);
			$("input[name='terHidappRoleId']").val(appRoleId);
			$("p[name='confirTxtAppTer']").text(appName);
			$("p[name='rolconfirAppTer']").text(appRoleName);
			$("textarea[name='remarkConfirmTer']").val('');
	 }
 }

 function clickaddChgApp (rows,appRoleId,appId,appName,appRoleName){
	 if(duplicateRoleIdOldgridchgApp(appRoleId)){
		 $("#dialog-warning").text('ตรวจสอบพบการเลือกการ Application และ Role Application นี้แล้ว');
		 $("#dialog-warning").dialog('open');
			// Duplicate
	 }else{
		 	$('#changeAppDialog').dialog('close');
		 	$('#selectChgAppDialog').dialog('open');
			$("input[name='chgHidappId']").val(appId);
			$("input[name='chgHidappRoleId']").val(appRoleId);
			$("p[name='chgConfirTxtApp']").text(appName);
			$("p[name='chgRolconfirApp']").text(appRoleName);
			$("textarea[name='chgRemarkConfirm']").val('');
			$("div[name='chgAppConfirCombobox']").hide();
			$("span[name='chgAppErrorTxt']").hide();
//			$("span[name='chgAppConfirTxt']").hide();
//			$("select[name='appRoleNewChg']").html("<option selected='selected' value='' class='text-center'>----------------</option>");
			$('input[name="chgAppConfirChkbox"]').prop('checked', false); 
	 }
 }
 function duplicateRoleIdOldgridchgApp(appRoleId){
	 var rows = $("#appChangejqGrid").jqGrid('getRowData');
		var dup = false;
		if(rows!=null){
			$.each(rows,function(i,v){
				if(v.appRoleIdOld==appRoleId){
					dup =true;
				}
			});
		}
		return dup;
 }
 function duplicateRoleIdgridChgApp(appRoleId){
		var rows = $("#appChangejqGrid").jqGrid('getRowData');
		var dup = false;
		if(rows!=null){
			$.each(rows,function(i,v){
				if(v.appRoleIdNew==appRoleId){
					dup =true;
				}
			});
		}
		return dup;
}
 function duplicateRoleIdgridTerminateApp(appRoleId){
	 var rows = $("#appTerminatejqGrid").jqGrid('getRowData');
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
$(document).ready(function() {
	var $searchBtnStd  = $("button[name='btnSerachAppStd']").attr('action');
	$('input[name=subject]').on('change',function(){
		$('span[name=txMsgSubject]').hide();
		var appName =  $('input[name=subject]').val().trim();
//		$('#applicationForm').find('input[name=appName]').val(appName);
		if(appName==''){
			$('span[name=txMsgSubject]').html('กรุณากรอกข้อมูล Subject');
			$('span[name=txMsgSubject]').show();
		}

		if(appName.length>100){
			$('span[name=txMsgSubject]').html('กรุณากรอกข้อมูลที่มีความยาวไม่เกิน 100 ตัวอักษร');
			$('span[name=txMsgSubject]').show();
		}
		
		});
	function getRoleStdElm(appId){
			var strValue = "appId="+appId;
			var $form = $("#addApplform");
			$("#addApplform").find("div[name=divrolappstd]").hide();
			var $appRoleStdElm = $form.find('select[name=rolappstd]');
	        var actionappRole = $appRoleStdElm.attr('action');      
			$.get(actionappRole, strValue,function(data){
				var txOption = '';
				$.each(data,function(key,val){
					txOption += '<option class="text-center" value="'+val["appRoleId"]+'">'+val["appRoleName"]+'</option>';							
				}); 				 				
				$appRoleStdElm.html(txOption);
				
				$("#addApplform").find("div[name=divrolappstd]").show();
			});
			
	}
	
	function getRoleSpcElm(appId){
			var strValue = "appId="+appId;
			var $form = $("#addAppSpcform");
			$("#addAppSpcform").find("div[name=divroleappspc]").hide();
			var $appRoleSpcElm = $form.find('select[name=roleappspc]');
	        var actionappRole = $appRoleSpcElm.attr('action');      
			$.get(actionappRole, strValue,function(data){
				var txOption = '';
				$.each(data,function(key,val){
					txOption += '<option class="text-center" value="'+val["appRoleId"]+'">'+val["appRoleName"]+'</option>';							
				}); 				 				
				$appRoleSpcElm.html(txOption);
				
				$("#addAppSpcform").find("div[name=divroleappspc]").show();
			});
			
	}
	
	function getRoleChgAppElm(chgHidappRoleId){
		var strValue = {};
		strValue['appRoleId']=chgHidappRoleId;
		strValue['username'] = $('#userjqGrid').jqGrid('getCol', 'username')[0];
		strValue['type']=$("#usertype option:selected").val();
		var appRoleStdElm = $("select[name='appRoleNewChg']");
        var actionappRole = appRoleStdElm.attr('action');      
		$.get(actionappRole, strValue,function(data){
			var txOption = '';
			if(data.length<=0){
				txOption = "<option value='' selected='selected' >Not found data application for change</option>";
//				$("span[name='chgAppConfirTxt']").show();
			}else{
//				$("span[name='chgAppConfirTxt']").hide();
				txOption = "<option value='' selected='selected' >Select New Role Application</option>";
				$.each(data,function(key,val){
					txOption += '<option  value="'+val["appRoleId"]+'">'+val["nappRole"]+'</option>';							
				});
			}
			appRoleStdElm.html(txOption);
		});
	}
	$( "button[name='chgBtnAddRole']" ).click(function() {
		
		var rowLength = $("#appChangejqGrid").jqGrid('getRowData').length;
		if(rowLength==0){
			//first record
			var chgRole ='';
			var appRoleIdNew ='';
			var roleNewapplication ='';
			if($("input[name='chgAppConfirChkbox']")[0].checked&&$("select[name='appRoleNewChg'] option:selected").val()!=''){
				chgRole='CH1R1';
				appRoleIdNew=$("select[name='appRoleNewChg'] option:selected").val();
				roleNewapplication=$("select[name='appRoleNewChg'] option:selected").text();
				var remark='';
				if($("textarea[name='chgRemarkConfirm']").val()!=null&&$("textarea[name='chgRemarkConfirm']").val()!=''){
					remark=$("textarea[name='chgRemarkConfirm']").val();
				}
				var data = {
						appId:$("input[name='chgHidappId']").val(),
						application:$("p[name='chgConfirTxtApp']").text(),
						appRoleIdOld:$("input[name='chgHidappRoleId']").val(),
						roleOldapplication:$("p[name='chgRolconfirApp']").text(),
						appRoleIdNew:appRoleIdNew,
						roleNewapplication:roleNewapplication,
						chgRole:chgRole,
						remark:remark
				};
				var datas = [];
				datas.push(data);
				$('#appChangejqGrid').addRowData($("input[name='chgHidappRoleId']").val(), data);
				closeDialogsAll();
				$("div.empty").hide();
				$("div[name='appChange']").show();
	    	}else if(!$("input[name='chgAppConfirChkbox']")[0].checked){
	    		var remark='-';
				if($("textarea[name='chgRemarkConfirm']").val()!=null&&$("textarea[name='chgRemarkConfirm']").val()!=''){
					remark=$("textarea[name='chgRemarkConfirm']").val();
				}
	    		var data = {
						appId:$("input[name='chgHidappId']").val(),
						application:$("p[name='chgConfirTxtApp']").text(),
						appRoleIdOld:$("input[name='chgHidappRoleId']").val(),
						roleOldapplication:$("p[name='chgRolconfirApp']").text(),
						appRoleIdNew:appRoleIdNew,
						roleNewapplication:roleNewapplication,
						chgRole:chgRole,
						remark:remark
				};
				var datas = [];
				datas.push(data);
				$('#appChangejqGrid').addRowData($("input[name='chgHidappRoleId']").val(), data);
				closeDialogsAll();
				$("div.empty").hide();
				$("div[name='appChange']").show();
	    	}else if($("input[name='chgAppConfirChkbox']")[0].checked&&$("select[name='appRoleNewChg'] option:selected").val()==''){
	    		$("span[name='chgAppErrorTxt']").show();
		    	$("span[name='chgAppErrorTxt']").text('	No items available');
	    	}
				
	    	
	   }else{
		    var rows = $("#appChangejqGrid").jqGrid('getRowData')[0];
		    
		    if($("input[name='chgAppConfirChkbox']")[0].checked&&rows.chgRole!=null&&rows.chgRole!=''){
		    	if($("select[name='appRoleNewChg'] option:selected").val()==null||$("select[name='appRoleNewChg'] option:selected").val()==''){
		    		$("span[name='chgAppErrorTxt']").show();
			    	$("span[name='chgAppErrorTxt']").text('	No items available');
		    		// not found appRole in selected  Application
		    	}
		    	else if(duplicateRoleIdgridChgApp($("select[name='appRoleNewChg'] option:selected").val())){
		    		//duplicate Application Role NEW
		    	}else{
		    		var remark='-';
					if($("textarea[name='chgRemarkConfirm']").val()!=null&&$("textarea[name='chgRemarkConfirm']").val()!=''){
						remark=$("textarea[name='chgRemarkConfirm']").val();
					}
		    		var data = {
							appId:$("input[name='chgHidappId']").val(),
							application:$("p[name='chgConfirTxtApp']").text(),
							appRoleIdOld:$("input[name='chgHidappRoleId']").val(),
							roleOldapplication:$("p[name='chgRolconfirApp']").text(),
							appRoleIdNew:$("select[name='appRoleNewChg'] option:selected").val(),
							roleNewapplication:$("select[name='appRoleNewChg'] option:selected").text(),
							chgRole:'CH1R1',
							remark:remark
					};
					var datas = [];
					datas.push(data);
					$('#appChangejqGrid').addRowData($("input[name='chgHidappRoleId']").val(), data);
					closeDialogsAll();
					$("div.empty").hide();
					$("div[name='appChange']").show();
		    	}
		    }else if((!$("input[name='chgAppConfirChkbox']")[0].checked)&&rows.chgRole==''){
		    	var remark='-';
				if($("textarea[name='chgRemarkConfirm']").val()!=null&&$("textarea[name='chgRemarkConfirm']").val()!=''){
					remark=$("textarea[name='chgRemarkConfirm']").val();
				}
		    	var data = {
						appId:$("input[name='chgHidappId']").val(),
						application:$("p[name='chgConfirTxtApp']").text(),
						appRoleIdOld:$("input[name='chgHidappRoleId']").val(),
						roleOldapplication:$("p[name='chgRolconfirApp']").text(),
						appRoleIdNew:'',
						roleNewapplication:'-',
						chgRole:'',
						remark:remark
				};
				var datas = [];
				datas.push(data);
				$('#appChangejqGrid').addRowData($("input[name='chgHidappRoleId']").val(), data);
				closeDialogsAll();
				$("div.empty").hide();
				$("div[name='appChange']").show();
		    }else if(rows.chgRole==''&&$("input[name='chgAppConfirChkbox']")[0].checked){
		    	$("span[name='chgAppErrorTxt']").show();
		    	$("span[name='chgAppErrorTxt']").text('กรุณาเลือก New Role Application ให้ตรงกับ  Application ที่ทำการเลือกก่อนหน้านี้');
		    	//please uncheck in dialog select app. because firstRecord don't change Role
		    }else if(rows.chgRole!=null&&rows.chgRole!=''&&(!$("input[name='chgAppConfirChkbox']")[0].checked)){
		    	$("span[name='chgAppErrorTxt']").show();
		    	$("span[name='chgAppErrorTxt']").text('กรุณาเลือก New Role Application ให้ตรงกับ  Application ที่ทำการเลือกก่อนหน้านี้');
		    	//please check box in dialog select app because firstRecord chgRole = CH1R1
		    }
	    	
	    }
		
		
	    return false;
	});
	
	requestBy[0] = "1";
	$("input[name='requestBy']").change(function() {
		if($(this).val()==1&&$("input[name='requestType']:checked").val()==1){ //Individual - New
			$('.radioRequestBy').hide();
			$("#userjqGrid").jqGrid("clearGridData", true);
			$("#userjqGrid")[0].addJSONData(listuserfirst);
			$(".errordif").hide();
			$("div.userjqGrid").show();
			$("div.emptyUserList").hide();
			requestBy.push($(this).val()) ;
		    $('#requestBy-previous').val(requestBy[requestBy.length-1]);
		    $("label.requestTypeChange").show();
		    $("#userjqGridPager").hide();
		}else if($(this).val()==1&&$("input[name='requestType']:checked").val()==2){ //Individual - Terminate
			$('.radioRequestBy').hide();
			$("#userjqGrid").jqGrid("clearGridData", true);
			$("#userjqGrid")[0].addJSONData(listuserfirst);
			$(".errordif").hide();
			$("div.userjqGrid").show();
			$("div.emptyUserList").hide();
			requestBy.push($(this).val()) ;
		    $('#requestBy-previous').val(requestBy[requestBy.length-1]);
		    $("label.requestTypeChange").show();
		    $("#userjqGridPager").hide();
		}else if($(this).val()==1&&$("input[name='requestType']:checked").val()==3){ //Individual - Change
			$('.radioRequestBy').hide();
			$("#userjqGrid").jqGrid("clearGridData", true);
			$("#userjqGrid")[0].addJSONData(listuserfirst);
			$(".errordif").hide();
			$("div.userjqGrid").show();
			$("div.emptyUserList").hide();
			requestBy.push($(this).val()) ;
		    $('#requestBy-previous').val(requestBy[requestBy.length-1]);
		    $("label.requestTypeChange").show();
		    $("#userjqGridPager").hide();
		}else if($(this).val()==2&&$("input[name='requestType']:checked").val()==1){ //Group - New
			$('.radioRequestBy').show();
			$("#userjqGrid").jqGrid("clearGridData", true);
			$("div.emptyUserList").show();
			$("div.userjqGrid").hide();
			requestBy.push($(this).val()) ;
		    $('#requestBy-previous').val(requestBy[requestBy.length-1]);
		    $("label.requestTypeChange").hide();
		}else if($(this).val()==2&&$("input[name='requestType']:checked").val()==2){ //Group - Terminate
			$('.radioRequestBy').show();
			$("#userjqGrid").jqGrid("clearGridData", true);
			$("div.emptyUserList").show();
			$("div.userjqGrid").hide();
			requestBy.push($(this).val());
		    $('#requestBy-previous').val(requestBy[requestBy.length-1]);
		    $("label.requestTypeChange").hide();
		}else if($(this).val()==2&&$("input[name='requestType']:checked").val()==3){ //Group - Change
//			$("input[name='requestBy'][value='"+$('#requestBy-previous').val()+"']").prop('checked', true);
//			$("input[name='requestType'][value='"+$('#requestType-previous').val()+"']").prop('checked', true);
//			$("label.requestTypeChange").hide();
			$('.radioRequestBy').show();
			$("#userjqGrid").jqGrid("clearGridData", true);
			$("div.emptyUserList").show();
			$("div.userjqGrid").hide();
			requestBy.push($(this).val()) ;
		    $('#requestBy-previous').val(requestBy[requestBy.length-1]);
		    $("label.requestTypeChange").hide();
			$("input[name='requestType'][value='1']").prop('checked', true);
		}
		$("#appjqGrid").jqGrid("clearGridData", true);
		$("#appChangejqGrid").jqGrid("clearGridData", true);
		$("#appTerminatejqGrid").jqGrid("clearGridData", true);
		$("div.empty").show();
		$("div[name='appNew']").hide();
		$("div[name='appTerminate']").hide();
		$("div[name='appChange']").hide();
	});
	requestType[0] = "1";
	$("input[name='requestType']").change(function(e) {
		if($(this).val()==1&&$("input[name='requestBy']:checked").val()==1){ //  New - Individual
			requestType.push($(this).val());
		    $('#requestType-previous').val(requestType[requestType.length-1]);
			$("div[name='appTerminate']").hide();
			$("div[name='appChange']").hide();
			var countrowdataNew = $("#appjqGrid").jqGrid('getGridParam', 'records');
			if(countrowdataNew==0){
				$("div.empty").show();
				$("div[name='appNew']").hide();
			}else{
				$("div.empty").hide();
				$("div[name='appNew']").show();
			}
		}else if($(this).val()==2&&$("input[name='requestBy']:checked").val()==1){ // Terminate - Individual
			requestType.push($(this).val());
		    $('#requestType-previous').val(requestType[requestType.length-1]);
		    $('.radioRequestBy').hide();
//			$("div[name='appTerminate']").show();
			$("div[name='appChange']").hide();
			$("div[name='appNew']").hide();
			var countrowdataTer = $("#appTerminatejqGrid").jqGrid('getGridParam', 'records');
			if(countrowdataTer==0){
				$("div.empty").show();
				$("div[name='appTerminate']").hide();
			}else{
				$("div.empty").hide();
				$("div[name='appTerminate']").show();
			}
		}else if($(this).val()==3&&$("input[name='requestBy']:checked").val()==1){ // Change - Individual
			requestType.push($(this).val());
		    $('#requestType-previous').val(requestType[requestType.length-1]);
			$("#userjqGrid").jqGrid("clearGridData", true);
			$("#userjqGrid")[0].addJSONData(listuserfirst);
			$("div[name='appTerminate']").hide();
			$("div[name='appNew']").hide();
//			$("div[name='appChange']").show();
			var countrowdataChg = $("#appChangejqGrid").jqGrid('getGridParam', 'records');
			if(countrowdataChg==0){
				$("div.empty").show();
				$("div[name='appChange']").hide();
			}else{
				$("div.empty").hide();
				$("div[name='appChange']").show();
			}
		}else if($(this).val()==1&&$("input[name='requestBy']:checked").val()==2){ // New - Group
			requestType.push($(this).val());
		    $('#requestType-previous').val(requestType[requestType.length-1]);
			$("div[name='appTerminate']").hide();
			$("div[name='appChange']").hide();
			var countrowdataNew = $("#appjqGrid").jqGrid('getGridParam', 'records');
			if(countrowdataNew==0){
				$("div.empty").show();
				$("div[name='appNew']").hide();
			}else{
				$("div.empty").hide();
				$("div[name='appNew']").show();
			}
		}else if($(this).val()==2&&$("input[name='requestBy']:checked").val()==2){ // Terminate - Group
			requestType.push($(this).val());
		    $('#requestType-previous').val(requestType[requestType.length-1]);
			$("div[name='appChange']").hide();
			$("div[name='appNew']").hide();
			var countrowdataTer = $("#appTerminatejqGrid").jqGrid('getGridParam', 'records');
			if(countrowdataTer==0){
				$("div.empty").show();
				$("div[name='appTerminate']").hide();
			}else{
				$("div.empty").hide();
				$("div[name='appTerminate']").show();
			}
		}else if($(this).val()==3&&$("input[name='requestBy']:checked").val()==2){ // Change - Group
			$("input[name='requestType'][value='"+$('#requestType-previous').val()+"']").prop('checked', true);
		}
	});
	
	$("[type='checkbox'][name='appChangeChk']").change(function() {
	    if(this.checked) {
	    	$("div[name='appChangePeriod']").show();
	    }else{
	    	$("div[name='appChangePeriod']").hide();
	    }
	});
	
	$("[type='checkbox'][name='chgAppConfirChkbox']").change(function() {
	    if(this.checked) {
	    	$("div[name='chgAppConfirCombobox']").show();
	    	getRoleChgAppElm($("input[name='chgHidappRoleId']").val());
	    	$("span[name='chgAppErrorTxt']").hide();
	    }else{
	    	$("div[name='chgAppConfirCombobox']").hide();
	    }
	});
	$("input[name='period']").change(function() {
	if($(this).val()==2){
		$('.userDatepicker').show();
	}else{
		$('.userDatepicker').hide();
	}
	});
	
	$("input[name='periodChg']").change(function() {
		if($(this).val()==2){
			$('.userDatepickerChg').show();
		}else{
			$('.userDatepickerChg').hide();
		}
		});
	
	$("#usertype").change(function() {
		
	if($(this).val()=='1'){
		$('div.appUr').show();
		$('div.accUr').hide();
	}});
	
	$( "button[name='btnAddAppl']" ).click(function() {
		//check org by user >> must write service get org with alluser
		var username = $('#userjqGrid').jqGrid('getCol', 'username')[0];
		var rowLengthNew = $("#appjqGrid").jqGrid('getRowData').length;
		var rowLengthChg = $("#appChangejqGrid").jqGrid('getRowData').length;
		var rowLengthTer = $("#appTerminatejqGrid").jqGrid('getRowData').length;
		if(username==null||username==''){
			$("#dialog-warning").text('ไม่พบข้อมูล User List');
			$("#dialog-warning").dialog('open');
		}else if($("input[name='requestType']:radio:checked").val()=='1'&&rowLengthNew>=20){
			$("#dialog-warning").text('ข้อมูลการขอ UR ต้องไม่เกิน 20 ของ Application และ Role Application ที่ทำการขอ');
			$("#dialog-warning").dialog('open');
		}else if($("input[name='requestType']:radio:checked").val()=='2'&&rowLengthTer>=20){
			$("#dialog-warning").text('ข้อมูลการขอ UR ต้องไม่เกิน 20 ของ Application และ Role Application ที่ทำการขอ');
			$("#dialog-warning").dialog('open');
		}else if($("input[name='requestType']:radio:checked").val()=='3'&&rowLengthChg>=20){
			$("#dialog-warning").text('ข้อมูลการขอ UR ต้องไม่เกิน 20 ของ Application และ Role Application ที่ทำการขอ');
			$("#dialog-warning").dialog('open');
		}else if($("input[name='requestType']:radio:checked").val()=='1'&&username!=null&username!=''){
			$('#addAplicationStd').dialog('open');
			$("#stdApp").val('');
			$("#spcialApp").val('');
			$("button[name='btnSerachAppStd']").click();
			$("button[name='btnSerachAppSpc']").click();
		}else if($("input[name='requestType']:radio:checked").val()=='3'&&username!=null&username!=''){
			$('#changeAppDialog').dialog('open');
			$("#changeApptxt").val('');
			$("button[name='chgAddappbtn']").click();
		}else if($("input[name='requestType']:radio:checked").val()=='2'&&username!=null&username!=''){
			$('#terminalAppDialog').dialog('open');
			$("#terminaltxtApp").val('');
			$("#userAuthorChangeApptxt").val('');
			$("button[name='terSerachGridAppbtn']").click();
			$("button[name='userAuthorChgAddappbtn']").click();
		}else{
			
		}
	    return false;
	});
	$( "button[name='backPreview']" ).click(function() {
		$('div.previewPage').hide();
		$("span[name='alertErrorUser']").hide();
		$('div.formUserrequest').show();
		$("textarea[name='urremark']").val('');
		$("div[name='divremark']").hide();
	    return false;
	});
	$( "button[name='btnstandard']" ).click(function() {
		$('#addAplicationStd').dialog('open');
		$('#addAplicationSpecail').dialog('close');
	    return false;
	});
	$( "button[name='btnspecial']" ).click(function() {
		$('#addAplicationSpecail').dialog('open');
		$('#addAplicationStd').dialog('close');
	    return false;
	});
	$( "button[name='btnUserAuthorizeTerminate']" ).click(function() {
		$('#terUserAuthorAppDialog').dialog('open');
		$('#terminalAppDialog').dialog('close');
	    return false;
	});
	$( "button[name='backUserAuthorizeTerminate']" ).click(function() {
		$('#terminalAppDialog').dialog('open');
		$('#terUserAuthorAppDialog').dialog('close');
	    return false;
	});
	$( "button[name='btnAddRole']" ).click(function() {
		if(duplicateRoleIdgridNewApp($("input[name='hidappRoleId']").val())){
			$("#dialog-warning").text('ตรวจสอบพบการเลือกการ Application และ Role Application นี้แล้ว');
			$("#dialog-warning").dialog('open');
		}else{
			var datas = [];
			var status;
			var remark;
			if(listfile.length>0){
				status = "Incomplete"
			}else{
				status = 'Complete';
			}
			if($("textarea[name='remarkConfirm']").val()==null||$("textarea[name='remarkConfirm']").val()==''){
				remark = '';
			}else{
				remark = $("textarea[name='remarkConfirm']").val();
			}
			var data = {
				appId:$("input[name='hidappId']").val(),
				appRoleId:$("input[name='hidappRoleId']").val(),
				application:$("p[name='confirTxtApp']").text(),
				roleapplication:$("p[name='rolconfirApp']").text(),
				remark:remark,
				status:status
			};
			datas.push(data);
			$('#appjqGrid').addRowData($("input[name='hidappRoleId']").val(), data);
			closeDialogsAll();
			$("[name='appNew']").show();
			$("div.empty").hide();
		}
	});
	$( "button[name='terBtnAddRole']" ).click(function() {
		if(duplicateRoleIdgridTerminateApp($("input[name='terHidappRoleId']").val())){
			$("#dialog-warning").text('ตรวจสอบพบการเลือกการ Application และ Role Application นี้แล้ว');
			$("#dialog-warning").dialog('open');
		}else{
			var datas = [];
			var remark='';
			if($("textarea[name='remarkConfirmTer']").val()!=null&&$("textarea[name='remarkConfirmTer']").val()!=''){
				remark=$("textarea[name='remarkConfirmTer']").val();
			}
			var data = {
				appId:$("input[name='terHidappId']").val(),
				appRoleId:$("input[name='terHidappRoleId']").val(),
				application:$("p[name='confirTxtAppTer']").text(),
				roleapplication:$("p[name='rolconfirAppTer']").text(),
				remark:remark
			};
			datas.push(data);
			$('#appTerminatejqGrid').addRowData($("input[name='terHidappRoleId']").val(), data);
			closeDialogsAll();
			$("[name='appTerminate']").show();
			$("div.empty").hide();
		}
	});

	$('#addAplicationStd').dialog({
		autoOpen: false, 
        modal: true,
        draggable : false,
        resizable : false,
	    width: 1000
	});
	$('#addAplicationSpecail').dialog({
		autoOpen: false, 
        modal: true,
        draggable : false,
        resizable : false,
	    width: 1000
	});
	$('#changeAppDialog').dialog({
		autoOpen: false, 
        modal: true,
        draggable : false,
        resizable : false,
	    width: 1000
	});
	$('#terminalAppDialog').dialog({
		autoOpen: false, 
        modal: true,
        draggable : false,
        resizable : false,
	    width: 1100
	});
	$('#terUserAuthorAppDialog').dialog({
		autoOpen: false, 
        modal: true,
        draggable : false,
        resizable : false,
	    width: 1100
	});
	$('#selectNewAppDialog').dialog({
		autoOpen: false, 
        modal: true,
        draggable : false,
        resizable : false,
	    width: 800
	});
	$('#selectChgAppDialog').dialog({
		autoOpen: false, 
        modal: true,
        draggable : false,
        resizable : false,
	    width: 800
	});
	$('#selectTerAppDialog').dialog({
		autoOpen: false, 
        modal: true,
        draggable : false,
        resizable : false,
	    width: 800
	});
	$("#changeAppjqGrid").jqGrid({
      postData : {
      	appName : function(){
		        		var appName = $("#changeApptxt").val();
		        		return appName;
      	},
      	type : function(){
				return $("#usertype option:selected").val();
      	}
      },
      url: $("button[name='chgAddappbtn']").attr('action'),
      mtype: "GET",
	  styleUI : 'Bootstrap',
      datatype: "json",
      colNames : ['Application','Application Info','Role Application','Role Description','AppRoleIdOld','AppId','Select'],
      colModel: [
          { name: 'napplication', index : 'napplication',width:175 , align : "center",sortable : false,resizable : false},
          { name: 'nappInfo', index : 'nappInfo' ,width:175, align : "center",sortable : false,resizable : false},
          { name: 'nappRoleOld', index : 'nappRoleOld' , align : "center",sortable : false,resizable : false},
          { name: 'nappRoleDesc', index : 'nappRoleDesc',width:180 , align : "center",sortable : false,resizable : false},
          { name: 'appRoleIdOld',index :'appRoleIdOld', key:true, hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'appIdOld',index :'appIdOld', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { 
        	  name: 'subSelect'
        	, index : 'select'
        	, width: 100 
        	, align : "center"
        	,sortable : false
        	,resizable : false
        	,formatter: function(cellvalue, options, rowObject){
        		return "<button style='margin:2px;' class='btn btn-green' type='button' onclick=\"clickaddChgApp("+rowObject.ROWNUM+",'"+rowObject.appRoleIdOld+"','"+rowObject.appIdOld+"','"+rowObject.napplication+"','"+rowObject.nappRoleOld+"');\" >Select</button>"; 
          	}
          }
      ],loadComplete: function(data){
 		 if(data.records>0){
			  $("div.changeAppjqGrid").show();
			  $("div.emptychangeAppjqGrid").hide();
		  }else{
			  $("div.changeAppjqGrid").hide();
			  $("div.emptychangeAppjqGrid").show();
		  }
	  },
      beforeSelectRow: function (rowid, e) {
		    var $self = $(this),
		        $td = $(e.target).closest("td"),
		        iCol = $.jgrid.getCellIndex($td[0]),
		        cm = $self.jqGrid("getGridParam", "colModel");

		    return (cm[iCol].name === "cb");
      },
      width: "100%",
      rownumbers: true,
      height : "100%",
      viewrecords: true,
      rowNum: 20,
      autoencode : true ,
	  hidegrid : false ,
	  autowidth: true,
	  shrinkToFit : true,
      pager: "#changeAppjqGridPager",
      loadonce: false
  });
	$("#userAuthorChangeAppjqGrid").jqGrid({
	      postData : {
	      	appName : function(){
			        		var appName = $("#userAuthorChangeApptxt").val();
			        		return appName;
	      	},
	      	type : function(){
					return $("#usertype option:selected").val();
	      	}
	      },
	      url: $("button[name='userAuthorChgAddappbtn']").attr('action'),
	      mtype: "GET",
		  styleUI : 'Bootstrap',
	      datatype: "json",
	      colNames : ['Application','Application Info','Role Application','Role Description','AppRoleIdOld','AppId','Select'],
	      colModel: [
	          { name: 'application', index : 'application',width:170 , align : "center",sortable : false,resizable : false},
	          { name: 'appInfo', index : 'appInfo' ,width:200, align : "center",sortable : false,resizable : false},
	          { name: 'appRoleName', index : 'appRoleName' , align : "center",sortable : false,resizable : false},
	          { name: 'appRoleDesc', index : 'appRoleDesc',width:200 , align : "center",sortable : false,resizable : false},
	          { name: 'appRoleId',index :'appRoleId', key:true, hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
	          { name: 'appId',index :'appId', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
	          { 
	        	  name: 'subSelect'
	        	, index : 'select'
	        	, align : "center"
	        	,sortable : false
	        	,resizable : false
	        	,formatter: function(cellvalue, options, rowObject){
	        		return "<button style='margin:2px;' class='btn btn-green' type='button' onclick=\"clickaddTerApp("+rowObject.ROWNUM+",'"+rowObject.appRoleId+"','"+rowObject.appId+"','"+rowObject.application+"','"+rowObject.appRoleName+"');\" >Select</button>"; 
	          	}
	          }
	      ],loadComplete: function(data){
	 		 if(data.records>0){
				  $("div.userAuthorChangeAppjqGrid").show();
				  $("div.userAuthorEmptryChangeAppjqGrid").hide();
			  }else{
				  $("div.userAuthorChangeAppjqGrid").hide();
				  $("div.userAuthorEmptryChangeAppjqGrid").show();
			  }
		  },
          beforeSelectRow: function (rowid, e) {
			    var $self = $(this),
			        $td = $(e.target).closest("td"),
			        iCol = $.jgrid.getCellIndex($td[0]),
			        cm = $self.jqGrid("getGridParam", "colModel");

			    return (cm[iCol].name === "cb");
          },
	      width: "100%",
	      rownumbers: true,
	      height : "100%",
	      viewrecords: true,
	      rowNum: 20,
	      autoencode : true ,
		  hidegrid : false ,
		  autowidth: true,
		  shrinkToFit : true,
	      pager: "#userAuthorChangeAppjqGridPager",
	      loadonce: false
	  });
	$("#appChangejqGrid").jqGrid({
//      postData : {
//      	flowname : function(){
//		        		var flowname = $("#flowname").val();
//		        		return flowname;
//      	},
//      	flowtype : function(){
//      				var flowtype = $("#flowtype").val();
//      				return flowtype;
//      	},
//      	usertype : function(){
//				var usertype = $("#usertype").val();
//				return usertype;
//	}
//      },
//      url: searchUrl,
//      mtype: "GET",
		styleUI : 'Bootstrap',
      datatype: "json",
      colNames : [ 'AppId','chgRole','AppRoleIdNew','AppRoleIdOld','Application','New Role Application','Current Role Application','Remark','Delete'],
      colModel: [
          { name: 'appId',index :'appId', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'chgRole',index :'chgRole', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'appRoleIdNew',index :'appRoleIdNew', hidden: true , key:true,editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'appRoleIdOld',index :'appRoleIdOld', hidden: true ,editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'application', index : 'application', width: 240 , align : "center",sortable : false,resizable : false},
          { name: 'roleNewapplication', index : 'roleNewapplication', width: 230 , align : "center",sortable : false,resizable : false},
          { name: 'roleOldapplication', index : 'roleOldapplication', width: 230 , align : "center",sortable : false,resizable : false},
          { name: 'remark', index : 'remark', width: 260 , align : "center",sortable : false,resizable : false},
          { 
        	name: 'deletebtn'
        	, index : 'deletebtn'
        	, width: 125 
        	, align : "center"
        	,resizable : false
        	,formatter: function(cellvalue, options, rowObject){
        		return "<button style='margin:2px;' type='button' class='btn btn-red' onClick=\"DeleteRowChg('"+rowObject.appRoleIdOld+"');\" >Delete</button>";
          	}
          }
      ],beforeSelectRow: function (rowid, e) {
		    var $self = $(this),
	        $td = $(e.target).closest("td"),
	        iCol = $.jgrid.getCellIndex($td[0]),
	        cm = $self.jqGrid("getGridParam", "colModel");

	    return (cm[iCol].name === "cb");
      },
//      width: '750',
      width: $('.data-table').width(),
      rownumbers: true,
      height : "100%",
	  viewrecords: true,
      rowNum: 20,
      autoencode : true ,
	  hidegrid : false ,
	  shrinkToFit : false,
	  caption : "Results",
      pager: "#appChangejqGridPager",
      loadonce: false
  });
	$("#preAppChangejqGrid").jqGrid({
//      postData : {
//      	flowname : function(){
//		        		var flowname = $("#flowname").val();
//		        		return flowname;
//      	},
//      	flowtype : function(){
//      				var flowtype = $("#flowtype").val();
//      				return flowtype;
//      	},
//      	usertype : function(){
//				var usertype = $("#usertype").val();
//				return usertype;
//	}
//      },
//      url: searchUrl,
//      mtype: "GET",
		styleUI : 'Bootstrap',
      datatype: "json",
      colNames : [ 'AppId','chgRole','AppRoleIdNew','AppRoleIdOld','Application','New Role Application','Curent Role Application','Remark'],
      colModel: [
          { name: 'appId',index :'appId', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'chgRole',index :'chgRole', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'appRoleIdNew',index :'appRoleIdNew', hidden: true , key:true,editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'appRoleIdOld',index :'appRoleIdOld', hidden: true ,editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'application', index : 'application', width: 280 , align : "center",sortable : false,resizable : false},
          { name: 'roleNewapplication', index : 'roleNewapplication', width: 250 , align : "center",sortable : false,resizable : false},
          { name: 'roleOldapplication', index : 'roleOldapplication', width: 250 , align : "center",sortable : false,resizable : false},
          { name: 'remark', index : 'remark', width: 275 , align : "center",resizable : false}
      ],beforeSelectRow: function (rowid, e) {
		    var $self = $(this),
	        $td = $(e.target).closest("td"),
	        iCol = $.jgrid.getCellIndex($td[0]),
	        cm = $self.jqGrid("getGridParam", "colModel");

	    return (cm[iCol].name === "cb");
      },
//      width: '750',
      width: $("div[name='preAppGridChg'].data-table").width(),
      rownumbers: true,
      height : "100%",
	  viewrecords: true,
      rowNum: 20,
      autoencode : true ,
	  hidegrid : false ,
	  shrinkToFit : false,
	  caption : "Results",
      pager: "#preAppChangejqGridPager",
      loadonce: false
  });
  $("#terminaljqGrid").jqGrid({
	 postData : {
	      	appName : function(){
			        		var appName = $("#terminaltxtApp").val();
			        		return appName;
	      	},
	      	type : function(){
							return $("#usertype option:selected").val();
	      	}
	      },
	url: $("button[name='terSerachGridAppbtn']").attr('action'),
	mtype: "GET",
	styleUI : 'Bootstrap',
    datatype: "json",
    colNames : ['Application','Application Info','Role Application','Role Description ','appRoleId','appId','Select'],
    colModel: [
        { name: 'appname', index : 'appname',width:170, align : "center",sortable : false,resizable : false},
        { name: 'appInfo', index : 'appInfo',width:200 , align : "center",sortable : false,resizable : false},
        { name: 'appRoleName', index : 'appRoleName' , align : "center",sortable : false,resizable : false},
        { name: 'appRoleDesc', index : 'appRoleDesc' ,width:200, align : "center",sortable : false,resizable : false},
        { name: 'appRoleId',index :'appRoleId', key:true, hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
        { name: 'appId',index :'appId', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
        { 
        	name: 'subSelect'
        	,sortable : false
        	,resizable : false
        	, index : 'select' , align : "center",formatter: function(cellvalue, options, rowObject){
        		return "<button style='margin:2px;' class='btn btn-green' type='button' onclick=\"clickaddTerApp("+rowObject.ROWNUM+",'"+rowObject.appRoleId+"','"+rowObject.appId+"','"+rowObject.appname+"','"+rowObject.appRoleName+"');\" >Select</button>"; 
        	}
        }
    ],loadComplete: function(data){
		 if(data.records>0){
			  $("div.terminaljqGrid").show();
			  $("div.emptyterminaljqGrid").hide();
		  }else{
			  $("div.terminaljqGrid").hide();
			  $("div.emptyterminaljqGrid").show();
		  }
	},beforeSelectRow: function (rowid, e) {
	    var $self = $(this),
        $td = $(e.target).closest("td"),
        iCol = $.jgrid.getCellIndex($td[0]),
        cm = $self.jqGrid("getGridParam", "colModel");

    return (cm[iCol].name === "cb");
	},
    width: "100%",
    rownumbers: true,
    height : "100%",
    viewrecords: true,
    rowNum: 10,
    autoencode : true ,
	hidegrid : false ,
	autowidth: true,
	shrinkToFit : true,
    pager: "#terminalGridPager",
    loadonce: false
});
  
$("#addAppSpecialjqGrid").jqGrid({
	  postData : {
  	      appName : function(){
  	    	if($("#spcialApp").val()!=null&$("#spcialApp").val()!=''){
		  		return $("#spcialApp").val();
		  	}else{
		  		return '';
		  	}
    	  },
    	  type : function(){
	      			return type=$("#usertype option:selected").val();
    	  }
	  },
      url: $("button[name='btnSerachAppSpc']").attr('action'),
      mtype: "GET",
	  styleUI : 'Bootstrap',
      datatype: "json",
      colNames : ['App Id','Application','App Role Id','Application Info','Role Application','Role Description','Select'],
      colModel: [
          { name: 'appId',index :'appId', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'appName', index : 'appName' , align : "center",sortable : false,resizable : false},
          { name: 'appRoleId',index :'appRoleId', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'appInfo', index : 'appInfo', align : "center",sortable : false,resizable : false},
          { name: 'appRoleName', index : 'appRoleName' , align : "center",sortable : false,resizable : false},
          { name: 'appRoleDesc', index : 'appRoleDesc',width:180 , align : "center",sortable : false,resizable : false},
          { 
        	  name: 'subSelect'
        	  , index : 'select'
        	  , width: 120
        	  , align : "center"
        	  ,resizable : false
        	  ,sortable : false
        	  ,formatter: function(cellvalue, options, rowObject){
        	  return "<button style='margin:2px;' class='btn btn-green' type='button' onclick=\"clickAddNewApp('"+rowObject.appRoleId+"','"+rowObject.appId+"','"+rowObject.appName+"','"+rowObject.appRoleName+"');\" >Select</button>"; 
          	}
          }
      ],
	 loadComplete: function(data){
		 if(data.records>0){
			  $("div.addAppSpecialjqGrid").show();
			  $("div.emptyaddAppSpecialjqGrid").hide();
		  }else{
			  $("div.addAppSpecialjqGrid").hide();
			  $("div.emptyaddAppSpecialjqGrid").show();
		  }
	  },beforeSelectRow: function (rowid, e) {
		    var $self = $(this),
	        $td = $(e.target).closest("td"),
	        iCol = $.jgrid.getCellIndex($td[0]),
	        cm = $self.jqGrid("getGridParam", "colModel");

	    return (cm[iCol].name === "cb");
	  },
	  width: "100%",
      rownumbers: true,
      height : "100%",
      viewrecords: true,
      rowNum: 10,
      autoencode : true ,
	  hidegrid : false ,
	  autowidth: true,
	  shrinkToFit : true,
      pager: "#addAppSpecialGridPager",
      loadonce: false
  });
$("#addAppStdjqGrid").jqGrid({
      postData : {
    	  appName :function(){
    		  	if($("#stdApp").val()!=null&$("#stdApp").val()!=''){
    		  		return $("#stdApp").val();
    		  	}else{
    		  		return '';
    		  	}
    	  },
      	  type : function(){
	      			return $("#usertype option:selected").val();
      	  },
      	username : function(){
      		  	var username = $('#userjqGrid').jqGrid('getCol', 'username')[0];
	      		if(username!=null&&username!=''){
	      			return username;
				}else{
					return '';
				}
      	  }
	  },
      url: $searchBtnStd,
      mtype: "GET",
		styleUI : 'Bootstrap',
      datatype: "json",
      colNames : ['App Id','Application','App Role Id','Application Info','Role Application','Role Description','Select'],
      colModel: [
          { name: 'appId',index :'appId', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'appName', index : 'appName' , align : "center",sortable : false,resizable : false},
          { name: 'appRoleId',index :'appRoleId', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'appInfo', index : 'appInfo' , align : "center",sortable : false,resizable : false},
          { name: 'appRoleName', index : 'appRoleName' , align : "center",sortable : false,resizable : false},
          { name: 'appRoleDesc', index : 'appRoleDesc', width:180 , align : "center",sortable : false,resizable : false},
          { 
        	  name: 'subSelect'
        	  , index : 'select'
        	  ,sortable : false
        	  , width: 120
        	  ,resizable : false
        	  , align : "center"
        	  ,formatter: function(cellvalue, options, rowObject){
        	  return "<button style='margin:2px;' class='btn btn-green' type='button' onclick=\"clickAddNewApp('"+rowObject.appRoleId+"','"+rowObject.appId+"','"+rowObject.appName+"','"+rowObject.appRoleName+"');\" >Select</button>"; 
          	}
          }
      ],
	  loadComplete: function(data){
		  if(data.records>0){
			  $("div.addAppStdjqGrid").show();
			  $("div.emptyaddAppStdjqGrid").hide();
		  }else{
			  $("div.addAppStdjqGrid").hide();
			  $("div.emptyaddAppStdjqGrid").show();
		  }
	  },beforeSelectRow: function (rowid, e) {
		    var $self = $(this),
	        $td = $(e.target).closest("td"),
	        iCol = $.jgrid.getCellIndex($td[0]),
	        cm = $self.jqGrid("getGridParam", "colModel");
	    return (cm[iCol].name === "cb");
	  },
	  width: "100%",
	  autowidth: true,
      rownumbers: true,
      height : "100%",
      viewrecords: true,
      rowNum: 10,
      autoencode : true ,
	  hidegrid : false ,
	  shrinkToFit: true,
      pager: "#addAppStdGridPager",
      loadonce: false
  });
	$("#appjqGrid").jqGrid({
//      postData : {
//      	flowname : function(){
//		        		var flowname = $("#flowname").val();
//		        		return flowname;
//      	},
//      	flowtype : function(){
//      				var flowtype = $("#flowtype").val();
//      				return flowtype;
//      	},
//      	usertype : function(){
//				var usertype = $("#usertype").val();
//				return usertype;
//	}
//      },
//      url: searchUrl,
//      mtype: "GET",
		styleUI : 'Bootstrap',
      datatype: "json",
      colNames : ['appId','Application','appRoleId','Role Application'
//                  ,'Template File'
                  ,'Upload File','Status','Remark','Delete'],
      colModel: [
          { name: 'appId',index :'appId', hidden: true , editable: true, editrules: {edithidden:true} ,sortable : false,resizable : false },
          { name: 'application', index : 'application', width: 250 , align : "center" ,sortable : false,resizable : false},
          { name: 'appRoleId',index :'appRoleId', hidden: true , key:true,editable: true, editrules: {edithidden:true} ,sortable : false,resizable : false},
          { name: 'roleapplication', index : 'roleapplication', width: 200 , align : "center" ,sortable : false,resizable : false},
//          { name: 'temfile', index : 'temfile', width: 100 , align : "center",formatter: linktempleteFormatter},
          { name: 'upload', index : 'upload', width: 220 , align : "center", edittype: 'file',editoptions: {enctype: "multipart/form-data"},formatter:uploadFileFormatter,sortable : false,resizable : false},
          { name: 'status', index : 'status', width: 120 , align : "center",sortable : false,resizable : false},
          { name: 'remark', index : 'remark', width: 180 , align : "center",sortable : false,resizable : false},
          { 
        	  name: 'deletebtn'
        	  , index : 'deletebtn'
        	  , width: 115 
        	  , align : "center"
        	  ,formatter:function(cellvalue, options, rowObject){
        		  return "<button style='margin:2px;' type='button' class='btn btn-red' onClick=\"DeleteRowNew('"+rowObject.appRoleId+"');\" >Delete</button>"; 
        	  }
          }
      ],
	  gridComplete : function(data) {
		  InitValiduploadBtn();
    	},loadComplete : function(data) {

      },beforeSelectRow: function (rowid, e) {
		    var $self = $(this),
	        $td = $(e.target).closest("td"),
	        iCol = $.jgrid.getCellIndex($td[0]),
	        cm = $self.jqGrid("getGridParam", "colModel");

	    return (cm[iCol].name === "cb");
	  },
      width: $('.data-table').width(),
      height : "100%",
      rownumbers: true,
	  viewrecords: true,
      rowNum: 20,
      autoencode : true ,
	  hidegrid : false ,
	  shrinkToFit : false,
	  caption : "Results",
      pager: "#appjqGridPager",
      loadonce: false
  });
	//
	$("#appTerminatejqGrid").jqGrid({
//      postData : {
//      	flowname : function(){
//		        		var flowname = $("#flowname").val();
//		        		return flowname;
//      	},
//      	flowtype : function(){
//      				var flowtype = $("#flowtype").val();
//      				return flowtype;
//      	},
//      	usertype : function(){
//				var usertype = $("#usertype").val();
//				return usertype;
//	}
//      },
//      url: searchUrl,
//      mtype: "GET",
		styleUI : 'Bootstrap',
      datatype: "json",
      colNames : ['appId','Application','appRoleId','Role Application','Remark','Delete'],
      colModel: [
          { name: 'appId',index :'appId', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'application', index : 'application', width: 340 , align : "center",sortable : false,resizable : false},
          { name: 'appRoleId',index :'appRoleId', hidden: true , key:true,editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'roleapplication', index : 'roleapplication', width: 290 , align : "center",sortable : false,resizable : false},
          { name: 'remark', index : 'remark', width: 300 , align : "center",sortable : false,resizable : false},
          { 
        	  name: 'deletebtn'
        	,sortable : false
        	, index : 'deletebtn'
        	,resizable : false
        	, width: 150 , align : "center"
        	,formatter: function(cellvalue, options, rowObject){
        	  return "<button style='margin:2px;' type='button' class='btn btn-red' onClick=\"DeleteRowTer('"+rowObject.appRoleId+"');\" >Delete</button>"; 
        	}
          }
      ],
	  gridComplete : function(data) {

      },loadComplete : function(data) {

      },beforeSelectRow: function (rowid, e) {
		    var $self = $(this),
	        $td = $(e.target).closest("td"),
	        iCol = $.jgrid.getCellIndex($td[0]),
	        cm = $self.jqGrid("getGridParam", "colModel");

	    return (cm[iCol].name === "cb");
	  },
      width: "100%",
      rownumbers: true,
      height : "100%",
	  viewrecords: true,
      rowNum: 20,
      autoencode : true ,
	  hidegrid : false ,
	  shrinkToFit : false,
	  caption : "Results",
      pager: "#appTerminatejqGridPager",
      loadonce: false
  });
	
	$("#preAppTerjqGrid").jqGrid({
//      postData : {
//      	flowname : function(){
//		        		var flowname = $("#flowname").val();
//		        		return flowname;
//      	},
//      	flowtype : function(){
//      				var flowtype = $("#flowtype").val();
//      				return flowtype;
//      	},
//      	usertype : function(){
//				var usertype = $("#usertype").val();
//				return usertype;
//	}
//      },
//      url: searchUrl,
//      mtype: "GET",
		styleUI : 'Bootstrap',
      datatype: "json",
      colNames : ['appId','Application','appRoleId','Role Application','Remark'],
      colModel: [
          { name: 'appId',index :'appId', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'application', index : 'application', width: 400 , align : "center",sortable : false,resizable : false},
          { name: 'appRoleId',index :'appRoleId', hidden: true , key:true,editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'roleapplication', index : 'roleapplication', width: 315 , align : "center",sortable : false,resizable : false},
          { name: 'remark', index : 'remark', width: 340 , align : "center",sortable : false,resizable : false}
      ],
	  gridComplete : function(data) {

	  },loadComplete : function(data) {

      },beforeSelectRow: function (rowid, e) {
		    var $self = $(this),
	        $td = $(e.target).closest("td"),
	        iCol = $.jgrid.getCellIndex($td[0]),
	        cm = $self.jqGrid("getGridParam", "colModel");

	    return (cm[iCol].name === "cb");
	  },
      width: $("div[name='preAppTerjqGrid'].data-table").width(),
      rownumbers: true,
      height : "100%",
	  viewrecords: true,
      rowNum: 20,
      autoencode : true ,
	  hidegrid : false ,
	  shrinkToFit : false,
	  caption : "Results",
//      pager: "#appTerminatejqGridPager",
      loadonce: false
  });	
	
  $("#userjqGrid").jqGrid({
//    postData : {
//    	appId : function(){
//		        		var appId = $("button[name='btnSerachAppStd']").val();
//		        		return appId;
//    	}
//    },
//    url: $searchBtnStd,
//    mtype: "GET",
	styleUI : 'Bootstrap',
	datatype: "local",
    colNames : [ 'Username','Name','UserId' ],
    colModel: [
        { name: 'username', index : 'username', width: 183,key:true , align : "center",sortable : false,resizable : false},
        { name: 'name', index : 'name', width: 220 , align : "center",sortable : false,resizable : false},
        { name: 'userId',index :'userId', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false}
        
    ],beforeSelectRow: function (rowid, e) {
	    var $self = $(this),
        $td = $(e.target).closest("td"),
        iCol = $.jgrid.getCellIndex($td[0]),
        cm = $self.jqGrid("getGridParam", "colModel");

    return (cm[iCol].name === "cb");
    },
    width: $("#userjqGrid").parent().width(),
    rownumbers: true,
    height : "100%",
    viewrecords: true,
    rowNum: 5,
    autoencode : true ,
	hidegrid : false ,
	shrinkToFit : true,
    pager: "#userjqGridPager",
    loadonce: false
  });
  
  $("#errorUserjqGrid").jqGrid({       
      datatype: "local",
  	  styleUI : 'Bootstrap',
      autowidth:true,
      colNames : [ 'Username','Detail' ],
	  colModel: [
	        { name: 'userName', index : 'userName', width: 200 , align : "center",sortable : false,resizable : false},
	        { name: 'detail', index : 'detail', width: 150 , align : "center",sortable : false,resizable : false},
	  ],beforeSelectRow: function (rowid, e) {
		    var $self = $(this),
	        $td = $(e.target).closest("td"),
	        iCol = $.jgrid.getCellIndex($td[0]),
	        cm = $self.jqGrid("getGridParam", "colModel");

	    return (cm[iCol].name === "cb");
	  },
      rowNum:10,
      pager: '#errorUserGridPager',
      gridview:true,
      rownumbers:true,
      viewrecords: true,
      height: '100%',
      width: '750'
  });
  
  
  
  $( "#dteStart" ).datepicker({
	  	 minDate:new Date(),
		 changeMonth: true,
		 numberOfMonths: 3,
		 dateFormat: 'dd/mm/yy',
		 onClose: function( selectedDate ) {
			 $( "#dteTo" ).datepicker( "option", "minDate", selectedDate );
		 }
	});
	 
	$( "#dteToChg" ).datepicker({
		 changeMonth: true,
		 numberOfMonths: 3,
		 dateFormat: 'dd/mm/yy',
		 onClose: function( selectedDate ) {
			 $( "#dteStartChg" ).datepicker( "option", "maxDate", selectedDate );
		 }
	});
	
	$( "#dteStartChg" ).datepicker({
		 changeMonth: true,
		 numberOfMonths: 3,
		 dateFormat: 'dd/mm/yy',
		 onClose: function( selectedDate ) {
			 $( "#dteToChg" ).datepicker( "option", "minDate", selectedDate );
		 }
	});
	 
	$( "#dteTo" ).datepicker({
		 changeMonth: true,
		 numberOfMonths: 3,
		 dateFormat: 'dd/mm/yy',
		 onClose: function( selectedDate ) {
			 $( "#dteStart" ).datepicker( "option", "maxDate", selectedDate );
		 }
	});
	$('#stdApp').autocomplete({
		source : function(request, response) {
			var $form = $("#addApplform");
			var $appNameElm = $form.find('[name=stdApp]');
			var actionStdapp = $appNameElm.attr('action');
			var searchData = {};
			searchData['appName'] =$('#stdApp').val();
				searchData['type']=$("#usertype option:selected").val();
  		  	var username = $('#userjqGrid').jqGrid('getCol', 'username')[0];
      		if(username!=null&&username!=''){
      			searchData['username']=username;
			}else{
				return '';
			}
      	    
			 $.ajax({
				 url : actionStdapp,
	             type : 'GET',
	             data : searchData,
	             contentType: "application/json; charset=utf-8",
	             success : function(data) {
	                 response($.map(data, function(item) {
	                     return {
	                             label : item.appName,
	                             appId : item.appId
	                     };
	                 }));
	
	             },
	             error : function(jqXHR, textStatus, errorThrown) {
	             }
            });
		},
        minLength : 1,
        select : function(event, ui) {
            $('#stdApp').val(ui.item.label);
//            $("button[name='btnSerachAppStd']").attr('value',ui.item.appId);
//            getRoleStdElm(ui.item.appId);
        },
        change: function(event, ui) {
        }
	});
	$('#spcialApp').autocomplete({
		source : function(request, response) {
			var $form = $("#addAppSpcform");
			var $appNameElm = $form.find('[name=spcialApp]');
			var actionStdapp = $appNameElm.attr('action');
			var searchData = {};
			searchData['appName'] =$('#spcialApp').val();
			searchData['type']=$("#usertype option:selected").val();
			 $.ajax({
				 url : actionStdapp,
	             type : 'GET',
	             data : searchData,
	             contentType: "application/json; charset=utf-8",
	             success : function(data) {
	                 response($.map(data, function(item) {
	                     return {
	                             label : item.appName,
	                             appId : item.appId
	                     };
	                 }));
	                 
	             },
	             error : function(jqXHR, textStatus, errorThrown) {
	             }
            });
		},
        minLength : 1,
        select : function(event, ui) {
            $("#spcialApp").val(ui.item.label);
//            $("button[name='btnSerachAppSpc']").attr('value',ui.item.appId)
//            getRoleSpcElm(ui.item.appId);
            
        },
        change: function(event, ui) {
        }
	});
	$('#changeApptxt').autocomplete({
		source : function(request, response) {
			var actionChgapp = $('#changeApptxt').attr('action');
			var searchData = {};
			searchData['appName'] = $('#changeApptxt').val();
			searchData['Type']=$("#usertype option:selected").val();
			
			 $.ajax({
				 url : actionChgapp,
	             type : 'POST',
	             data : searchData,
	             contentType: "application/x-www-form-urlencoded; charset=utf-8",
	             success : function(data) {
	                 response($.map(data, function(item) {
	                     return {
	                             label : item.appName,
	                             appId : item.appId
	                     };
	                 }));
	
	             },
	             error : function(jqXHR, textStatus, errorThrown) {
	             }
            });
		},
        minLength : 1,
        select : function(event, ui) {
            $('#changeApptxt').val(ui.item.label);
            $("button[name='chgAddappbtn']").attr('value',ui.item.appId);
        },
        change: function(event, ui) {
        }
	});
	
	$('#userAuthorChangeApptxt').autocomplete({
		source : function(request, response) {
			var actionChgapp = $('#userAuthorChangeApptxt').attr('action');
			var searchData = {};
			searchData['appName'] = $('#userAuthorChangeApptxt').val();
			searchData['Type']=$("#usertype option:selected").val();
			
			 $.ajax({
				 url : actionChgapp,
	             type : 'POST',
	             data : searchData,
	             contentType: "application/x-www-form-urlencoded; charset=utf-8",
	             success : function(data) {
	                 response($.map(data, function(item) {
	                     return {
	                             label : item.appName,
	                             appId : item.appId
	                     };
	                 }));
	
	             },
	             error : function(jqXHR, textStatus, errorThrown) {
	             }
            });
		},
        minLength : 1,
        select : function(event, ui) {
            $('#userAuthorChangeApptxt').val(ui.item.label);
            $("button[name='userAuthorChgAddappbtn']").attr('value',ui.item.appId);
        },
        change: function(event, ui) {
        }
	});
	
	$('#terminaltxtApp').autocomplete({
		source : function(request, response) {
			var actionTerapp = $('#terminaltxtApp').attr('action');
			var searchData = {};
			searchData['appName'] = $('#terminaltxtApp').val();
			searchData['Type']=$("#usertype option:selected").val();
			
			 $.ajax({
				 url : actionTerapp,
	             type : 'POST',
	             data : searchData,
	             contentType: "application/x-www-form-urlencoded; charset=utf-8",
	             success : function(data) {
	                 response($.map(data, function(item) {
	                     return {
	                             label : item.appName,
	                             appId : item.appId
	                     };
	                 }));
	
	             },
	             error : function(jqXHR, textStatus, errorThrown) {
	             }
            });
		},
        minLength : 1,
        select : function(event, ui) {
            $('#terminaltxtApp').val(ui.item.label);
            $("button[name='terSerachGridAppbtn']").attr('value',ui.item.appId);
        },
        change: function(event, ui) {
        }
	});
	$("button[name='btnSerachAppStd']").click(function() {
    	
    		$("#addAppStdjqGrid").jqGrid("clearGridData", true).trigger("reloadGrid");
	        $("#addAppStdjqGrid").trigger("reloadGrid");		
    	
    });
    $("button[name='btnSerachAppSpc']").click(function() {
    	
    		$("#addAppSpecialjqGrid").jqGrid("clearGridData", true).trigger("reloadGrid");
	        $("#addAppSpecialjqGrid").trigger("reloadGrid");
    		
    });
    $("button[name='chgAddappbtn']").click(function() {
    		
    		$("#changeAppjqGrid").jqGrid("clearGridData", true).trigger("reloadGrid");
	        $("#changeAppjqGrid").trigger("reloadGrid");
	        
    });
    $("button[name='terSerachGridAppbtn']").click(function() {
    	
    	
    		$("#terminaljqGrid").jqGrid("clearGridData", true).trigger("reloadGrid");
	        $("#terminaljqGrid").trigger("reloadGrid");
	        
    		
    });
    $("button[name='userAuthorChgAddappbtn']").click(function() {
		
		$("#userAuthorChangeAppjqGrid").jqGrid("clearGridData", true).trigger("reloadGrid");
        $("#userAuthorChangeAppjqGrid").trigger("reloadGrid");
        
    });
	function uploadFileFormatter(cellvalue, options, rowObject) {
		var taglink="";
		cachRecord.push(rowObject);
		if(rowObject.listFile != null && rowObject.listFile != '') {
			listfile = JSON.parse(rowObject.listFile);
		}
		if(rowObject.temfile!=null&&rowObject.temfile!=''){
			$.each(rowObject.temfile,function(key,value){
				taglink = taglink+"<a style='margin-left:5px' class='temp"+key+"' href='appTemplate?fileName="+value+"' value='"+rowObject.appRoleId+"' >"+value+"</a><BR>";
				taglink = taglink+"<input style='margin-left:5px' type='file' class='tem"+key+"' value='"+rowObject.appRoleId+"' /><BR>";
			});
		}else if(listfile != null && listfile != '') {
			$.each(listfile, function(key,value){				
				taglink = taglink+"<div class='text-left' style='margin-left:5px'><strong>Templete file :</strong> <a target='_blank' class='temp"+key+"' href='appTemplate?fileName="+value.fileName+"&filePath="+value.filePath+"' value='"+rowObject.appRoleId+"'>"+value.fileName+"</a></div>";
				taglink = taglink+"<input style='margin-left:5px' type='file' class='tem"+key+"' value='"+rowObject.appRoleId+"' />";
			});
		}
		
		return taglink; 
	}
				
			
   function duplicateRoleIdgridNewApp(appRoleId){
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

    function InitValiduploadBtn(){
    	$.each(cachRecord,function(key,record){
    		var index = cachRecord.findIndex(function(element,index,cachRecord){
    			return element.appRoleId == record.appRoleId
    		});
    		var tem0 = $("tr.jqgrow > td > input.tem0[value='"+record.appRoleId+"']", $("#appjqGrid"));

    		var _validFileExtensions = [".doc",".docx",".zip",".rar",".7zip",".xls",".xlsx", ".xlsm",".txt"]; 
    		//validate with javascript without jquery
    		if(tem0!=null&&tem0!=''){
    					
    		    		$(tem0[0]).change(function(e){
    		    		 var rowIndex=this.defaultValue;
    		    		 var taga = $("tr.jqgrow > td > div > a.temp0[value='"+rowIndex+"']", $("#appjqGrid"));
    		    		 var templetefile = taga.text();
    		    		 var sFileName = tem0[0];
    		    		 var blnValid = false;
    	 	                for (var j = 0; j < _validFileExtensions.length; j++) {
    	 	                    var sCurExtension = _validFileExtensions[j];
    	 	                    if (sFileName.value.substr(sFileName.value.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
    	 	                        blnValid = true;
    	 	                        break;
    	 	                    }
    	 	                }
    		    		 if (tem0[0].type == "file") {
    		    			 var isAlert=false;
    		    			 var alertMessage;
    		    			 if (!blnValid) {
    		    				 	isAlert=true;
    		    				 	alertMessage="\nรองรับประเภทไฟล์แบบ .xls ,.xlsx ,.doc ,.docx ,.txt ,.zip ,.rar ,.7z"
    	                	 }
    		    			 if(sFileName.files[0].size>=3145728){
      	                		 isAlert=true;
      	                		alertMessage=(alertMessage == null) ? '\nไฟล์มีขนาดเกิน 3 mb' :alertMessage+ "\nไฟล์มีขนาดเกิน 3 mb"
      		    			 }
      	                	 if(sFileName.value!=templetefile){
      	                		 isAlert=true;
      	                		alertMessage=(alertMessage == null) ? '\nชื่อไฟล์ไม่ถูกต้องตาม format' :alertMessage+ "\nชื่อไฟล์ไม่ถูกต้องตาม format"
      		    			 }  
    		    			 if(isAlert){ 
    		    				 alert(alertMessage);
    		    				 $(tem0[0]).val('');
    		    			 }
    		    		}
    		    		 	 var status = validateStatusByrecord(rowIndex);
    		    			 $("#appjqGrid").jqGrid('setCell',rowIndex, 'status', status);
    		    	}); 
    			}
    		
    		var tem1 = $("tr.jqgrow > td > input.tem1[value='"+record.appRoleId+"']", $("#appjqGrid"));
    		//validate 
    		if(tem1!=null&&tem1!=''){
    			$(tem1[0]).change(function(e){
    					 var rowIndex=this.defaultValue;
    		    		 var taga = $("tr.jqgrow > td >  div > a.temp1[value='"+rowIndex+"']", $("#appjqGrid"));
    		    		 var templetefile = taga.text();
    		    		 var sFileName = tem1[0];
    		    		 var blnValid = false;
    	 	                for (var j = 0; j < _validFileExtensions.length; j++) {
    	 	                    var sCurExtension = _validFileExtensions[j];
    	 	                    if (sFileName.value.substr(sFileName.value.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
    	 	                        blnValid = true;
    	 	                        break;
    	 	                    }
    	 	                }
    	 	               if (tem1[0].type == "file") {
      		    			 var isAlert=false;
      		    			 var alertMessage;
      		    			 if (!blnValid) {
      		    				 	isAlert=true;
      		    				 	alertMessage="\nรองรับประเภทไฟล์แบบ .xls ,.xlsx ,.doc ,.docx ,.txt ,.zip ,.rar ,.7z"
      	                	 }
      		    			 if(sFileName.files[0].size>=3145728){
        	                		 isAlert=true;
        	                		alertMessage=(alertMessage == null) ? '\nไฟล์มีขนาดเกิน 3 mb' :alertMessage+ "\nไฟล์มีขนาดเกิน 3 mb"
        		    			 }
        	                	 if(sFileName.value!=templetefile){
        	                		 isAlert=true;
        	                		alertMessage=(alertMessage == null) ? '\nชื่อไฟล์ไม่ถูกต้องตาม format' :alertMessage+ "\nชื่อไฟล์ไม่ถูกต้องตาม format"
        		    			 }  
      		    			 if(isAlert){ 
      		    				 alert(alertMessage);
      		    				 $(tem1[0]).val('');
      		    			 }
      		    		}
    	 	             	 var status = validateStatusByrecord(rowIndex);
    		    			 $("#appjqGrid").jqGrid('setCell',rowIndex, 'status', status);
    		    	}); 
    			}
    		var tem2 = $("tr.jqgrow > td > input.tem2[value='"+record.appRoleId+"']", $("#appjqGrid"));
    		//validate 
    			if(tem2!=null&&tem2!=''){
    				$(tem2[0]).change(function(e){
    					 var rowIndex=this.defaultValue;
    		    		 var taga = $("tr.jqgrow > td >  div > a.temp2[value='"+rowIndex+"']", $("#appjqGrid"));
    		    		 var templetefile = taga.text();
    		    		 var sFileName = tem2[0];
    		    		 var blnValid = false;
    	 	                for (var j = 0; j < _validFileExtensions.length; j++) {
    	 	                    var sCurExtension = _validFileExtensions[j];
    	 	                    if (sFileName.value.substr(sFileName.value.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
    	 	                        blnValid = true;
    	 	                        break;
    	 	                    }
    	 	                }
    	 	               if (tem2[0].type == "file") {
      		    			 var isAlert=false;
      		    			 var alertMessage;
      		    			 if (!blnValid) {
      		    				 	isAlert=true;
      		    				 	alertMessage="\nรองรับประเภทไฟล์แบบ .xls ,.xlsx ,.doc ,.docx ,.txt ,.zip ,.rar ,.7z"
      	                	 }
      		    			 if(sFileName.files[0].size>=3145728){
        	                		 isAlert=true;
        	                		alertMessage=(alertMessage == null) ? '\nไฟล์มีขนาดเกิน 3 mb' :alertMessage+ "\nไฟล์มีขนาดเกิน 3 mb"
        		    			 }
        	                	 if(sFileName.value!=templetefile){
        	                		 isAlert=true;
        	                		alertMessage=(alertMessage == null) ? '\nชื่อไฟล์ไม่ถูกต้องตาม format' :alertMessage+ "\nชื่อไฟล์ไม่ถูกต้องตาม format"
        		    			 }  
      		    			 if(isAlert){ 
      		    				 alert(alertMessage);
      		    				 $(tem2[0]).val('');
      		    			 }
      		    		}
    		    		 var status = validateStatusByrecord(rowIndex);
    	    			 $("#appjqGrid").jqGrid('setCell',rowIndex, 'status', status);
    		    	}); 
    			}
		});
    	cachRecord = [];
    }
    
    function validateStatusByrecord(rowIndex){
    	var status= "Complete";
    	$("tr.jqgrow > td > input[type='file'][value="+(rowIndex)+"]", $("#appjqGrid")).each(function(row,ele){
			 if($(ele).val()==null||$(ele).val()==''){
				 status="Incomplete";
			 }
		 });
    	return status;
    }
    function validateStatusAllrecord(){
    	var status= true;
    	$("tr.jqgrow > td > input[type='file']", $("#appjqGrid")).each(function(row,ele){
			 if($(ele).val()==null||$(ele).val()==''){
				 status=false;
			 }
		 });
    	return status;
    }
	$("#previewform").submit(function(event) {
		
		var listApp=[];
		var dataFormApp={};
		event.stopPropagation();
	    event.preventDefault();
		//1.validate row grid
		var countrowdataNew = $("#appjqGrid").jqGrid('getGridParam', 'records');
		var countrowdataChg = $("#appChangejqGrid").jqGrid('getGridParam', 'records');
		var countrowdataTer = $("#appTerminatejqGrid").jqGrid('getGridParam', 'records');
		if($.trim($("#subject")[0].value).length<=0){
			$("span[name='txMsgSubject']").show();
			$("span[name='txMsgSubject']").text('กรุณากรอกข้อมูล Subject');
			$("#dialog-warning").text('กรุณากรอกข้อมูล Subject');
			$("#dialog-warning").dialog('open');
			
		}else if($("#subject")[0].value.length>100){
			$("span[name='txMsgSubject']").show();
			$("span[name='txMsgSubject']").text('กรุณากรอกข้อมูลที่มีความยาวไม่เกิน 100 ตัวอักษร');
			$("#dialog-warning").text('กรุณากรอกข้อมูลที่มีความยาวไม่เกิน 100 ตัวอักษร');
			$("#dialog-warning").dialog('open');
		}else if($("input[name='period']:checked").val()=='2'&&($('#dteStart').val()==''||$('#dteTo').val()=='')){
				$("#dialog-warning").text('กรุณาเลือกข้อมูลช่วงเวลาการใช้งาน');
				$("#dialog-warning").dialog('open'); 
		}else{
			$("span[name='txMsgSubject']").hide();
			if ($("input[name='requestType']:radio:checked").val()=='1'){
				if(countrowdataNew<=0){
					$("#dialog-warning").text('กรุณาเพิ่มข้อมูล Application และ  Role Application ที่ต้องการขอ UR');
					$("#dialog-warning").dialog('open'); //error code : 20006
				}else if(!validateStatusAllrecord()){
					$("#dialog-warning").text('Upload File ไม่ครบถ้วน');
					$("#dialog-warning").dialog('open'); //error code : 20005
				}else{
							var period;
							if($("input[name='period']:checked").val()==1){
								var temperiods={};
								temperiods['periodtype']=$("input[name='period']:checked").val();
								period=temperiods;
							}else {
								var temperiods={};
								temperiods['periodtype']=$("input[name='period']:checked").val();
								temperiods['dteStart']=$('#dteStart').val();
								temperiods['dteTo']=$('#dteTo').val();
								period=temperiods;
							}
							var data = new FormData();
							dataFormApp['usertypeValue']=$('#usertype option:selected').val();
							dataFormApp['usertype']=$('#usertype option:selected').text();
							dataFormApp['requestByValue']=$("input[name='requestBy']:radio:checked").val();
							dataFormApp['requestBy']=$("input[name='requestBy']:radio:checked").parent().text();
							dataFormApp['requestType']=$("input[name='requestType']:radio:checked").parent().text();
							dataFormApp['requestTypeValue']=$("input[name='requestType']:radio:checked").val();
							dataFormApp['subject']=$("#subject").val();
							dataFormApp['detail']=$("#detail").val();
							dataFormApp['periodtype']=$("input[name='period']:checked").val();
							dataFormApp['dteStart']=$('#dteStart').val();
							dataFormApp['dteTo']=$('#dteTo').val()
							dataFormApp['periodValue']=period;
							dataFormApp['period']=$("input[name='period']:radio:checked").parent().text();
							dataFormApp['name']=nameuser;
							dataFormApp['userId']=$("input[name='userId'][type='hidden']").val();
							data.append('dataFormApp',JSON.stringify(dataFormApp));
							
							rowdata = $("#appjqGrid").jqGrid ('getRowData');
							$.each(rowdata,function(row,ele){
								tagtemfile = $("tr.jqgrow > td > div > a[value='"+ele.appRoleId+"']", $("#appjqGrid"));
							var temfiles=new Array();
								$.each($(tagtemfile),function(row,ele){
									 var address = $(ele).text();
									 if(address!=null&&address!=''){
							    		 temfiles.push(address);
						    		 }
								});
								
						
							var filesupload=new Array();
									var selectorTagupload = $("tr.jqgrow > td > input[type=file][value="+(ele.appRoleId)+"]", $("#appjqGrid"));
									$.each($(selectorTagupload),function(row,ele){
										filesupload.push($(ele)[0].files[0]);
									});
			
									
							listApp.push({
											appId:ele.appId,
										appRoleId:ele.appRoleId,
										application:ele.application,
										remark:ele.remark,
										roleapplication:ele.roleapplication,
										status:ele.status,
										temfile:temfiles,
										upload:filesupload
								});
							});
							
							if($("input[name='requestBy']:radio:checked").val()==2){
								rowuser = $("#userjqGrid").jqGrid('getGridParam', 'data');
							}else if ($("input[name='requestBy']:radio:checked").val()==1){
								rowuser = $("#userjqGrid").jqGrid ('getRowData');
							}
							
							data.append('listuser',JSON.stringify(rowuser));
							
							var appDatas=[];
							$.each(listApp,function(key,ele){
								$.each(ele.upload,function(keyt,elet){
								data.append(ele.appRoleId,elet);
								});
								ele.upload=null;
								appDatas.push(ele);
							});
							data.append('appDatas',JSON.stringify(appDatas));
							
							$.ajax({
						        url: $("#previewform").attr('action'),
						        type: 'POST',
						        data: data,
						        cache: false,
						        enctype: 'multipart/form-data',
						        dataType: 'json',
						        processData: false, 
						        contentType: false, 
						        success: function(data, textStatus, jqXHR)
						        {
						        	var dataFormApp = jqXHR.responseJSON.dataFormApp;
						        	var listapp = jqXHR.responseJSON.listapp;
						        	var listuser = jqXHR.responseJSON.listuser;
//						        	$("#preUserjqGrid")[0].addJSONData(listuser);
						        	if(dataFormApp.requestByValue==2){
						        		$("#preUserjqGrid").setGridParam({data: listuser}).trigger('reloadGrid');
						        	}else if(dataFormApp.requestByValue==1){
						        		$("#preUserjqGrid")[0].addJSONData(listuser);
						        		$('#preUserjqGridPager').hide();
						        	}
						        	if(listuser.length>5){
						        		$('#preUserjqGridPager').show();
						        	}
						        	$("#preAppjqGrid")[0].addJSONData(listapp);
						        	$("span[name='preUsertype']").text(dataFormApp.usertype);
						        	$("span[name='preRequestBy']").text(dataFormApp.requestBy);
						        	$("span[name='firstnamelastname']").text(dataFormApp.name);
						        	$("span[name='preRequestType']").text(dataFormApp.requestType);
						        	$("span[name='preSubject']").text(dataFormApp.subject);
						        	if(dataFormApp.detail==''||dataFormApp.detail==null||$.trim(dataFormApp.detail).length<=0){
						        		$("span[name='preDetail']").text('-');
						        	}else{
						        		$("span[name='preDetail']").text(dataFormApp.detail);
						        	}
						        	if(dataFormApp.queued!=null&&dataFormApp.queued!=''&&dataFormApp.alreadyApp!=null&&dataFormApp.alreadyApp!=''){
						        		$("textarea[name='urremark']").val(dataFormApp.queued+dataFormApp.alreadyApp);
						        		$("div[name='divremark']").show();
						        	}
						        	if(dataFormApp.queued!=null&&dataFormApp.queued!=''&&(dataFormApp.alreadyApp==null||dataFormApp.alreadyApp=='')){
						  			  $("textarea[name='urremark']").val(dataFormApp.queued);
						  			  $("div[name='divremark']").show();
						  			}
						  		  	if(dataFormApp.alreadyApp!=null&&dataFormApp.alreadyApp!=''&&(dataFormApp.queued==null||dataFormApp.queued=='')){
						  			  $("textarea[name='urremark']").val(dataFormApp.alreadyApp);
						  			  $("div[name='divremark']").show();
						  			}
							  		  if(dataFormApp.flagenable!='0'){
										  $( "button[name='preSubmitAppJqgrid']").attr('disabled',true);
										  $("span[name='alertErrorUser']").text('ไม่สามารถสร้าง  Request UR กรุณาตรวจสอบข้อมูล  Application ที่ทำการขอ Request UR');
										  $("span[name='alertErrorUser']").show();
									  }else{
										  $( "button[name='preSubmitAppJqgrid']").attr('disabled',false);
									  }
						        	if(dataFormApp.period!=''&&dataFormApp.period!=null){
						        		$("div[name='previewPeriod']").show();
						        		$("p[name='period']").text(dataFormApp.period);
						        		if(dataFormApp.periodtype=='2'){
						        			$("span[name='dteStart']").text(dataFormApp.dteStart);
								        	$("span[name='dteTo']").text(dataFormApp.dteTo);
								        	$("font[name='to']").show();
								        	$("font[name='start']").show();
						        		}else{
						        			$("span[name='dteStart']").text('');
								        	$("span[name='dteTo']").text('');
						        			$("font[name='to']").hide();
						        			$("font[name='start']").hide();
						        		}
						        	}else{
						        		$("div[name='previewPeriod']").hide();
						        	}
						        	$("div.previewPage").show();
						        	$("div[name='preAppGridNew']").show();
						        	$("div[name='preAppGridChg']").hide();
						        	$("div[name='preAppGridTer']").hide();
						        	$("div.formUserrequest").hide();
			//			        	window.location=jqXHR.responseJSON[0].page;
						        	//success
						        },
						        error: function(jqXHR, textStatus, errorThrown)
						        {
						            console.log('ERRORS: ' + textStatus);
						        }
							 });
				}
			}else if($("input[name='requestType']:radio:checked").val()=='3'){
				if(countrowdataChg<=0){
					$("#dialog-warning").text('กรุณาเพิ่มข้อมูล Application และ  Role Application ที่ต้องการขอ UR');
					$("#dialog-warning").dialog('open'); //error code : 20006
				}else if($("[name='appChangeChk']:checked").val()=='on'&&$("input[name='periodChg']:checked").val()==null){
						$("#dialog-warning").text('กรุณาเลือกข้อมูลช่วงเวลาการใช้งาน');
 						$("#dialog-warning").dialog('open');
 				}else if($("[name='appChangeChk']:checked").val()=='on'&&$("input[name='periodChg']:checked").val()==2
 						&&($('#dteStartChg').val()==''||$('#dteToChg').val()=='')){
 					$("#dialog-warning").text('กรุณาเลือกข้อมูลช่วงเวลาการใช้งาน');
						$("#dialog-warning").dialog('open');
 				}else{
						var period;
						if($("input[name='appChangeChk']")[0].checked){
							if($("input[name='periodChg']:checked").val()==1){
								var temperiods={};
								temperiods['periodtype']=$("input[name='periodChg']:checked").val();
								period=temperiods;
							}else {
								var temperiods={};
								temperiods['periodtype']=$("input[name='periodChg']:checked").val();
								temperiods['dteStart']=$('#dteStartChg').val();
								temperiods['dteTo']=$('#dteToChg').val();
								period=temperiods;
							}
							dataFormApp['periodValue']=period;
						}
						var data = new FormData();
						dataFormApp['usertypeValue']=$('#usertype option:selected').val();
						dataFormApp['usertype']=$('#usertype option:selected').text();
						dataFormApp['requestByValue']=$("input[name='requestBy']:radio:checked").val();
						dataFormApp['requestBy']=$("input[name='requestBy']:radio:checked").parent().text();
						dataFormApp['requestType']=$("input[name='requestType']:radio:checked").parent().text();
						dataFormApp['requestTypeValue']=$("input[name='requestType']:radio:checked").val();
						dataFormApp['subject']=$("#subject").val();
						dataFormApp['detail']=$("#detail").val();
						dataFormApp['periodtype']=$("input[name='periodChg']:checked").val();
						dataFormApp['dteStart']=$('#dteStartChg').val();
						dataFormApp['dteTo']=$('#dteToChg').val();
						
						dataFormApp['period']=$("input[name='periodChg']:radio:checked").parent().text();
						dataFormApp['name']=nameuser;
						dataFormApp['userId']=$("input[name='userId'][type='hidden']").val();
						if($("input[name='appChangeChk']")[0].checked){
							dataFormApp['CH1P1']='CH1P1';
						}else{
							dataFormApp['CH1P1']='';
						}
						rowdata = $("#appChangejqGrid").jqGrid ('getRowData')[0];
						dataFormApp['CH1R1']=rowdata.chgRole;
						data.append('dataFormApp',JSON.stringify(dataFormApp));
						
						rowuser = $("#userjqGrid").jqGrid ('getRowData');
						data.append('listuser',JSON.stringify(rowuser));
						
						rowdata = $("#appChangejqGrid").jqGrid ('getRowData');
						data.append('appDatas',JSON.stringify(rowdata));
						
						$.ajax({
					        url: $("#previewform").attr('action'),
					        type: 'POST',
					        data: data,
					        cache: false,
					        enctype: 'multipart/form-data',
					        dataType: 'json',
					        processData: false, 
					        contentType: false, 
					        success: function(data, textStatus, jqXHR)
					        {
					        	var dataFormApp = jqXHR.responseJSON.dataFormApp;
					        	var listapp = jqXHR.responseJSON.listapp;
					        	var listuser = jqXHR.responseJSON.listuser;
					        	$("#preUserjqGrid")[0].addJSONData(listuser);
					        	$("#preAppChangejqGrid")[0].addJSONData(listapp);
					        	$("span[name='preUsertype']").text(dataFormApp.usertype);
					        	$("span[name='preRequestBy']").text(dataFormApp.requestBy);
					        	$("span[name='firstnamelastname']").text(dataFormApp.name);
					        	$("span[name='preRequestType']").text(dataFormApp.requestType);
					        	$("span[name='preSubject']").text(dataFormApp.subject);
					        	if(dataFormApp.detail==''||dataFormApp.detail==null||$.trim(dataFormApp.detail).length<=0){
					        		$("span[name='preDetail']").text('-');
					        	}else{
					        		$("span[name='preDetail']").text(dataFormApp.detail);
					        	}
					        	if(dataFormApp.period!=''&&dataFormApp.period!=null){
					        		$("div[name='previewPeriod']").show();
					        		$("p[name='period']").text(dataFormApp.period);
					        		if(dataFormApp.periodtype=='2'){
					        			$("span[name='dteStart']").text(dataFormApp.dteStart);
							        	$("span[name='dteTo']").text(dataFormApp.dteTo);
							        	$("font[name='to']").show();
							        	$("font[name='start']").show();
					        		}else{
					        			$("span[name='dteStart']").text('');
							        	$("span[name='dteTo']").text('');
					        			$("font[name='to']").hide();
					        			$("font[name='start']").hide();
					        			
					        		}
					        	}else{
					        		$("div[name='previewPeriod']").hide();
					        	}
					        	if(dataFormApp.queued!=null&&dataFormApp.queued!=''){
					  			  $("textarea[name='urremark']").val(dataFormApp.queued);
					  			  $("div[name='divremark']").show();
					  			}
					  		  	if(dataFormApp.alreadyApp!=null&&dataFormApp.alreadyApp!=''){
					  			  $("textarea[name='urremark']").val($("textarea[name='urremark']").val()+dataFormApp.alreadyApp);
					  			  $("div[name='divremark']").show();
					  			}
						  		  if(dataFormApp.flagenable!='0'){
									  $( "button[name='preSubmitAppJqgrid']").attr('disabled',true);
									  $("span[name='alertErrorUser']").text('ไม่สามารถสร้าง  Request UR กรุณาตรวจสอบข้อมูล  Application ที่ทำการขอ Request UR');
									  $("span[name='alertErrorUser']").show();
								  }else{
									  $( "button[name='preSubmitAppJqgrid']").attr('disabled',false);
								  }
					        	$("div.previewPage").show();
					        	$("div[name='preAppGridNew']").hide();
					        	$("div[name='preAppGridTer']").hide();
					        	$("div[name='preAppGridChg']").show();
					        	$("div.formUserrequest").hide();
		//			        	window.location=jqXHR.responseJSON[0].page;
					        	//success
					        },
					        error: function(jqXHR, textStatus, errorThrown)
					        {
					            console.log('ERRORS: ' + textStatus);
					        }
						 });
					}
			}else if($("input[name='requestType']:radio:checked").val()=='2'){
				if(countrowdataTer<=0){
					$("#dialog-warning").text('กรุณาเพิ่มข้อมูล Application และ  Role Application ที่ต้องการขอ UR');
					$("#dialog-warning").dialog('open'); //error code : 20006
				}else{
						var data = new FormData();
						rowdata = $("#appTerminatejqGrid").jqGrid ('getRowData');
						data.append('appDatas',JSON.stringify(rowdata));
						dataFormApp['usertypeValue']=$('#usertype option:selected').val();
						dataFormApp['usertype']=$('#usertype option:selected').text();
						dataFormApp['requestByValue']=$("input[name='requestBy']:radio:checked").val();
						dataFormApp['requestBy']=$("input[name='requestBy']:radio:checked").parent().text();
						dataFormApp['requestType']=$("input[name='requestType']:radio:checked").parent().text();
						dataFormApp['requestTypeValue']=$("input[name='requestType']:radio:checked").val();
						dataFormApp['subject']=$("#subject").val();
						dataFormApp['detail']=$("#detail").val();
						dataFormApp['name']=nameuser;
						dataFormApp['userId']=$("input[name='userId'][type='hidden']").val();
						data.append('dataFormApp',JSON.stringify(dataFormApp));
						
//						rowuser = $("#userjqGrid").jqGrid ('getRowData');
						if($("input[name='requestBy']:radio:checked").val()==2){
							rowuser = $("#userjqGrid").jqGrid('getGridParam', 'data');
						}else if ($("input[name='requestBy']:radio:checked").val()==1){
							rowuser = $("#userjqGrid").jqGrid ('getRowData');
						}
						data.append('listuser',JSON.stringify(rowuser));
						
						$.ajax({
					        url: $("#previewform").attr('action'),
					        type: 'POST',
					        data: data,
					        cache: false,
					        enctype: 'multipart/form-data',
					        dataType: 'json',
					        processData: false, 
					        contentType: false, 
					        success: function(data, textStatus, jqXHR)
					        {
					        	
					        	var dataFormApp = jqXHR.responseJSON.dataFormApp;
					        	var listapp = jqXHR.responseJSON.listapp;
					        	var listuser = jqXHR.responseJSON.listuser;
					        	if(dataFormApp.requestByValue==2){
					        		$("#preUserjqGrid").setGridParam({data: listuser}).trigger('reloadGrid');
					        	}else if(dataFormApp.requestByValue==1){
					        		$("#preUserjqGrid")[0].addJSONData(listuser);
					        		$('#preUserjqGridPager').hide();
					        	}
					        	$("#preAppTerjqGrid")[0].addJSONData(listapp);
					        	$("span[name='preUsertype']").text(dataFormApp.usertype);
					        	$("span[name='preRequestBy']").text(dataFormApp.requestBy);
					        	$("span[name='firstnamelastname']").text(dataFormApp.name);
					        	$("span[name='preRequestType']").text(dataFormApp.requestType);
					        	$("span[name='preSubject']").text(dataFormApp.subject);
					        	if(dataFormApp.detail==''||dataFormApp.detail==null||$.trim(dataFormApp.detail).length<=0){
					        		$("span[name='preDetail']").text('-');
					        	}else{
					        		$("span[name='preDetail']").text(dataFormApp.detail);
					        	}
					        	if(dataFormApp.errorterminate!=null&&dataFormApp.errorterminate!=''){
					  			  $("textarea[name='urremark']").val(dataFormApp.errorterminate);
					  			  $("div[name='divremark']").show();
					  			}
					  		    if(dataFormApp.flagenable!='0'){
								  $( "button[name='preSubmitAppJqgrid']").attr('disabled',true);
								  $("span[name='alertErrorUser']").text('ไม่สามารถสร้าง  Request UR กรุณาตรวจสอบข้อมูล  Application ที่ทำการขอ Request UR');
								  $("span[name='alertErrorUser']").show();
							    }else{
								  $( "button[name='preSubmitAppJqgrid']").attr('disabled',false);
							    }
					        	$("div.previewPage").show();
					        	$("div[name='preAppGridTer']").show();
					        	$("div[name='preAppGridNew']").hide();
					        	$("div[name='preAppGridChg']").hide();
					        	$("div.formUserrequest").hide();
		//			        	window.location=jqXHR.responseJSON[0].page;
					        	//success
					        	//success
					        },
					        error: function(jqXHR, textStatus, errorThrown)
					        {
					            console.log('ERRORS: ' + textStatus);
					        }
						 });
					}
			}
		}
			

});
	if($("input[name='requestBy']:radio:checked").val()=='1'){
		$("#userjqGrid").jqGrid("clearGridData", true);
		$("#userjqGrid")[0].addJSONData(listuserfirst);
		$("input[name='userId'][type='hidden']").val(listuserfirst[0].userId);
	}
	
	var errorMes = "";
	
	$('#fileUpload').MultiFile({
		accept : 'xls|xlsx',
		max	: 1,
		maxfile : 3072,
		list : '#fileTemplateList',
		STRING: {	
			remove: '<img class="delete" src="/fur-web/res/img/icon/delete.png">',
			denied: 'รองรับประเภทไฟล์แบบ .xlsx , .xlsm',
			duplicate: 'ตรวจสอบพบชื่อไฟล์ซ้ำ กรุณาตรวจสอบชื่อไฟล์',
			toobig: 'ไฟล์มีขนาดเกิน 1 mb',
			toomany: 'ไฟล์เกินจำนวนที่กำหนด 1 ไฟล์'
		},
		afterFileSelect: function(element, value, master_element) {
			$("#process-loader").show();
			var data = new FormData();
			data.append('templateFile',element.files[0]);
			$.ajax({
		        url: $(element).attr('url'),
		        type: 'POST',
		        data: data,
		        cache: false,
		        enctype: 'multipart/form-data',
		        dataType: 'json',
		        processData: false, 
		        contentType: false, 
		        success: function(data, textStatus, jqXHR)
		        {
		        	$("#userjqGrid").jqGrid("clearGridData", true);
		        	if(jqXHR.responseJSON[0].reason!=null)
		        	{
		        		$("#userjqGrid").jqGrid("clearGridData", true);
		        		$("#errorUserjqGrid").setGridParam({data: data}).trigger('reloadGrid');
		        		$(".errordif").show();
		        		$("p.errordif").text(jqXHR.responseJSON[0].reason);
		        		$("div.userjqGrid").hide();
		    			$("div.emptyUserList").show();
		        	}else{
		        		$("#errorUserjqGrid").jqGrid("clearGridData", true);
		        		$("#userjqGrid").setGridParam({data: data}).trigger('reloadGrid');
		        		if(data.length>5){
		        			$("#userjqGridPager").show();
		        		}else{
		        			$("#userjqGridPager").hide();
		        		}
		        		$(".errordif").hide();
		        		$("div.userjqGrid").show();
		    			$("div.emptyUserList").hide();
		    			
		        	}
		        	$("#process-loader").hide();
		        	//success
		        },
		        error: function(jqXHR, textStatus, errorThrown)
		        {	
		        	$("#process-loader").hide();
		            console.log('ERRORS: ' + textStatus);
		        }
			 });
		},
		afterFileRemove: function(element, value, master_element) {
		}
/*		error: function (s) {

			alert(errorMes);
		}*/
	});
	
	$("input[type='file'][name='groupfile']").on("change", function(){
		 var sFileName = $("input[type='file'][name='groupfile']")[0];
		 var _validFileExtensions = [".xls",".xlsx", ".xlsm"];
		 var blnValid = false;
         for (var j = 0; j < _validFileExtensions.length; j++) {
             var sCurExtension = _validFileExtensions[j];
             if (sFileName.value.substr(sFileName.value.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                 blnValid = true;
                 break;
             }
         }
		 if (sFileName.type == "file") {
			 if (!blnValid) {
                   alert("รองรับประเภทไฟล์แบบ .xlsx , .xlsm ");
                   $(sFileName).val('');
       	 }
       	 else if(sFileName.files[0].size>=3145728){
				 alert("ไฟล์มีขนาดเกิน 3 mb");
				 $(sFileName).val('');
		 }
       	 else { //work
				 uploadFileGroup();
		 }
	}
		
		 
	});
	function  uploadFileGroup(){
		var data = new FormData();
		data.append('templateFile',$("input[type='file'][name='groupfile']")[0].files[0]);
		$.ajax({
	        url: $("input[type='file'][name='groupfile']").attr('url'),
	        type: 'POST',
	        data: data,
	        cache: false,
	        enctype: 'multipart/form-data',
	        dataType: 'json',
	        processData: false, 
	        contentType: false, 
	        success: function(data, textStatus, jqXHR)
	        {
	        	$("#process-loader").hide();
	        	if(jqXHR.responseJSON[0].detail!=null)
	        	{
	        		$("#userjqGrid").jqGrid("clearGridData", true);
	        		$("#errorUserjqGrid").jqGrid("clearGridData", true);
	        		$("#errorUserjqGrid")[0].addJSONData(jqXHR.responseJSON);
	        		$(".errordif").show();
	        		$("p.errordif").text(jqXHR.responseJSON[0].detail);
	        	}else{
	        		$("#errorUserjqGrid").jqGrid("clearGridData", true);
	        		$("#userjqGrid").jqGrid("clearGridData", true);
	        		$("#userjqGrid")[0].addJSONData(jqXHR.responseJSON);
	        		
	        	}
	        	
	        	//success
	        },
	        error: function(jqXHR, textStatus, errorThrown)
	        {
	        	$("#process-loader").hide();
	            console.log('ERRORS: ' + textStatus);
	        }
		 });
	}

  $("#preUserjqGrid").jqGrid({
	styleUI : 'Bootstrap',
    datatype: "local",
    colNames : [ 'Username','Name' ],
    colModel: [
        { name: 'username', index : 'username', width: 183 , align : "center",key:true,sortable : false,resizable : false},
        { name: 'name', index : 'name', width: 220 , align : "center",sortable : false,resizable : false}
       
    ],beforeSelectRow: function (rowid, e) {
	    var $self = $(this),
        $td = $(e.target).closest("td"),
        iCol = $.jgrid.getCellIndex($td[0]),
        cm = $self.jqGrid("getGridParam", "colModel");

    return (cm[iCol].name === "cb");
    },
    width: $("#preUserjqGrid").parent().width(),
    rownumbers: true,
    height : "100%",
    viewrecords: true,
    rowNum: 5,
    autoencode : true ,
	hidegrid : false ,
	shrinkToFit : true,
    pager: "#preUserjqGridPager",
    loadonce: false,
	sortname : 'username',
	sortorder : "ASC"
  });

  $("#preAppjqGrid").jqGrid({
		styleUI : 'Bootstrap',
    datatype: "local",
    colNames : ['appId','Application','appRoleId','Role Application','Upload file','Status','Remark'],
    colModel: [
        { name: 'appId',index :'appId', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
        { name: 'application', index : 'application', width: 250 , align : "center",sortable : false,resizable : false},
        { name: 'appRoleId',index :'appRoleId', hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
        { name: 'roleapplication', index : 'roleapplication', width: 250 , align : "center",sortable : false,resizable : false},
        { name: 'temfile', index : 'temfile', width: 154 , align : "center",formatter: linktempleteFormatter,sortable : false,resizable : false},
//        { name: 'upload', index : 'upload', width: 180 , align : "center", edittype: 'file',editoptions: {enctype: "multipart/form-data"},formatter:uploadFileFormatter},
        { name: 'status', index : 'status', width: 150 , align : "center",sortable : false,resizable : false},
        { name: 'remark', index : 'remark', width: 250 , align : "center",sortable : false,resizable : false},
    ],
	  gridComplete : function(data) {
  	},loadComplete : function(data) {
    },beforeSelectRow: function (rowid, e) {
	    var $self = $(this),
        $td = $(e.target).closest("td"),
        iCol = $.jgrid.getCellIndex($td[0]),
        cm = $self.jqGrid("getGridParam", "colModel");

    return (cm[iCol].name === "cb");
    },
    width: $("div[name='preAppGridNew'].data-table").width(),
    rownumbers: true,
    height : "100%",
	viewrecords: true,
    rowNum: 20,
    autoencode : true ,
	hidegrid : false ,
	shrinkToFit : false,
	caption : "Results",
    sortname : 'appId',
    sortorder : "ASC"
});
  function linktempleteFormatter(cellvalue, options, rowObject) {
		var taglink="";
		$.each(cellvalue,function(key,value){
			taglink = taglink+"<span>"+value+"</span><BR>";
		});
		return taglink;
}

  $("#submitform").submit(function(event) {
	    event.stopPropagation();
	    event.preventDefault();
	  $("#dialog-create-confirm").dialog("open");
  	});
  
   if(flagUserprofile=='1'){
		if(type!=null&&type!=''){
			$("#usertype").prop('selectedIndex',type-1);
		}
		$("#appjqGrid")[0].addJSONData(recordDataProfile);
		$("div[name='appTerminate']").hide();
		$("div[name='appChange']").hide();
		var countrowdataNew = $("#appjqGrid").jqGrid('getGridParam', 'records');
		if(countrowdataNew==0){
			$("div.empty").show();
			$("div[name='appNew']").hide();
		}else{
			$("div.empty").hide();
			$("div[name='appNew']").show();
		}
	}
  
   $("#dialog-create-confirm").dialog({
       autoOpen: false, 
       modal: true,
	   buttons : [{
	    	text : "Confirm",
	    	click : function(){
	    		$(this).dialog("close");
	 			var listApp=[];
	 			var dataFormApp={};
	 			//1.validate row grid
	 			var countrowdataNew = $("#appjqGrid").jqGrid('getGridParam', 'records');
	 			var countrowdataChg = $("#appChangejqGrid").jqGrid('getGridParam', 'records');
	 			var countrowdataTer = $("#appTerminatejqGrid").jqGrid('getGridParam', 'records');
	 			if($.trim($("#subject")[0].value).length<=0){
	 				$("span[name='txMsgSubject']").show();
	 				$("span[name='txMsgSubject']").text('กรุณากรอกข้อมูล Subject');
	 				$("#dialog-warning").text('กรุณากรอกข้อมูล Subject');
	 				$("#dialog-warning").dialog('open');
	 				
	 			}else if($("#subject")[0].value.length>100){
	 				$("span[name='txMsgSubject']").show();
	 				$("span[name='txMsgSubject']").text('กรุณากรอกข้อมูลที่มีความยาวไม่เกิน 100 ตัวอักษร');
	 				$("#dialog-warning").text('กรุณากรอกข้อมูลที่มีความยาวไม่เกิน 100 ตัวอักษร');
	 				$("#dialog-warning").dialog('open');
	 			}else if($("input[name='period']:checked").val()=='2'&&($('#dteStart').val()==''||$('#dteTo').val()=='')){
	 				$("#dialog-warning").text('กรุณาเลือกข้อมูลช่วงเวลาการใช้งาน');
						$("#dialog-warning").dialog('open'); 
	 			}else{
	 				$("span[name='txMsgSubject']").hide();
	 				if ($("input[name='requestType']:radio:checked").val()=='1'){
	 					if(countrowdataNew<=0){
	 						$("#dialog-warning").text('กรุณาเพิ่มข้อมูล Application และ  Role Application ที่ต้องการขอ UR');
	 						$("#dialog-warning").dialog('open'); //error code : 20006
	 					}else if(!validateStatusAllrecord()){
	 						$("#dialog-warning").text('Upload File ไม่ครบถ้วน');
	 						$("#dialog-warning").dialog('open'); //error code : 20005
	 					}else{		
	 								$("#process-loader").show();
	 								var period;
	 								if($("input[name='period']:checked").val()==1){
	 									var temperiods={};
	 									temperiods['periodtype']=$("input[name='period']:checked").val();
	 									period=temperiods;
	 								}else {
	 									var temperiods={};
	 									temperiods['periodtype']=$("input[name='period']:checked").val();
	 									temperiods['dteStart']=$('#dteStart').val();
	 									temperiods['dteTo']=$('#dteTo').val();
	 									period=temperiods;
	 								}
	 								var data = new FormData();
	 								dataFormApp['usertypeValue']=$('#usertype option:selected').val();
	 								dataFormApp['usertype']=$('#usertype option:selected').text();
	 								dataFormApp['requestByValue']=$("input[name='requestBy']:radio:checked").val();
	 								dataFormApp['requestBy']=$("input[name='requestBy']:radio:checked").parent().text();
	 								dataFormApp['requestType']=$("input[name='requestType']:radio:checked").parent().text();
	 								dataFormApp['requestTypeValue']=$("input[name='requestType']:radio:checked").val();
	 								dataFormApp['subject']=$("#subject").val();
	 								dataFormApp['detail']=$("#detail").val();
	 								dataFormApp['periodtype']=$("input[name='period']:checked").val();
	 								dataFormApp['dteStart']=$('#dteStart').val();
	 								dataFormApp['dteTo']=$('#dteTo').val()
	 								dataFormApp['periodValue']=period;
	 								dataFormApp['period']=$("input[name='period']:radio:checked").parent().text();
	 								dataFormApp['name']=nameuser;
	 								dataFormApp['userId']=$("input[name='userId'][type='hidden']").val();
	 								data.append('dataFormApp',JSON.stringify(dataFormApp));
	 								
	 								rowdata = $("#appjqGrid").jqGrid ('getRowData');
	 								$.each(rowdata,function(row,ele){
	 									tagtemfile = $("tr.jqgrow > td > a[value='"+ele.appRoleId+"']", $("#appjqGrid"));
	 								var temfiles=new Array();
	 									$.each($(tagtemfile),function(row,ele){
	 										 var address = $(ele).attr('href')
	 										 if(address!=null&&address!=''){
	 								    		 var patharray = address.split('/');
	 								    		 var templetefile = patharray[patharray.length-1];
	 								    		 temfiles.push(templetefile);
	 							    		 }
	 									});
	 									
	 							
	 								var filesupload=new Array();
	 										var selectorTagupload = $("tr.jqgrow > td > input[type=file][value="+(ele.appRoleId)+"]", $("#appjqGrid"));
	 										$.each($(selectorTagupload),function(row,ele){
	 											filesupload.push($(ele)[0].files[0]);
	 										});
	 				
	 										
	 								listApp.push({
	 												appId:ele.appId,
	 											appRoleId:ele.appRoleId,
	 											application:ele.application,
	 											remark:ele.remark,
	 											roleapplication:ele.roleapplication,
	 											status:ele.status,
	 											temfile:temfiles,
	 											upload:filesupload
	 									});
	 								});
	 								
//	 								rowuser = $("#userjqGrid").jqGrid ('getRowData');
	 								if($("input[name='requestBy']:radio:checked").val()==2){
	 									rowuser = $("#userjqGrid").jqGrid('getGridParam', 'data');
	 								}else if ($("input[name='requestBy']:radio:checked").val()==1){
	 									rowuser = $("#userjqGrid").jqGrid ('getRowData');
	 								}
	 								data.append('listuser',JSON.stringify(rowuser));
	 								
	 								var appDatas=[];
	 								$.each(listApp,function(key,ele){
	 									$.each(ele.upload,function(keyt,elet){
	 									data.append(ele.appRoleId,elet);
	 									});
	 									ele.upload=null;
	 									appDatas.push(ele);
	 								});
	 								data.append('appDatas',JSON.stringify(appDatas));
	 								$.ajax({
	 							        url: $("#submitform").attr('action'),
	 							        type: 'POST',
	 							        data: data,
	 							        cache: false,
	 							        enctype: 'multipart/form-data',
	 							        dataType: 'json',
	 							        processData: false, 
	 							        contentType: false, 
	 							        success: function(data, textStatus, jqXHR)
	 							        {
	 							        	if(jqXHR.responseJSON.idRequestNo!=null&&jqXHR.responseJSON.idRequestNo!=''){
	 							        		if(flagUserprofile!=null){
		 						        			window.location='../../individual/result/'+jqXHR.responseJSON.idRequestNo;
		 						        		}else{
		 						        			window.location='individual/result/'+jqXHR.responseJSON.idRequestNo;
		 						        		}
	 							        	}else{
	 							        		
	 							        	}
	 							        	//success
	 							        },
	 							        error: function(jqXHR, textStatus, errorThrown)
	 							        {
	 							            console.log('ERRORS: ' + textStatus);
	 							           $("#process-loader").hide();
	 							        }
	 								 });
	 								
	 					}
	 				}else if($("input[name='requestType']:radio:checked").val()=='3'){
	 					if(countrowdataChg<=0){
	 						$("#dialog-warning").text('กรุณาเพิ่มข้อมูล Application และ  Role Application ที่ต้องการขอ UR');
	 						$("#dialog-warning").dialog('open'); //error code : 20006
	 					}else if($("[name='appChangeChk']:checked").val()=='on'&&$("input[name='periodChg']:checked").val()==null){
							$("#dialog-warning").text('กรุณาเลือกข้อมูลช่วงเวลาการใช้งาน');
	 						$("#dialog-warning").dialog('open');
		 				}else if($("[name='appChangeChk']:checked").val()=='on'&&$("input[name='periodChg']:checked").val()==2
		 						&&($('#dteStartChg').val()==''||$('#dteToChg').val()==''))
		 				{
		 						$("#dialog-warning").text('กรุณาเลือกข้อมูลช่วงเวลาการใช้งาน');
								$("#dialog-warning").dialog('open');
		 				}else{
	 							$("#process-loader").show();
	 							var period;
	 							if($("input[name='periodChg']:checked").val()==1){
	 								var temperiods={};
	 								temperiods['periodtype']=$("input[name='periodChg']:checked").val();
	 								period=temperiods;
	 							}else {
	 								var temperiods={};
	 								temperiods['periodtype']=$("input[name='periodChg']:checked").val();
	 								temperiods['dteStart']=$('#dteStartChg').val();
	 								temperiods['dteTo']=$('#dteToChg').val();
	 								period=temperiods;
	 							}
	 							var data = new FormData();
	 							rowdata = $("#appChangejqGrid").jqGrid ('getRowData');
	 							data.append('appDatas',JSON.stringify(rowdata));
	 							
	 							dataFormApp['usertypeValue']=$('#usertype option:selected').val();
	 							dataFormApp['usertype']=$('#usertype option:selected').text();
	 							dataFormApp['requestByValue']=$("input[name='requestBy']:radio:checked").val();
	 							dataFormApp['requestBy']=$("input[name='requestBy']:radio:checked").parent().text();
	 							dataFormApp['requestType']=$("input[name='requestType']:radio:checked").parent().text();
	 							dataFormApp['requestTypeValue']=$("input[name='requestType']:radio:checked").val();
	 							dataFormApp['subject']=$("#subject").val();
	 							dataFormApp['detail']=$("#detail").val();
	 							dataFormApp['periodtype']=$("input[name='periodChg']:checked").val();
	 							dataFormApp['dteStart']=$('#dteStartChg').val();
	 							dataFormApp['dteTo']=$('#dteToChg').val()
	 							dataFormApp['periodValue']=period;
	 							dataFormApp['period']=$("input[name='periodChg']:radio:checked").parent().text();
	 							dataFormApp['name']=nameuser;
	 							dataFormApp['userId']=$("input[name='userId'][type='hidden']").val();
	 							if($("input[name='appChangeChk']")[0].checked){
	 								dataFormApp['CH1P1']='CH1P1';
	 							}else{
	 								dataFormApp['CH1P1']='';
	 							}
	 							dataFormApp['CH1R1']=rowdata[0].chgRole;
	 							data.append('dataFormApp',JSON.stringify(dataFormApp));
	 							
	 							rowuser = $("#userjqGrid").jqGrid ('getRowData');
	 							data.append('listuser',JSON.stringify(rowuser));
	 							

	 							
	 							$.ajax({
	 						        url: $("#submitform").attr('action'),
	 						        type: 'POST',
	 						        data: data,
	 						        cache: false,
	 						        enctype: 'multipart/form-data',
	 						        dataType: 'json',
	 						        processData: false, 
	 						        contentType: false, 
	 						        success: function(data, textStatus, jqXHR)
	 						        {
	 						        	if(jqXHR.responseJSON.idRequestNo!=null&&jqXHR.responseJSON.idRequestNo!=''){
	 						        		if(flagUserprofile!=null){
	 						        			window.location='../../individual/result/'+jqXHR.responseJSON.idRequestNo;
	 						        		}else{
	 						        			window.location='individual/result/'+jqXHR.responseJSON.idRequestNo;
	 						        		}
	 						        	}else{
	 						        		
	 						        	}
	 						        	//success
	 						        },
	 						        error: function(jqXHR, textStatus, errorThrown)
	 						        {
	 						        	$("#process-loader").hide();
	 						            console.log('ERRORS: ' + textStatus);
	 						        }
	 							 });
	 						}
	 				}else if($("input[name='requestType']:radio:checked").val()=='2'){
	 					if(countrowdataTer<=0){
	 						$("#dialog-warning").text('กรุณาเพิ่มข้อมูล Application และ  Role Application ที่ต้องการขอ UR');
	 						$("#dialog-warning").dialog('open'); //error code : 20006
	 					}else{
	 							$("#process-loader").show();
	 							var data = new FormData();
	 							rowdata = $("#appTerminatejqGrid").jqGrid ('getRowData');
	 							data.append('appDatas',JSON.stringify(rowdata));
	 							
	 							dataFormApp['usertypeValue']=$('#usertype option:selected').val();
	 							dataFormApp['usertype']=$('#usertype option:selected').text();
	 							dataFormApp['requestByValue']=$("input[name='requestBy']:radio:checked").val();
	 							dataFormApp['requestBy']=$("input[name='requestBy']:radio:checked").parent().text();
	 							dataFormApp['requestType']=$("input[name='requestType']:radio:checked").parent().text();
	 							dataFormApp['requestTypeValue']=$("input[name='requestType']:radio:checked").val();
	 							dataFormApp['subject']=$("#subject").val();
	 							dataFormApp['detail']=$("#detail").val();
	 							dataFormApp['name']=nameuser;
	 							dataFormApp['userId']=$("input[name='userId'][type='hidden']").val();
	 							data.append('dataFormApp',JSON.stringify(dataFormApp));
	 							
	 							rowuser = $("#userjqGrid").jqGrid ('getRowData');
	 							data.append('listuser',JSON.stringify(rowuser));
	 							
	 							$.ajax({
	 						        url: $("#submitform").attr('action'),
	 						        type: 'POST',
	 						        data: data,
	 						        cache: false,
	 						        enctype: 'multipart/form-data',
	 						        dataType: 'json',
	 						        processData: false, 
	 						        contentType: false, 
	 						        success: function(data, textStatus, jqXHR)
	 						        {
	 						        	if(jqXHR.responseJSON.idRequestNo!=null&&jqXHR.responseJSON.idRequestNo!=''){
	 						        		if(flagUserprofile!=null){
	 						        			window.location='../../individual/result/'+jqXHR.responseJSON.idRequestNo;
	 						        		}else{
	 						        			window.location='individual/result/'+jqXHR.responseJSON.idRequestNo;
	 						        		}
	 						        		$("#process-loader").hide();
	 						        	}else{
	 						        		
	 						        	}
	 						        	
	 						        	//success
	 						        },
	 						        error: function(jqXHR, textStatus, errorThrown)
	 						        {
	 						        	$("#process-loader").hide();
	 						            console.log('ERRORS: ' + textStatus);
	 						        }
	 							 });
	 						}
	 				}
	 				
	 				
	 			}
	    	}
	   },{
			text : "Cancel",
			class : "red-btn",
			click : function(){
				$(this).dialog("close");
			}
		}]	
  });
   firstHideCompanent();
   $("#dialog-warning").dialog({
       autoOpen: false, 
       modal: true,
       draggable : false,
       resizable : false,
       buttons: {
	 		Close:function() {
	 			$(this).dialog("close");
	 		}
       }
	 });
   $("#dialog-new-confirm").dialog({
       autoOpen: false, 
       modal: true,
	   buttons : [{
	    	text : "Confirm",
	    	click : function(){
	    		$('#appjqGrid').jqGrid('delRowData',$("#dialog-new-confirm").val());
	    		 var countrowdataNew = $("#appjqGrid").jqGrid('getGridParam', 'records');
	    		 if(countrowdataNew==0){
	    			 $("[name='appNew']").hide();
	    			 $("div.empty").show();
	    		 }else{
	    			 $("[name='appNew']").show();
	    			 $("div.empty").hide();
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
   $("#dialog-ter-confirm").dialog({
       autoOpen: false, 
       modal: true,
	   buttons : [{
	    	text : "Confirm",
	    	click : function(){
	    		$('#appTerminatejqGrid').jqGrid('delRowData',$("#dialog-ter-confirm").val());
	    		 var countrowdataTer = $("#appTerminatejqGrid").jqGrid('getGridParam', 'records');
	    		 if(countrowdataTer==0){
	    			 $("[name='appTerminate']").hide();
	    			 $("div.empty").show();
	    		 }else{
	    			 $("[name='appTerminate']").show();
	    			 $("div.empty").hide();
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
   $("#dialog-chg-confirm").dialog({
       autoOpen: false, 
       modal: true,
	   buttons : [{
	    	text : "Confirm",
	    	click : function(){
	    		 $('#appChangejqGrid').jqGrid('delRowData',$("#dialog-chg-confirm").val());
	    		 var countrowdataChg = $("#appChangejqGrid").jqGrid('getGridParam', 'records');
	    		 if(countrowdataChg==0){
	    			 $("[name='appChange']").hide();
	    			 $("div.empty").show();
	    		 }else{
	    			 $("[name='appChange']").show();
	    			 $("div.empty").hide();
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

