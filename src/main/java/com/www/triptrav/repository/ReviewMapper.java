package com.www.triptrav.repository;

import com.www.triptrav.domain.ReviewVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReviewMapper {
    int post(ReviewVO rvo);

    void insertReviewImage(@Param("rno")Long rno, @Param("imagePath")String imagePath);

    List<ReviewVO> getList(long contentId);

    List<String> getImagePathsByReviewId(long rno);

    int getCount(String contentId);
}

