$.jgrid.defaults.width = 780;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
		
$(document).ready(function () {
	
		var searchUrl = $('#searchApplicationForm').attr('action');
		
		/** autocomplete appName fix status = active */
		$('.auto-appName').autocomplete({
			  select: function( event, ui ) {
				  $('#appName').val(ui.item.appName);
			  }
		});
		
		
		$('button[type=reset]').click(function() {
			$('#searchApplicationForm')[0].reset();
	        $("#searchBtn").trigger("click");
	    });
		
	    $('#searchBtn').click(function() {
	        $("#jqGrid").jqGrid("clearGridData", true).trigger("reloadGrid");
	        $("#jqGrid").trigger("reloadGrid");
	    });
	
	    var tbWidth = $('.tableGrid').width();
	    var colNum = 3;
	    var colWidth = tbWidth/colNum;
	    
	    $('#applicationTableGrid').find('div[name=dataFound]').hide();
	    $('#applicationTableGrid').find('div[name=dataNotFound]').hide();
	    
		$("#jqGrid").jqGrid({
            postData : {
	        	appName : function(){
			        return $("input[name=appName]").val();
	        	},
	        	status : function(){
	        		return $("input[name=status]:checked").val();
	        	},
	        	roleName : function(){
	        		return $("input[name=roleName]").val();
	        	},
	        	authenticationType : function(){
	        		return $("select[name=authenticationType]").val();
	        	},
	        	appOwnerName : function(){
	        		return $("input[name=appOwnerName]").val();
	        	},
	        	custodianName : function(){
	        		return $("input[name=custodianName]").val();
	        	},
	        	applicationType : function(){
	        		return $("select[name=applicationType]").val();
	        	}
	        },
            url: searchUrl,
            mtype: "GET",
			styleUI : 'Bootstrap',
            datatype: "json",
            colNames : [ 'Application', 'Status', 'Edit' ],
            colModel: [
                { name: 'appName', index : 'appName',  width: colWidth+400 },
                { name: 'statusText', index : 'statusText', width: colWidth-200 , sortable : false, align : "center" },
                { name: 'appId', width: colWidth-225 , align: "center" , sortable : false,formatter : showEditable },
            ],
            height : "100%",
			viewrecords: true,
            rowNum: 20,
            width : "100%",
            caption : "Results",
            hidegrid : false ,
            rownumbers: true,
            pager: "#jqGridPager",
            loadonce: false,
            loadComplete : function(){
            	
            	var countRec = jQuery('#jqGrid').jqGrid('getGridParam', 'reccount');
            	if(countRec>0){
            	    $('#applicationTableGrid').find('div[name=dataFound]').show();
            	    $('#applicationTableGrid').find('div[name=dataNotFound]').hide();
            	}
            	else{
            	    $('#applicationTableGrid').find('div[name=dataFound]').hide();
            	    $('#applicationTableGrid').find('div[name=dataNotFound]').show();
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

});

