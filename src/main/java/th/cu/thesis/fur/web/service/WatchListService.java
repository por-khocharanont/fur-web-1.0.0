package th.cu.thesis.fur.web.service;

import java.util.List;
import java.util.Map;

import th.cu.thesis.fur.web.model.grid.WatchListGridResponse;
import th.cu.thesis.fur.web.repository.model.UserInfo;
import th.cu.thesis.fur.web.service.exception.ServiceException;

public interface WatchListService {
	
	public UserInfo getList(String username) throws ServiceException;
	
	public WatchListGridResponse searchGridWatchList(Map<String, String> params) throws ServiceException;
		
	public void closeUr(List<String> urIdList) throws ServiceException;
	
	

}
