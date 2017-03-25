package th.cu.thesis.fur.acim.web.controller.model;

import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ResponseBody;

import th.cu.thesis.fur.web.service.exception.MessageInfo;
import th.cu.thesis.fur.web.service.exception.ServiceException;

public class AbstractWebRestController {
	
	private static final Logger logger = LoggerFactory.getLogger(AbstractWebRestController.class);
	
	@ExceptionHandler(ServiceException.class)
	@ResponseBody
	public MessageInfo handlerServiceException(ServiceException e, HttpServletResponse response){
		logDetailServiceException(e);
		response.setStatus(e.getHttpStatus());
		System.out.println(e);
		return e.getMessageInfo();
	}
	
//	@ExceptionHandler(Exception.class)
//	@ResponseBody
//	public MessageInfo handlerServiceException(Exception e, HttpServletResponse response){
//		MessageInfo messageInfo = null;
//		if(e instanceof ServiceException) {
//			ServiceException serviceException = (ServiceException) e;
//			logDetailServiceException(serviceException);
//			response.setStatus(serviceException.getHttpStatus());
//			return serviceException.getMessageInfo();
//		}
//		
//		return messageInfo;
//	}
	
	private void logDetailServiceException(ServiceException e) {
		MessageInfo messageInfo = e.getMessageInfo();
		if(e.getHttpStatus() == HttpStatus.INTERNAL_SERVER_ERROR.value() && messageInfo != null) {
			// if 500 printStackTrace
			logger.error(e.getMessage(), e);
		} else {
			logger.warn(e.getMessage());
		}
		
		logger.debug(e.getMessage(), e);
	}

}
