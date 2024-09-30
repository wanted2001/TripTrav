package com.www.triptrav.repository;

import com.www.triptrav.domain.ScheduleDTO;
import com.www.triptrav.domain.ScheduleDetailVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ScheduleDetailMapper {
    void insertDetailPlan(@Param("sco") long sco, @Param("contentId") long contentId, @Param("i") int i, @Param("j") int j);

    void updatePlan(ScheduleDTO scheDTO);

    List<ScheduleDetailVO> getPlanDate(@Param("sco") long sco, @Param("date") int date);
}
