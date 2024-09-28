package com.www.triptrav.service;

import com.www.triptrav.domain.ScheduleDTO;

public interface ScheduleDetailService {
    void insertDetailPlan(long sco, long contentId, int i, int j);

    void updatePlan(ScheduleDTO scheDTO);
}
