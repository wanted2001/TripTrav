package com.www.triptrav.controller;

import com.www.triptrav.domain.PathVO;
import com.www.triptrav.service.PathService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/trip")
@Slf4j
@RequiredArgsConstructor
public class TripController {

    private final PathService psv;

    @GetMapping("/")
    public String goTrips(){
        return "trip/trips";
    }

    @ResponseBody
    @GetMapping("/courseCall")
    public List<PathVO> goCourseCall(){
        return psv.loadServeList();
    }

}
