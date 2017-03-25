package th.cu.thesis.fur.acim.web.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import th.cu.thesis.fur.web.model.grid.TodoListInfoGridResponse;
import th.cu.thesis.fur.web.service.TodoListService;
import th.cu.thesis.fur.web.service.exception.ServiceException;

@Controller
@RequestMapping(value = "/todolist")
public class TodoListController {

	
	@Autowired
	TodoListService todoListService;
	
	@RequestMapping(method = RequestMethod.GET)
	public String toTodoList(Authentication authentication,Model model) throws ServiceException {
		return "todolists/todolists";
	}
	
	@RequestMapping(value = "/ur", method = RequestMethod.GET)
	@ResponseBody
	public TodoListInfoGridResponse getTodoList(@RequestParam Map<String, String> params) throws ServiceException {
		return todoListService.getTodoList(params);
	}
	
}
