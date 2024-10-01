package com.www.triptrav.service;

import com.www.triptrav.repository.ScheduleMapper;
import com.www.triptrav.repository.ScheduleRoleMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ScheduleRoleServiceImpl implements ScheduleRoleService{
    private final ScheduleRoleMapper scheduleRoleMapper;

    @Override
    public void insertRole(long sco, long uno, int i) {
        scheduleRoleMapper.insertPlanRole(sco, uno, 1);
    }
}
