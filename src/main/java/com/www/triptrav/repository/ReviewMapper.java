package com.www.triptrav.repository;

import com.www.triptrav.domain.ReviewVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ReviewMapper {
    int post(ReviewVO rvo);

    void insertReviewImage(@Param("rno") Long rno, @Param("imagePath") String imagePath);
}
