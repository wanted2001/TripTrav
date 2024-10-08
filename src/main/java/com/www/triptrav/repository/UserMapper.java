package com.www.triptrav.repository;

import com.www.triptrav.domain.AuthVO;
import com.www.triptrav.domain.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    //일반 회원가입
    int joinUser(UserVO uvo);

    //일반 - 권한부여
    void insertAuth(long uno);

    //provider ID 가지고 가서 user 객체 검색
    UserVO searchUser(String providerId);

    //소셜 회원가입
    void insertSocialUser(UserVO newUser);

    UserVO checkEmail(String email);

    List<AuthVO> selectAuth(String email);

    long getInsertedUno(String uvo);

    int duplicationNick(String nickName);

    int duplicationEmail(String email);

    void updatePw(String email, String newPw);

    int findUserPw(String email);

    String getPath(String uno);

    String getUserNick(long uno);
}
