package th.cu.thesis.fur.web.service;

import java.util.Map;

import th.cu.thesis.fur.web.model.grid.TodoListInfoGridResponse;
import th.cu.thesis.fur.web.service.exception.ServiceException;

public interface TodoListService {
	
	public TodoListInfoGridResponse getTodoList(Map<String,String> params) throws ServiceException;
	
}
