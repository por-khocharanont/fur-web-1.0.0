
package th.cu.thesis.fur.acim.web.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import th.cu.thesis.fur.web.log.LogFormater;
import th.cu.thesis.fur.web.model.AppFile;
import th.cu.thesis.fur.web.model.Application;
import th.cu.thesis.fur.web.model.ApplicationRole;
import th.cu.thesis.fur.web.model.ApplicationRoleResponse;
import th.cu.thesis.fur.web.model.DataUserRequestValidate;
import th.cu.thesis.fur.web.model.EligibleOrgAppRoleApp;
import th.cu.thesis.fur.web.model.UrForUser;
import th.cu.thesis.fur.web.model.UserRequestFromGrid;
import th.cu.thesis.fur.web.model.grid.BaseGridResponse;
import th.cu.thesis.fur.web.model.grid.RequestNoDetail;
import th.cu.thesis.fur.web.model.grid.UserRequestDetail;
import th.cu.thesis.fur.web.repository.model.UserInfo;
import th.cu.thesis.fur.web.service.ApplicationService;
import th.cu.thesis.fur.web.service.UserRequestService;
import th.cu.thesis.fur.web.service.exception.ServiceException;
@Controller
@RequestMapping(value="/userrequest")
public class UserRequestController {

	private final Logger logger = LoggerFactory.getLogger(UserRequestController.class);



	@Autowired 
	UserRequestService userRequestService;
	
	@Autowired 
	ApplicationService applicationService;
	
	private static final String WAITING_FOR_CUSTODIAN = "5";
	
	@RequestMapping(value = "/requestno/detail/{requestNo}", method = RequestMethod.GET)
	public String getRequestNoDetail(@PathVariable("requestNo") String requestNo, Model model) throws ServiceException {
		try{
			logger.info(LogFormater.WEB_REQUEST,"GET_REQUESTNO_DETAIL","requestNo = "+requestNo);
			
			RequestNoDetail requestNoDetail =  userRequestService.getRequestNoDetail(requestNo);
			model.addAttribute("requestNoDetailModel", requestNoDetail);
			
			return "userrequest/requestnodetail";
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/ur/detail/{urId}", method = RequestMethod.GET)
	public String getUrDetail(@PathVariable String urId,Model model) throws ServiceException {
		try{
			UserRequestDetail userRequestDetail = userRequestService.getUrDetail(urId);
			
			List<ApplicationRole> appRoleList = new ArrayList<ApplicationRole>();
			if(WAITING_FOR_CUSTODIAN.equals(userRequestDetail.getCurrentStep())){
				ApplicationRoleResponse listAppRole = applicationService.getApplicationRoleByAppId(userRequestDetail.getUrDetail().getAppId());
				appRoleList = listAppRole.getApplicationRoleList();
			}
			model.addAttribute("appRoleListModel",appRoleList);
			model.addAttribute("userRequestDetailModel", userRequestDetail);
			return "todolists/todolists.detail";
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/ur/checktoken", method = RequestMethod.POST)
	@ResponseBody
	public List<UrForUser> reloadTokenUrForUser(@RequestBody List<UrForUser> urForUserList) throws ServiceException {
			return userRequestService.reloadTokenUrForUser(urForUserList);
	}
	
	@RequestMapping(value="/appTemplate" ,method=RequestMethod.GET)
	public void getTemplateFile(@RequestParam("fileName") String fileName,@RequestParam("filePath") String filePath,HttpServletResponse httpServletResponse,HttpServletRequest httpServletRequest) throws ServiceException{
		try{
			userRequestService.downloadTemplateUserRequest(fileName,filePath, httpServletResponse, httpServletRequest);
		}catch(Exception e){
			throw ServiceException.get404FileNotFound("404002");
		}
	}
	
	@RequestMapping(value = "/approve", method = RequestMethod.POST)
	@ResponseBody
	public Boolean approveAllUrByType(@RequestParam Map<String, Object> params, @RequestParam("fileUpload") List<MultipartFile> files) throws ServiceException {
		try{
			return userRequestService.approveAllUrByType(params,files);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/approve/ur", method = RequestMethod.POST)
	@ResponseBody
	public Boolean approveUrByType(@RequestParam Map<String, Object> params, @RequestParam("fileUpload") List<MultipartFile> files) throws ServiceException {
		try{
			return userRequestService.approveUrByType(params,files);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/{start}", method = RequestMethod.GET)
	public String startUserrequest(@PathVariable String start) throws ServiceException {
		// init type invidual pass parameter for default record
		if("start".equals(start)){
			return "redirect:individual";
		}else{
			return "userrequest/userrequest";
		}
		
		
	}
	
	@RequestMapping(value = "/individual", method = RequestMethod.GET)
	public String toIndividualRequest(Authentication authentication, Model  model) throws ServiceException {
		// init type invidual pass parameter for default record
		List<Map<String,String>> listuser =new ArrayList<Map<String,String>>();
		Map<String,String> map = new HashMap<String, String>();
		try{
			map.put("username", ((UserInfo) authentication.getPrincipal()).getUsername());
			map.put("name", ((UserInfo) authentication.getPrincipal()).getFirstName()+" "+((UserInfo) authentication.getPrincipal()).getLastName());
			map.put("userId", ((UserInfo) authentication.getPrincipal()).getUserId());
			listuser.add(map);
			model.addAttribute("name", ((UserInfo) authentication.getPrincipal()).getFirstName()+" "+((UserInfo) authentication.getPrincipal()).getLastName());
			model.addAttribute("listuser", listuser);
			return "userrequest/userrequest";
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	//NEW ADD GRID STD
	@RequestMapping(value = "/listAppStdEligibleByAppname", method = RequestMethod.GET)
	public @ResponseBody List<Map<String,Object>> getListEligiblebyStdApp(@RequestParam Map<String, Object> params,Authentication authentication) throws ServiceException {
		try{
			return userRequestService.appListEligiblebyAppNameStd(params);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/listAppEligibleStdGridByAppId", method = RequestMethod.GET)
	public @ResponseBody BaseGridResponse listEligibleStdGridByAppId(@RequestParam Map<String, Object> params,Authentication authentication) throws ServiceException {
		try{
			params.put("username", ((UserInfo)(authentication.getPrincipal())).getUsername());
			return userRequestService.listEligibleStdGridByAppId(params);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/listAppEligibleStdGridByAppName", method = RequestMethod.GET)
	public @ResponseBody BaseGridResponse listAppEligibleStdGridByAppName(@RequestParam Map<String, Object> params,Authentication authentication) throws ServiceException {
		try{
			return userRequestService.listEligibleStdGridByAppName(params);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	//NEW ADD GRID SPC
	@RequestMapping(value = "/listAppSpcEligibleByAppname", method = RequestMethod.GET)
	public @ResponseBody List<Map<String,Object>> listAppSpcEligibleByAppname(@RequestParam Map<String, Object> params,Authentication authentication) throws ServiceException {
		try{
			return userRequestService.listAppSpcEligibleByAppname(params);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/listAppSpcGridEligibleByAppId", method = RequestMethod.GET)
	public @ResponseBody BaseGridResponse listAppSpcGridEligibleByAppId(@RequestParam Map<String, Object> params,Authentication authentication) throws ServiceException {
		try{
			return userRequestService.listAppSpcGridEligibleByAppId(params);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
		
	}
	
	@RequestMapping(value = "/listAppSpcGridEligibleByAppName", method = RequestMethod.GET)
	public @ResponseBody BaseGridResponse listAppSpcGridEligibleByAppName(@RequestParam Map<String, Object> params,Authentication authentication) throws ServiceException {
		try{
			return userRequestService.listAppSpcGridEligibleByAppName(params);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	/////////////////////////
	
	@RequestMapping(value = "/individual/listAppByappNameAndType", method = RequestMethod.POST)
	public @ResponseBody List<Application> listAppGridByappNameAndType(@RequestParam Map<String, String> params) throws ServiceException {
		try{
			return userRequestService.listAppGridByappNameAndType(params);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	@RequestMapping(value = "/individual/listAppRoleGridByappIdAndType", method = RequestMethod.GET)
	public @ResponseBody BaseGridResponse listAppRoleGridByappId(@RequestParam Map<String, Object> params) throws ServiceException {
		try{
			return userRequestService.getListAppRoleGridByappIdAndType(params);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/individual/listAppRoleGridByappNameAndType", method = RequestMethod.GET)
	public @ResponseBody BaseGridResponse listAppRoleGridByappName(@RequestParam Map<String, Object> params) throws ServiceException {
		try{
			return userRequestService.getListAppRoleGridByappNameAndType(params);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/individual/listAppChangeByappName", method = RequestMethod.POST)
	public @ResponseBody List<Map<String,String>> getlistAppChangeByappName(@RequestParam Map<String, String> params,Authentication authentication) throws ServiceException {
		try{
			return userRequestService.getlistAppChangeByappName(params,((UserInfo)(authentication.getPrincipal())).getUsername());
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
		
	}
	
	@RequestMapping(value = "/individual/listAppChangeGridByappId", method = RequestMethod.GET)
	public @ResponseBody BaseGridResponse listAppChangeGridByappId(@RequestParam Map<String, Object> params,Authentication authentication) throws ServiceException {
		try{
			return userRequestService.getlistAppChangeGridByappId(params,((UserInfo)(authentication.getPrincipal())).getUsername());
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/individual/listAppChangeGridByappName", method = RequestMethod.GET)
	public @ResponseBody BaseGridResponse listAppChangeGridByappName(@RequestParam Map<String, Object> params,Authentication authentication) throws ServiceException {
		try{
			params.put("username", ((UserInfo)(authentication.getPrincipal())).getUsername());
			return userRequestService.getlistAppChangeGridByappName(params);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/listApp/terauthor/gridByappName", method = RequestMethod.GET)
	public @ResponseBody BaseGridResponse listAppTerAuthorGridByappName(@RequestParam Map<String, Object> params,Authentication authentication) throws ServiceException {
		try{
			params.put("username", ((UserInfo)(authentication.getPrincipal())).getUsername());
			return userRequestService.getlistAppTerAuthorGridByappName(params);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/individual/getEligibleListSpcByAppname", method=RequestMethod.GET)
	public @ResponseBody List<EligibleOrgAppRoleApp> getListEligiblebySpcApp(@RequestParam(value="appName",required=true) String appName,Authentication authentication) throws ServiceException{
		try{
			return userRequestService.getListEligiblebyAppNameSpc(appName, ((UserInfo)(authentication.getPrincipal())).getUsername());
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/individual/getEligibleListStdDropdownByAppId", method = RequestMethod.GET)
	public @ResponseBody List<EligibleOrgAppRoleApp> getListEligibleDropdownByAppId(@RequestParam(value="appId",required=true) String appId) throws ServiceException {
		try{
			return userRequestService.getEligibleListStdDropdownByAppId(appId);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value = "/individual/getEligibleListSpcDropdownByAppId", method = RequestMethod.GET)
	public @ResponseBody List<EligibleOrgAppRoleApp> getEligibleListSpcDropdownByAppId(@RequestParam(value="appId",required=true) String appId) throws ServiceException {
		try{
			return userRequestService.getEligibleListSpcDropdownByAppId(appId);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	
	@RequestMapping(value="/individual/ListpathAppfileByRoleappId",method=RequestMethod.GET)
	public @ResponseBody List<AppFile> getListpathfileByRoleappId (@RequestParam Map<String, String> params) throws ServiceException{
		try{
			return userRequestService.getListpathfileByRoleappId(params);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}

	@RequestMapping(value="/app/authenType",method=RequestMethod.GET)
	public @ResponseBody String getAuthenType (@RequestParam Map<String, String> params) throws ServiceException{
		try{
			return userRequestService.getAuthenTypeByAppId(params);
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/individual/PrePareData",method = RequestMethod.POST,consumes = {"multipart/form-data"})
	public @ResponseBody Map<String,Object> PrepareDataAndPreview (MultipartHttpServletRequest multipartRequest,HttpServletRequest request
	, HttpServletResponse response) throws ServiceException{
		//PrepareData
		try{
			
			Gson gson = new GsonBuilder().create();
			Map<String,Object> responseData = new HashMap<String, Object>();
			Map<String,String> dataFormApp = gson.fromJson(multipartRequest.getParameter("dataFormApp"), Map.class);
			List<Map<String,String>> listuser = gson.fromJson(multipartRequest.getParameter("listuser"),new TypeToken<List<Map<String,String>>>() {}.getType());
			List<UserRequestFromGrid> listrequestFromGrids = null;
			List<Map<String,Object>> listDataChg = null; 
			List<Map<String,Object>> listDataTer = null; 
			List<String> lsuser = null;
			List<String> lsapp = null;
			DataUserRequestValidate dataUserRequestValidate = null;
			Integer countQueueError =0;
			Integer countUrAll = 0;
			if("1".equals(dataFormApp.get("requestTypeValue"))){
				
				listrequestFromGrids = new ArrayList<UserRequestFromGrid>();
				listrequestFromGrids = gson.fromJson(multipartRequest.getParameter("appDatas"),new TypeToken<List<UserRequestFromGrid>>() {}.getType());
				
				lsuser = new ArrayList<String>(); //UserId
				lsapp = new ArrayList<String>(); //APP Role ID
				for(Map<String,String> user : listuser){
					lsuser.add(String.valueOf(user.get("userId")));
				}
				for(UserRequestFromGrid app :listrequestFromGrids){
					lsapp.add(app.getAppRoleId());
				}
				dataUserRequestValidate = new DataUserRequestValidate();
				dataUserRequestValidate.setLsapp(lsapp);
				dataUserRequestValidate.setLsuser(lsuser);
				dataUserRequestValidate.setStatusAlready("N");
				dataUserRequestValidate.setStatusQueued("N");
				// send validator
				dataUserRequestValidate = userRequestService.validDataPreview(dataUserRequestValidate);				
				Collections.sort(dataUserRequestValidate.getOplsbothAlreadyQueued(),new Comparator<Map<String, Object>>() {
				    @Override
				    public int compare(final Map<String, Object> o1, final Map<String, Object> o2) {
				    	String a = new String((String) o1.get("appId"));
				    	String b = new String((String) o2.get("appId"));
				    	return a.compareTo(b);
				    	
				    }
				});
				//generate remark error ur
				if(!dataUserRequestValidate.getErrorListQueueduser().isEmpty()){
					StringBuilder error = new StringBuilder();
					userRequestService.generateRemarkErrorurQueued(error,dataUserRequestValidate.getErrorListQueueduser());
					dataFormApp.put("queued", error.toString());
				}
				if(!dataUserRequestValidate.getErrorListalreadyApp().isEmpty()){
					StringBuilder error = new StringBuilder();
					userRequestService.generateRemarkErroralreadyApp(error,dataUserRequestValidate.getErrorListalreadyApp());
					dataFormApp.put("alreadyApp", error.toString());
				}
				if(!dataUserRequestValidate.getErrorsbothAlreadyQueued().isEmpty()){
					countQueueError = dataUserRequestValidate.getErrorsbothAlreadyQueued().size();
				}
				countUrAll = lsuser.size()*lsapp.size(); 
				responseData.put("listapp", listrequestFromGrids);
			}else if("3".equals(dataFormApp.get("requestTypeValue"))){
				
				listDataChg = new ArrayList<Map<String,Object>>();
				listDataChg = gson.fromJson(multipartRequest.getParameter("appDatas"),new TypeToken<List<Map<String,Object>>>() {}.getType());
				lsuser = new ArrayList<String>(); //UserId
				lsapp = new ArrayList<String>(); //APP Role ID
				for(Map<String,String> user : listuser){
					lsuser.add(String.valueOf(user.get("userId")));
				}
				for(Map<String,Object> app :listDataChg){
						lsapp.add((String) app.get("appRoleIdOld"));	
				}
				dataUserRequestValidate = new DataUserRequestValidate();
				dataUserRequestValidate.setStatusAlready("Y");
				dataUserRequestValidate.setStatusQueued("N");
				dataUserRequestValidate.setLsapp(lsapp);
				dataUserRequestValidate.setLsuser(lsuser);
				
				// send validator
				dataUserRequestValidate = userRequestService.validDataPreview(dataUserRequestValidate);
				Collections.sort(dataUserRequestValidate.getErrorsbothAlreadyQueued(),new Comparator<Map<String, Object>>() {
				    @Override
				    public int compare(final Map<String, Object> o1, final Map<String, Object> o2) {
				    	String a = new String((String) o1.get("appId"));
				    	String b = new String((String) o2.get("appId"));
				    	return a.compareTo(b);
				    	
				    }
				});
				
				if(!dataUserRequestValidate.getErrorsbothAlreadyQueued().isEmpty()){
					//generate remark error ur
					StringBuilder error = new StringBuilder();
					userRequestService.generateTerminateRemarkErrorurQueued(error,dataUserRequestValidate.getErrorsbothAlreadyQueued());
					dataFormApp.put("queued", error.toString());
					countQueueError = dataUserRequestValidate.getErrorsbothAlreadyQueued().size();
				}
				countUrAll = lsuser.size()*lsapp.size(); 
				responseData.put("listapp", listDataChg);
				
			}else if("2".equals(dataFormApp.get("requestTypeValue"))){
				
				listDataTer = new ArrayList<Map<String,Object>>();
				listDataTer = gson.fromJson(multipartRequest.getParameter("appDatas"),new TypeToken<List<Map<String,Object>>>() {}.getType());
				lsuser = new ArrayList<String>(); //UserId
				lsapp = new ArrayList<String>(); //APP Role ID
				for(Map<String,String> user : listuser){
					lsuser.add(String.valueOf(user.get("userId")));
				}
				for(Map<String,Object> app :listDataTer){
						lsapp.add((String) app.get("appRoleId"));	
				}
				dataUserRequestValidate = new DataUserRequestValidate();
				dataUserRequestValidate.setLsapp(lsapp);
				dataUserRequestValidate.setLsuser(lsuser);
				dataUserRequestValidate.setStatusAlready("Y");
				dataUserRequestValidate.setStatusQueued("N");
				// send validator
				dataUserRequestValidate = userRequestService.validDataPreview(dataUserRequestValidate);
				Collections.sort(dataUserRequestValidate.getErrorsbothAlreadyQueued(),new Comparator<Map<String, Object>>() {
				    @Override
				    public int compare(final Map<String, Object> o1, final Map<String, Object> o2) {
				    	String a = new String((String) o1.get("appId"));
				    	String b = new String((String) o2.get("appId"));
				    	return a.compareTo(b);
				    	
				    }
				});
				//generate remark error ur
				if(!dataUserRequestValidate.getErrorsbothAlreadyQueued().isEmpty()){
					countQueueError = dataUserRequestValidate.getErrorsbothAlreadyQueued().size();
					StringBuilder queuedError = new StringBuilder();
					userRequestService.generateTerminateRemarkErrorurQueued(queuedError,dataUserRequestValidate.getErrorsbothAlreadyQueued());
					StringBuilder alreadyError = new StringBuilder();
					userRequestService.generateTerminateRemarkErrorUrnotAlready(alreadyError, dataUserRequestValidate.getErrorsbothAlreadyQueued());
					dataFormApp.put("errorterminate", queuedError.toString()+alreadyError.toString());
				}
				countUrAll = lsuser.size()*lsapp.size(); 
				responseData.put("listapp", listDataTer);
				
			}

			//set flag enable submit
			if((countUrAll-countQueueError)<=0){
				dataFormApp.put("flagenable", "1");
			}else{
				dataFormApp.put("flagenable", "0");
			}
			
			responseData.put("dataFormApp", dataFormApp);
			responseData.put("listuser", listuser);
			return responseData;
			
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		
	}
	

	

	@SuppressWarnings("unchecked")
	@RequestMapping(value="/individual/submitData",method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> SubmitUserRequest (MultipartHttpServletRequest multipartRequest) throws ServiceException {
		try{
			String idRequestNo="";
			Map<String,Object> resultDatas = new HashMap<String, Object>();
			Gson gson = new GsonBuilder().create();
			Map<String,String> dataFormApp = gson.fromJson(multipartRequest.getParameter("dataFormApp"), Map.class);
			List<Map<String,String>> listuser = gson.fromJson(multipartRequest.getParameter("listuser"),new TypeToken<List<Map<String,String>>>() {}.getType());
			List<UserRequestFromGrid> listrequestFromGrids = null;
			List<Map<String,Object>> listDataChg = null; 
			List<Map<String,Object>> listDataTer = null; 
			List<String> lsuser = null;
			List<String> lsapp = null;
			DataUserRequestValidate dataUserRequestValidate = null;
			List<MultipartFile> mapfile ;
			if("1".equals(dataFormApp.get("requestTypeValue"))){
				listrequestFromGrids = new ArrayList<UserRequestFromGrid>();
				mapfile = new ArrayList<MultipartFile>(); 
				listrequestFromGrids = gson.fromJson(multipartRequest.getParameter("appDatas"),new TypeToken<List<UserRequestFromGrid>>() {}.getType());
				lsuser = new ArrayList<String>(); //UserId
				lsapp = new ArrayList<String>(); //APP Role ID
				for(Map<String,String> user : listuser){
					lsuser.add(String.valueOf(user.get("userId")));
				}
				for(UserRequestFromGrid app :listrequestFromGrids){
					lsapp.add(app.getAppRoleId());
				}
				dataUserRequestValidate = new DataUserRequestValidate();
				dataUserRequestValidate.setLsapp(lsapp);
				dataUserRequestValidate.setLsuser(lsuser);
				dataUserRequestValidate.setStatusAlready("N");
				dataUserRequestValidate.setStatusQueued("N");
				// send validator
				dataUserRequestValidate = userRequestService.validDataPreview(dataUserRequestValidate);
				Collections.sort(dataUserRequestValidate.getErrorsbothAlreadyQueued(),new Comparator<Map<String, Object>>() {
				    @Override
				    public int compare(final Map<String, Object> o1, final Map<String, Object> o2) {
				    	String a = new String((String) o1.get("appId"));
				    	String b = new String((String) o2.get("appId"));
				    	return a.compareTo(b);
				    	
				    }
				});
				Collections.sort(dataUserRequestValidate.getOplsbothAlreadyQueued(),new Comparator<Map<String, Object>>() {
				    @Override
				    public int compare(final Map<String, Object> o1, final Map<String, Object> o2) {
				    	String a = new String((String) o1.get("appRoleId"));
				    	String b = new String((String) o2.get("appRoleId"));
				    	return a.compareTo(b);
				    	
				    }
				});
				//generate remark error ur
				if(!dataUserRequestValidate.getErrorListQueueduser().isEmpty()){
					StringBuilder error = new StringBuilder();
					userRequestService.generateRemarkErrorurQueued(error,dataUserRequestValidate.getErrorListQueueduser());
					dataFormApp.put("queued", error.toString());
				}
				if(!dataUserRequestValidate.getErrorListalreadyApp().isEmpty()){
					StringBuilder error = new StringBuilder();
					userRequestService.generateRemarkErroralreadyApp(error,dataUserRequestValidate.getErrorListalreadyApp());
					dataFormApp.put("alreadyApp", error.toString());
				}
				idRequestNo = userRequestService.subMitforCommitdata(dataUserRequestValidate,dataFormApp,listrequestFromGrids);
				List<Map<String,Object>> datasResult = userRequestService.listurfromSubmit(idRequestNo);
				for(Map<String,Object> result :datasResult){
					mapfile = multipartRequest.getFiles(result.get("appRoleId").toString());
					if(mapfile.size()>0){
						
						userRequestService.uploadAppUrTemplateUserRequest(result.get("urId").toString(), mapfile);
					}
				}
			
			}else if("3".equals(dataFormApp.get("requestTypeValue"))){
				listDataChg = new ArrayList<Map<String,Object>>();
				listDataChg = gson.fromJson(multipartRequest.getParameter("appDatas"),new TypeToken<List<Map<String,Object>>>() {}.getType());
				lsuser = new ArrayList<String>(); //UserId
				lsapp = new ArrayList<String>(); //APP Role ID
				for(Map<String,String> user : listuser){
					lsuser.add(String.valueOf(user.get("userId")));
				}
				for(Map<String,Object> app :listDataChg){
						lsapp.add((String) app.get("appRoleIdOld"));	
				}
				dataUserRequestValidate = new DataUserRequestValidate();
				dataUserRequestValidate.setStatusAlready("Y");
				dataUserRequestValidate.setStatusQueued("N");
				dataUserRequestValidate.setLsapp(lsapp);
				dataUserRequestValidate.setLsuser(lsuser);
				
				// send validator
				dataUserRequestValidate = userRequestService.validDataPreview(dataUserRequestValidate);
				Collections.sort(dataUserRequestValidate.getErrorsbothAlreadyQueued(),new Comparator<Map<String, Object>>() {
				    @Override
				    public int compare(final Map<String, Object> o1, final Map<String, Object> o2) {
				    	String a = new String((String) o1.get("appId"));
				    	String b = new String((String) o2.get("appId"));
				    	return a.compareTo(b);
				    	
				    }
				});
				//generate remark error ur
				StringBuilder error = new StringBuilder();
				if(!dataUserRequestValidate.getErrorsbothAlreadyQueued().isEmpty()){
					userRequestService.generateTerminateRemarkErrorurQueued(error,dataUserRequestValidate.getErrorsbothAlreadyQueued());
					dataFormApp.put("queued", error.toString());
				}
				idRequestNo = userRequestService.subMitforCommitdataChg(dataUserRequestValidate,dataFormApp,listDataChg);
			}else if("2".equals(dataFormApp.get("requestTypeValue"))){
				listDataTer = new ArrayList<Map<String,Object>>();
				listDataTer = gson.fromJson(multipartRequest.getParameter("appDatas"),new TypeToken<List<Map<String,Object>>>() {}.getType());
				lsuser = new ArrayList<String>(); //UserId
				lsapp = new ArrayList<String>(); //APP Role ID
				for(Map<String,String> user : listuser){
					lsuser.add(String.valueOf(user.get("userId")));
				}
				for(Map<String,Object> app :listDataTer){
						lsapp.add((String) app.get("appRoleId"));	
				}
				dataUserRequestValidate = new DataUserRequestValidate();
				dataUserRequestValidate.setLsapp(lsapp);
				dataUserRequestValidate.setLsuser(lsuser);
				dataUserRequestValidate.setStatusAlready("Y");
				dataUserRequestValidate.setStatusQueued("N");
				// send validator
				dataUserRequestValidate = userRequestService.validDataPreview(dataUserRequestValidate);
				Collections.sort(dataUserRequestValidate.getErrorsbothAlreadyQueued(),new Comparator<Map<String, Object>>() {
				    @Override
				    public int compare(final Map<String, Object> o1, final Map<String, Object> o2) {
				    	String a = new String((String) o1.get("appId"));
				    	String b = new String((String) o2.get("appId"));
				    	return a.compareTo(b);
				    	
				    }
				});
				//generate remark error ur
				if(!dataUserRequestValidate.getErrorsbothAlreadyQueued().isEmpty()){
					StringBuilder queuedError = new StringBuilder();
					userRequestService.generateTerminateRemarkErrorurQueued(queuedError,dataUserRequestValidate.getErrorsbothAlreadyQueued());
					StringBuilder alreadyError = new StringBuilder();
					userRequestService.generateTerminateRemarkErrorUrnotAlready(alreadyError, dataUserRequestValidate.getErrorsbothAlreadyQueued());
					dataFormApp.put("errorterminate", queuedError.toString()+alreadyError.toString());
				}
				idRequestNo = userRequestService.subMitforCommitdataTer(dataUserRequestValidate,dataFormApp,listDataChg);
				
			}
			
			resultDatas.put("idRequestNo", idRequestNo);
			return resultDatas;
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}

	
	
	@RequestMapping (value="/individual/result/{requestNo}",method=RequestMethod.GET)
	public String pageResultSubmit (@PathVariable String requestNo,Model model) throws ServiceException{
		try{
			if(requestNo!=null){
				List<Map<String,Object>> datasResult = userRequestService.listurfromSubmit(requestNo);
				model.addAttribute("datasResult",datasResult);
				return "userrequest/userrequest.submit";
			}else{
				return "userrequest/userrequest";
			}
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@RequestMapping(value="/uploadTemplateFile",method=RequestMethod.POST,consumes = {"multipart/form-data"})
	public @ResponseBody List<Map<String,Object>> uploadTemplateFile (MultipartHttpServletRequest multipartRequest) throws ServiceException{
		try{
			MultipartFile file  = multipartRequest.getFile("templateFile");
			boolean isTooMany = userRequestService.validateExcelLengthRecord(51,file);
			List<String> username = userRequestService.readExcelTemplate(file);
			Integer rows=0;
			List<Map<String,Object>> datasUserlist = new ArrayList<Map<String,Object>>();
			if(!username.isEmpty()){
				rows = username.size();
			}
			if(isTooMany){
				Map<String,Object> error = new HashMap<String,Object>();
				error.put("reason", "กรุณากรอก Username บรรทัดที่ 2 – 51 เท่านั้น  ");
				datasUserlist.add(error);
			}
			else if(rows>50){
				Map<String,Object> error = new HashMap<String,Object>();
				error.put("reason", "ไฟล์มีขนาดเกิน 50 Username");
				datasUserlist.add(error);
			}else{
				Set<String> set = new HashSet<String>(username);
				username = new ArrayList<String>(set);
				datasUserlist = userRequestService.checkApproverSamePerson(username);
			}
			return datasUserlist;
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
		
	}
	
	@RequestMapping(value="/listRoleChgAppElm",method=RequestMethod.GET)
	public @ResponseBody List<Map<String,Object>> listRoleChgAppElm (@RequestParam Map<String, Object> params) throws ServiceException{
		try{
			List<Map<String,Object>> listDataChgApp = userRequestService.listRoleChgAppElm(params);
			return listDataChgApp;
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/individual/fromprofile/newur",method=RequestMethod.POST)
	public String newUrFromProfile (@RequestParam Map<String, Object> params,Authentication authentication,Model model)throws ServiceException{
		try{
			Gson gson = new GsonBuilder().create();
			Map<String,Object> jsonData = gson.fromJson((String) params.get("jsonData"), Map.class);
			List<String> appRoleIds = new ArrayList<String>();
			appRoleIds = (List<String>) jsonData.get("appRoleIdList");
			
			List<Map<String,String>> listuser =new ArrayList<Map<String,String>>();
			Map<String,String> map = new HashMap<String, String>();
			map.put("username", ((UserInfo) authentication.getPrincipal()).getUsername());
			map.put("name", ((UserInfo) authentication.getPrincipal()).getFirstName()+" "+((UserInfo) authentication.getPrincipal()).getLastName());
			map.put("userId", ((UserInfo) authentication.getPrincipal()).getUserId());
			listuser.add(map);
			model.addAttribute("name", ((UserInfo) authentication.getPrincipal()).getFirstName()+" "+((UserInfo) authentication.getPrincipal()).getLastName());
			model.addAttribute("listuser", listuser);
			List<Map<String, Object>> recordData = new ArrayList<Map<String,Object>>();
			if(appRoleIds.size()>0){
				recordData = userRequestService.getListDataFromUserProfileByappRoleId(appRoleIds);
			}
			model.addAttribute("flagUserprofile", "1");
			model.addAttribute("type", jsonData.get("type"));
			model.addAttribute("recordDataProfile", recordData);
			return "userrequest/userrequest";
		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}
	}
	
}
