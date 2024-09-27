package com.www.triptrav.repository;

import com.www.triptrav.domain.ScheduleRoleVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ScheduleRoleMapper {
    void insertPlanRole(@Param("sco") long sco, @Param("uno") long uno, @Param("i") int i);
}
