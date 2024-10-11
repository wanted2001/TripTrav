package com.www.triptrav.service;

import com.www.triptrav.domain.ScheduleCompanionVO;
import com.www.triptrav.repository.ScheduleCompanionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleCompanionServiceImpl implements ScheduleCompanionService{
    private final ScheduleCompanionMapper scheduleCompanionMapper;

    @Override
    public int inviteUserAddPlan(long uno, long sco, String nick) {
        return scheduleCompanionMapper.inviteUserAddPlan(uno, sco, nick);
    }

    @Override
    public List<ScheduleCompanionVO> getCompanionList(long sco) {
        return scheduleCompanionMapper.getCompanionList(sco);
    }

    @Override
    public int deleteCompanion(long sco, long uno) {
        return scheduleCompanionMapper.deleteCompanion(sco,uno);
    }
}
