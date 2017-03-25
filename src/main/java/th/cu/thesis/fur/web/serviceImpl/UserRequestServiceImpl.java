package th.cu.thesis.fur.web.serviceImpl;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import th.cu.thesis.fur.web.model.AppFile;
import th.cu.thesis.fur.web.model.Application;
import th.cu.thesis.fur.web.model.DataUserRequestValidate;
import th.cu.thesis.fur.web.model.EligibleOrgAppRoleApp;
import th.cu.thesis.fur.web.model.FileInfo;
import th.cu.thesis.fur.web.model.FilesNasConfig;
import th.cu.thesis.fur.web.model.Organize;
import th.cu.thesis.fur.web.model.UrForUser;
import th.cu.thesis.fur.web.model.UserRequestFromGrid;
import th.cu.thesis.fur.web.model.grid.BaseGridResponse;
import th.cu.thesis.fur.web.model.grid.RequestNoDetail;
import th.cu.thesis.fur.web.model.grid.UserRequestApproveRequest;
import th.cu.thesis.fur.web.model.grid.UserRequestDetail;
import th.cu.thesis.fur.web.service.FileUtilsService;
import th.cu.thesis.fur.web.service.UserRequestService;
import th.cu.thesis.fur.web.service.exception.ServiceException;
import th.cu.thesis.fur.web.util.RestUtil;
import th.cu.thesis.fur.web.util.Utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

@Service("userrequestService")
public class UserRequestServiceImpl implements UserRequestService {

	@Autowired
	private FileUtilsService fileUtilsService;
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Value("${fur.api.host}")
	private String apiHost;

	private static final String APPROVER_FILE_PATH = "ur/approver/";
	
	@Override
	public Boolean approveUrByType(Map<String, Object> params, List<MultipartFile> files) throws ServiceException {
		Boolean result = false;
		String jsonData = (String) params.get("jsonData");
		String remark = (String) params.get("remark");
		String endPoint = apiHost +"/userrequest/approve/ur";// Change EndPoint 
		
		HttpHeaders headers = RestUtil.createAPIHeader();
		UserRequestApproveRequest request = new UserRequestApproveRequest();
		request = Utils.getGsonDate().fromJson(jsonData, UserRequestApproveRequest.class);
		request.setRemark(remark);
		List<FileInfo> fileInfo = new ArrayList<FileInfo>();
		
		String currentTime = Utils.genUniqueIdByDate();
		
		String filePath = APPROVER_FILE_PATH + request.getUrApproveList().get(0).getUrId() + "/" + currentTime + "/";
		for(MultipartFile file : files){
			FileInfo f = new FileInfo();
			String fileName = file.getOriginalFilename();
			f.setFileName(fileName);
			f.setFilePath(filePath);
			fileInfo.add(f);
		}
		request.setFile(fileInfo);
		
//		String jsonModel = Utils.getGsonDate().toJson(request);
		HttpEntity<UserRequestApproveRequest> requestEntity = new HttpEntity<UserRequestApproveRequest>(request,headers);
		ResponseEntity<String> responseEntity;
		
		try {
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity,	String.class);
			result = BooleanUtils.toBoolean(responseEntity.getBody());
			if(files.size()>0){
				fileUtilsService.saveFileToNas(filePath, files);
			}
			return result;
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public Boolean approveAllUrByType(Map<String, Object> params, List<MultipartFile> files) throws ServiceException {
		Boolean result = false;
		String jsonData = (String) params.get("jsonData");
		
		String endPoint = apiHost +"/userrequest/approve";// Change EndPoint 
		
		HttpHeaders headers = RestUtil.createAPIHeader();
		UserRequestApproveRequest request = new UserRequestApproveRequest();
		request = Utils.getGsonDate().fromJson(jsonData, UserRequestApproveRequest.class);

		List<FileInfo> fileInfo = new ArrayList<FileInfo>();
		
		String currentTime = Utils.genUniqueIdByDate();
		
		String filePath = APPROVER_FILE_PATH + request.getUrApproveList().get(0).getUrId() + "/" + currentTime + "/";
		for(MultipartFile file : files){
			FileInfo f = new FileInfo();
			String fileName = file.getOriginalFilename();
			f.setFileName(fileName);
			f.setFilePath(filePath);
			fileInfo.add(f);
		}
		request.setFile(fileInfo);
		
		
		String jsonModel = Utils.getGson().toJson(request);
		HttpEntity<UserRequestApproveRequest> requestEntity = new HttpEntity<UserRequestApproveRequest>(request,headers);
		ResponseEntity<String> responseEntity;
		
		try {
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity,	String.class);
			result = BooleanUtils.toBoolean(responseEntity.getBody());
			if(files.size()>0){
				fileUtilsService.saveFileToNas(filePath, files);
			}
			return result;
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
		return result;
	}
	
	@Override
	public RequestNoDetail getRequestNoDetail(String requestNo) throws ServiceException {
		
		RequestNoDetail response = new RequestNoDetail();
		try {
			
			String endPoint = apiHost +"/userrequest/requestno/detail/" + requestNo;
			HttpHeaders headers =  RestUtil.createAPIHeader();
			
			HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
			ResponseEntity<RequestNoDetail> responseEntity;
			
			
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.GET, requestEntity, RequestNoDetail.class);
			
			response = responseEntity.getBody();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	

	@Override
	public UserRequestDetail getUrDetail(String urId) throws ServiceException {
		HttpHeaders headers = RestUtil.createAPIHeader();
		String endPoint = apiHost +"/userrequest/ur/detail/"+urId;
		
		HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
		ResponseEntity<UserRequestDetail> responseEntity;
		UserRequestDetail userRequestDetail = new UserRequestDetail();
		
		try {
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.GET, requestEntity,	UserRequestDetail.class);
			userRequestDetail = responseEntity.getBody();
		
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
		return userRequestDetail;
		
	}
	

	@Override
	public List<Map<String, Object>> appListEligiblebyAppNameStd(
			Map<String, Object> params) throws ServiceException {
		
		List<Map<String,Object>> listData = new ArrayList<Map<String,Object>>();
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		String endpoint = apiHost+"/userrequest/listappEligibleListStdByAppname";
		Gson gson = new GsonBuilder().create();
		HttpEntity<String> httpEntity = new HttpEntity<String>(gson.toJson(params),httpHeaders);
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, httpEntity, String.class);
			listData = gson.fromJson(responseEntity.getBody(), new TypeToken<List<Map<String, Object>>>() {}.getType());
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return listData;
	}
	@Override
	public List<EligibleOrgAppRoleApp> getListEligiblebyAppNameSpc(String appName, String userName) throws ServiceException {
		
		List<EligibleOrgAppRoleApp> listResults = new ArrayList<EligibleOrgAppRoleApp>();
		try{
			String endpoint = apiHost +"/eligible/individual/getEligibleListSpcByAppname?appName="+appName+"&userName="+userName;
			HttpHeaders headers = RestUtil.createAPIHeader();
			HttpEntity<String> http = new HttpEntity<String>(headers);
			Gson gson = new GsonBuilder().create();
			Type collectionType  = new TypeToken<List<EligibleOrgAppRoleApp>>() {}.getType();
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.GET, http, String.class);
			listResults=gson.fromJson(responseEntity.getBody(), collectionType);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return listResults;
	}
	
	@Override
	public List<EligibleOrgAppRoleApp> getEligibleListStdDropdownByAppId(String appId) throws ServiceException {
		
		List<EligibleOrgAppRoleApp> listResults = new ArrayList<EligibleOrgAppRoleApp>();
		
		try{
			String endpoint = apiHost +"/eligible/individual/getEligibleListStdDropdownByAppId?appId="+appId;
			HttpHeaders headers = RestUtil.createAPIHeader();
			HttpEntity<String> http = new HttpEntity<String>(headers);
			Gson gson = new GsonBuilder().create();
			Type collectionType  = new TypeToken<List<EligibleOrgAppRoleApp>>() {}.getType();
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.GET, http, String.class);
			listResults=gson.fromJson(responseEntity.getBody(), collectionType);
			
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return listResults;
	}

	@Override
	public List<EligibleOrgAppRoleApp> getEligibleListSpcDropdownByAppId(String appId) throws ServiceException {
		List<EligibleOrgAppRoleApp> listResults = new ArrayList<EligibleOrgAppRoleApp>();
		
		try{
			String endpoint = apiHost +"/eligible/individual/getEligibleListSpcDropdownByAppId?appId="+appId;
			HttpHeaders headers = RestUtil.createAPIHeader();
			HttpEntity<String> http = new HttpEntity<String>(headers);
			Gson gson = new GsonBuilder().create();
			Type collectionType  = new TypeToken<List<EligibleOrgAppRoleApp>>() {}.getType();
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.GET, http, String.class);
			listResults=gson.fromJson(responseEntity.getBody(), collectionType);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return listResults;
	}

	@Override
	public BaseGridResponse listEligibleStdGridByAppId(Map<String, Object> params) throws ServiceException {
		BaseGridResponse baseGridResponse = new BaseGridResponse();
		HttpHeaders headers = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		String endpoint = apiHost +"/userrequest/listAppEligibleStdGridByAppId";
		String jsonRequsetString = gson.toJson(params);
		HttpEntity<String> http = new HttpEntity<String>(jsonRequsetString,headers);
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, http, String.class);
			baseGridResponse=gson.fromJson(responseEntity.getBody(), BaseGridResponse.class);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		
		return baseGridResponse;
	}

	@Override
	public BaseGridResponse listEligibleStdGridByAppName(Map<String, Object> params) throws ServiceException {
		BaseGridResponse baseGridResponse = new BaseGridResponse();
		HttpHeaders headers = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		String endpoint = apiHost +"/userrequest/listAppEligibleStdGridByAppName";
		String jsonRequsetString = gson.toJson(params);
		HttpEntity<String> http = new HttpEntity<String>(jsonRequsetString,headers);
		try{
			ResponseEntity<BaseGridResponse> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, http, BaseGridResponse.class);
			baseGridResponse = responseEntity.getBody();
			
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		
		return baseGridResponse;
	}
	
//	@Override
//	public BaseGridResponse getEligibleSpcListGridByAppname(
//			Map<String, Object> params) {
//		BaseGridResponse baseGridResponse = new BaseGridResponse();
//		HttpHeaders headers = RestUtil.createAPIHeader();
//		Gson gson = new GsonBuilder().create();
//		String endpoint = apiHost +"/userrequest/listApp/EligibleSpcGridByAppId";
//		String jsonRequsetString = gson.toJson(params);
//		HttpEntity<String> http = new HttpEntity<String>(jsonRequsetString,headers);
//		try{
//			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, http, String.class);
//			baseGridResponse=gson.fromJson(responseEntity.getBody(), BaseGridResponse.class);
//			
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//		
//		return baseGridResponse;
//	}

	
	@Override
	public List<AppFile> getListpathfileByRoleappId(Map<String, String> params) throws ServiceException {
		
		String appId= params.get("appId");
		List<AppFile> pathfile = new ArrayList<AppFile>();
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		String endpoint = apiHost+"/userrequest/app/files?appId="+appId;
		HttpEntity<String> httpEntity = new HttpEntity<String>(httpHeaders);
		Type collectionType  = new TypeToken<List<AppFile>>() {}.getType();
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.GET, httpEntity, String.class);
			pathfile = gson.fromJson(responseEntity.getBody(), collectionType);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		
		return pathfile;
	}

	@Override
	public DataUserRequestValidate validDataPreview(DataUserRequestValidate dataUserRequestValidate) throws ServiceException {
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		String endpoint = apiHost+"/userrequest/validpreview";
		String datasource = gson.toJson(dataUserRequestValidate);
		HttpEntity<String> httpEntity = new HttpEntity<String>(datasource,httpHeaders);
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, httpEntity, String.class);
			dataUserRequestValidate = gson.fromJson(responseEntity.getBody(), DataUserRequestValidate.class);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return dataUserRequestValidate;
	}

	@Override
	public String getAuthenTypeByAppId(Map<String, String> params)throws ServiceException {
		String appId= params.get("appId");
		String result = "";
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		String endpoint = apiHost+"/userrequest/app/authenType?appId="+appId;
		HttpEntity<String> httpEntity = new HttpEntity<String>(httpHeaders);
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.GET, httpEntity, String.class);
			result = gson.fromJson(responseEntity.getBody(), result.getClass());
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		
		return result;
	}


	@Override
	public String subMitforCommitdata(DataUserRequestValidate dataUserRequestValidate,Map<String, String> dataFormApp,List<UserRequestFromGrid> requestFromGrids) throws ServiceException {
		LinkedMultiValueMap<String, Object> parts = new LinkedMultiValueMap<String, Object>();
		parts.add("dataUserRequestValidate", dataUserRequestValidate);
		parts.add("dataFormApp", dataFormApp);

		String idRequestNo=null; 	
		parts.add("requestFromGrids", requestFromGrids);
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);
		String endpoint = apiHost+"/userrequest/commitDataAndEmail";
		HttpEntity<MultiValueMap<String, Object>> httpEntity = new HttpEntity<MultiValueMap<String, Object>>(parts,httpHeaders);
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(endpoint, HttpMethod.POST, httpEntity, String.class);
			idRequestNo = new GsonBuilder().create().fromJson(responseEntity.getBody(),String.class);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return idRequestNo;
	}
	
	@Override
	public  List<Map<String,Object>> listurfromSubmit(String idRequestNo) throws ServiceException{
		
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		String endpoint = apiHost+"/userrequest/listurfromSubmit?idRequestNo="+idRequestNo;
		HttpEntity<String> httpEntity = new HttpEntity<String>(httpHeaders);
		List<Map<String,Object>> datasResult = null;
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(endpoint, HttpMethod.GET, httpEntity, String.class);
			datasResult = new GsonBuilder().create().fromJson(responseEntity.getBody(),new TypeToken<List<Map<String,Object>>>() {}.getType());
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return datasResult;
	}
	
	@Override
	public void generateTerminateRemarkErrorurQueued(StringBuilder error,List<Map<String, Object>> errorsbothAlreadyQueued) throws ServiceException {
		try{
			String strSubJ = "ตรวจสอบพบข้อมูลการขอ UR ของ Application และ Role Application";
			String appnameold = (String) errorsbothAlreadyQueued.get(0).get("appName");
			String appRoleNameOld = (String) errorsbothAlreadyQueued.get(0).get("appRolename");
			List<String> usernames = new ArrayList<String>();
			for(Map<String,Object> queued :errorsbothAlreadyQueued){
				if(appnameold.equals(queued.get("appName")) && appRoleNameOld.equals(queued.get("appRolename"))&&"Y".equals(queued.get("queued"))){
					usernames.add((String) queued.get("username"));
				}else if("Y".equals(queued.get("queued"))){
					error.append("-----------------------------------------\n");
					error.append(strSubJ+"\n");
					error.append("Application : "+appnameold+"\n");
					error.append("App Role : "+appRoleNameOld+"\n");
					error.append("Username : ");
					for(String username:usernames){
						error.append(username+" ,");
					}
					
					error.deleteCharAt(error.length() - 1);
					error.append(" \n");
					if(usernames.size()==0){
						error.setLength(0);
					}
					
					
					appnameold=(String) queued.get("appName");
					appRoleNameOld=(String) queued.get("appRolename");
					usernames = new ArrayList<String>();
					usernames.add((String) queued.get("username"));
				}
			}
			error.append("-----------------------------------------\n");
			error.append(strSubJ+"\n");
			error.append("Application : "+appnameold+"\n");
			error.append("App Role : "+appRoleNameOld+"\n");
			error.append("Username : ");
			for(String username:usernames){
				error.append(username+" ,");
			}
			error.deleteCharAt(error.length() - 1);
			error.append(" \n");
			
			if(usernames.size()==0){
				error.setLength(0);
			}
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		
	}
	
	@Override
	public void generateTerminateRemarkErrorUrnotAlready(StringBuilder error,List<Map<String, Object>> errorsbothAlreadyQueued) throws ServiceException {
		try{
			String strSubJ = "ตรวจสอบไม่พบข้อมูลสิทธิ์การใช้งาน Application และ Role Application";
			String appnameold = (String) errorsbothAlreadyQueued.get(0).get("appName");
			String appRoleNameOld = (String) errorsbothAlreadyQueued.get(0).get("appRolename");
			List<String> usernames = new ArrayList<String>();
			for(Map<String,Object> queued :errorsbothAlreadyQueued){
				if(appnameold.equals(queued.get("appName")) && appRoleNameOld.equals(queued.get("appRolename"))&&"N".equals(queued.get("already"))){
					usernames.add((String) queued.get("username"));
				}else if("N".equals(queued.get("already"))){
					error.append("-----------------------------------------\n");
					error.append(strSubJ+"\n");
					error.append("Application : "+appnameold+"\n");
					error.append("App Role : "+appRoleNameOld+"\n");
					error.append("Username : ");
					for(String username:usernames){
						error.append(username+" ,");
					}
					
					error.deleteCharAt(error.length() - 1);
					error.append(" \n");
					
					appnameold=(String) queued.get("appName");
					appRoleNameOld=(String) queued.get("appRolename");
					usernames = new ArrayList<String>();
					usernames.add((String) queued.get("username"));
				}
			}
			error.append("-----------------------------------------\n");
			error.append(strSubJ+"\n");
			error.append("Application : "+appnameold+"\n");
			error.append("App Role : "+appRoleNameOld+"\n");
			error.append("Username : ");
			for(String username:usernames){
				error.append(username+" ,");
			}
			error.deleteCharAt(error.length() - 1);
			error.append(" \n");
			
			if(usernames.size()==0){
				error.setLength(0);
			}
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
	}
	@Override
	public void generateRemarkErrorurQueued(StringBuilder error,List<Map<String, String>> getErrorListQueueduser) throws ServiceException {
		try{
			String strSubJ = "ตรวจสอบพบข้อมูลการขอ UR ของ Application และ Role Application";
			String appnameold =  getErrorListQueueduser.get(0).get("appname");
			String appRoleNameOld =  getErrorListQueueduser.get(0).get("appRoleName");
			List<String> usernames = new ArrayList<String>();
			for(Map<String,String> queued :getErrorListQueueduser){
				if(appnameold.equals(queued.get("appname")) && appRoleNameOld.equals(queued.get("appRoleName"))){
					usernames.add( queued.get("username"));
				}else{
					error.append("-----------------------------------------\n");
					error.append(strSubJ+"\n");
					error.append("Application : "+appnameold+"\n");
					error.append("App Role : "+appRoleNameOld+"\n");
					error.append("Username : ");
					for(String username:usernames){
						error.append(username+" ,");
					}
					error.deleteCharAt(error.length() - 1);
					error.append(" \n");
					
					appnameold= queued.get("appname");
					appRoleNameOld=queued.get("appRoleName");
					usernames = new ArrayList<String>();
					usernames.add(queued.get("username"));
				}
			}
			error.append("-----------------------------------------\n");
			error.append(strSubJ+"\n");
			error.append("Application : "+appnameold+"\n");
			error.append("App Role : "+appRoleNameOld+"\n");
			error.append("Username : ");
			for(String username:usernames){
				error.append(username+" ,");
			}
			error.deleteCharAt(error.length() - 1);
			error.append(" \n");
			
			if(usernames.size()==0){
				error.setLength(0);
			}
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		
	}

	@Override
	public void generateRemarkErroralreadyApp(StringBuilder error,List<Map<String, String>> oplsalreadyAppapp) throws ServiceException {
		try{
			String strSubJ = "ตรวจสอบพบข้อมูลสิทธิ์การใช้งาน Application และ Role Application";
			String appnameold = oplsalreadyAppapp.get(0).get("appname");
			String appRoleNameOld = oplsalreadyAppapp.get(0).get("appRoleName");
			List<String> usernames = new ArrayList<String>();
			for(Map<String,String> queued :oplsalreadyAppapp){
				if(appnameold.equals(queued.get("appname")) && appRoleNameOld.equals(queued.get("appRoleName"))){
					usernames.add((String) queued.get("username"));
				}else{
					error.append("-----------------------------------------\n");
					error.append(strSubJ+"\n");
					error.append("Application : "+appnameold+"\n");
					error.append("App Role : "+appRoleNameOld+"\n");
					error.append("Username : ");
					for(String username:usernames){
						error.append(username+" ,");
					}
					error.deleteCharAt(error.length() - 1);
					error.append(" \n");
					
					appnameold=(String) queued.get("appname");
					appRoleNameOld=(String) queued.get("appRoleName");
					usernames = new ArrayList<String>();
					usernames.add((String) queued.get("username"));
				}
			}
			error.append("-----------------------------------------\n");
			error.append(strSubJ+"\n");
			error.append("Application : "+appnameold+"\n");
			error.append("App Role : "+appRoleNameOld+"\n");
			error.append("Username : ");
			for(String username:usernames){
				error.append(username+" ,");
			}
			error.deleteCharAt(error.length() - 1);
			error.append(" \n");
			
			if(usernames.size()==0){
				error.setLength(0);
			}
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		
	}
	
	@Override
	public List<Map<String, Object>> checkApproverSamePerson(List<String> usernames) throws ServiceException {
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		String jsonData = gson.toJson(usernames);
		String endpoint = apiHost+"/userrequest/checkApproverSamePerson";
		List<Map<String, Object>> userList = new ArrayList<Map<String,Object>>();
		HttpEntity<String> httpEntity = new HttpEntity<String>(jsonData,httpHeaders);
		try {
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, httpEntity, String.class);
			userList = gson.fromJson(responseEntity.getBody(),new TypeToken<List<Map<String, Object>>>() {}.getType());
		} catch (Exception e) {
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		} 
		return userList;
	}

	@SuppressWarnings("resource")
	@Override
	public List<String> readExcelTemplate(MultipartFile file) throws ServiceException{
		List<String> userList = new ArrayList<String>();
		InputStream fis = null;
		try {
			byte [] byteArr = file.getBytes();
			fis = new ByteArrayInputStream(byteArr);
			
			Workbook workbook = null;	
			workbook = new XSSFWorkbook(fis);			
			Sheet sheet = workbook.getSheetAt(0);
			for (Row row : sheet) {
				String userName = "";
				if(row.getRowNum() != 0){
					userName = row.getCell(0).getStringCellValue().trim();						
					if(!"".equals(userName) && userName != null){
						userName = StringUtils.replace(userName, "_", "[_]");
						userName = StringUtils.replace(userName, "%", "[%]");
						userList.add(userName);
					}					
				}				
			}
			fis.close();
		} catch (Exception ex){
			throw ServiceException.get500SystemError(ex);
//			logger.error(logUtils.logOld(LogStatus.ER, "readExcelData Exception = {}"),ex);
		}finally{
			IOUtils.closeQuietly(fis);
		}
//		logger.info(logUtils.logOld(LogStatus.O, "userList :: {}"),userList);
//		logger.info(logUtils.logOld(LogStatus.EN, "readExcelData Controller"));
		return userList;
	}
	
	@SuppressWarnings("resource")
	@Override
	public boolean validateExcelLengthRecord(Integer length,MultipartFile file) throws ServiceException{
		InputStream fis = null;
		try {
			byte [] byteArr = file.getBytes();
			fis = new ByteArrayInputStream(byteArr);
			
			Workbook workbook = null;	
			workbook = new XSSFWorkbook(fis);			
			Sheet sheet = workbook.getSheetAt(0);
			for (Row row : sheet) {
				if(row.getRowNum() >= length){
					String userName = row.getCell(0).getStringCellValue().trim();						
					if(!"".equals(userName) && userName != null){
						return true;
					}
									
				}				
			}
			fis.close();
		} catch (Exception ex){
			throw ServiceException.get500SystemError(ex);
//			logger.error(logUtils.logOld(LogStatus.ER, "readExcelData Exception = {}"),ex);
		}finally{
			IOUtils.closeQuietly(fis);
		}
//		logger.info(logUtils.logOld(LogStatus.O, "userList :: {}"),userList);
//		logger.info(logUtils.logOld(LogStatus.EN, "readExcelData Controller"));
		return false;
	}
	
	@SuppressWarnings("resource")
	@Override
	public Integer getCountExcelTemplate(MultipartFile file) throws ServiceException{
		InputStream fis = null;
		try {
			byte [] byteArr = file.getBytes();
			fis = new ByteArrayInputStream(byteArr);
			
			Workbook workbook = null;	
			workbook = new XSSFWorkbook(fis);			
			Sheet sheet = workbook.getSheetAt(0);
			fis.close();
			
			return sheet.getPhysicalNumberOfRows();
			
		} catch (Exception ex){
			throw ServiceException.get500SystemError(ex);
//			logger.error(logUtils.logOld(LogStatus.ER, "readExcelData Exception = {}"),ex);
		}finally{
			IOUtils.closeQuietly(fis);
		}
//		logger.info(logUtils.logOld(LogStatus.O, "userList :: {}"),userList);
//		logger.info(logUtils.logOld(LogStatus.EN, "readExcelData Controller"));
		
	}
	@Override
	public List<Map<String, String>> getlistAppChangeByappName(Map<String, String> params, String username) throws ServiceException{
		List<Map<String, String>> response = null;
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		params.put("username", username);
		String jsonData = gson.toJson(params);
		HttpEntity<String> http = new HttpEntity<String>(jsonData,httpHeaders);
		String endpoint = apiHost+"/userrequest/listAppChangeByappName";
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, http, String.class);
			response=gson.fromJson(responseEntity.getBody(), new TypeToken<List<Map<String, String>>>() {}.getType());
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return response;
	}

	@Override
	public BaseGridResponse getlistAppChangeGridByappId(Map<String, Object> params, String username) throws ServiceException {
		BaseGridResponse gridResponse = new BaseGridResponse();
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		params.put("username", username);
		String data = gson.toJson(params);
		HttpEntity<String> httpEntity = new HttpEntity<String>(data,httpHeaders);
		String endpoint = apiHost + "/userrequest/listAppChangeGridByappId";
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, httpEntity, String.class);
			gridResponse=gson.fromJson(responseEntity.getBody(),BaseGridResponse.class);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return gridResponse;
	}

	@Override
	public List<Map<String, Object>> listRoleChgAppElm(Map<String, Object> params) throws ServiceException {
		List<Map<String,Object>> listDataChgApp = new ArrayList<Map<String,Object>>();
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		String endpoint = apiHost+"/userrequest/listChgAppComboBox";
		Gson gson = new GsonBuilder().create();
		HttpEntity<String> httpEntity = new HttpEntity<String>(gson.toJson(params),httpHeaders);
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, httpEntity, String.class);
			listDataChgApp = gson.fromJson(responseEntity.getBody(), new TypeToken<List<Map<String, Object>>>() {}.getType());
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return listDataChgApp;
	}

	@Override
	public String subMitforCommitdataChg(DataUserRequestValidate dataUserRequestValidate,Map<String, String> dataFormApp,List<Map<String, Object>> listDataChg) throws ServiceException {
		MultiValueMap<String, Object> parts = new LinkedMultiValueMap<String, Object>();
		parts.add("dataUserRequestValidate", dataUserRequestValidate);
		parts.add("dataFormApp", dataFormApp);
		parts.add("listapp", listDataChg);
		String idRequestNo=null; 	
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);
		String endpoint = apiHost+"/userrequest/commitDataAndEmail";
		HttpEntity<MultiValueMap<String, Object>> httpEntity = new HttpEntity<MultiValueMap<String, Object>>(parts,httpHeaders);
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(endpoint, HttpMethod.POST, httpEntity, String.class);
			idRequestNo = new GsonBuilder().create().fromJson(responseEntity.getBody(),String.class);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return idRequestNo;
	}


	@Override
	public List<Application> listAppGridByappNameAndType(Map<String, String> params) throws ServiceException {
			List<Application> applicationList = new ArrayList<Application>();
			Gson gson = new GsonBuilder().create();
			String datas = gson.toJson(params);
		try {
			
			String endPoint = apiHost +"/userrequest/listAppByNameAndType";
			HttpHeaders headers =  RestUtil.createAPIHeader();
			HttpEntity<String> requestEntity = new HttpEntity<String>(datas, headers);
			ResponseEntity<? extends ArrayList<Application>> responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, (Class<? extends ArrayList<Application>>)List.class);
			applicationList = responseEntity.getBody();
			
		} catch (Exception e) {
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		
		return applicationList;
	}

	@Override
	public BaseGridResponse getListAppRoleGridByappIdAndType(Map<String, Object> params) throws ServiceException {
		BaseGridResponse gridResponse = new BaseGridResponse();
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		String data = gson.toJson(params);
		HttpEntity<String> httpEntity = new HttpEntity<String>(data,httpHeaders);
		String endpoint = apiHost + "/userrequest/listAppRoleGridByappIdAndType";
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, httpEntity, String.class);
			gridResponse=gson.fromJson(responseEntity.getBody(),BaseGridResponse.class);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return gridResponse;
	}

	@Override
	public String subMitforCommitdataTer(DataUserRequestValidate dataUserRequestValidate,Map<String, String> dataFormApp,List<Map<String, Object>> listDataChg) {
		MultiValueMap<String, Object> parts = new LinkedMultiValueMap<String, Object>();
		parts.add("dataUserRequestValidate", dataUserRequestValidate);
		parts.add("dataFormApp", dataFormApp);
		parts.add("listapp", listDataChg);
		String idRequestNo=null; 	
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);
		String endpoint = apiHost+"/userrequest/commitDataAndEmail";
		HttpEntity<MultiValueMap<String, Object>> httpEntity = new HttpEntity<MultiValueMap<String, Object>>(parts,httpHeaders);
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(endpoint, HttpMethod.POST, httpEntity, String.class);
			idRequestNo = new GsonBuilder().create().fromJson(responseEntity.getBody(),String.class);
		}catch(Exception e){
			e.printStackTrace();
		}
		// TODO Auto-generated method stub
		return idRequestNo;
	}
	
	@Override
	public List<Map<String,Object>> getListDataFromUserProfileByappRoleId (List<String> appRoleIds) throws ServiceException {
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		List<Map<String,Object>> datasList = new ArrayList<Map<String,Object>>();
		Gson gson = new GsonBuilder().create();
		String endpoint = apiHost+"/userrequest/profile/listdata";
		String datasource = gson.toJson(appRoleIds);
		HttpEntity<String> httpEntity = new HttpEntity<String>(datasource,httpHeaders);
		Type collectionType  = new TypeToken<List<Map<String,Object>>>() {}.getType();
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, httpEntity, String.class);
			datasList = gson.fromJson(responseEntity.getBody(), collectionType);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return datasList;
	}

	@Override
	public List<Map<String, Object>> listAppSpcEligibleByAppname(Map<String, Object> params) throws ServiceException {
		List<Map<String,Object>> listData = new ArrayList<Map<String,Object>>();
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		String endpoint = apiHost+"/userrequest/listappEligibleListSpcByAppname";
		Gson gson = new GsonBuilder().create();
		HttpEntity<String> httpEntity = new HttpEntity<String>(gson.toJson(params),httpHeaders);
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, httpEntity, String.class);
			listData = gson.fromJson(responseEntity.getBody(), new TypeToken<List<Map<String, Object>>>() {}.getType());
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return listData;
	}

	@Override
	public BaseGridResponse listAppSpcGridEligibleByAppId(Map<String, Object> params) throws ServiceException {
		BaseGridResponse gridResponse = new BaseGridResponse();
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		String data = gson.toJson(params);
		HttpEntity<String> httpEntity = new HttpEntity<String>(data,httpHeaders);
		String endpoint = apiHost + "/userrequest/listAppSpcGridEligibleByAppId";
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, httpEntity, String.class);
			gridResponse=gson.fromJson(responseEntity.getBody(),BaseGridResponse.class);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return gridResponse;
	}

	
	@Override
	public BaseGridResponse listAppSpcGridEligibleByAppName(Map<String, Object> params) throws ServiceException {
		BaseGridResponse gridResponse = new BaseGridResponse();
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		String data = gson.toJson(params);
		HttpEntity<String> httpEntity = new HttpEntity<String>(data,httpHeaders);
		String endpoint = apiHost + "/userrequest/listAppSpcGridEligibleByAppName";
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, httpEntity, String.class);
			gridResponse=gson.fromJson(responseEntity.getBody(),BaseGridResponse.class);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return gridResponse;
	}
	
	@Override
	public boolean uploadAppUrTemplateUserRequest(String urNo, List<MultipartFile> listFiles) throws ServiceException {
		try{
			String dateTime = Utils.genFormatDate();
			String fullPath = FilesNasConfig.UR_USER_PATH+"/"+urNo+"/"+dateTime+"/";
			return fileUtilsService.saveFileToNas(fullPath,listFiles);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
	}
	
	@Override
	public void downloadTemplateUserRequest(String fileName,String filePath,HttpServletResponse httpServletResponse,HttpServletRequest httpServletRequest) throws ServiceException {
		try{
			fileUtilsService.downLoadFileFromNasByResponse(fileName, filePath, httpServletResponse, httpServletRequest);
		}
		catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
	}

	@Override
	public BaseGridResponse getlistAppChangeGridByappName(Map<String, Object> params) throws ServiceException {
		BaseGridResponse gridResponse = new BaseGridResponse();
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		String data = gson.toJson(params);
		HttpEntity<String> httpEntity = new HttpEntity<String>(data,httpHeaders);
		String endpoint = apiHost + "/userrequest/listAppChangeGridByappName";
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, httpEntity, String.class);
			gridResponse=gson.fromJson(responseEntity.getBody(),BaseGridResponse.class);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return gridResponse;
	}
	
	@Override
	public BaseGridResponse getlistAppTerAuthorGridByappName(Map<String, Object> params) throws ServiceException {
		BaseGridResponse gridResponse = new BaseGridResponse();
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		String data = gson.toJson(params);
		HttpEntity<String> httpEntity = new HttpEntity<String>(data,httpHeaders);
		String endpoint = apiHost + "/userrequest/listApp/terauthor/gridByappName";
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, httpEntity, String.class);
			gridResponse=gson.fromJson(responseEntity.getBody(),BaseGridResponse.class);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return gridResponse;
	}
	
	@Override
	public BaseGridResponse getListAppRoleGridByappNameAndType(Map<String, Object> params) throws ServiceException {
		BaseGridResponse gridResponse = new BaseGridResponse();
		HttpHeaders httpHeaders = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		String data = gson.toJson(params);
		HttpEntity<String> httpEntity = new HttpEntity<String>(data,httpHeaders);
		String endpoint = apiHost + "/userrequest/listAppRoleGridByappNameAndType";
		try{
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endpoint), HttpMethod.POST, httpEntity, String.class);
			gridResponse=gson.fromJson(responseEntity.getBody(),BaseGridResponse.class);
		}catch(Exception e){
			e.printStackTrace();
			throw ServiceException.get500SystemError(e);
		}
		return gridResponse;
	}

	@Override
	public List<UrForUser> reloadTokenUrForUser(List<UrForUser> urForUserList) throws ServiceException {
		List<UrForUser> result = new ArrayList<UrForUser>();
		
		String endPoint = apiHost +"/userrequest/ur/checktoken";
		
		HttpHeaders headers = RestUtil.createAPIHeader();
		
		HttpEntity<List<UrForUser>> requestEntity = new HttpEntity<List<UrForUser>>(urForUserList,headers);
		ResponseEntity<String> responseEntity;
		
		try {
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity,	String.class);
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
		return result;
	}
}

