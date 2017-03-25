$.jgrid.defaults.width = 780;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';

$(document).ready(function () {
	var searchUrl = $('#searchForm').attr('action');
	$('#searchBtn').click(function() {
		$("#jqGrid").jqGrid("clearGridData", true).trigger("reloadGrid");
        $("#jqGrid").trigger("reloadGrid");
	});
	$("#jqGrid").jqGrid({
        postData : {
        	flowname : function(){
		        		var flowname = $("#flowname").val();
		        		return flowname;
        	},
        	flowtype : function(){
        				var flowtype = $("#flowtype").val();
        				return flowtype;
        	},
        	usertype : function(){
				var usertype = $("#usertype").val();
				return usertype;
	}
        },
        url: searchUrl,
        mtype: "GET",
		styleUI : 'Bootstrap',
        datatype: "json",
        colNames : [ 'No','Flow Name ', ' Flow Type', 'User Type', 'Delete' ],
        colModel: [
            { name: 'no', index : 'no',  width: 50 , align : "center"},
            { name: 'flowname', index : 'flowname', width: 100 , align : "center"},
            { name: 'flowtype', index : 'flowtype', width: 75 , align : "center" ,},
            { name: 'usertype', index : 'usertype',width: 75 , align: "center" },
            { name: 'deletebtn', index : 'deletebtn',width: 50 , align: "center" }
        ],
        height : "100%",
		viewrecords: true,
        rowNum: 20,
        pager: "#jqGridPager",
        loadonce: false
    });
	

});
