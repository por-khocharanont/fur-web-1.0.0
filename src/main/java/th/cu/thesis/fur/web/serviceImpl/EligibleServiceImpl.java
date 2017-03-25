package th.cu.thesis.fur.web.serviceImpl;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import th.cu.thesis.fur.web.log.LogFormater;
import th.cu.thesis.fur.web.model.ApplicationRole;
import th.cu.thesis.fur.web.model.Eligible;
import th.cu.thesis.fur.web.model.Organize;
import th.cu.thesis.fur.web.model.grid.EligibleGridRequest;
import th.cu.thesis.fur.web.model.grid.EligibleGridResponse;
import th.cu.thesis.fur.web.model.grid.EligibleTableInfo;
import th.cu.thesis.fur.web.repository.model.UserInfo;
import th.cu.thesis.fur.web.service.EligibleService;
import th.cu.thesis.fur.web.service.exception.ServiceException;
import th.cu.thesis.fur.web.util.RestUtil;
import th.cu.thesis.fur.web.util.Utils;

import com.google.gson.Gson;

@Service("eligibleService")
public class EligibleServiceImpl implements EligibleService{
	
	private static final Logger logger = LoggerFactory.getLogger(EligibleServiceImpl.class);

	@Autowired
	private RestTemplate restTemplate;
	
	@Value("${fur.api.host}")
	private String apiHost;
	
	@Override
	public List<Organize> getOrganizeByOrgCode(String orgCode) throws ServiceException {
		
		List<Organize> organizeList = new ArrayList<Organize>();
		
		try {
			
			String endPoint = apiHost +"/eligible/orgcode";
			HttpHeaders headers =  RestUtil.createAPIHeader();
			HttpEntity<String> requestEntity = new HttpEntity<String>(orgCode, headers);
			
			String logMSG = "URL: POST "+endPoint+", HEADER:"+headers+",PARAM:, BODY:"+orgCode;
			logger.info(LogFormater.API_REQUEST, "getOrganizeByOrgCode", logMSG);
			
			ResponseEntity<? extends ArrayList<Organize>> responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, (Class<? extends ArrayList<Organize>>)ArrayList.class);
			
			logMSG = "URL: POST "+endPoint+", HEADER:"+headers+", BODY:"+responseEntity.getBody();
			logger.info(LogFormater.API_RESPONSE, "getOrganizeByOrgCode", logMSG);
			
			organizeList = responseEntity.getBody();
			
		} catch (Exception e) {
			logger.error(LogFormater.WEB_ERROR, "getOrganizeByOrgCode", e.getMessage(),e);
			throw ServiceException.get500SystemError(e);
		}
		return organizeList;
	}

	@Override
	public List<Organize> getOrganizeByOrgName(String orgName) throws ServiceException {
		
		List<Organize> organizeList = new ArrayList<Organize>();
		
		try {
			
			String endPoint = apiHost +"/eligible/orgname";
			HttpHeaders headers =  RestUtil.createAPIHeader();
			HttpEntity<String> requestEntity = new HttpEntity<String>(orgName, headers);
			
			
			String logMSG = "URL: POST "+endPoint+", HEADER:"+headers+",PARAM:, BODY:"+orgName;
			logger.info(LogFormater.API_REQUEST, "getOrganizeByOrgName", logMSG);
			
			ResponseEntity<? extends ArrayList<Organize>> responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, (Class<? extends ArrayList<Organize>>)ArrayList.class);
			
			logMSG = "URL: POST "+endPoint+", HEADER:"+headers+", BODY:"+responseEntity.getBody();
			logger.info(LogFormater.API_RESPONSE, "getOrganizeByOrgName", logMSG);
			
			organizeList = responseEntity.getBody();
			
		} catch (Exception e) {
			logger.error(LogFormater.WEB_ERROR, "getOrganizeByOrgName", e.getMessage(),e);
			throw ServiceException.get500SystemError(e);
		}
		return organizeList;
	}
	
	@Override
	public List<Organize> getOrganizeByOrgDesc(String orgDesc) throws ServiceException {


		List<Organize> organizeList = new ArrayList<Organize>();
		
		try {
			
			String endPoint = apiHost +"/eligible/orgdesc";
		
			HttpHeaders headers =  RestUtil.createAPIHeader();
			HttpEntity<String> requestEntity = new HttpEntity<String>(orgDesc, headers);
			
			
			String logMSG = "URL: POST "+endPoint+", HEADER:"+headers+",PARAM:, BODY:"+orgDesc;
			logger.info(LogFormater.API_REQUEST, "getOrganizeByOrgDesc", logMSG);
			
			ResponseEntity<? extends ArrayList<Organize>> responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, (Class<? extends ArrayList<Organize>>)ArrayList.class);
			
			logMSG = "URL: POST "+endPoint+", HEADER:"+headers+", BODY:"+responseEntity.getBody();
			logger.info(LogFormater.API_RESPONSE, "getOrganizeByOrgDesc", logMSG);
			
			organizeList = responseEntity.getBody();
			
		} catch (Exception e) {
			logger.error(LogFormater.WEB_ERROR, "getOrganizeByOrgDesc", e.getMessage(),e);
			throw ServiceException.get500SystemError(e);
		}
		return organizeList;
	
	}

	@Override
	public EligibleGridResponse getGridEligibleList(Map<String, String> params) throws ServiceException {
		
		EligibleGridResponse response = new EligibleGridResponse();
		
		try {
			String endPoint = apiHost +"/eligible/search";
			HttpHeaders headers =  RestUtil.createAPIHeader();
			
			int page = Integer.valueOf(params.get("page"));
			int rowNum = Integer.valueOf(params.get("rows"));
			String sidx = params.get("sidx");
			String sord = params.get("sord");
			
			String orgCode = params.get("orgCode");
			String orgDesc =  params.get("orgDesc");
			String appId = params.get("appId");
			String appName = params.get("appName");
			String appRoleName = params.get("appRoleName");
			
			EligibleGridRequest eligibleGrid = new EligibleGridRequest();
			eligibleGrid.setPage(page);
			eligibleGrid.setRows(rowNum);
			eligibleGrid.setSidx(sidx);
			eligibleGrid.setSord(sord);
			
			eligibleGrid.setApplicationId(appId);
			eligibleGrid.setApplicationName(appName);
			eligibleGrid.setApplicationRoleName(appRoleName);
			eligibleGrid.setOrgcode(orgCode);
			eligibleGrid.setOrgdesc(orgDesc);
			
			Gson gson = Utils.getGson();
			String eligibleJson = gson.toJson(eligibleGrid);
			HttpEntity<String> requestEntity = new HttpEntity<String>(eligibleJson,headers);
			ResponseEntity<String> responseEntity;
			
			String logMSG = "URL: POST "+endPoint+", HEADER:"+headers+",PARAM:, BODY:"+eligibleJson;
			logger.info(LogFormater.API_REQUEST, "getGridEligibleList", logMSG);
			
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, String.class);
			
			logMSG = "URL: POST "+endPoint+", HEADER:"+headers+", BODY:"+responseEntity.getBody();
			logger.info(LogFormater.API_RESPONSE, "getGridEligibleList", logMSG);
			
			response = gson.fromJson(responseEntity.getBody(), EligibleGridResponse.class);
			
			
			
		} catch (Exception e) {
			logger.error(LogFormater.WEB_ERROR, "getGridEligibleList", e.getMessage(),e);
			throw ServiceException.get500SystemError(e);
		}
		
		
		return response;
	}
	
	@Override
	public void createEligible(List<Eligible> eligibleList) throws ServiceException {

		try {
			
			String endPoint = apiHost +"/eligible/list";
			HttpHeaders headers =  RestUtil.createAPIHeader();
			
			UsernamePasswordAuthenticationToken user = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
			String userName = ((UserInfo) user.getPrincipal()).getUsername();
			
			
			for(Eligible eligible : eligibleList){
				eligible.setCreatedBy(userName);
				eligible.setUpdatedBy(userName);
			}
			
			Gson gson = Utils.getGson();
			String eligibleJSON= gson.toJson(eligibleList);
			HttpEntity<String> requestEntity = new HttpEntity<String>(eligibleJSON, headers);
			
			String logMSG = "URL: POST "+endPoint+", HEADER:"+headers+",PARAM:, BODY:"+eligibleJSON;
			logger.info(LogFormater.API_REQUEST, "createEligible", logMSG);
			
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, String.class);			
			
			logMSG = "URL: POST "+endPoint+", HEADER:"+headers+", BODY:"+responseEntity.getBody();
			logger.info(LogFormater.API_RESPONSE, "createEligible", logMSG);
			
			
		} catch (Exception e) {
			logger.error(LogFormater.WEB_ERROR, "createEligible", e.getMessage(),e);
			throw ServiceException.get500SystemError(e);
		}
		
	}


	@Override
	public void deleteEligibleByIdList(List<String> eligibleIdList) throws ServiceException {
		
		try {
			HttpHeaders headers =  RestUtil.createAPIHeader();
			HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
			ResponseEntity<String> responseEntity;
			
			for(String eligibleId : eligibleIdList){
				
				String endPoint = apiHost +"/eligible/" + eligibleId;
				
				String logMSG = "URL: POST "+endPoint+", HEADER:"+headers+",PARAM:"+eligibleId+", BODY:";
				logger.info(LogFormater.API_REQUEST, "deleteEligibleByIdList", logMSG);
				
				responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.DELETE, requestEntity, String.class);			
				
				logMSG = "URL: POST "+endPoint+", HEADER:"+headers+", BODY:"+responseEntity.getBody();
				logger.info(LogFormater.API_RESPONSE, "deleteEligibleByIdList", logMSG);
				
				
			}
			
			
			
		} catch (Exception e) {
			
			logger.error(LogFormater.WEB_ERROR, "deleteEligibleByIdList", e.getMessage(),e);
			throw ServiceException.get500SystemError(e);
		}
		
	}
	
	@Override
	public List<Eligible> getEligibleByAppRoleList(List<ApplicationRole> appRoleList) throws ServiceException {
		List<Eligible> eligibleList = new ArrayList<Eligible>();
		try {
			String endPoint = apiHost +"/eligible/approlelist";
			HttpHeaders headers =  RestUtil.createAPIHeader();
			
			String body = Utils.getGsonDate().toJson(appRoleList);
			
			HttpEntity<String> requestEntity = new HttpEntity<String>(body,headers);
			
			String logMSG = "URL: POST "+endPoint+", HEADER:"+headers+",PARAM:, BODY:"+body;
			logger.info(LogFormater.API_REQUEST, "getEligibleByAppRoleList", logMSG);
			
			ResponseEntity<? extends ArrayList<Eligible>> responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, (Class<? extends ArrayList<Eligible>>)ArrayList.class);

			logMSG = "URL: POST "+endPoint+", HEADER:"+headers+", BODY:"+responseEntity.getBody();
			logger.info(LogFormater.API_RESPONSE, "getEligibleByAppRoleList", logMSG);
			
			eligibleList = responseEntity.getBody();
			
		} catch (Exception e) {
			
			logger.error(LogFormater.WEB_ERROR, "getEligibleByAppRoleList", e.getMessage(),e);
			throw ServiceException.get500SystemError(e);
		}
		return eligibleList;
	}

	public List<EligibleTableInfo> getEligibleByAppId(String appId) throws ServiceException {
		List<EligibleTableInfo> eligibleList = new ArrayList<EligibleTableInfo>();
		try {
			String endPoint = apiHost +"/eligible/approlelist/"+appId;
			HttpHeaders headers =  RestUtil.createAPIHeader();
			
			HttpEntity<String> requestEntity = new HttpEntity<String>(null,headers);
			
			String logMSG = "URL: POST "+endPoint+", HEADER:"+headers+",PARAM:"+appId+", BODY:";
			logger.info(LogFormater.API_REQUEST, "getEligibleByAppId", logMSG);
			
			ResponseEntity<List<EligibleTableInfo>> responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.GET, requestEntity, new ParameterizedTypeReference<List<EligibleTableInfo>>(){});
			
			logMSG = "URL: POST "+endPoint+", HEADER:"+headers+", BODY:"+responseEntity.getBody();
			logger.info(LogFormater.API_RESPONSE, "getEligibleByAppId", logMSG);
			
			eligibleList = responseEntity.getBody();
			
		} catch (Exception e) {
			
			logger.error(LogFormater.WEB_ERROR, "getEligibleByAppId", e.getMessage(),e);
			throw ServiceException.get500SystemError(e);
		}
		return eligibleList;
	}

	
	
	
}
