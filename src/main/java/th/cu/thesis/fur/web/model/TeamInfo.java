package th.cu.thesis.fur.web.model;

import java.util.List;

import th.cu.thesis.fur.web.repository.model.UserInfo;

public class TeamInfo {
	private String name;
	private List<UserInfo> member;

	public TeamInfo() {
	}

	public TeamInfo(String name, List<UserInfo> member) {
		this.name = name;
		this.member = member;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<UserInfo> getMember() {
		return member;
	}

	public void setMember(List<UserInfo> member) {
		this.member = member;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("TeamInfo [name=");
		builder.append(name);
		builder.append(", member=");
		builder.append(member);
		builder.append("]");
		return builder.toString();
	}

}
