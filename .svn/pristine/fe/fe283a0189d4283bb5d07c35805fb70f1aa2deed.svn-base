/**
 * 
 */
$(document).ready(function() {
	

	$("#tableReportEligible").jqGrid({
	      postData : {
	    	orgCode : function(){
			        var orgCode = $("[name='orgCode']").val();
			        return orgCode;
	      	},
	      	orgDesc : function(){
	      			var orgDesc = $("[name='orgDesc']").val();
	      			return orgDesc;
	      	},
	      	type : function(){
					var type = $("[name='type'] option:selected").val();
					return type;
	      	},
	      	appName : function(){
		      		var appName = $("[name='appName']").val();
					return appName;
	      	}
	      },
	      url: $("#formReportEligible").attr('action'),
	      mtype: "GET",
			styleUI : 'Bootstrap',
	      datatype: "json",
	      colNames : ['eligibleId','Organization Code ','Organization Symbol ','Organization Name ','appId','Application ','appRoleId','Role Application'],
	      colModel: [
	          { name: 'eligibleId',index :'eligibleId', hidden: true , editable: true, editrules: {edithidden:true} ,sortable : false,resizable : false },
	          { name: 'orgCode', index : 'orgCode', width: 250 , align : "center" ,sortable : false,resizable : false},
	          { name: 'orgName',index :'orgName', hidden: true , key:true ,editable: true ,sortable : false,resizable : false},
	          { name: 'orgDesc', index : 'orgDesc', width: 304 , align : "center" ,sortable : false,resizable : false},
	          { name: 'appId', index : 'appId', width: 150 , align : "center" ,sortable : false,resizable : false, editrules: {edithidden:true}, hidden: true },
	          { name: 'appName', index : 'appName', width: 250 , align : "center",sortable : false,resizable : false},
	          { name: 'appRoleId', index : 'appRoleId', width: 180 , align : "center",sortable : false,resizable : false, editrules: {edithidden:true}, hidden: true },
	          { name: 'appRoleName', index : 'appRoleName', width: 250 , align : "center",sortable : false,resizable : false}
	      ],
		  gridComplete:function(data){
			  
	      },loadComplete:function(data){
	    	  if(data.records>0){
				  $("div.tableReportEligible").show();
				  $("button.empty").show();
				  $("div.empty").hide();
			  }else{
				  $("div.tableReportEligible").hide();
				  $("button.empty").hide();
				  $("div.empty").show();
			  }
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
	      pager: "#tableReportEligiblePager",
	      loadonce: false
	  });
	 $("#formReportEligible").submit(function(event) {
		  	event.stopPropagation();
		    event.preventDefault();
		    $("#tableReportEligible").jqGrid("clearGridData", true).trigger("reloadGrid");
	        $("#tableReportEligible").trigger("reloadGrid");
	  });

	  $("#export").click(function() {
		  var params = {};
		  params['orgCode'] = $.trim($("[name='orgCode']").val());
		  params['orgDesc']=$.trim($("[name='orgDesc']").val());
		  params['type']= $("[name='type'] option:selected").val();
		  params['appName']=$.trim($("[name='appName']").val());
		  var jsonData = JSON.stringify(params);
		  $('input[name=jsonData]').val(jsonData);
	      $('#exportReportData').submit();
	  });
});