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
        int isOk = userMapper.joinUser(uvo); // 가입 시도
        if (isOk == 1) {
            long uno = uvo.getUno();
            log.info("가입할 User의 uno >>>> {}", uno);

            if (uno != 0) {
                userMapper.insertAuth(uno);
            } else {
                long insertedUno = userMapper.getInsertedUno(uvo.getEmail());
                if (insertedUno != 0) {
                    userMapper.insertAuth(insertedUno);
                } else {
                    log.error("uno 값이 존재하지 않습니다. 가입 실패!");
                }
            }
        } else {
            log.error("회원가입에 실패하였습니다.");
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

    @Override
    public int duplicationNick(String nickName) {
        return userMapper.duplicationNick(nickName);
    }

    @Override
    public int duplicationEmail(String email) {
        return userMapper.duplicationEmail(email);
    }

    @Override
    public int findUserPw(String email) {
        return userMapper.findUserPw(email);
    }

    @Override
    public String getPath(String uno) {
        return userMapper.getPath(uno);
    }

    @Override
    public String getUserNick(long uno) {
        return userMapper.getUserNick(uno);
    }

    @Override
    public int addAdditionalInfo(UserVO uvo) {
        return userMapper.addAdditionalInfo(uvo);
    }

    @Override
    public boolean checkAdditionalInfo(long unoNum) {
        return userMapper.checkAdditionalInfo(unoNum);
    }

}

