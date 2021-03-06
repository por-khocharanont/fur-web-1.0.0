package th.cu.thesis.fur.web.serviceImpl;

import java.net.URI;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import th.cu.thesis.fur.web.model.FlowConfig;
import th.cu.thesis.fur.web.model.grid.FlowconfigGridRequest;
import th.cu.thesis.fur.web.model.grid.FlowconfigGridResponse;
import th.cu.thesis.fur.web.service.FlowConfigService;
import th.cu.thesis.fur.web.service.exception.ServiceException;
import th.cu.thesis.fur.web.util.RestUtil;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Service("flowconfigService")
public class FlowConfigServiceImpl implements FlowConfigService {
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Value("${fur.api.host}")
	private String apiHost;

	@Override
	public FlowconfigGridResponse getSearchFlowconfig(Map<String, String> params)
			throws ServiceException {
		HttpHeaders header = RestUtil.createAPIHeader();
		Gson gson = new GsonBuilder().create();
		String tobackend = apiHost + "/flowconfig/search";
		FlowconfigGridRequest flowconfigGridRequest = new FlowconfigGridRequest();
		Integer page = Integer.valueOf(params.get("page"));
		Integer rows = Integer.valueOf(params.get("rows"));
		String sidx = params.get("sidx");
		String sord = params.get("sord");
		flowconfigGridRequest.setColumnFlowname(params.get("flowname"));
		flowconfigGridRequest.setColumnFlowname(params.get("flowtype"));
		flowconfigGridRequest.setColumnFlowname(params.get("usertype"));
		flowconfigGridRequest.setPage(page);
		flowconfigGridRequest.setRows(rows);
		flowconfigGridRequest.setSidx(sidx);
		flowconfigGridRequest.setSord(sord);
		String frontEndjsonString = gson.toJson(flowconfigGridRequest);
		
		HttpEntity<String> httpEntity = new HttpEntity<String>(frontEndjsonString, header);
		ResponseEntity<String> responseEntity;
		FlowconfigGridResponse flowconfigGridResponse=new FlowconfigGridResponse();
			try{
				responseEntity = restTemplate.exchange(new URI(tobackend), HttpMethod.POST, httpEntity, String.class);
				flowconfigGridResponse = gson.fromJson(responseEntity.getBody(), FlowconfigGridResponse.class);
			}catch(Exception e){
				e.printStackTrace();
			}
		// TODO Auto-generated method stub
		return flowconfigGridResponse;
	}

	@Override
	public FlowConfig getApplicationById(Integer flowid)
			throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void insertFlowConfig(FlowConfig insertForm) throws ServiceException {
		// TODO Auto-generated method stub
		
	}
	
	
}
