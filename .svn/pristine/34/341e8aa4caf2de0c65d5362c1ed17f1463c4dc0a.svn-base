$(document).ready(function () {
	
	
	
	var $form = $("#searchForm");
	$("#eligibleDeleteBtn").hide();
	
	/** autocomplete appName fix status = active */
//	$('.auto-appName').autocomplete({
//		  select: function( event, ui ) {
//			  $('#appId').val(ui.item.appId);
//			  $('#appName').val(ui.item.appName);
//		  }
//	});
	

    /** autocomplete orgCode */
//    $('.auto-orgCode').autocomplete({
//            select : function(event, ui) {
//                $("#orgCode").val(ui.item.label);
//            }
//    });
    
    /** autocomplete orgDesc */
//    $('.auto-orgDesc').autocomplete({
//            select : function(event, ui) {
//                $("#orgDesc").val(ui.item.label);
//            }
//    });
    
    
    /** autocomplete orgName */
//    $('.auto-orgName').autocomplete({
//	        select : function(event, ui) {
//	            $("#orgName").val(ui.item.label);
//	        }
//	});
    
	$('button[type=reset]').click(function() {
		$('#searchForm')[0].reset();
        $("#searchBtn").trigger("click");
    });
    
	// Delete Grid
	$("#eligibleDeleteBtn").click(function() {
		
		var deleteIdList = jQuery("#jqgridTable").jqGrid('getGridParam', 'selarrrow');
		
		if (deleteIdList.length == 0) {
			
			$("#dialog-not-select-row").dialog("open");
			
		}
		else{
			
			$("#dialog-delete-confirm").dialog("open");
		}
		
		
		
		
	});
	
	 $("#dialog-not-select-row").dialog({
         autoOpen: false, 
         modal: true,
         buttons: {
            Close: function() {$(this).dialog("close");}
         },
      });
	 
	 $("#dialog-delete-success").dialog({
         autoOpen: false, 
         modal: true,
         buttons: {
            Close: function() {
            	
            	searchgrid();
            	
            	$(this).dialog("close");}
         },
      });
	 
	 
	 $("#dialog-delete-error").dialog({
         autoOpen: false, 
         modal: true,
         buttons: {
            Close: function() {$(this).dialog("close");}
         },
      });
	 
	 
	 $("#dialog-delete-confirm").dialog({
         autoOpen: false, 
         modal: true,
         buttons : [{
        	 text : "Confirm",
        	 click : function(){
	    		 	var actionDelEligible = $("#eligibleDeleteBtn").attr("action");
	                var deleteIdList = jQuery("#jqgridTable").jqGrid('getGridParam', 'selarrrow');
	                
	                var jsonData = JSON.stringify(deleteIdList);
	                $.ajax({
	                        url : actionDelEligible,
	                        type : 'DELETE',
	                        data : jsonData,
	                        success : function(data) {
	                           
	                           $("#dialog-delete-confirm").dialog("close");
	                           
	                           $("#dialog-delete-success").dialog("open");
	                           
	                           
	                        },
	                        error : function(jqXHR, textStatus, errorThrown) {
	                        	$("#dialog-delete-confirm").dialog("close");
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
	 
	
	
	//Search Grid
	 $("#searchBtn").click(function(e) {
    	 e.preventDefault();
    	
    	 searchgrid();
    });
	 
	function searchgrid(){
		
		 var actionUrl = $("#searchForm").attr('action');
		 $("#jqgridTable").jqGrid("clearGridData", true).trigger("reloadGrid");
		 reloadSearchAction($("#jqgridTable"));
	
		 var tbWidth = $('.data-table').width();
		 $("#jqgridTable").jqGrid({
				 url : actionUrl,
				 datatype : "json",
				 postData : {
					 orgCode : function() {
						 var orgCode = $("#orgCode").val();
						 return orgCode;
						 
					 },
					 orgDesc : function() {
						 var orgDesc = $("#orgDesc").val();
						 return orgDesc;
						 
					 },
					 appName : function() {
						 var appName = $("#appName").val();
						 return appName;
						 
					 }
						 
				 },
			 
				 colNames : [ 'No', 'Organization Code', 'Organization Symbol', 'Organization Name' , 'Application', 'Role Application'],
				 colModel : [ {
								name : 'eligibleId',
								index : 'eligibleId',
								sortable : false,
								hidden : true,
								key : true
						}, {
								name : 'orgcode',
								index : 'ORGCODE',
								width : 170,
								sortable : true,
								align : "center",
								resizable : false
						}, {
								name : 'orgname',
								index : 'ORGNAME',
								sortable : true,
								align : "center",
								resizable : false,
								width : 160
						}, {
								name : 'orgdesc',
								index : 'ORGDESC',
								sortable : true,
								resizable : false,
								width : 280
						}, {
								name : 'appName',
								index : 'APP_NAME',
								sortable : true,
								resizable : false,
								width : 260
						}, {
								name : 'appRoleName',
								index : 'APP_ROLE_NAME',
								sortable : true,
								resizable : false,
								width : 190
						}],
				rowNum : appConf.jqgrid.rowNum,
				pager : '#jqgridPager',
				sortname : 'ORGCODE',
				viewrecords : true,
				sortorder : "ASC",
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
					   if (isNaN(recs) || recs == 0) {
						$("#jqgrideligible").hide();
						   $(".empty").show();
						   $("#eligibleDeleteBtn").hide();
					   }else{
						$("#jqgrideligible").show();
						   $(".empty").hide();
						   $("#eligibleDeleteBtn").show();
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