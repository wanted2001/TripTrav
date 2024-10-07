package com.www.triptrav.service;

import com.www.triptrav.domain.ScheduleRoleVO;

public interface ScheduleRoleService {
    void insertRole(long sco, long uno, int i);

    int addScheduleRole(long uno, long sco);

    ScheduleRoleVO checkScheduleRole(long uno, long sco);
}
