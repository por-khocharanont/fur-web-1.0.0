package th.cu.thesis.fur.web.util;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.mchange.v2.log.LogUtils;

import th.cu.thesis.fur.web.model.FileInfo;
import th.cu.thesis.fur.web.repository.model.UserInfo;
import th.cu.thesis.fur.web.service.exception.ServiceException;

@Component
public class Utils {
	private final Logger logger = LoggerFactory.getLogger(Utils.class);	
	private MessageSource messageSource;
	private static final Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm:ss").create();
	private static final Gson gsonDate = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm:ss").create();
	
	@Autowired
	public void setMessageSource(MessageSource messageSource) {
		this.messageSource = messageSource;
	}
	
	public static String generateUUID() {
		return UUID.randomUUID().toString();
	}
	
	public String convertToUTF8(String s) {
        String out = null;
        try {
            out = new String(s.getBytes("UTF-8"), "ISO-8859-1");
        } catch (java.io.UnsupportedEncodingException e) {
            return null;
        }
        return out;
    }
	
	public String convertFromUTF8(String s) {
        String out = null;
        try {
            out = new String(s.getBytes("ISO-8859-1"), "UTF-8");
        } catch (java.io.UnsupportedEncodingException e) {
            return null;
        }
        return out;
    }
	
	public String getMessage(String textCode) {
		String text = "";
//		text = this.convertFromUTF8(messageSource.getMessage(textCode, null, null));
		text = messageSource.getMessage(textCode, null, Locale.ENGLISH);
//		text = messageSource.getMessage(textCode, null, "Default", null);
		
		return text;
	}
	
	public List<String> setListFileName(List<MultipartFile> request) {
		List<String> fileNameList = new ArrayList<String>();
		
		if(request != null){
			if(request.size() > 0 && !"".equals(request.get(0).getOriginalFilename())){
				for (MultipartFile multipartFile : request) {
					fileNameList.add(multipartFile.getOriginalFilename().replace(" ","_"));
				}
			}
		}else{
			fileNameList = null;
		}
		
		return fileNameList;
	}	
	
	public static Gson getGson() {
		return gson;
	}

	
	public static Gson getGsonDate() {
		return gsonDate;
	}
	
	public static UserInfo getuserInfo() {
		
		UserInfo userInfo = new UserInfo();
		try {
			
			UsernamePasswordAuthenticationToken user = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
			userInfo = (UserInfo) user.getPrincipal();
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return userInfo;
	}

	
	public static String genFormatDate (){
		String pattern = "yyyyMMddHHmmss";
		String dt = DateFormatUtils.format(Calendar.getInstance().getTime(), pattern);
		return dt;
	}

	public static String genUniqueIdByDate (){
		String pattern = "yyyyMMddHHmmss";
		String dt = DateFormatUtils.format(Calendar.getInstance().getTime(), pattern);
		int ran = RandomUtils.nextInt(10000, 99999);
		return dt + ran;
	}
	
	public static List<FileInfo> getFileInfoByApplicationFile(String appFile) {
		Type collectionType  = new TypeToken<List<FileInfo>>() {}.getType();
		
		List<FileInfo> appFileList = Utils.getGson().fromJson(appFile, collectionType);
		return appFileList;
	}

}
