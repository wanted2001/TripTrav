package com.www.triptrav.service;

import com.www.triptrav.domain.ScheduleDTO;
import com.www.triptrav.domain.ScheduleVO;

public interface ScheduleService {
    int insertPlan(ScheduleVO scheVO, long contentId);

    ScheduleDTO getSchedule(long sco);
}
