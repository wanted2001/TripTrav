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
        if (isOk == 1) {
            int uno = uvo.getUno();
            log.info("가입할 User의 uno >>>> {}", uno);
            if (uno != 0) {
                userMapper.insertAuth(uno);
            } else {
                int insertedUno = userMapper.getInsertedUno(uvo);
                if (insertedUno != 0) {
                    userMapper.insertAuth(insertedUno);
                } else {
                    log.info("uno 값이 존재하지 xxxxx");
                }
            }
        }
    }

                @Override
                public UserVO checkEmail (String email){
                    UserVO user = userMapper.checkEmail(email);
                    if (user != null) {
                        user.setAuthList(userMapper.selectAuth(email));
                        return user;
                    }
                    return null;
                }

            }

