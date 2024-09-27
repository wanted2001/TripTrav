package com.www.triptrav.repository;

import com.www.triptrav.domain.PlanVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PlanMapper {
    int insertPlan(PlanVO pvo);
}
