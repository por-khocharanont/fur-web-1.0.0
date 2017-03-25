$.jgrid.defaults.width = 780;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';

function flownodeDisplay(nodeList){
	$('.flow-list').html(''); //clear display listflow
	$.each(nodeList,function(i,node){
		var nodeClone = $('.'+node).clone(); //Clone Button from display
		nodeClone.attr('id','btn'+node); //edit property id from clone
		nodeClone.find('span.glyphicon.glyphicon-plus').remove(); // remove glyphicon
		nodeClone.appendTo('.flow-list'); //set html to flow list
		btn = $('.'+node).find('button');
		btn.prop('disabled',true); //Disable btn
	});
}
$(document).ready(function () {
	
	var nodeList=[];
	
	$('.flow-node').click(function(){
		var nodeName = $(this).find('button').val(); //val from button
		nodeList.push(
				nodeName=nodeName
		);
		console.log(nodeName);
		flownodeDisplay(nodeList); //pass array to Function
		
	});
	
	
	$("#jqGrid").jqGrid({
//        postData : {
//        	flowname : function(){
//		        		var flowname = $("#flowname").val();
//		        		return flowname;
//        	},
//        	flowtype : function(){
//        				var flowtype = $("#flowtype").val();
//        				return flowtype;
//        	},
//        	usertype : function(){
//				var usertype = $("#usertype").val();
//				return usertype;
//	}
//        },
//        url: searchUrl,
//        mtype: "GET",
		styleUI : 'Bootstrap',
        datatype: "json",
        colNames : [ 'No','Node Name', 'Delete' ],
        colModel: [
            { name: 'no', index : 'no',  width: 50 , align : "center"},
            { name: 'nodename', index : 'nodename', width: 100 , align : "center"},
            { name: 'deletebtn', index : 'deletebtn',width: 50 , align: "center" }
        ],
        height : "100%",
		viewrecords: true,
        rowNum: 20,
        pager: "#jqGridPager",
        loadonce: false
    });
	
});
/**
 * 
 */