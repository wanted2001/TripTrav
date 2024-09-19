package com.www.triptrav.service;

import com.www.triptrav.domain.UserVO;

public interface UserService{
    void joinUser(UserVO uvo);

    UserVO checkEmail(String email);
}
