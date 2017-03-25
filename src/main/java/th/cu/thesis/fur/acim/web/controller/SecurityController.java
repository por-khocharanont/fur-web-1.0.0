package th.cu.thesis.fur.acim.web.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import th.cu.thesis.fur.web.util.Utils;


/**
 * Handles requests for the security.
 */
@Controller
public class SecurityController {
	
	private static final Logger logger = LoggerFactory.getLogger(SecurityController.class);
	
	@Autowired
	private Utils utils;
	
	@Autowired
	private ResourceBundleMessageSource messageSource;
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String toLogin() {
		return "login";
	}
	
	@RequestMapping(value = "/login", params = "error")
	public String loginFailed(HttpServletRequest request, Locale locale, Model model, HttpSession session) {
		
		try {
			
			String errorMsg = (String) session.getAttribute("errorMsg");		
			Date date = new Date();
			DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
			String formattedDate = dateFormat.format(date);
			
			if(StringUtils.isBlank(errorMsg)){
				errorMsg = utils.getMessage("message.error.default");
			}else{
				errorMsg = utils.getMessage("login.error."+errorMsg);
			}
			
			model.addAttribute("serverTime", formattedDate);
			model.addAttribute("error", true);		
			model.addAttribute("errorMessage", errorMsg);
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return "login";
	}
	
}
