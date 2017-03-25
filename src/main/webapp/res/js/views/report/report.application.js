/**
 * 
 */

$(document).ready(function() {
	var userRequestUrl =  $("[name='urlWatchlist']").attr('action');
	var requestNoDetailUrl = userRequestUrl + "ur/detail";
	  $( "#dteStart" ).datepicker({
			 changeMonth: true,
			 numberOfMonths: 3,
			 dateFormat: 'dd/mm/yy',
			 onClose: function( selectedDate ) {
				 $( "#dteTo" ).datepicker( "option", "minDate", selectedDate );
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
	  $("input[name='period']").change(function() {
			if($(this).val()==2){
				$('.userDatepicker').show();
			}else{
				$('.userDatepicker').hide();
			}
		});
	  $("#tableReportApplication").jqGrid({
	      postData : {
	      	username : function(){
			        var username = $.trim($("[name='username']").val());
			        return username;
	      	},
	      	appName : function(){
	      			var appName = $.trim($("[name='appName']").val());
	      			return appName;
	      	},
	      	type : function(){
					var type = $("[name='type'] option:selected").val();
					return type;
	      	},
	      	authenticationType : function(){
		      		var type = $("[name='authenticationType'] option:selected").val();
					return type;
	      	},
	      	periodType : function(){
	      		var periodType = $("[name='period']:checked").val();
				return periodType;
	      	},
	      	startDate : function(){
	      		var startDate = $("[name='startDate']").val();
				return startDate;
	      	},
	      	endDate : function(){
	      		var endDate = $("[name='endDate']").val();
				return endDate;
	      	},
	      	status : function(){
	      		var status = $("[name='status'] option:selected").val();
	      		return status;
	      	}
	      },
	      url: $("#formReportApp").attr('action'),
	      mtype: "GET",
			styleUI : 'Bootstrap',
	      datatype: "json",
	      colNames : ['appId','Application','appRoleId','Role Application','Type','Period','Username','UR No'],
	      colModel: [
	          { name: 'appId',index :'appId', hidden: true , editable: true, editrules: {edithidden:true} ,sortable : false,resizable : false },
	          { name: 'application', index : 'application', width: 250 , align : "center" ,sortable : false,resizable : false},
	          { name: 'appRoleId',index :'appRoleId', hidden: true , key:true ,editable: true, editrules: {edithidden:true} ,sortable : false,resizable : false},
	          { name: 'applicationRole', index : 'applicationRole', width: 200 , align : "center" ,sortable : false,resizable : false},
	          { name: 'type', index : 'type', align : "center", width: 100 ,sortable : false,resizable : false},
//	          { name: 'status', index : 'status', width: 124 , align : "center",sortable : false,resizable : false},
	          { name: 'period', index : 'period', width: 184 , align : "center",sortable : false,formatter:periodFormatter,resizable : false },
	          { name: 'username', index : 'username', align : "center",sortable : false,resizable : false},
	          { name: 'urId', index : 'urId', align : "center",sortable : false,resizable : false
	        	  ,formatter: function (cellvalue, options, rowObject) {
		  		    return "<a href="+requestNoDetailUrl+"/"+rowObject.urId+"><font color='green'><u>"+rowObject.urId+"</u></font></a>";
		        	  }
	          }
	      ],
		  gridComplete:function(data){
			  
	      },loadComplete:function(data){
	    	  if(data.records>0){
				  $("div.tableReportApplication").show();
				  $("button.empty").show();
				  $("div.empty").hide();
			  }else{
				  $("div.tableReportApplication").hide();
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
		  shrinkToFit : true,
		  caption : "Results",
	      pager: "#tableReportApplicationPager",
	      loadonce: false
	  });
	  $("#formReportApp").submit(function(event) {
		  	event.stopPropagation();
		    event.preventDefault();
		    $("#tableReportApplication").jqGrid("clearGridData", true).trigger("reloadGrid");
	        $("#tableReportApplication").trigger("reloadGrid");
	  });

	  $("#export").click(function() {
		  var params = {};
		  params['username'] = $.trim($("[name='username']").val());
		  params['appName']=$.trim($("[name='appName']").val());
		  params['type']= $("[name='type'] option:selected").val();
		  params['authenticationType']=$("[name='authenticationType'] option:selected").val();
		  params['status']=$("[name='status'] option:selected").val();
		  params['periodType']=$("[name='period']:checked").val();
		  params['startDate']=$("[name='startDate']").val();
		  params['endDate']=$("[name='endDate']").val();
		  var jsonData = JSON.stringify(params);
		  $('input[name=jsonData]').val(jsonData);
	      $('#exportReportData').submit();
	  });
	  function periodFormatter(cellvalue, options, rowObject) {
			var str = rowObject.period;
			if(rowObject.starttime!=null&&rowObject.starttime!=''){
				str = str+"<BR>Start Time: "+rowObject.starttime+" To "+rowObject.endtime; 
			}
		    return str; 
		}
});