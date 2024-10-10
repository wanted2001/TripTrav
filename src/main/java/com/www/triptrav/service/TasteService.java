package com.www.triptrav.service;

import java.util.List;

public interface TasteService {
    int checkData(String uno);

    int updateData(List<Integer> cnoList, String uno);

    int insertData(List<Integer> cnoList, String uno);
}
