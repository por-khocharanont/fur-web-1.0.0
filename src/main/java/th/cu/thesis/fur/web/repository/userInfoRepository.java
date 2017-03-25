package th.cu.thesis.fur.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.*;

import th.cu.thesis.fur.web.repository.model.UserInfo;

public interface userInfoRepository {
	final String SELECT_ALL = "SELECT * FROM STUDENT";
	final String SELECT = "SELECT * FROM STUDENT WHERE ID = #{id}";
	final String DELETE = "DELETE FROM STUDENT WHERE ID = #{id}";
	final String INSERT = "INSERT INTO STUDENT (NAME, BRANCH, PERCENTAGE, PHONE, EMAIL ) VALUES (#{name}, #{branch}, #{percentage}, #{phone}, #{email})";
	final String UPDATE = "UPDATE STUDENT SET EMAIL = #{email}, NAME = #{name}, BRANCH = #{branch}, PERCENTAGE = #{percentage}, PHONE = #{phone} WHERE ID = #{id}";

	@Select(SELECT_ALL)
	List<UserInfo> getAll();

	@Select(SELECT)
	UserInfo getById(Integer id);
	
	@Insert(INSERT)
	void insert(UserInfo userInfo);

	@Update(UPDATE)
	void update(UserInfo userInfo);

	@Delete(DELETE)
	void delete(Integer id);
	
}
