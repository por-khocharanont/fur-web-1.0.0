package th.cu.thesis.fur.web.serviceImpl;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;

import th.cu.thesis.fur.web.log.LogFormater;
import th.cu.thesis.fur.web.model.grid.WatchListGridRequest;
import th.cu.thesis.fur.web.model.grid.WatchListGridResponse;
import th.cu.thesis.fur.web.repository.model.UserInfo;
import th.cu.thesis.fur.web.service.WatchListService;
import th.cu.thesis.fur.web.service.exception.ServiceException;
import th.cu.thesis.fur.web.util.RestUtil;
import th.cu.thesis.fur.web.util.Utils;

@Service("watchListService")
public class WatchListServiceImpl implements WatchListService{
	
	private static final Logger logger = LoggerFactory.getLogger(WatchListServiceImpl.class);

	@Autowired
	private RestTemplate restTemplate;
	
	@Value("${fur.api.host}")
	private String apiHost;
	
	@Override
	public UserInfo getList(String username) throws ServiceException {
		
		UserInfo userInfo = null;
		
		String endPoint = apiHost +"/watchlists/"+username;
		HttpHeaders headers =  RestUtil.createAPIHeader();
		
		HttpEntity<String> requestEntity = new HttpEntity<String>(null,headers);
		ResponseEntity<UserInfo> responseEntity = null;			
		try {
			
			
			String logMSG = "URL: GET "+endPoint+", HEADER:"+headers+",PARAM:'', BODY:''";
			logger.info(LogFormater.API_REQUEST, "getList", logMSG);
			
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.GET, requestEntity, UserInfo.class);
			
			logMSG = "URL: GET "+endPoint+", HEADER:"+headers+", BODY:"+responseEntity.getBody();
			logger.info(LogFormater.API_RESPONSE, "getList", logMSG);
			
			userInfo  = responseEntity.getBody();
			
		} catch (HttpStatusCodeException  e) {
			String body = e.getResponseBodyAsString();
			//TODO
			//need fix
		} catch (URISyntaxException e) {
			
			// ?????????????????????
//				authUserStatus = new AuthUserStatus();
//				authUserStatus.setCode(999);
//				authUserStatus.setMessage("Connection Error");
		} catch (Exception e) {
			
			logger.error(LogFormater.WEB_ERROR, "getList", e.getMessage(),e);
			throw ServiceException.get500SystemError(e);
		}
		
		return userInfo;
	}

	@Override
	public WatchListGridResponse searchGridWatchList(Map<String, String> params) throws ServiceException {
		
		WatchListGridResponse response = new WatchListGridResponse();
		try {
			
			String endPoint = apiHost +"/watchlist/search";
			HttpHeaders headers =  RestUtil.createAPIHeader();
			Gson gson=  Utils.getGson();
			
			int page = Integer.valueOf(params.get("page"));
			int rowNum = Integer.valueOf(params.get("rows"));
			String sidx = params.get("sidx");
			String sord = params.get("sord");
			
			String userRequestNo = params.get("requestNo");
			String urNo = params.get("urNo");
			String startDate = params.get("startDate");
			String endDate = params.get("endDate");
			String urStep = params.get("selectUrStep");
			String urStatus = params.get("urStatus");
			
			WatchListGridRequest watchListGrid = new WatchListGridRequest();
			
			watchListGrid.setPage(page);
			watchListGrid.setRows(rowNum);
			watchListGrid.setSidx(sidx);
			watchListGrid.setSord(sord);
			
			watchListGrid.setUserRequestNo(userRequestNo);
			watchListGrid.setUrNo(urNo);
			watchListGrid.setStartDate(startDate);
			watchListGrid.setEndDate(endDate);
			watchListGrid.setUrStep(urStep);
			watchListGrid.setUrStatus(urStatus);
			
			String watchListJson = gson.toJson(watchListGrid);
			HttpEntity<String> requestEntity = new HttpEntity<String>(watchListJson,headers);
			ResponseEntity<WatchListGridResponse> responseEntity;
			
			String logMSG = "URL: POST "+endPoint+", HEADER:"+headers+",PARAM:'', BODY:"+watchListJson;
			logger.info(LogFormater.API_REQUEST, "searchGridWatchList", logMSG);
			
			responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, WatchListGridResponse.class);
			
			logMSG = "URL: POST "+endPoint+", HEADER:"+headers+", BODY:"+ responseEntity.getBody();
			logger.info(LogFormater.API_RESPONSE, "getList", logMSG);
			
			response = responseEntity.getBody();
			
		} catch (Exception e) {
			
			logger.error(LogFormater.WEB_ERROR, "searchGridWatchList", e.getMessage(),e);
			throw ServiceException.get500SystemError(e);
			
		}
		
		
		return response;
	}

	@Override
	public void closeUr(List<String> urIdList) throws ServiceException {
		
		try {
			
			String endPoint = apiHost +"/watchlist/ur/close";
			HttpHeaders headers =  RestUtil.createAPIHeader();
			Gson gson=  Utils.getGson();
			
			String urIdListJson = gson.toJson(urIdList);
			
			HttpEntity<String> requestEntity = new HttpEntity<String>(urIdListJson,headers);

			String logMSG = "URL: POST "+endPoint+", HEADER:"+headers+",PARAM:'', BODY:"+urIdListJson;
			logger.info(LogFormater.API_REQUEST, "closeUr", logMSG);
			
			ResponseEntity<String> responseEntity = restTemplate.exchange(new URI(endPoint), HttpMethod.POST, requestEntity, String.class);			
						
			logMSG = "URL: POST "+endPoint+", HEADER:"+headers+", BODY:"+responseEntity.getBody();
			logger.info(LogFormater.API_RESPONSE, "getList", logMSG);
			
			
		} catch (Exception e) {
			
			logger.error(LogFormater.WEB_ERROR, "closeUr", e.getMessage(),e);
			throw ServiceException.get500SystemError(e);
		}
		
		
	}

}
