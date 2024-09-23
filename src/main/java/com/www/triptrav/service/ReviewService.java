package com.www.triptrav.service;

import com.www.triptrav.domain.ReviewVO;

public interface ReviewService {
    int post(ReviewVO rvo);

    void saveReviewImage(long rno, String imagePath);
}
