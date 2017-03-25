$.jgrid.defaults.width = 780;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
$(document).ready(function () {
		
		$('.auto-appName').autocomplete({
			  select: function( event, ui ) {
				  $('#appName').val(ui.item.appName);
			  }
		});
		
		
		 $("#dialog-cannot-request").dialog({
	         autoOpen: false,draggable : false,resizable : false, 
	         buttons: {
	            Close: function() {$(this).dialog("close");}
	         },
	      });
	
		$("#tokenGrid").hide();
			
		$('.nav-menu-bar').click(function() {
		    $('.nav-menu-bar').removeClass('link-active');
		    $(this).addClass('link-active');
		    
		    var value = $(this).attr('value');
		  	$("input[name='applicationType']").val(value);
		  	$("#standardAppTable").jqGrid("clearGridData", true).trigger("reloadGrid");
		    $("#standardAppTable").trigger("reloadGrid");
		    
		    $("#specialAppTable").jqGrid("clearGridData", true).trigger("reloadGrid");
		    $("#specialAppTable").trigger("reloadGrid");
		    
		    //token type==3
		    if(value==3){
		    	$("#searchBtn").hide();
		    	$("#resetBtn").hide();
		    	$("#tokenGrid").show();
		    	$("#standardGrid").hide();
		    	$("#specialGrid").hide();
		    	$("#authorizationInput").hide();
		    	$("#appNameInput").hide();
		    	
		    }else{
		    	$("#searchBtn").show();
		    	$("#resetBtn").show();
		    	$("#tokenGrid").hide();
		    	$("#standardGrid").show();
		    	$("#specialGrid").show();
		    	$("#authorizationInput").show();
		    	$("#appNameInput").show();
		    }
		    return false;
		});
		
		$('#resetBtn').click(function(){
			$('#searchApplicationForm')[0].reset();
	        $("#searchBtn").trigger("click");
		});
	
	
		var searchUrl =  $('#searchApplicationForm').attr('action');
		var detailUrl =  $('#detailUrl').attr('action');
	    $('#searchBtn').click(function() {
	        $("#standardAppTable").jqGrid("clearGridData", true).trigger("reloadGrid");
	        $("#standardAppTable").trigger("reloadGrid");
	        $("#specialAppTable").jqGrid("clearGridData", true).trigger("reloadGrid");
	        $("#specialAppTable").trigger("reloadGrid");
	        $("#tokenAppTable").jqGrid("clearGridData", true).trigger("reloadGrid");
	        $("#tokenAppTable").trigger("reloadGrid");
	    });
	    
	    $('#standardGrid').find('button[name=requestBtn]').click(function() {
	    	var type = $("input[name='applicationType']").val();
	    	var appRoleIdList = [];
	    	
	    	var listData = $("#standardAppTable").jqGrid('getGridParam', 'selarrrow');
	    	
	    	if(listData.length>0){
	    		for(i=0; i < listData.length; i++){
					rowData=$("#standardAppTable").getRowData(listData[i]);
					appRoleIdList.push(rowData.appRoleId);
				}
		    	 
		    	var dataParams = { 	type : type,
		    						appRoleIdList : appRoleIdList
		    					};
		    	
		     	var jsonData = JSON.stringify(dataParams);
		    	console.log(jsonData);
		    	$('#urRequestFrom').find('input[name=jsonData]').val(jsonData);
		    	$('#urRequestFrom').submit();
	    	}
	    	else{
	    		 $("#dialog-cannot-request").dialog("open");
	    	}
	    	
	    });
	
	    var tbWidth = $('.tableGrid').width();
	    var colNum = 7;
	    var colWidth = tbWidth/colNum;
	    
	    $('#standardGrid').find('div[name=dataFound]').hide();
	    $('#standardGrid').find('div[name=dataNotFound]').hide();
	    
		$("#standardAppTable").jqGrid({
            postData : {
	        	appName : function(){
	        		var appName = $("#appName").val();
			        return appName;
	        	},
	        	authorizationType : function(){
	        		var authorizationType = $("input[name='authorizationType']:checked").val();
	        		return authorizationType;
	        	},
	        	applicationType : function(){
	        		var applicationType = $("input[name='applicationType']").val();
	        		return applicationType;
	        	}
	     
	        },
            url: searchUrl+"applications/standard",
            mtype: "GET",
			styleUI : 'Bootstrap',
            datatype: "json",
            colNames : [ 'Application','AppRoleId',' Role Application', 'Authorization', 'Edit' ,'urId','Period','Start Date','End Date','UR No'],
            colModel: [
                 { 
                	 name: 'appName', 
                	 index : 'appName',  
                	 width: colWidth ,
                	 sortable : false
				 },{
					 name :'appRoleId',
					 index : 'appRoleId',
					 hidden : true,
                	 sortable : false
				 },{ 
					 name: 'appRoleName', 
					 index : 'appRoleName', 
					 width: colWidth+50 ,
                	 sortable : false
				 },{ 
					 name: 'authorization', 
					 index : 'status', 
					 width: colWidth-50 , 
					 align : "center" ,
					 sortable : false
				 },{ 
					 name: 'appId', 
					 width: colWidth , 
					 align: "center" , 
					 formatter : showEditable,
					 sortable : false,
					 hidden : true
					 
				},{ 
					 name: 'urId',
					 index : 'urId',
					 width: colWidth+50, 
					 align: "center" ,
					 sortable : false,
					 hidden : true
				},
				{ 
					 name: 'periodType',
					 index : 'periodType',
					 width: colWidth-50 , 
					 align: "center" ,
					 sortable : false
				},{ 
					 name: 'startTime',
					 index : 'startTime',
					 width: colWidth , 
					 align: "center" ,
					 sortable : false,
					 formatter: function(cellvalue,option,rowObject){
						 return convertDateFormat(cellvalue);
		        	  }
				},{ 
					 name: 'endTime',
					 index : 'endTime',
					 width: colWidth , 
					 align: "center" ,
					 sortable : false,
					 formatter: function(cellvalue,option,rowObject){
		        		   return convertDateFormat(cellvalue);
		        	  }
				},
				{ 
					name: 'urIdShow',
					index : 'urIdShow',
					width: colWidth , 
					align: "center" ,
					sortable : false,
		        	formatter: function (cellvalue, options, rowObject) {
		        		if(rowObject.urId==null){
		        			return '';
		        		}
		        		return "<a href="+detailUrl+"/"+rowObject.urId+"><font color='green'><u>"+rowObject.urId+"</u></font></a>";
		        	}
				}
				
			],
            height : "100%",
			viewrecords: true,
            width : "100%",
            rowNum: 20,
            rownumbers : true,
            caption : "Results",
            hidegrid : false ,
            multiselect : true,
            pager: "#standardAppTablePager",
            loadonce: false,
            loadComplete : function(){
            	
            	var countRec = jQuery('#standardAppTable').jqGrid('getGridParam', 'reccount');
            	if(countRec>0){
            	    $('#standardGrid').find('div[name=dataFound]').show();
            	    $('#standardGrid').find('div[name=dataNotFound]').hide();
            	}
            	else{
            	    $('#standardGrid').find('div[name=dataFound]').hide();
            	    $('#standardGrid').find('div[name=dataNotFound]').show();
            	}
            	
            	
            	var $table = $('#standardAppTable').find('tr[class!=jqgfirstrow]');
            	$table.each(function(idx,value){
            		var status = $(value).find('td[aria-describedby=standardAppTable_authorization]').text();
            		if(status=='Allowed'){
            			$(value).find('td[role=gridcell]').find('input[class=cbox]').attr("disabled", "disabled");
            		}
            	});
            },
            rowattr : function(rd){
            	
            	if(rd.authorization=="Allowed"){
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
		
//	    var tbWidth = $('.tableGrid').width();
	    var colNum = 7;
	    var colWidth = tbWidth/colNum;
	    
	    
	    $('#specialGrid').find('div[name=dataFound]').hide();
	    $('#specialGrid').find('div[name=dataNotFound]').hide();
	    
		$("#specialAppTable").jqGrid({
            postData : {
	        	appName : function(){
	        		var appName = $("#appName").val();
			        return appName;
	        	},
	        	authorizationType : function(){
	        		var authorizationType = $("input[name='authorizationType']:checked").val();
	        		return authorizationType;
	        	},
	        	applicationType : function(){
	        		var applicationType = $("input[name='applicationType']").val();
	        		return applicationType;
	        	}
	     
	        },
	        url: searchUrl+"applications/special",
            mtype: "GET",
			styleUI : 'Bootstrap',
            datatype: "json",
            colNames : [ 'Application','AppRoleId',' Role Application', 'Authorization', 'Edit' ,'urId','Period','Start Date','End Date','UR No'],
            colModel: [
                       { 
                      	 name: 'appName', 
                      	 index : 'appName',  
                      	 width: colWidth ,
                      	 sortable : false
      				 },{
      					 name :'appRoleId',
      					 index : 'appRoleId',
      					 hidden : true
      				 },{ 
      					 name: 'appRoleName', 
      					 index : 'appRoleName', 
      					 width: colWidth+50 ,
                      	 sortable : false
      				 },{ 
      					 name: 'authorization', 
      					 index : 'status', 
      					 width: colWidth-50 , 
      					 align : "center" ,
      					 sortable : false
      				 },{ 
      					 name: 'appId', 
      					 width: colWidth , 
      					 align: "center" , 
      					 formatter : showEditable,
      					 sortable : false,
      					 hidden : true
      					 
      				},{ 
      					 name: 'urId',
      					 index : 'urId',
      					 width: colWidth+50, 
      					 align: "center" ,
      					 sortable : false,
      					 hidden : true
      				},
      				{ 
      					 name: 'periodType',
      					 index : 'periodType',
      					 width: colWidth-50 , 
      					 align: "center" ,
      					 sortable : false
      				},{ 
      					 name: 'startTime',
      					 index : 'startTime',
      					 width: colWidth , 
      					 align: "center" ,
      					 sortable : false,
    					 formatter: function(cellvalue,option,rowObject){
  		        		   return convertDateFormat(cellvalue);
    					 }
      				},{ 
      					 name: 'endTime',
      					 index : 'endTime',
      					 width: colWidth , 
      					 align: "center" ,
      					 sortable : false,
    					 formatter: function(cellvalue,option,rowObject){
    						 return convertDateFormat(cellvalue);
    					 }
      				},
      				{ 
    					name: 'urIdShow',
    					index : 'urIdShow',
    					width: colWidth , 
    					align: "center" ,
    					sortable : false,
    		        	formatter: function (cellvalue, options, rowObject) {
    		        		if(rowObject.urId==null){
    		        			return '';
    		        		}
    		        		return "<a href="+detailUrl+"/"+rowObject.urId+"><font color='green'><u>"+rowObject.urId+"</u></font></a>";
    		        	}
    				}
      				
      			],
            height : "100%",
			viewrecords: true,
            width: "100%",
            rowNum: 20,
            multiselect : true,
            caption : "Results",
            hidegrid : false ,
            rownumbers: true,
            pager: "#specialAppTablePager",
            loadonce: false,
            loadComplete : function(){
            	
            	var countRec = jQuery('#specialAppTable').jqGrid('getGridParam', 'reccount');
            	if(countRec>0){
            	    $('#specialGrid').find('div[name=dataFound]').show();
            	    $('#specialGrid').find('div[name=dataNotFound]').hide();
            	}
            	else{
            	    $('#specialGrid').find('div[name=dataFound]').hide();
            	    $('#specialGrid').find('div[name=dataNotFound]').show();
            	}
            	
            	
            	var $table = $('#specialAppTable').find('tr[class!=jqgfirstrow]');
            	$table.each(function(idx,value){
            		var status = $(value).find('td[aria-describedby=specialAppTable_authorization]').text();
            		if(status=='Allowed'){
            			$(value).find('td[role=gridcell]').find('input[class=cbox]').attr("disabled", "disabled");
            		}
            		
            		$(value).find('input[class=cbox]').show();
            	});
            },
            rowattr : function(rd){
            	if(rd.authorization=="Allowed"){
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
		
		var tbWidth = $('.tableGrid').width();
	    var colNum = 2;
	    var colWidth = tbWidth/colNum;
	    
	    
	    $('#tokenGrid').find('div[name=dataFound]').hide();
	    $('#tokenGrid').find('div[name=dataNotFound]').hide();
	    
		$("#tokenAppTable").jqGrid({
            url: searchUrl+"tokens",
            mtype: "GET",
			styleUI : 'Bootstrap',
            datatype: "json",
            colNames : [ ' UR No','Token No'],
            colModel: [
                { 	name: 'urId', 
                	index : 'urId', 
                	width: colWidth-50,
                	align: "center" ,
                   	formatter: function (cellvalue, options, rowObject) {
		        		if(rowObject.urId==null){
		        			return '';
		        		}
		        		return "<a href="+detailUrl+"/"+rowObject.urId+"><font color='green'><u>"+rowObject.urId+"</u></font></a>";
		        	}
                },
                { 	name: 'serialNumber', index : 'serialNumber',  width: colWidth }
            ],
            height : "100%",
			viewrecords: true,
            width: "100%",
            rowNum: 20,
            rownumbers: true,
            caption : "Results",
            hidegrid : false ,
            
            pager: "#tokenAppTablePager",
            loadonce: false,
            loadComplete : function(){
            	
            	var countRec = jQuery('#tokenAppTable').jqGrid('getGridParam', 'reccount');
            	if(countRec>0){
            	    $('#tokenGrid').find('div[name=dataFound]').show();
            	    $('#tokenGrid').find('div[name=dataNotFound]').hide();
            	}
            	else{
            	    $('#tokenGrid').find('div[name=dataFound]').hide();
            	    $('#tokenGrid').find('div[name=dataNotFound]').show();
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
		
		/* formatter for grid column action */
		function showEditable(cellvalue, options, rowObject) {
		    var editUrl = $("#editUrl").attr('href') + cellvalue;
		    var ret = '<a href="' + editUrl + '"><img src="/fur-web/res/img/icon/edit.png"  width="10" height="10"></a>';

		    return ret;
		}

		//hide header
//		$('tr.ui-jqgrid-labels').hide();
});

