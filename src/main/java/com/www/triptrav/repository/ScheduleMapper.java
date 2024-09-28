package com.www.triptrav.repository;

import com.www.triptrav.domain.ScheduleDTO;
import com.www.triptrav.domain.ScheduleVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ScheduleMapper {
    int insertPlan(ScheduleVO scheVO);

    ScheduleDTO getSchedule(long sco);
}
