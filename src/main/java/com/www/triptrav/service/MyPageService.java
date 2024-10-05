package com.www.triptrav.service;


import com.www.triptrav.domain.*;

import java.util.List;

public interface MyPageService {
    UserVO isSocial(long uno);

    List<ScheduleVO> scheduleCall(long uno);

    List<ReviewVO> getReviewList(long uno);

    List<ReviewImageVO> getReviewDTOList(long uno);

    ReviewVO getPopReview(long rno);

    ScheduleDetailVO getScheduleDetail(long sco);
}
