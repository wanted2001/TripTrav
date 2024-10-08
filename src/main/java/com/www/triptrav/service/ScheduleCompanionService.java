package com.www.triptrav.service;

import com.www.triptrav.domain.ScheduleCompanionVO;

import java.util.List;

public interface ScheduleCompanionService {
    int inviteUserAddPlan(long uno, long sco, String nick);

    List<ScheduleCompanionVO> getCompanionList(long sco);
}
