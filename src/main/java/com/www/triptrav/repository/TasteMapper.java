package com.www.triptrav.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TasteMapper {
    int checkData(String uno);

    int deleteTasteDataByUno(String uno);

    int insertTasteData(String uno, Integer cno);
}
