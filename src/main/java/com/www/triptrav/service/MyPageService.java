package com.www.triptrav.service;


import com.www.triptrav.domain.UserVO;

import java.util.List;

public interface MyPageService {
    UserVO isSocial(long uno);

    List<UserVO> scheduleCall(long uno);
}
