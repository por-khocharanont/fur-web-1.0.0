package th.cu.thesis.fur.web.model;

public class FlowConfig {
		private Integer no;
		private String flowname;
		private String flowtype;
		private String usertype;
		private String delete;

		public Integer getNo() {
			return no;
		}
		public void setNo(Integer no) {
			this.no = no;
		}
		public String getFlowname() {
			return flowname;
		}
		public void setFlowname(String flowname) {
			this.flowname = flowname;
		}
		public String getFlowtype() {
			return flowtype;
		}
		public void setFlowtype(String flowtype) {
			this.flowtype = flowtype;
		}

		public String getUsertype() {
			return usertype;
		}
		public void setUsertype(String usertype) {
			this.usertype = usertype;
		}
		public String getDelete() {
			return delete;
		}
		public void setDelete(String delete) {
			this.delete = delete;
		}
		@Override
		public String toString() {
			StringBuilder builder = new StringBuilder();
			builder.append("FlowConfig [no=");
			builder.append(no);
			builder.append(", flowname=");
			builder.append(flowname);
			builder.append(", flowtype=");
			builder.append(flowtype);
			builder.append(", usertype=");
			builder.append(usertype);
			builder.append(", delete=");
			builder.append(delete);
			builder.append("]");
			return builder.toString();
		}



		
		
		
}
