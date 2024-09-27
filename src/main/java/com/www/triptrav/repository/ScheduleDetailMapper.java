package com.www.triptrav.repository;

import com.www.triptrav.domain.ScheduleDetailVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ScheduleDetailMapper {
    void insertDetailPlan(@Param("sco") long sco, @Param("contentId") long contentId, @Param("i") int i);
}
