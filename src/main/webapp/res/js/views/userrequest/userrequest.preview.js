$(document).ready(function() {
	
$("#appjqGrid").jqGrid({
//      postData : {
//      	flowname : function(){
//		        		var flowname = $("#flowname").val();
//		        		return flowname;
//      	},
//      	flowtype : function(){
//      				var flowtype = $("#flowtype").val();
//      				return flowtype;
//      	},
//      	usertype : function(){
//				var usertype = $("#usertype").val();
//				return usertype;
//	}
//      },
//      url: searchUrl,
//      mtype: "GET",
		styleUI : 'Bootstrap',
      datatype: "json",
      colNames : ['appId','Application','appRoleId','Role Application','Upload file','Status','Remark'],
      colModel: [
          { name: 'appId',index :'appId', hidden: true , editable: true, editrules: {edithidden:true}},
          { name: 'application', index : 'application', width: 200 , align : "center"},
          { name: 'appRoleId',index :'appRoleId', hidden: true , editable: true, editrules: {edithidden:true}},
          { name: 'roleapplication', index : 'roleapplication', width: 150 , align : "center"},
          { name: 'temfile', index : 'temfile', width: 100 , align : "center",formatter: linktempleteFormatter},
//          { name: 'upload', index : 'upload', width: 180 , align : "center", edittype: 'file',editoptions: {enctype: "multipart/form-data"},formatter:uploadFileFormatter},
          { name: 'status', index : 'status', width: 80 , align : "center"},
          { name: 'remark', index : 'remark', width: 150 , align : "center"},
      ],
	  gridComplete : function(data) {
//		  InitValiduploadBtn();
    	},loadComplete : function(data) {
//			alert('Hello loadComplete');
        },
      width: "100%",
      rownumbers: true,
      height : "100%",
	  viewrecords: true,
      rowNum: 20,
      pager: "#appjqGridPager",
      loadonce: false,
      sortname : 'appId',
      sortorder : "ASC"
  });
  $("#userjqGrid").jqGrid({
//    postData : {
//    	appId : function(){
//		        		var appId = $("button[name='btnSerachAppStd']").val();
//		        		return appId;
//    	}
//    },
//    url: $searchBtnStd,
//    mtype: "GET",
	styleUI : 'Bootstrap',
    datatype: "json",
    colNames : [ 'Username','Name' ],
    colModel: [
        { name: 'username', index : 'username', width: 200 , align : "center"},
        { name: 'name', index : 'name', width: 150 , align : "center"}
       
    ],
    width: '750',
    height : "100%",
	viewrecords: true,
	rownumbers: true,
    rowNum: 20,
    pager: "#userjqGridPager",
    loadonce: false,
	sortname : 'username',
	sortorder : "ASC"
  });
  $("#errorUserjqGrid").jqGrid({
//    postData : {
//    	flowname : function(){
//		        		var flowname = $("#flowname").val();
//		        		return flowname;
//    	},
//    	flowtype : function(){
//    				var flowtype = $("#flowtype").val();
//    				return flowtype;
//    	},
//    	usertype : function(){
//				var usertype = $("#usertype").val();
//				return usertype;
//	}
//    },
//    url: searchUrl,
//    mtype: "GET",
		styleUI : 'Bootstrap',
    datatype: "json",
    colNames : [ 'Username','Manager Approve' ],
    colModel: [
        { name: 'username', index : 'username', width: 200 , align : "center"},
        { name: 'mgapprove', index : 'mgapprove', width: 150 , align : "center"},
    ],
    width: '750',
    height : "100%",
	  viewrecords: true,
    rowNum: 20,
    pager: "#errorUserGridPager",
    loadonce: false,
	sortname : 'username',
	sortorder : "ASC"
  });
  function linktempleteFormatter(cellvalue, options, rowObject) {
		var taglink="";
		$.each(cellvalue,function(key,value){
			taglink = taglink+"<span>"+value+"</span><BR>";
		});
			return taglink;
  }
//  function setTextQueueAndAlready(strSubJ,appnameold,appRoleNameOld,listuser) {
//		var urremark = $("textarea[name='urremark']").val()+'-----------------------------------------\n';
//		var strText = urremark+strSubJ+'\n';
//		strText = strText+'Application : '+appnameold+'\n' ;
//		strText = strText+'App Role : '+appRoleNameOld+'\n' ;
//		strText = strText+'Username : ';
//		$.each(listuser,function(row,ele){
//			strText=strText+ele+' ,';
//		});
//		strText = strText+'\n ';
//		$("textarea[name='urremark']").val(strText);
//  }	  
		  if(flagenable!='0'){
			  $( "button[name='submitAppJqgrid']").attr('disabled',true);
			  $("span[name='alertErrorUser']").text('Error all user');
		  }else{
			  $( "button[name='submitAppJqgrid']").attr('disabled',false);
		  }
		  if(errorqueued!=null&&errorqueued!=''){
			  $("textarea[name='urremark']").val(errorqueued);
			  $("div.row[name='divremark']").show();
			}
		  if(alreadyApp!=null&&alreadyApp!=''){
			  $("textarea[name='urremark']").val($("textarea[name='urremark']").val()+alreadyApp);
			  $("div.row[name='divremark']").show();
			}
		  if(listapp!=null&&listapp!=''){
				  $("#appjqGrid")[0].addJSONData(listapp);
			}
		  if(listuser!=null&&listuser!=''){
				  $("#userjqGrid")[0].addJSONData(listuser);
			}
			
		  if(periodValue.periodtype=='1'){
			  	  $("span[name='period']").text(period);
		  }else if(periodValue.periodtype=='2'){
			  	$("span[name='period']").text(period);
			  	$("span[name='dteStart']").text(periodValue.dteStart);
			  	$("span[name='dteTo']").text(periodValue.dteTo);
		  }	
		  
//		  if(remarkuser.oplsQueueduser!=null&&remarkuser.oplsQueueduser!=''){
//			  var strSubJ = "Error user request is queued ";
//			  var appnameold=remarkuser.oplsQueueduser[0].appname;
//			  var appRoleNameOld=remarkuser.oplsQueueduser[0].appRoleName;
//			  var listusererror = [];
//			  $.each(remarkuser.oplsQueueduser,function(row,ele){
//				  if((ele.appname==appnameold)&&(ele.appRoleName==appRoleNameOld))
//				  {
//					  listusererror.push(ele.username);
//				  }else{
//					  setTextQueueAndAlready(strSubJ,appnameold,appRoleNameOld,listusererror);
//					  appnameold=ele.appname;
//					  appRoleNameOld=ele.appRoleName;
//					  listusererror=[];
//					  listusererror.push(ele.username);
//				  }
//			  });
//			  setTextQueueAndAlready(strSubJ,appnameold,appRoleNameOld,listusererror);
//		  }	
//		  if(remarkuser.oplsalreadyAppapp!=null&&remarkuser.oplsalreadyAppapp!=''){
//			  var strSubJ = "Error already application and role application ";
//			  var appnameold=remarkuser.oplsalreadyAppapp[0].appname;
//			  var appRoleNameOld=remarkuser.oplsalreadyAppapp[0].appRoleName;
//			  var listusererror = [];
//			  $.each(remarkuser.oplsalreadyAppapp,function(row,ele){
//				  if((ele.appname==appnameold)&&(ele.appRoleName==appRoleNameOld))
//				  {
//					  listusererror.push(ele.username);
//				  }else{
//					  setTextQueueAndAlready(strSubJ,appnameold,appRoleNameOld,listusererror);
//					  appnameold=ele.appname;
//					  appRoleNameOld=ele.appRoleName;
//					  listusererror=[];
//					  listusererror.push(ele.username);
//				  }
//			  });
//			  setTextQueueAndAlready(strSubJ,appnameold,appRoleNameOld,listusererror);
//		  }	
		  
	$( "button[name='submitAppJqgrid']" ).click(function() {
		if(flagenable!='0'){
			alert('System cannot create UR');
		  }else{
			 // submit for save
		  }
	});
});

