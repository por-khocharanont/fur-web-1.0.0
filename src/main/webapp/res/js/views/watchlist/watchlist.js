$(document).ready(function () {
	
	var $form = $('#searchForm');
	
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

	
	$('.nav-menu-bar').click(function() {
	    $('.nav-menu-bar').removeClass('link-active');
	    $(this).addClass('link-active');
	    
	    var value = $(this).attr('value');
	  	
		if(value != $('#urStatus').val()){
					
			resetForm();
			$('#urStatus').val(value);
				
					
			searchgrid();
		}

		var urStatus = $('#urStatus').val();

		//Show StartDate,EndDate and Status Select box
		if(urStatus == 1){
			$('#div-urstep').show();
			$('#div-date').show();
			
		}else{
			$('#div-urstep').hide();
//			$('#div-date').hide();
		}
		return false;
		
	});
	
	function resetForm(){
		$form[0].reset();
		
	}
	
	$('#resetBtn').click(function(){
		$('#searchForm')[0].reset();
		$("#startDate").datepicker('setDate', null);
		$("#endDate").datepicker('setDate', null);
        $("#searchBtn").trigger("click");
	});
	
	 
	 
	//Closr UR  Button
	 $("#watchListCloseUrBtn").click(function(e) {
		 
		 var userLogin = $("#userlogin").text();
		 
		 var listData = $("#jqgridTable").jqGrid('getGridParam', 'selarrrow');
		 
		 if (listData.length == 0) {
				
				$("#dialog-not-select-row").dialog("open");
				
			}
		 else{
			 
			 for(i=0; i < listData.length; i++){
				 
					rowData=$("#jqgridTable").getRowData(listData[i]);
					
					var username = rowData.username;
					
					var urStep = rowData.urStep;
					
					var urApprove = rowData.urApprove;
					console.log(rowData);
					console.log(urApprove);
					
					//Check not own UR and urStep != Waiting for close 
					if((username !== userLogin && urStep !== "6") || (username === userLogin && urStep !== "6" || urApprove =='0')){
						$("#dialog-not-closeur").dialog("open");
						return;
					}
				 }
			 
			 $("#dialog-close-confirm").dialog("open");
		 }
		 
		
	   	 
	   });
	 
	 
	 $("#dialog-not-select-row").dialog({
         autoOpen: false, 
         modal: true,
         buttons: {
            Close: function() {$(this).dialog("close");}
         },
      });
	 
	 $("#dialog-not-closeur").dialog({
         autoOpen: false, 
         modal: true,
         buttons: {
            Close: function() {$(this).dialog("close");}
         },
      });
	 
	 $("#dialog-close-success").dialog({
         autoOpen: false, 
         modal: true,
         buttons: {
            Close: function() {$(this).dialog("close");}
         },
      });
	 
	 $("#dialog-close-error").dialog({
         autoOpen: false, 
         modal: true,
         buttons: {
            Close: function() {$(this).dialog("close");}
         },
      });
	 
	 $("#dialog-close-confirm").dialog({
         autoOpen: false, 
         modal: true,
     	 buttons : [{
	    	text : "Confirm",
	    	click : function(){
	    		
	 			var actionClosrUr = $("#watchListCloseUrBtn").attr("action");
	 			var listData = $("#jqgridTable").jqGrid('getGridParam', 'selarrrow');
	 			 
	 			
	 		    var jsonData = JSON.stringify(listData);
	 		    $("#dialog-close-confirm").dialog("close");
	 		    $('#process-loader').show();
                $.ajax({
                        url : actionClosrUr,
                        type : 'POST',
                        data : jsonData,
                        success : function(data) {
                        	$('#process-loader').hide();
                        	$("#dialog-close-success").dialog("open");
                        	searchgrid();
                           
                        },
                        error : function(jqXHR, textStatus, errorThrown) {
                        	$('#process-loader').hide();
                        	$("#dialog-close-error").dialog("open");
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
	 
	 
	
	
	//Search Grid
	 $("#searchBtn").click(function(e) {
	   	 e.preventDefault();
	   	
	   	 searchgrid();
	   });
	
	function searchgrid(){
		
		 var actionUrl = $("#searchForm").attr('action');
		 $("#jqgridTable").jqGrid("clearGridData", true).trigger("reloadGrid");
		 reloadSearchAction($("#jqgridTable"));
		 
		 var urLink = $("#urlk").attr('action');
	
		 var tbWidth = $('.data-table').width();
		 $("#jqgridTable").jqGrid({
				 url : actionUrl,
				 datatype : "json",
				 postData : {
					 requestNo : function() {
						 var requestNo = $("#requestNo").val();
						 return requestNo;
						 
					 },
					 urNo : function() {
						 var urNo = $("#urNo").val();
						 return urNo;
						 
					 },
					 startDate : function() {
						 var startDate = $("#startDate").val();
						 return startDate;
						 
					 },
					 endDate : function() {
						 var endDate = $("#endDate").val();
						 return endDate;
						 
					 },
					 selectUrStep : function() {
						 var selectUrStep = $("#selectUrStep").val() == 0? "" : $("#selectUrStep").val();
						 
						 return selectUrStep;
						 
					 },
					 urStatus : function() {
						 var urStatus = $("#urStatus").val();
						 return urStatus;
						 
					 }
						 
				 },
				 
				 colNames : [ 'No', 'Request No', 'UR No','Application','Role Application', 
//				              'Subject',
				              'Request Date' , 'Request By', 'Status', 'Username', 'UR Step','UrApprove'],
				 colModel : [ {
								name : 'urId',
								index : 'UR_ID',
								sortable : false,
								hidden : true,
								key : true
						}, {
								name : 'requestNo',
								index : 'REQUEST_NO',
								width : 120,
								sortable : true,
								align : "center",
								resizable : false,
								formatter:function (cellvalue, options, rowObject) {
									return "<a href=\"" + urLink + "/requestno/detail/"+cellvalue+"\"><font color='green'><u>" + cellvalue + "</u></font></a>";
								}
						}, {
								name : 'urId',
								index : 'UR_ID',
								sortable : true,
								align : "center",
								resizable : false,
								width : 120,
								formatter:function (cellvalue, options, rowObject) {
								    return "<a href=\"" + urLink + "/ur/detail/"+cellvalue+"\"><font color='green'><u>" + cellvalue + "</u></font></a>";
								}
						}, {
								name : 'appName',
								index : 'APP_NAME',
								sortable : false,
								align : "center",
								resizable : false,
								width : 180
						}, {
								name : 'appRoleName',
								index : 'APP_ROLE_NAME',
								sortable : false,
								align : "center",
								resizable : false,
								width : 180
						}, {
//								name : 'subject',
//								index : 'SUBJECT',
//								sortable : true,
//								align : "center",
//								resizable : false,
//								width : 220
//						}, {
								name : 'requestDate',
								index : 'REQUEST_DATE',
								sortable : true,
								align : "center",
								resizable : false,
								formatter: function(cellvalue,option,rowObject){
									return convertDateFormatWithTime(cellvalue);
					        	}
						}, {
								name : 'requestBy',
								index : 'REQUEST_BY',
								sortable : false,
								align : "center",
								resizable : false,
								width : 180
						}, {
								name : 'urStepText',
								index : 'UR_STEP',
								sortable : false,
								align : "center",
								resizable : false,
								width : 130
						}, {
								name : 'username',
								index : 'USERNAME',
								sortable : false,
								hidden : true,
								resizable : false,
								width : 50
						}, {
								name : 'urStep',
								index : 'UR_STEP',
								sortable : false,
								hidden : true,
								resizable : false,
								width : 50
						},{
								name : 'urApprove',
								index : 'UR_APPROVE',
								sortable : false,
								hidden : true,
								resizable : false,
								width : 50
						}],
				rowNum : appConf.jqgrid.rowNum,
				pager : '#jqgridPager',
				sortname : 'REQUEST_NO',
				viewrecords : true,
				sortorder : "DESC",
				rownumbers: true,
				multiselect : true,
				autoencode : true ,
				hidegrid : false ,
				shrinkToFit : false,
				caption : "Results",
				width : tbWidth,
				height : '400%',
				gridComplete : function() {
					
					$(".ui-pg-input").attr('readonly', true);
					
				   },
				loadComplete : function(data) {
					   var recs = parseInt($("#jqgridTable").getGridParam("records"),10);
					   var urStatus = $('#urStatus').val();
					   if (isNaN(recs) || recs == 0) {
						$("#jqgridwatchlist").hide();
						   $(".empty").show();
						   $("#watchListCloseUrBtn").hide();
						   
					   }else{
						$("#jqgridwatchlist").show();
						   $(".empty").hide();
						   if(urStatus != 1){
							   $("#watchListCloseUrBtn").hide();
						   }else{
							   $("#watchListCloseUrBtn").show();
						   }
						   
					   }
					   
					   var $table = $('#jqgridTable').find('tr[class!=jqgfirstrow]');
		            	$table.each(function(idx,value){
		            		var status = $(value).find('td[aria-describedby=jqgridTable_urStepText]').text();
		            		if(status!='Waiting for Close'){
		            			$(value).find('td[role=gridcell]').find('input[class=cbox]').attr("disabled", "disabled");
		            		}
		            	});
	
				   },
				   rowattr : function(rd){
		            	if(rd.urStep!=6){
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
	}
	
	function reloadSearchAction($gridElm) {
		   
		$gridElm.trigger('reloadGrid');
	}
	
	searchgrid();
	
	
});