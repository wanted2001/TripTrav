package com.www.triptrav.service;

import com.www.triptrav.repository.ScheduleCompanionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduleCompanionServiceImpl implements ScheduleCompanionService{
    private final ScheduleCompanionMapper scheduleCompanionMapper;

    @Override
    public int inviteUserAddPlan(long uno, long sco) {
        return scheduleCompanionMapper.inviteUserAddPlan(uno, sco);
    }
}
