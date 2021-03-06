package th.cu.thesis.fur.web.util;

import java.net.URI;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import th.cu.thesis.fur.web.repository.model.UserInfo;

@Component
public class RestUtil {
	
	public static final String HEADER_X_ACIM_USER = "x-acim-user";
	public static final String HEADER_X_ACIM_CLIENT = "x-acim-client";
	public static final String X_ORDER_REF_NAME = "x-orderRef";
	
	@Autowired
	private RestTemplate restTemplate;
	
	public static HttpHeaders createAPIHeader() {
		
		UsernamePasswordAuthenticationToken user = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
		WebAuthenticationDetails details = (WebAuthenticationDetails) user.getDetails();
		String ipAddress = details.getRemoteAddress();	
		String userName = ((UserInfo) user.getPrincipal()).getUsername();
		
		HttpHeaders headers = new HttpHeaders();
		List<MediaType> accepts = new ArrayList<MediaType>();
		accepts.add(MediaType.APPLICATION_JSON);
		MediaType contentType = new MediaType("application", "json", Charset.forName("UTF-8"));
		
		headers.setContentType(contentType);
		headers.setAccept(accepts);
		headers.set(HEADER_X_ACIM_USER, userName);
		headers.set(HEADER_X_ACIM_CLIENT, ipAddress);
		headers.set(X_ORDER_REF_NAME, Utils.generateUUID());
		return headers;
	}
	
	public static HttpHeaders createAuthenHeader(String username, String ipAddress) {
		
		HttpHeaders headers = new HttpHeaders();
		List<MediaType> accepts = new ArrayList<MediaType>();
		accepts.add(MediaType.APPLICATION_JSON);
		MediaType contentType = new MediaType("application", "json", Charset.forName("UTF-8"));
		
		headers.setContentType(contentType);
		headers.setAccept(accepts);
		headers.set(HEADER_X_ACIM_USER, username);
		headers.set(HEADER_X_ACIM_CLIENT, ipAddress);
		headers.set(X_ORDER_REF_NAME, Utils.generateUUID());
		return headers;
	}
	
	public ResponseEntity<String> exchange(URI url, HttpMethod method, HttpEntity<String> requestEntity, Class<String> responseType) throws Exception {
		
		ResponseEntity<String> responseEntity = restTemplate.exchange(url, method, requestEntity, responseType);
		
		return responseEntity;
	}
}
