package com.www.triptrav.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ScheduleCompanionMapper {
    int inviteUserAddPlan(@Param("uno") long uno, @Param("sco") long sco);
}
