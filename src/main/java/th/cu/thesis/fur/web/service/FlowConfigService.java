package th.cu.thesis.fur.web.service;

import java.util.Map;

import th.cu.thesis.fur.web.model.FlowConfig;
import th.cu.thesis.fur.web.model.grid.FlowconfigGridResponse;
import th.cu.thesis.fur.web.service.exception.ServiceException;

public interface FlowConfigService {
	
	public FlowconfigGridResponse getSearchFlowconfig(Map<String,String> params) throws ServiceException;
	
	public FlowConfig getApplicationById(Integer flowid) throws ServiceException;
	
	public void insertFlowConfig(FlowConfig insertForm) throws ServiceException;
}
