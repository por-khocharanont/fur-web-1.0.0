package th.cu.thesis.fur.web.serviceImpl;

import java.lang.reflect.Type;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.reflect.TypeToken;

import th.cu.thesis.fur.web.model.Application;
import th.cu.thesis.fur.web.model.ApplicationAuthentication;
import th.cu.thesis.fur.web.model.ApplicationForm;
import th.cu.thesis.fur.web.model.ApplicationRequest;
import th.cu.thesis.fur.web.model.ApplicationRole;
import th.cu.thesis.fur.web.model.ApplicationRoleResponse;
import th.cu.thesis.fur.web.model.FileInfo;
import th.cu.thesis.fur.web.model.grid.AppOwnerTableInfo;
import th.cu.thesis.fur.web.model.grid.ApplicationAuthenticationCheckBox;
import th.cu.thesis.fur.web.model.grid.ApplicationGridRequest;
import th.cu.thesis.fur.web.model.grid.ApplicationGridResponse;
import th.cu.thesis.fur.web.model.grid.CustodianTableInfo;
import th.cu.thesis.fur.web.model.grid.EligibleTableInfo;
import th.cu.thesis.fur.web.service.ApplicationService;
import th.cu.thesis.fur.web.service.FileUtilsService;
import th.cu.thesis.fur.web.service.exception.MessageInfo;
import th.cu.thesis.fur.web.service.exception.ServiceException;
import th.cu.thesis.fur.web.util.RestUtil;
import th.cu.thesis.fur.web.util.Utils;

@Service("applicationService")
public class ApplicationServiceImpl implements ApplicationService {

	@Autowired
	private RestTemplate restTemplate;
	
	
	@Autowired
	private FileUtilsService fileUtilsService;
	
	@Autowired
	private ApplicationService applicationService;
	
	
	@Value("${fur.api.host}")
	private String apiHost;
	
	private static final int CHECKBOX_OPTIONS = 3;
	
	private static final String OPTION_USB = "USB";
	private static final String OPTION_OTP = "OTP";
	private static final String OPTION_USERNAME ="Username/Password";
	
	private static final String APP_FILE_PATH = "app/template/";
	
	@Override
	public ApplicationGridResponse getSearchApplications(Map<String,String> params) throws ServiceException {
		ApplicationGridResponse applicationGridResponse = null;
		HttpHeaders headers = RestUtil.createAPIHeader();
		String endPoint = apiHost +"/applications/search";// Change EndPoint 
		
		ApplicationGridRequest applicationGridRequest = new ApplicationGridRequest();
		applicationGridRequest.setAppName(params.get("appName"));
		applicationGridRequest.setStatus(params.get("status"));
		applicationGridRequest.setRoleName(params.get("roleName"));
		applicationGridRequest.setAuthenticationType(params.get("authenticationType"));
		applicationGridRequest.setAppOwnerName(params.get("appOwnerName"));
		applicationGridRequest.setCustodianName(params.get("custodianName"));
		applicationGridRequest.setApplicationType(params.get("applicationType"));
		applicationGridRequest.setSidx(params.get("sidx"));
		applicationGridRequest.setSord(params.get("sord"));
		applicationGridRequest.setPage(Integer.valueOf(params.get("page")));
		applicationGridRequest.setRows(Integer.valueOf(params.get("rows")));
		
		String appModelJson = Utils.getGsonDate().toJson(applicationGridRequest);
		HttpEntity<String> requestEntity = new HttpEntity<String>(appModelJson,headers);
		ResponseEntity<String> responseEntity;
		
		try {
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity,	String.class);

			applicationGridResponse = Utils.getGsonDate().fromJson(responseEntity.getBody(), ApplicationGridResponse.class);
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return applicationGridResponse;
	}

	@Override
	public Application getApplicationById(String appId) throws ServiceException {
		Application application = new Application();
		String endPoint = apiHost +"/applications/"+appId;
		HttpHeaders headers =  RestUtil.createAPIHeader();
		
		HttpEntity<String> requestEntity = new HttpEntity<String>(null,headers);
		ResponseEntity<Application> responseEntity = null;			
		try {
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.GET, requestEntity, Application.class);
			application = responseEntity.getBody();
			
		} catch (HttpStatusCodeException  e) {
			
		} catch (URISyntaxException e) {
			
		}
		
		return application;
	}

	@Override
	public void insertApplication(Map<String,Object> params,List<MultipartFile> files) throws ServiceException {
		
		String jsonData = (String) params.get("jsonData");
		String endPoint = apiHost +"/applications";
		HttpHeaders headers =  RestUtil.createAPIHeader();
		
		ApplicationForm application = Utils.getGsonDate().fromJson(jsonData, ApplicationForm.class);
		
		ApplicationRequest appRequest = new ApplicationRequest();
		appRequest.setApplicationForm(application);
		List<FileInfo> fileInfo = new ArrayList<FileInfo>();
		
		String currentTime = Utils.genUniqueIdByDate();
		
		String filePath = APP_FILE_PATH + application.getAppName() + "/" + currentTime + "/";
		for(MultipartFile file : files){
			FileInfo f = new FileInfo();
			String fileName = file.getOriginalFilename();
			f.setFileName(fileName);
			f.setFilePath(filePath);
			fileInfo.add(f);
		}
		
		appRequest.setFiles(fileInfo);
		
		String body = Utils.getGsonDate().toJson(appRequest);
		HttpEntity<String> requestEntity = new HttpEntity<String>(body,headers);
		try {
			restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, String.class);
			if(files.size()>0){
				fileUtilsService.saveFileToNas(filePath, files);
			}
		} catch (HttpStatusCodeException  e) {
			
		} catch (URISyntaxException e) {
			
		}
	}

	@Override
	public void updateApplication(Map<String,Object> params,List<MultipartFile> files) throws ServiceException {
		
		String deleteFile = (String) params.get("deleteFile");
		String jsonData = (String) params.get("jsonData");
		String endPoint = apiHost +"/applications";
		HttpHeaders headers =  RestUtil.createAPIHeader();
		
		ApplicationForm application = Utils.getGsonDate().fromJson(jsonData, ApplicationForm.class);
		
		Type collectionType  = new TypeToken<List<String>>() {}.getType();
		List<String> deleteFileList = Utils.getGson().fromJson(deleteFile,collectionType);
		
		ApplicationRequest appRequest = new ApplicationRequest();
		appRequest.setApplicationForm(application);
		appRequest.setDeleteFileNameList(deleteFileList);
		List<FileInfo> fileInfo = new ArrayList<FileInfo>();
		
		String currentTime = Utils.genUniqueIdByDate();
		
		String filePath = APP_FILE_PATH + application.getAppName() + "/" + currentTime + "/";
		for(MultipartFile file : files){
			FileInfo f = new FileInfo();
			String fileName = file.getOriginalFilename();
			f.setFileName(fileName);
			f.setFilePath(filePath);
			fileInfo.add(f);
		}
		
		appRequest.setFiles(fileInfo);
		
		String body = Utils.getGsonDate().toJson(appRequest);
		HttpEntity<String> requestEntity = new HttpEntity<String>(body,headers);
		try {
			restTemplate.exchange(new URI(endPoint), HttpMethod.PUT, requestEntity, String.class);
			if(files.size()>0){
				fileUtilsService.saveFileToNas(filePath, files);
			}
		} catch (HttpStatusCodeException  e) {
			
		} catch (URISyntaxException e) {
			
		}
	}

	@Override
	public List<Application> getApplicationByAppName(String appName) throws ServiceException {
		
		List<Application> applicationList = new ArrayList<Application>();
		
		try {
			
			String endPoint = apiHost +"/applications/appname";
			HttpHeaders headers =  RestUtil.createAPIHeader();
			HttpEntity<String> requestEntity = new HttpEntity<String>(appName, headers);
			
			ResponseEntity<? extends ArrayList<Application>> responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, (Class<? extends ArrayList<Application>>)ArrayList.class);
			applicationList = responseEntity.getBody();
			
			
			
		} catch (Exception e) {

			e.printStackTrace();
		}
		
		return applicationList;
	}
	
	@Override
	public List<Application> checkApplicationName(String appName) throws ServiceException {
		
		List<Application> applicationList = new ArrayList<Application>();
		
		try {
			String endPoint = apiHost +"/applications/appname/check";
			HttpHeaders headers =  RestUtil.createAPIHeader();
			HttpEntity<String> requestEntity = new HttpEntity<String>(appName, headers);
			ResponseEntity<? extends ArrayList<Application>> responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, (Class<? extends ArrayList<Application>>)ArrayList.class);
			applicationList = responseEntity.getBody();
			
		} catch (Exception e) {

			e.printStackTrace();
		}
		
		return applicationList;
	}

	@Override
	public ApplicationRoleResponse getApplicationRoleByAppId(String appId) throws ServiceException {
		
		ApplicationRoleResponse response = new ApplicationRoleResponse();
		List<ApplicationRole> appRoleList = new ArrayList<ApplicationRole>();
		
		try {
			String endPoint = apiHost +"/applications/approlelist/"+appId;
			HttpHeaders headers =  RestUtil.createAPIHeader();
			HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
			
			ResponseEntity<? extends ArrayList<ApplicationRole>> responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.GET, requestEntity, (Class<? extends ArrayList<ApplicationRole>>)ArrayList.class);
			appRoleList = responseEntity.getBody();

			response.setApplicationRoleList(appRoleList);
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public List<ApplicationAuthenticationCheckBox> getAuthenticationByAppId(String appId) throws ServiceException {
		List<ApplicationAuthenticationCheckBox> response = new ArrayList<ApplicationAuthenticationCheckBox>();
		List<ApplicationAuthentication> authentications = new ArrayList<ApplicationAuthentication>();
		try {
			String endPoint = apiHost +"/applications/authentication/"+appId;
			HttpHeaders headers =  RestUtil.createAPIHeader();
			HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
			ResponseEntity<List<ApplicationAuthentication>> responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.GET, requestEntity, new ParameterizedTypeReference<List<ApplicationAuthentication>>(){});
			authentications = responseEntity.getBody();

			for(int i = 1; i <= CHECKBOX_OPTIONS ;i++){
				ApplicationAuthenticationCheckBox authenCheckBox = new ApplicationAuthenticationCheckBox();
					authenCheckBox.setOptionName("");
					ApplicationAuthentication defaultAuthen = new ApplicationAuthentication();
				if(i==1){
					authenCheckBox.setOptionName(OPTION_USB);
				}
				if(i==2){
					authenCheckBox.setOptionName(OPTION_OTP);
				}
				if(i==3){
					authenCheckBox.setOptionName(OPTION_USERNAME);
				}
				
				authenCheckBox.setAppChecked(false);
				for(ApplicationAuthentication authen : authentications){
					if(i == Integer.valueOf(authen.getAuthenTypeName())){
						authenCheckBox.setAppChecked(true);
						authenCheckBox.setAppAuthen(authen);
					}
				}
				response.add(authenCheckBox);
			}
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public AppOwnerTableInfo getAppOwnerDetailByAppId(String appId) throws ServiceException {
		AppOwnerTableInfo response = new AppOwnerTableInfo();
		try {
			String endPoint = apiHost +"/applications/appowner/"+appId;
			HttpHeaders headers =  RestUtil.createAPIHeader();
			HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
			ResponseEntity<AppOwnerTableInfo> responseEntity;
			
			
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.GET, requestEntity, AppOwnerTableInfo.class);
			
			response = responseEntity.getBody();
				
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public CustodianTableInfo getCustodianDetailByAppId(String appId) throws ServiceException {
		CustodianTableInfo response = new CustodianTableInfo();
		try {
			String endPoint = apiHost +"/applications/custodian/"+appId;
			HttpHeaders headers =  RestUtil.createAPIHeader();
			HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
			ResponseEntity<CustodianTableInfo> responseEntity;
			
			
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.GET, requestEntity, CustodianTableInfo.class);
			
			response = responseEntity.getBody();
				
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return response;
	}

	public MessageInfo deleteApplicationRole(String appRoleId) throws ServiceException {
		MessageInfo response = new MessageInfo();
		HttpHeaders headers =  RestUtil.createAPIHeader();
		String endPoint = apiHost +"/applications/approle/"+appRoleId;
		
		HttpEntity<String> requestEntity = new HttpEntity<String>(null,headers);
		ResponseEntity<MessageInfo> responseEntity;
		
		try {
			
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.DELETE, requestEntity, MessageInfo.class);
			response = responseEntity.getBody();
			
		} catch (HttpStatusCodeException  e) {
			
		} catch (URISyntaxException e) {
			
		} catch(Exception e){
			e.printStackTrace();		
		}
		return response;
	}

	@Override
	public ApplicationRole insertApplicationRole(ApplicationRole appRole) throws ServiceException {
		ApplicationRole response = new ApplicationRole();
		HttpHeaders headers =  RestUtil.createAPIHeader();
		
		
		String endPoint = apiHost +"/applications/approle";
		ResponseEntity<String> responseEntity;
		String body = Utils.getGsonDate().toJson(appRole);
		HttpEntity<String> requestEntity = new HttpEntity<String>(body,headers);
		try {
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, String.class);
			response = Utils.getGsonDate().fromJson(responseEntity.getBody(),ApplicationRole.class);
			
		} catch (HttpStatusCodeException  e) {
			
		} catch (URISyntaxException e) {
			
		}
		
		return response;
		
	}

	@Override
	public void updateApplicationRole(ApplicationRole appRole) throws ServiceException {
		HttpHeaders headers =  RestUtil.createAPIHeader();
		String endPoint = apiHost +"/applications/approle/"+appRole.getAppRoleId();
		String body = Utils.getGsonDate().toJson(appRole);
		HttpEntity<String> requestEntity = new HttpEntity<String>(body,headers);
		try {
			restTemplate.exchange(new URI(endPoint), HttpMethod.PUT, requestEntity, String.class);
			
		} catch (HttpStatusCodeException  e) {
			
		} catch (URISyntaxException e) {
			
		}
		
		
	}

	@Override
	public EligibleTableInfo insertEligibleApplication(EligibleTableInfo eligible) throws ServiceException {
		EligibleTableInfo response = new EligibleTableInfo();
		HttpHeaders headers =  RestUtil.createAPIHeader();
		
		String endPoint = apiHost +"/applications/eligible";
		String body = Utils.getGsonDate().toJson(eligible);
		ResponseEntity<String> responseEntity;
		HttpEntity<String> requestEntity = new HttpEntity<String>(body,headers);
		try {
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, String.class);
			response = Utils.getGsonDate().fromJson(responseEntity.getBody(),EligibleTableInfo.class);
			
		} catch (HttpStatusCodeException  e) {
			
		} catch (URISyntaxException e) {
			
		}
		
		return response;
	}

	@Override
	public EligibleTableInfo updateEligibleApplication(EligibleTableInfo eligible) throws ServiceException {
		EligibleTableInfo response = new EligibleTableInfo();
		HttpHeaders headers =  RestUtil.createAPIHeader();
		
		String endPoint = apiHost +"/applications/eligible/"+eligible.getAppId();
		String body = Utils.getGsonDate().toJson(eligible);
		ResponseEntity<String> responseEntity;
		HttpEntity<String> requestEntity = new HttpEntity<String>(body,headers);
		try {
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.PUT, requestEntity, String.class);
			response = Utils.getGsonDate().fromJson(responseEntity.getBody(),EligibleTableInfo.class);
			
		} catch (HttpStatusCodeException  e) {
			
		} catch (URISyntaxException e) {
			
		}
		
		return response;
	}
	

	@Override
	public void updateAppOwner(ApplicationForm jsonData) throws ServiceException {
		HttpHeaders headers =  RestUtil.createAPIHeader();
		
		String endPoint = apiHost +"/applications/appowner/"+jsonData.getAppId();
		
		String body = Utils.getGsonDate().toJson(jsonData);
		HttpEntity<String> requestEntity = new HttpEntity<String>(body,headers);
		try {
			restTemplate.exchange(new URI(endPoint), HttpMethod.PUT, requestEntity, String.class);
		} catch (HttpStatusCodeException  e) {
			
		} catch (URISyntaxException e) {
			
		}
		
	}

	@Override
	public void updateCustodian(ApplicationForm jsonData) throws ServiceException {
		HttpHeaders headers =  RestUtil.createAPIHeader();
		
		String endPoint = apiHost +"/applications/custodian/"+jsonData.getAppId();
		
		String body = Utils.getGsonDate().toJson(jsonData);
		HttpEntity<String> requestEntity = new HttpEntity<String>(body,headers);
		try {
			restTemplate.exchange(new URI(endPoint), HttpMethod.PUT, requestEntity, String.class);
		} catch (HttpStatusCodeException  e) {
			
		} catch (URISyntaxException e) {
			
		}
	}

}
