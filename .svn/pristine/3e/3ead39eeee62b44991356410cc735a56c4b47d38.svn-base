/**
 * 
 */
$(document).ready(function() {
	var userRequestUrl =  $("[name='jsonData']").attr('action');
	var urDetailUrl = userRequestUrl + "ur/detail";
	var requestNoDetailUrl = userRequestUrl + "requestno/detail";
	$( "#dteStart" ).datepicker({
		 changeMonth: true,
		 numberOfMonths: 3,
		 dateFormat: 'dd/mm/yy',
		 onClose: function( selectedDate ) {
			 $( "#dteTo" ).datepicker( "option", "minDate", selectedDate );
			 var date = $.datepicker.parseDate("dd/mm/yy", selectedDate);
			 date.setMonth(date.getMonth()+1);
			 maxDate = $.datepicker.formatDate('dd/mm/yy', date);
			 $( "#dteTo" ).val("");
			 $( "#dteTo" ).datepicker( "option", "maxDate", maxDate);
			 
		 }
	});
	 $( "#dteTo" ).datepicker({
			 changeMonth: true,
			 numberOfMonths: 3,
//			 maxDate: 0,
			 dateFormat: 'dd/mm/yy',
			 onClose: function( selectedDate ) {
				 $( "#dteStart" ).datepicker( "option", "maxDate", selectedDate );
		 }
	});
	 
	 $( "input[name='startDateUFU']" ).datepicker({
		 changeMonth: true,
		 numberOfMonths: 3,
		 dateFormat: 'dd/mm/yy',
		 onClose: function( selectedDate ) {
			 $( "input[name='endDateUFU']").datepicker( "option", "minDate", selectedDate );
		 }
	});
	 $( "input[name='endDateUFU']" ).datepicker({
			 changeMonth: true,
			 numberOfMonths: 3,
			 dateFormat: 'dd/mm/yy',
			 onClose: function( selectedDate ) {
				 $( "input[name='startDateUFU']" ).datepicker( "option", "maxDate", selectedDate );
		 }
	});
	 $("[name='period']").change(function() {
			if($(this).val()==2){
				$('.userDatepicker').show();
			}else{
				$('.userDatepicker').hide();
			}
		});
	 $("#tableReportUr").jqGrid({
	      postData : {
	    	  // requestNo
	    	requestNo : function(){ 
			        var requestNo = $.trim($("[name='requestNo']").val());
			        return requestNo;
	      	},
	      		//UR
	      	urNo : function(){
	      			var urNo = $.trim($("[name='urNo']").val());
	      			return urNo;
	      	},
	      	 // requestNo
	      	startDate : function(){
					var startDate = $("[name='startDate']").val();
					return startDate;
	      	},
	      	 // requestNo
	      	endDate : function(){
		      		var endDate = $("[name='endDate']").val();
					return endDate;
	      	},
	      	//Req No
	      	requestUrBy : function(){
	      		var requestUrBy = $.trim($("[name='requestUrBy']").val());
				return requestUrBy;
	      	},
	      	// UR
	      	requestType : function(){
	      		var requestType = $("[name='requestType'] option:selected").val();
				return requestType;
	      	},
	      	// UR
	      	urStatus : function(){
	      		var urStatus = $("[name='urStatus']").val();
				return urStatus;
	      	},
	      	// UR_STEP
	      	urNode : function(){
	      		var urNode = $("[name='urNode'] option:selected").val();
	      		return urNode;
	      	}, 
	      	//UR
	      	urFlow : function(){
	      		var urFlow = $("[name='urFlow'] option:selected").val();
	      		return urFlow;
	      	},
	      	//UR FOR USER
	      	userList : function(){
	      		var userList = $.trim($("[name='userList']").val());
				return userList;
	      	},
	      	//App
	      	appName : function(){
	      		var appName = $.trim($("[name='appName']").val());
				return appName;
	      	},
	      	//App
	      	type : function(){
	      		var type = $("[name='type'] option:selected").val();
	      		return type;
	      	},
	      	//ufu , usr , org
	      	userType : function(){
	      		var userType = $("[name='userType'] option:selected").val();
	      		return userType;
	      	},
	      	//user app role
	      	authorUser : function(){
	      		var authorUser = $("[name='authorUser'] option:selected").val();
	      		return authorUser;
	      	},
	      //period type , period time , for user app role
	      	period : function(){
	      		var period = $("[name='period']:checked").val();
	      		return period;
	      	},
	      	startDateUFU : function(){
	      		var startDateUFU = $("[name='startDateUFU']").val();
	      		return startDateUFU;
	      	},
	      	endDateUFU : function(){
	      		var endDateUFU = $("[name='endDateUFU']").val();
	      		return endDateUFU;
	      	}
	      },
	      url: $("#formReportUr").attr('action'),
	      mtype: "GET",
		  styleUI : 'Bootstrap',
	      datatype: "json",
	      colNames : ['Request No','UR No','Request Date','Request By'],
	      colModel: [
	          { name: 'urrqNo', index : 'urrqNo', width: 275 , align : "center",sortable : false,resizable : true,editable: false
	        	   ,formatter: function (cellvalue, options, rowObject) {
	        		    return "<a href="+requestNoDetailUrl+"/"+rowObject.urrqNo+"><font color='green'><u>"+rowObject.urrqNo+"</u></font></a>";
	        	   }
	          },
	          { name: 'urNo', index : 'urNo', width: 280 ,key:true ,editable: false, align : "center" ,sortable : false,resizable : false
	        	  ,formatter: function (cellvalue, options, rowObject) {
	        		    return "<a href="+urDetailUrl+"/"+rowObject.urNo+"><font color='green'><u>"+rowObject.urNo+"</u></font></a>";
	        	   }
	          },
	          { name: 'requestDate', index : 'requestDate', width: 250 , align : "center",sortable : false,resizable : false,editable: false
	        	  ,formatter: "date"
	        	  ,formatoptions: {srcformat: 'U/1000', newformat:'d/m/Y H:i:s'}
	          },
	          { name: 'requestBy', index : 'requestBy', width: 250 , align : "center",sortable : false,resizable : false,editable: false}
	      ],
		  gridComplete:function(data){
			  
	      },loadComplete:function(data){
	    	  if(data.records>0){
				  $("div.tableReportUr").show();
				  $("button.empty").show();
				  $("div.empty").hide();
			  }else{
				  $("div.tableReportUr").hide();
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
	      pager: "#tableReportUrPager",
	      loadonce: false
	  });
	  $("#formReportUr").submit(function(event) {
		  	event.stopPropagation();
		    event.preventDefault();
		    $("#tableReportUr").jqGrid("clearGridData", true).trigger("reloadGrid");
	        $("#tableReportUr").trigger("reloadGrid");
	  }); 
	  
	  $("#export").click(function() {
		  var params = {};
		  params['requestNo'] = $.trim($("[name='requestNo']").val());
		  params['urNo']=$.trim($("[name='urNo']").val());
		  params['startDate']= $("[name='startDate']").val();
		  params['endDate']=$("[name='endDate']").val();
		  params['requestUrBy']=$.trim($("[name='requestUrBy']").val());
		  params['requestType']=$("[name='requestType'] option:selected").val();
		  params['urStatus']=$("[name='urStatus']").val();
		  params['urNode']=$("[name='urNode'] option:selected").val();
		  params['urFlow']=$("[name='urFlow'] option:selected").val();
		  params['userList']=$.trim($("[name='userList']").val());
		  params['type']=$("[name='type'] option:selected").val();
		  params['appName']=$.trim($("[name='appName']").val());
		  params['userType']=$("[name='userType'] option:selected").val();
		  params['authorUser']=$("[name='authorUser'] option:selected").val();
		  params['period']=$("[name='period']:checked").val();
		  params['startDateUFU']=$("[name='startDateUFU']").val();
		  params['endDateUFU']=$("[name='endDateUFU']").val();
		  var jsonData = JSON.stringify(params);
		  $('input[name=jsonData]').val(jsonData);
	      $('#exportReportData').submit();
	  });
	  if(flows!=null&flows!=''){
		  var txOption = '';
		  $.each(flows,function(key,val){
				txOption += '<option value="'+val["flowId"]+'">'+val["flowName"]+'</option>';							
		 }); 
		  var htmlFlowCombobox = "<option value='' selected>All</option>";
		  htmlFlowCombobox=htmlFlowCombobox+txOption;
		  $("[name='urFlow']").html(htmlFlowCombobox);
	  }
});