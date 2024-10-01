package com.www.triptrav.service;

import com.www.triptrav.domain.ScheduleDTO;
import com.www.triptrav.domain.ScheduleDetailVO;

import java.util.List;

public interface ScheduleDetailService {
    void insertDetailPlan(long sco, long contentId, int i, int j, String placeTtile);

    void updatePlan(ScheduleDTO scheDTO);

    List<ScheduleDetailVO> getPlanDate(long sco, int date);

    void emptyPlan(long sco, int sche_date);
}
