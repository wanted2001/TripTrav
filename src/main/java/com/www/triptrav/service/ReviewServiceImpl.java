package com.www.triptrav.service;

import com.www.triptrav.domain.ReviewVO;
import com.www.triptrav.repository.ReviewMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private final ReviewMapper reviewMapper;

    @Override
    public int post(ReviewVO rvo) {
        return reviewMapper.post(rvo);
    }

    @Override
    public void saveReviewImage(long rno, String imagePath) {
        reviewMapper.insertReviewImage(rno, imagePath);
    }
}
