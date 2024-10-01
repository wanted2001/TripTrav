package com.www.triptrav.service;


import com.www.triptrav.domain.ReviewDTO;
import com.www.triptrav.domain.ReviewImageVO;
import com.www.triptrav.domain.ReviewVO;
import com.www.triptrav.domain.UserVO;

import java.util.List;

public interface MyPageService {
    UserVO isSocial(long uno);

    List<UserVO> scheduleCall(long uno);

    List<ReviewVO> getReviewList(long uno);

    List<ReviewImageVO> getReviewDTOList(long uno);

    ReviewVO getPopReview(long rno);
}
