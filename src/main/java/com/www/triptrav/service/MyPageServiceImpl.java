package com.www.triptrav.service;

import com.www.triptrav.domain.*;
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
    public List<ScheduleVO> scheduleCall(long uno) {
        return myPageMapper.scheduleCall(uno);
    }

    @Override
    public List<ReviewVO> getReviewList(long uno) {
        return myPageMapper.getReviewList(uno);
    }

    @Override
    public List<ReviewImageVO> getReviewDTOList(long uno) {
        return myPageMapper.getReviewDTOList(uno);
    }

    @Override
    public ReviewVO getPopReview(long rno) {
        return myPageMapper.getPopReview(rno);
    }

    @Override
    public ScheduleDetailVO getScheduleDetail(long sco) {
        return myPageMapper.getScheduleDetail(sco);
    }
}
