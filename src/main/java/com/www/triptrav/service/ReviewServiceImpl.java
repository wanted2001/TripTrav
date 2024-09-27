package com.www.triptrav.service;

import com.www.triptrav.domain.ReviewVO;
import com.www.triptrav.repository.ReviewMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public List<ReviewVO> getList(long contentId) {
        return reviewMapper.getList(contentId);
    }

    @Override
    public List<String> getImagePathsByReviewId(long rno) {
        return reviewMapper.getImagePathsByReviewId(rno);
    }

    @Override
    public int getCount(String contentId) {
        return reviewMapper.getCount(contentId);
    }

}
