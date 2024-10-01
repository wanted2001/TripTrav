package com.www.triptrav.service;

import com.www.triptrav.repository.ScheduleMemoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ScheduleMemoServiceImpl implements ScheduleMemoService {
    private final ScheduleMemoMapper scheduleMemoMapper;

    @Override
    public int insertMemoContent(String memo, long sco) {
        return scheduleMemoMapper.insertMemoContent(memo, sco);
    }
}
