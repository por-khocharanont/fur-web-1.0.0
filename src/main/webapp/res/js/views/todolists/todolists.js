$(function(){
	
	var todoListType ='1';
	var colGridName =  [ 'urId','requestNo','Request No', 'UR No','Application','Role Application',
	  		             'Request Date', 'Request By','requestBy' ,'Status','urApprove','urReject','urToken','urDefault'];
	var colGridModel = [
	 		           { 	
			        	   name: 'urId', 
			        	   hidden : true
			           },
			           { 
			        	   name: 'requestNo', 
			        	   hidden : true
			           },
			           { 
			        	   name: 'requestNoShow', 
			        	   index : 'UR.REQUEST_NO', 
			        	   resizable : false,
			        	   width: 120,
			        	   align : "center",
			        	   sortable : true,
			        	   formatter: function (cellvalue, options, rowObject) {
			        		    return "<a href="+requestNoDetailUrl+"/"+rowObject.requestNo+"><font color='green'><u>"+rowObject.requestNo+"</u></font></a>";
			        	   }
			           },
			           
			           { 
			        	   name: 'urIdShow', 
			        	   index : 'UR.UR_ID',  
			        	   width: 120,
			        	   resizable : false,
			        	   sortable : true,
			        	   key : true,
			        	   align : "center",
			        	   formatter: function (cellvalue, options, rowObject) {
			        		    return "<a href="+urDetailUrl+"/"+rowObject.urId+"><font color='green'><u>"+rowObject.urId+"</u></font></a>";
			        	   }
			           },	
			           { 
			        	   name: 'appName', 
			        	   index : 'APP_NAME',  
			        	   resizable : false,
			        	   sortable : false,
			        	   align : "center",
			        	   width: 180,
			           },	
			           { 
			        	   name: 'appRoleName', 
			        	   index : 'APP_ROLE_NAME',  
			        	   resizable : false,
			        	   sortable : false,
			        	   align : "center",
			        	   width: 180,
			           },	
			           { 
			        	   name: 'requestDate', 
			        	   index : 'REQ.REQUEST_DATE', 
			        	   align : "center", 
			        	   sortable : true,
			        	   resizable : false,
			        	   formatter: function(cellvalue,option,rowObject){
			        		   return convertDateFormatWithTime(cellvalue);
			        	   }
			           },
			           { 
			        	   name: 'requestByFullName',
			        	   index : 'requestByFullName',
			        	   width: 180, 
			        	   align: "center" ,
			        	   resizable : false,
			        	   sortable : false
			           },
			           { 
			        	   name: 'requestBy',
			        	   index : 'REQUEST_BY',
			        	   width: 180, 
			        	   align: "center" ,
			        	   resizable : false,
			        	   sortable : false,
			        	   hidden : true
			           },
			           { 
			        	   name: 'urStep',
			        	   index : 'UR_STEP',
			        	   width: 130, 
			        	   align: "center" ,
			        	   resizable : false,
			        	   sortable : false,
			           },
			           { 
			        	   name: 'urApprove',
			        	   index : 'urApprove',
			        	   hidden : true
			           },
			           { 
			        	   name: 'urReject',
			        	   index : 'urReject',
			        	   hidden : true
			           },
			           { 
			        	   name: 'urToken',
			        	   index : 'urToken',
			        	   hidden : true
			           },
			           { 
			        	   name: 'urDefault',
			        	   index : 'urDefault',
			        	   hidden : true
			           },
			];
	
	 $("#dialog-reject-error").dialog({
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
	 
	 $("#dialog-approve-error-default").dialog({
         autoOpen: false,modal: true,draggable : false,resizable : false, 
         buttons: {
            Close: function() {$(this).dialog("close");}
         },
      });
	 
	 $("#dialog-confirm").dialog({
         autoOpen: false,modal: true,draggable : false,resizable : false, 
     	buttons : [{
	    	text : "Confirm",
	    	click : function(){
	    		var approveType =  $('#approveForm').find('input[name=approveType]').val();
        		
        		var remark =  $('#approveForm').find('textarea[name=remark]').val();
        		var dataParams = {
        				urApproveList : urApproveList,
        				remark : remark,
        				approveUR : approveType
        		};
        		
        	 	var jsonData = JSON.stringify(dataParams);
        	 	
        	    $('#approveForm').find('input[name=jsonData]').val(jsonData);
        		
        	    $("#dialog-confirm").dialog("close");
				$("#submitDialog").dialog("close");
        	    $('#process-loader').show();
        		$("#approveForm").ajaxSubmit({
        	    	success : function(data) {
        	    		$('#process-loader').hide();
        	    		if(data){
        	    			$("#dialog-success").dialog("open");
        	    			$("#todoListTable").jqGrid("clearGridData", true).trigger("reloadGrid");
        	    			$("#todoListTable").trigger("reloadGrid");
        	    		}
        	    		else{
        	    			$("#dialog-approve-error").dialog("open");
        	    		}
        			},
        			error: function(jqXHR, textStatus, errorThrown){
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
	 
	 $("#dialog-success").dialog({
         autoOpen: false,modal: true,draggable : false,resizable : false, 
         buttons: {
            Close: function() {$(this).dialog("close");}
         },
      });
	 
	 $("#dialog-no-select-row").dialog({
         autoOpen: false,modal: true,draggable : false,resizable : false, 
         buttons: {
            Close: function() {$(this).dialog("close");}
         },
      });
	 
	 $("#submitDialog").dialog({
         autoOpen: false,modal: true,draggable : false,resizable : false,
         width: 800
      });
	 
	$('.nav-menu-bar').click(function(e) {
		e.preventDefault();
	    $('.nav-menu-bar').removeClass('link-active');
	    $(this).addClass('link-active');
	    
	    var value = $(this).attr('value');
	    
	    todoListType = value;
	    
	    if(value==1){
	    	$('#statusSearchPanel').show();
	    	
	    }
	    if(value==2){
	    	$('#statusSearchPanel').hide();
	    }
	    $("#resetBtn").trigger("click");
	}); 
	 
	$('#resetBtn').click(function(){
		$('#searchForm')[0].reset();
		$("#startDate").datepicker('setDate', null);
		$("#endDate").datepicker('setDate', null);
        $("#searchBtn").trigger("click");
	});
	
	$('#searchBtn').click(function() {
        $("#todoListTable").jqGrid("clearGridData", true).trigger("reloadGrid");
        $("#todoListTable").trigger("reloadGrid");
    });
	
	 $( "#startDate" ).datepicker({
		 changeMonth: true,
		 numberOfMonths: 1,
		 dateFormat: 'dd/mm/yy',
		 onClose: function( selectedDate ) {
			 $( "#endDate" ).datepicker( "option", "minDate", selectedDate );
		 }
	});
	 
	$( "#endDate" ).datepicker({
		 changeMonth: true,
		 numberOfMonths: 1,
		 dateFormat: 'dd/mm/yy',
		 onClose: function( selectedDate ) {
			 $( "#startDate" ).datepicker( "option", "maxDate", selectedDate );
		 }
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
	
	var searchUrl =  $('#searchForm').attr('action');
	var userRequestUrl =  $('#todolistGrid').attr('action');
	var urDetailUrl = userRequestUrl + "ur/detail";
	var requestNoDetailUrl = userRequestUrl + "requestno/detail";
	var tbWidth = $('.tableGrid').width();
	var colNum = 7;
	var colWidth = tbWidth/colNum;
	
	$('#todoListTableGrid').find('div[name=dataFound]').hide();
	$('#todoListTableGrid').find('div[name=dataNotFound]').hide();
	$('div[name=approveButtonPanel]').hide();
	
	$("#todoListTable").jqGrid({
		postData : {
			requestNo : function(){
				var requestNo = $("input[name=requestNo]").val();
				return requestNo;
			},
			urId : function(){
				var urId = $("input[name=urId]").val();
				return urId;
			},
			startDate : function(){
				var startDate = $("input[name=startDate]").val();
				return startDate;
			},
			endDate : function(){
				var endDate = $("input[name=endDate]").val();
				return endDate;
			},
			urStep : function(){
				var urStep = $("select[name=status]").val();
				return urStep;
			},
			type : function(){
				return todoListType;
			}
		},
		url: searchUrl,
		mtype: "GET",
		styleUI : 'Bootstrap',
		datatype: "json",
		colNames : colGridName,
		colModel: colGridModel,
		height : "100%",
		multiselect : true,
		viewrecords: true,
		width : "100%",
		rowNum: 20,
		rownumbers : true,
        caption : "Results",
        sortorder : "ASC",
        sortname : 'REQ.REQUEST_DATE',
        hidegrid : false ,
		pager: "#todoListTablePager",
		loadonce: false,
		loadComplete : function(){
			
			var countRec = jQuery('#todoListTable').jqGrid('getGridParam', 'reccount');
        	if(countRec>0){
        		$('div[name=approveButtonPanel]').show();
        	    $('#todoListTableGrid').find('div[name=dataFound]').show();
        	    $('#todoListTableGrid').find('div[name=dataNotFound]').hide();
        	}
        	else{
        		$('div[name=approveButtonPanel]').hide();
        	    $('#todoListTableGrid').find('div[name=dataFound]').hide();
        	    $('#todoListTableGrid').find('div[name=dataNotFound]').show();
        	}
        	
    		if(todoListType==1){
    			$('input[class=cbox]').show();
    			$('div[name=approveButtonPanel]').show();
    		}
        	
        	if(todoListType==2){
    			$('input[class=cbox]').hide();
    			$('div[name=approveButtonPanel]').hide();
    		}
        	
         	var $table = $('#todoListTable').find('tr[class!=jqgfirstrow]');
        	$table.each(function(idx,value){
        		var status = $(value).find('td[aria-describedby=todoListTable_urStep]').text();
        		if(status=='Waiting for Custodian' || todoListType == 2){
        			$(value).find('td[role=gridcell]').find('input[class=cbox]').attr("disabled", "disabled");
        		}
        		
        		$(value).find('input[class=cbox]').show();
        	});
        	
        	
        	
		},
		rowattr : function(rd){
	       	if(rd.urStep=="Waiting for Custodian"){
	       		 return {
	       	            "class": "ui-state-disabled ui-jqgrid-disablePointerEvents"
	       	        };
	       	}
	       	if(todoListType==2){
	       		 return {
	       	            "class": "ui-state-disabled ui-jqgrid-disablePointerEvents"
	       	        };
	       	}
        },
        beforeSelectRow: function (rowid, e) {
		    var $self = $(this),
		        $td = $(e.target).closest("td"),
		        iCol = $.jgrid.getCellIndex($td[0]),
		        cm = $self.jqGrid("getGridParam", "colModel");

		    return (cm[iCol].name === "cb");
        }
	});
	
	var urApproveList = [];
	
	$('#approveBtn').click(function(){
		$('font[name=remarkLengthMsg]').hide();
		$('#approveForm')[0].reset();
		urApproveList = [];
		var approveList = jQuery("#todoListTable").jqGrid('getGridParam', 'selarrrow');
		var canApprove = true;
		var errDefault = false;
		if(approveList.length > 0){
			$.each(approveList,function(idx,aRowids){
				var urObj = jQuery('#todoListTable').jqGrid ('getRowData', aRowids);
				
				console.log(urObj);
				
				if(urObj.urApprove == 0){
					canApprove = false;
				}
				if(urObj.urToken == 1 || urObj.urDefault == 1){
					errDefault = true;
				}
				var rowObj = { 
						requestBy : urObj.requestBy,
						urId : urObj.urId,
						requestDate : urObj.requestDate,
						subject : urObj.subject,
						urApprove : urObj.urApprove,
						urReject : urObj.urReject,
						urToken : urObj.urToken,
						urDefault : urObj.urDefault
				}
				urApproveList.push(rowObj);
			});
			
			if(errDefault){
				$("#dialog-approve-error-default").dialog("open");
				return;
			}
			
			if(!canApprove){
				$("#dialog-approve-error").dialog("open");
				return;
			}
			
			$("#submitDialog").find('input[name=approveType]').val('1');
			$("#submitDialog").dialog("open");
		}
		else{
			$("#dialog-no-select-row").dialog("open");
		}
	});
	
	$('#rejectBtn').click(function(){
		$('font[name=remarkLengthMsg]').hide();
		$('#approveForm')[0].reset();
		urApproveList = [];
		var rejectList = jQuery("#todoListTable").jqGrid('getGridParam', 'selarrrow');
		var canReject = true;
		if(rejectList.length > 0){
			$.each(rejectList,function(idx,aRowids){
				var urObj = jQuery('#todoListTable').jqGrid ('getRowData', aRowids);
				console.log(urObj.urReject);
				
				if(urObj.urReject == 0){
					$("#dialog-reject-error").dialog("open");
					canReject = false;
					return;
				}
					
				urApproveList.push(urObj);
			});
			
			if(canReject){
				$("#submitDialog").find('input[name=approveType]').val('2');
				$("#submitDialog").dialog("open");
			}
		}
		else{
			$("#dialog-no-select-row").dialog("open");
		}
	});
	
	$('#submitDialog').find('.btn-dialog-panel button[name=cancelBtn]').click(function() {
		$('font[name=remarkLengthMsg]').hide();
		$('#submitDialog').dialog("close");
	});
	
	$('#submitDialog').find('.btn-dialog-panel button[name=saveBtn]').click(function() {
		
		var remark =  $('#approveForm').find('textarea[name=remark]').val();
		if(remark.length>250){
			$('font[name=remarkLengthMsg]').show();
			return;
		}
		else{
			$('font[name=remarkLengthMsg]').hide();
		}
		
		$('#dialog-confirm').dialog("open");
		
	});
	
});