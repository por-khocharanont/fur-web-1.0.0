var typeChange;
$(document).ready(function() {

var userRequestUrl =  $("[name='urlWatchlist']").attr('action');
var requestNoDetailUrl = userRequestUrl + "ur/detail";
function periodFormatter(cellvalue, options, rowObject) {
	var str = rowObject.periodType;
	if(rowObject.startTime!=null&&rowObject.startTime!=''){
		str = str+"<BR>Start "+rowObject.startTime+" To "+rowObject.endTime; 
	}
    return str; 
}
function changeAppFormatter(cellvalue, options, rowObject) {
	var str;
	if(typeChange!=null&&typeChange!=''&&typeChange[0]=='CH1R1'){
			str = "<div style='margin-left:5px' class='text-left'>";
			str = str+"<strong>New</strong> : "+rowObject.appRoleName+"<BR>";
			str = str+"<strong>Current</strong> : "+rowObject.rolePastName+"<BR>";
			str = str+"</div>";
	}else{
		str = "<div style='margin-left:5px' class='text-left'>";
		str = str+"<strong>Current</strong> : "+rowObject.rolePastName+"<BR>";
		str = str+"</div>";
	}
    return str; 
}

$("#appjqGrid").jqGrid({
		styleUI : 'Bootstrap',
      datatype: "local",
      colNames : ['UR No','appId','appRoleId','Request Type','Application','Role Application','Period'],
      colModel: [
          { name: 'urId', index : 'urId', width: 200 , align : "center",key:true,sortable : false,resizable : false,
        	  formatter: function (cellvalue, options, rowObject) {
  		    return "<a href="+requestNoDetailUrl+"/"+rowObject.urId+"><font color='green'><u>"+rowObject.urId+"</u></font></a>";
        	  }
          },
          { name: 'appId', index : 'appId',hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'appRoleId', index : 'appRoleId',hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
          { name: 'requestUser', index : 'requestUser', width: 133 , align : "center",sortable : false,resizable : false},
          { name: 'appName', index : 'appName', width: 200 , align : "center",sortable : false,resizable : false},
          { name: 'appRoleName', index : 'appRoleName', width: 200 , align : "center",sortable : false,resizable : false},
          { name: 'periodType', index : 'periodType', width: 200 , align : "center",formatter: periodFormatter,sortable : false,resizable : false}
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
      width: $("#appjqGrid").parent().width(),
      rownumbers: true,
      height : "100%",
	  viewrecords: true,
      rowNum: 20,
//      pager: "#appjqGridPager",
      loadonce: false,
      sortname : 'urId',
      sortorder : "ASC"
  });
$("#appTerminateGrid").jqGrid({
	styleUI : 'Bootstrap',
  datatype: "local",
  colNames : ['UR No','appId','appRoleId','Request Type','Application','Role Application'],
  colModel: [
      { name: 'urId', index : 'urId', width: 200 , align : "center",key:true,sortable : false,resizable : false,
    	  formatter: function (cellvalue, options, rowObject) {
		    return "<a href="+requestNoDetailUrl+"/"+rowObject.urId+"><font color='green'><u>"+rowObject.urId+"</u></font></a>";
    	  }
      },
      { name: 'appId', index : 'appId',hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
      { name: 'appRoleId', index : 'appRoleId',hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
      { name: 'requestUser', index : 'requestUser', width: 133 , align : "center",sortable : false,resizable : false},
      { name: 'appName', index : 'appName', width: 200 , align : "center",sortable : false,resizable : false},
      { name: 'appRoleName', index : 'appRoleName', width: 200 , align : "center",sortable : false,resizable : false}
//      { name: 'periodType', index : 'periodType', width: 200 , align : "center",formatter: periodFormatter,sortable : false,resizable : false}
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
  width: $("#appjqGrid").parent().width(),
  rownumbers: true,
  height : "100%",
  viewrecords: true,
  rowNum: 20,
//  pager: "#appjqGridPager",
  loadonce: false,
  sortname : 'urId',
  sortorder : "ASC"
});
$("#appChangejqGrid").jqGrid({
	styleUI : 'Bootstrap',
  datatype: "local",
  colNames : ['UR No','appId','appRoleId','Request Type','Application','Role Application','Role Past','Period'
//              ,'Userlist'
              ],
  colModel: [
      { name: 'urId', index : 'urId', width: 200 , align : "center",key:true,sortable : false,resizable : false,
    	  formatter: function (cellvalue, options, rowObject) {
		    return "<a href="+requestNoDetailUrl+"/"+rowObject.urId+"><font color='green'><u>"+rowObject.urId+"</u></font></a>";
    	  }
      },
      { name: 'appId', index : 'appId',hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
      { name: 'appRoleId', index : 'appRoleId',hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
      { name: 'requestUser', index : 'requestUser', width: 133 , align : "center",sortable : false,resizable : false},
      { name: 'appName', index : 'appName', width: 200 , align : "center",sortable : false,resizable : false},
      { name: 'appRoleName', index : 'appRoleName', width: 200 , align : "center",formatter: changeAppFormatter,sortable : false,resizable : false},
      { name: 'rolePastName', index : 'rolePastName',hidden: true , editable: true, editrules: {edithidden:true},sortable : false,resizable : false},
      { name: 'periodType', index : 'periodType', width: 200 , align : "center",formatter: periodFormatter,sortable : false,resizable : false}
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
  width: $("#appjqGrid").parent().width(),
  rownumbers: true,
  height : "100%",
  viewrecords: true,
  rowNum: 20,
//  pager: "#appChangeGridPager",
  loadonce: false,
  sortname : 'urId',
  sortorder : "ASC"
});

	if(datasResult!=null&&datasResult!=''){
		if(datasResult[0].requestTypeValue=='3'){
			if(datasResult[0].changeType!=null&&datasResult[0].changeType!=''){
				typeChange = JSON.parse(datasResult[0].changeType);
				//Change Role
				typeChange[0];
				//Change Period
				typeChange[1];
			}
			$(".appChangejqGrid").show();
			$(".appjqGrid").hide();
			$(".appTerminateGrid").hide();
			$("#appChangejqGrid")[0].addJSONData(datasResult);
			if(datasResult[0].requestRemark!=null&&datasResult[0].requestRemark!=''){
				$("textarea[name='urremark']").text(datasResult[0].requestRemark);
				$("[name='urremark']").show();
			}
		}else if(datasResult[0].requestTypeValue=='1'){
			$("#appjqGrid")[0].addJSONData(datasResult);
			if(datasResult[0].requestRemark!=null&&datasResult[0].requestRemark!=''){
				$("textarea[name='urremark']").text(datasResult[0].requestRemark);
				$("[name='urremark']").show();
			}
		}else if(datasResult[0].requestTypeValue=='2'){
			$(".appChangejqGrid").hide();
			$(".appjqGrid").hide();
			$(".appTerminateGrid").show();
			$("#appTerminateGrid")[0].addJSONData(datasResult);
			if(datasResult[0].requestRemark!=null&&datasResult[0].requestRemark!=''){
				$("textarea[name='urremark']").text(datasResult[0].requestRemark);
				$("[name='urremark']").show();
			}
		}
		
	}
});

