package com.www.triptrav.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ScheduleMemoMapper {
    int insertMemoContent(@Param("memo") String memo, @Param("sco") long sco);
}
