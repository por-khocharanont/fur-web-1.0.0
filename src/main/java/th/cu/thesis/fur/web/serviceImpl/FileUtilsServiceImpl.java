package th.cu.thesis.fur.web.serviceImpl;

import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jcifs.smb.NtlmPasswordAuthentication;
import jcifs.smb.SmbException;
import jcifs.smb.SmbFile;
import jcifs.smb.SmbFileInputStream;
import jcifs.smb.SmbFileOutputStream;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import th.cu.thesis.fur.web.model.FilesNasConfig;
import th.cu.thesis.fur.web.model.Status;
import th.cu.thesis.fur.web.service.FileUtilsService;
import th.cu.thesis.fur.web.service.exception.ServiceException;

@Service("fileUtilsService")
public class FileUtilsServiceImpl implements FileUtilsService {
	
	
	@Autowired
	private FilesNasConfig filesNasConfig;
	
	public FilesNasConfig getFilesNasConfig() {
		return this.filesNasConfig;
	}
	
	@Override
	public void downLoadFile(String fileName, String patch,
			HttpServletResponse response, Integer bufferSize)
			throws ServiceException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public double convertSize(double fileSize) throws ServiceException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public SmbFile connectNas(String directTo) throws ServiceException {
		
		jcifs.Config.setProperty("jcifs.smb.lmCompatibility", filesNasConfig.getJcifsLmCompatibility()); 
		jcifs.Config.setProperty("jcifs.util.loglevel", filesNasConfig.getJcifsLoglevel());
//		jcifs.Config.setProperty("jcifs.encoding", jcifsEncoding);
		jcifs.Config.setProperty("jcifs.smb.client.useExtendedSecurity", filesNasConfig.getJcifsUseExtendedSecurity()); 
		jcifs.Config.setProperty("jcifs.resolveOrder", filesNasConfig.getJcifsResolveOrder()); 
		jcifs.Config.setProperty("jcifs.smb.client.dfs.disabled", filesNasConfig.getJcifsDisabled());
		
		String url = "smb://"+filesNasConfig.getHostNas() + directTo;
		
		NtlmPasswordAuthentication auth = new NtlmPasswordAuthentication(filesNasConfig.getDomainNas(), filesNasConfig.getUserNas(), filesNasConfig.getPassNas());
		
		SmbFile dir = null;
		try {
			dir = new SmbFile(url, auth);		
		}
		catch (Exception e) {
//			logger.error("connectNas Error :: ",e);
			e.printStackTrace();
		}
		return dir;
	}

	@Override
	public boolean saveFileToNas(String pathFolder, List<MultipartFile> files)throws ServiceException {
//		logger.info(logUtils.logOld(LogStatus.S, "saveFileToNas Muti"));
		boolean status = false;
		String pathPrimary = filesNasConfig.getPathPrimary();
		String directTo = pathPrimary+pathFolder;
		SmbFile dir = connectNas(directTo);		
		try {
	        if (!dir.exists())
	            dir.mkdirs();

			for (MultipartFile multipartFile : files) {					                
				if(multipartFile.getSize() > 0){
					byte[] bytes = multipartFile.getBytes();					               
	                SmbFile serverFile = connectNas(directTo + multipartFile.getOriginalFilename().replace(" ","_"));
	                SmbFileOutputStream stream = new SmbFileOutputStream(serverFile);
	                stream.write(bytes);
	                stream.close();
	                
//	        		logger.info(logUtils.logOld(LogStatus.O, "Server File Location = {}"), serverFile.getPath());
				}
			}	
		} catch (Exception e) {
			throw ServiceException.get500SystemError(e);
//			logger.info(logUtils.logOld(LogStatus.ER, ""), e);
		}
		status = true;		
//		logger.info(logUtils.logOld(LogStatus.EN, "saveFileToNas Muti"));
		return status;
	}

	@Override
	public boolean saveFileToNas(String patchFile, MultipartFile files)
			throws ServiceException {
//		logger.debug("########## Start saveFileToNas ############");
		boolean status = false;
		SmbFile dir = connectNas(patchFile);		
		try {
	        if (!dir.exists())
	            dir.mkdirs();
		
			if(files.getSize() > 0){
				byte[] bytes = files.getBytes();					               
                SmbFile serverFile = connectNas(patchFile + files.getOriginalFilename().replace(" ","_"));
                SmbFileOutputStream stream = new SmbFileOutputStream(serverFile);
                stream.write(bytes);
                stream.close();
	                
//                logger.info("Server File Location :: {}" , serverFile.getPath());
			}
		} catch (Exception e) {
//			logger.error("saveFileToNas Error ::",e);
		}
		status = true;		
//		logger.debug("########## End saveFileToNas ############");
		return status;
	}

	@Override
	public void downLoadFileFromNasByResponse(String fileName, String filePath, HttpServletResponse response,HttpServletRequest request) throws ServiceException {
		//Example Full /acim/share/ + this here add another filepath
		String fullPath = filesNasConfig.getPathPrimary()+filePath+fileName;
		
		OutputStream outStream = null;
		SmbFileInputStream inputStream = null;	
		int bufferSize = 3027;
		try{
			String mimeType	=null;
			SmbFile downLoadfile = connectNas(fullPath);
			inputStream = new SmbFileInputStream(downLoadfile);
			mimeType = SmbFile.guessContentTypeFromName(fileName);
	
			 // set content attributes for the response 
			response.setContentType(mimeType);
			response.setContentLength((int)downLoadfile.length());
			
			// set headers for the response
			String headerKey = "Content-Disposition";
			String headerValue = String.format("attachment; filename=\"%s\"", fileName);
			response.setHeader(headerKey, headerValue);
			
			outStream = response.getOutputStream();
			
			byte[] buffer = new byte[bufferSize];
	        int bytesRead = -1;
			while ((bytesRead = inputStream.read(buffer)) != -1) {
		    	 outStream.write(buffer, 0, bytesRead);
		     }
			// write bytes read from the input stream into the output stream

		}catch(Exception e){
			throw ServiceException.get500SystemError(e);
		}finally{
			IOUtils.closeQuietly(outStream);
			IOUtils.closeQuietly(inputStream);
		}
		
	}

	@Override
	public byte[] downLoadFileFromNas(String patchFile, String fileName)
			throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteFileFromNas(String patchFile) throws ServiceException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean checkFileFromNas(String patchFile) throws ServiceException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Status chkAttachFileTemplate(List<MultipartFile> fileUpload,
			boolean chkTemp, String tempName) throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Status chkAttachFileTemplateGroup(MultipartFile fileUpload,
			String tempName) throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Status chkFileSize(Integer size, Boolean totalSize,
			List<MultipartFile> fileUpload) throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Status chkFileSize(Integer size, MultipartFile fileUpload)
			throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Status chkMinFileAttach(List<MultipartFile> fileUpload, Integer min)
			throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> listFileFromNas(String path) throws ServiceException {
//		logger.info(logUtils.log(LogStatus.S, "{}"), path);
		List<String> listFileName = new ArrayList<String>();
		SmbFile smbFile = connectNas(path);
		try {
			if(smbFile != null){				
				for (SmbFile file : smbFile.listFiles()) {
//					logger.info(logUtils.log(LogStatus.P, "File Name = {}"), file.getName());
					listFileName.add(file.getName());
				}				
			}
		} catch (SmbException e) {
//			logger.error(logUtils.log(LogStatus.ER), e);
		}
//		logger.info(logUtils.log(LogStatus.EN, "{}"), listFileName);
		return listFileName;
	}

	

}
