package com.www.triptrav.service;

import com.www.triptrav.domain.ReviewVO;

import java.util.List;

public interface ReviewService {
    int post(ReviewVO rvo);

    void saveReviewImage(long rno, String imagePath);

    List<ReviewVO> getList(long contentId);

    List<String> getImagePathsByReviewId(long rno);
}

