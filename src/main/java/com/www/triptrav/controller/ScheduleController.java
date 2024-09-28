package com.www.triptrav.controller;

import com.www.triptrav.domain.ScheduleDTO;
import com.www.triptrav.domain.ScheduleDetailVO;
import com.www.triptrav.domain.ScheduleVO;
import com.www.triptrav.service.ScheduleDetailService;
import com.www.triptrav.service.ScheduleRoleService;
import com.www.triptrav.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/plan/*")
@Slf4j
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService ssv;
    private final ScheduleDetailService sdsv;
    private final ScheduleRoleService srsv;

    @GetMapping("/check")
    public void checkPlan() {}

    @PostMapping("/createPlan/{contentId}")
    @ResponseBody
    @Transactional
    public String createPlan(@RequestBody JSONObject ScheVO, @PathVariable("contentId") long contentId) throws ParseException{
        JSONParser parser = new JSONParser();
        JSONObject sche = (JSONObject) parser.parse(ScheVO.toJSONString());

        ScheduleVO scheVO = new ScheduleVO();

        scheVO.setScheName((String) sche.get("sche_name"));
        scheVO.setScheStart((String) sche.get("sche_start"));
        scheVO.setScheEnd((String) sche.get("sche_end"));
        scheVO.setScheCount(((Long) sche.get("sche_count")).intValue());
        scheVO.setUno(Long.parseLong((String)sche.get("uno")));
        log.info("pvo:{}", scheVO);
        log.info("contentID{}",contentId);

        int isOk = ssv.insertPlan(scheVO,contentId);
        if(isOk>0){
            srsv.insertRole(scheVO.getSco(), scheVO.getUno(), 1);
            sdsv.insertDetailPlan(scheVO.getSco(), contentId, 1);
        }

        return isOk>0?"1":"0";
    }

    @PostMapping("/course/{sco}")
    @ResponseBody
    public ScheduleDTO course(@PathVariable("sco") long sco){
        log.info(String.valueOf(sco));
        ScheduleDTO sdDTO = ssv.getSchedule(sco);
        log.info("sdDTO : {}",sdDTO);
        return sdDTO;
    }

}
