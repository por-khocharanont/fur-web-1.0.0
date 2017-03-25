package th.cu.thesis.fur.web.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import th.cu.thesis.fur.web.model.ApplicationReportParams;
import th.cu.thesis.fur.web.model.EligibleReportParams;
import th.cu.thesis.fur.web.model.UrReportParams;
import th.cu.thesis.fur.web.model.grid.BaseGridResponse;
import th.cu.thesis.fur.web.service.exception.ServiceException;

public interface ReportService {
	public BaseGridResponse searchReport(Map<String,String> param) throws ServiceException;

	public BaseGridResponse searchUr(Map<String, String> param) throws ServiceException;
	
	public void exportExcelApplicationDefault (HttpServletResponse response, ApplicationReportParams paramsApp) throws ServiceException;

	public void exportExcelUrDefault(HttpServletResponse response,UrReportParams paramsUr) throws ServiceException;

	public BaseGridResponse searchEligible(Map<String, String> param)throws ServiceException;

	public void exportExcelEligibleDefault(HttpServletResponse response,EligibleReportParams paramsUr)throws ServiceException;

	public List<Map<String, String>> getflowAll()throws ServiceException;
}
