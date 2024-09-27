package com.www.triptrav.service;

import com.www.triptrav.domain.ScheduleDTO;
import com.www.triptrav.domain.ScheduleDetailVO;
import com.www.triptrav.domain.ScheduleRoleVO;
import com.www.triptrav.domain.ScheduleVO;
import com.www.triptrav.repository.ScheduleDetailMapper;
import com.www.triptrav.repository.ScheduleMapper;
import com.www.triptrav.repository.ScheduleRoleMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleServiceImpl implements ScheduleService {
    private final ScheduleMapper scheduleMapper;

    @Override
    public int insertPlan(ScheduleVO scheVO, long contentId) {
        return scheduleMapper.insertPlan(scheVO);
    }

    @Override
    public ScheduleDTO getSchedule(long sco) {
        return scheduleMapper.getSchedule(sco);
    }
}
