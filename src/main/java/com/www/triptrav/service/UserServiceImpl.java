package com.www.triptrav.service;

import com.www.triptrav.domain.UserVO;
import com.www.triptrav.repository.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserMapper userMapper;

    @Override
    public void joinUser(UserVO uvo) {
        int isOk = userMapper.joinUser(uvo);
        if(isOk == 1){
            userMapper.insertAuth(uvo.getEmail());
        }
    }

    @Override
    public UserVO checkEmail(String email) {
        UserVO user = userMapper.checkEmail(email);
        if (user != null) {
            user.setAuthList(userMapper.selectAuth(email));
            return user;
        }
        return null;
    }

}
