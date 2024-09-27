package com.www.triptrav.repository;

import com.www.triptrav.domain.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MyPageMapper {
    UserVO isSocial(long uno);

    List<UserVO> scheduleCall(long uno);
}
