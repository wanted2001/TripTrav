package com.www.triptrav.service;

import com.www.triptrav.domain.PlanVO;
import com.www.triptrav.repository.PlanMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlanServiceImpl implements PlanService{
    private final PlanMapper planMapper;

    @Override
    public int insertPlan(PlanVO pvo) {
        return planMapper.insertPlan(pvo);
    }
}
