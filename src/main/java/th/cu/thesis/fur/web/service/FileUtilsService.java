package th.cu.thesis.fur.web.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jcifs.smb.SmbFile;

import org.springframework.web.multipart.MultipartFile;

import th.cu.thesis.fur.web.model.FilesNasConfig;
import th.cu.thesis.fur.web.model.Status;
import th.cu.thesis.fur.web.service.exception.ServiceException;

public interface FileUtilsService {

	public void downLoadFile(String fileName, String patch,
			HttpServletResponse response, Integer bufferSize)
			throws ServiceException;

	public double convertSize(double fileSize) throws ServiceException;

	public SmbFile connectNas(String patchFile) throws ServiceException;

	public boolean saveFileToNas(String pathFolder, List<MultipartFile> files)
			throws ServiceException;

	public boolean saveFileToNas(String pathFolder, MultipartFile files)
			throws ServiceException;

	public void downLoadFileFromNasByResponse(String fileName, String filePath, HttpServletResponse response,HttpServletRequest request) throws ServiceException;

	public byte[] downLoadFileFromNas(String patchFile, String fileName)
			throws ServiceException;

	public boolean deleteFileFromNas(String patchFile) throws ServiceException;

	public boolean checkFileFromNas(String patchFile) throws ServiceException;

	public Status chkAttachFileTemplate(List<MultipartFile> fileUpload,
			boolean chkTemp, String tempName) throws ServiceException;

	public Status chkAttachFileTemplateGroup(MultipartFile fileUpload,
			String tempName) throws ServiceException;

	public Status chkFileSize(Integer size, Boolean totalSize,
			List<MultipartFile> fileUpload) throws ServiceException;

	public Status chkFileSize(Integer size, MultipartFile fileUpload)
			throws ServiceException;

	public Status chkMinFileAttach(List<MultipartFile> fileUpload, Integer min)
			throws ServiceException;

	public List<String> listFileFromNas(String path) throws ServiceException;
	
	public FilesNasConfig getFilesNasConfig();
	
}
