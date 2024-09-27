package com.www.triptrav.service;

import com.www.triptrav.domain.UserVO;
import com.www.triptrav.repository.MyPageMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {

    private final MyPageMapper myPageMapper;

    @Override
    public UserVO isSocial(long uno) {
        return  myPageMapper.isSocial(uno);
    }

    @Override
    public List<UserVO> scheduleCall(long uno) {
        return myPageMapper.scheduleCall(uno);
    }
}
