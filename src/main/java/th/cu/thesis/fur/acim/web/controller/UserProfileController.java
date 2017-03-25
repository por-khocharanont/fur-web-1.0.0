package th.cu.thesis.fur.acim.web.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import th.cu.thesis.fur.web.filter.RestControllerFilter;
import th.cu.thesis.fur.web.log.LogFormater;
import th.cu.thesis.fur.web.model.User;
import th.cu.thesis.fur.web.model.grid.UserApplicationInfoGridResponse;
import th.cu.thesis.fur.web.model.grid.UserTokenInfoGridResponse;
import th.cu.thesis.fur.web.repository.model.UserInfo;
import th.cu.thesis.fur.web.service.UserService;
import th.cu.thesis.fur.web.service.exception.ServiceException;

@Controller
public class UserProfileController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserProfileController.class);

	@Autowired
	UserService userService;
	
	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	public String toProfile(Authentication authentication,Model model) throws ServiceException {
		
		logger.info(LogFormater.WEB_REQUEST, "INIT", "");
		
		UserInfo  userInfo = (UserInfo) authentication.getPrincipal();
		User emp = userService.getProfileByUserId(userInfo.getUserId());
		int applicationCount = userService.countApplicationByType("1", emp.getUsername());
		int telecomCount = userService.countApplicationByType("2", emp.getUsername());
		int tokenCount = userService.countTokenApplication(emp.getUsername());
		model.addAttribute("applicationCount", applicationCount);
		model.addAttribute("telecomCount", telecomCount);
		model.addAttribute("tokenCount", tokenCount);
		model.addAttribute("userProfile", emp);
		return "userprofile/profile";
	}
	
	@RequestMapping(value = "/users/applications/{type}", method = RequestMethod.GET)
	@ResponseBody
	public UserApplicationInfoGridResponse getApplicationByType(@PathVariable("type") String type,@RequestParam Map<String, String> params,Authentication authentication) throws ServiceException {
		UserInfo  userInfo = (UserInfo) authentication.getPrincipal();
		User emp = userService.getProfileByUserId(userInfo.getUserId());
		String username = emp.getUsername();
		UserApplicationInfoGridResponse userApplicationInfoGridResponse = userService.getApplicationByType(type,params,username);
		System.out.println(userApplicationInfoGridResponse);
		return userApplicationInfoGridResponse;
	}
	
	@RequestMapping(value = "/users/tokens", method = RequestMethod.GET)
	@ResponseBody
	public UserTokenInfoGridResponse getTokenUser(@RequestParam Map<String, String> params,Authentication authentication) throws ServiceException {
		UserInfo  userInfo = (UserInfo) authentication.getPrincipal();
		User emp = userService.getProfileByUserId(userInfo.getUserId());
		String username = emp.getUsername();
		UserTokenInfoGridResponse userTokenInfoGridResponse = userService.getApplicationByUserToken(params,username);
		return userTokenInfoGridResponse;
	}
	
}
