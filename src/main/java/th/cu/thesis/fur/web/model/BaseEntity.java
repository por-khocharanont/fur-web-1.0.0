package th.cu.thesis.fur.web.model;

import java.io.Serializable;
import java.util.Date;

public class BaseEntity implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String createdBy;
	private String updatedBy; 
	
	private Date createdDate;
	private Date updatedDate;
	
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	public Date getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}
	
}
