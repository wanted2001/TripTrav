package com.www.triptrav.repository;

import com.www.triptrav.domain.UserVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int joinUser(UserVO uvo);

    void insertAuth(String email);
}
