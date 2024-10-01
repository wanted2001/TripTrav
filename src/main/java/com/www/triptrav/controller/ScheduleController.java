package com.www.triptrav.controller;

import ch.qos.logback.core.rolling.helper.IntegerTokenConverter;
import com.www.triptrav.domain.ScheduleDTO;
import com.www.triptrav.domain.ScheduleDetailVO;
import com.www.triptrav.domain.ScheduleVO;
import com.www.triptrav.service.ScheduleDetailService;
import com.www.triptrav.service.ScheduleMemoService;
import com.www.triptrav.service.ScheduleRoleService;
import com.www.triptrav.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/schedule/*")
@Slf4j
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService ssv;
    private final ScheduleDetailService sdsv;
    private final ScheduleRoleService srsv;
    private final ScheduleMemoService smsv;

    @GetMapping("/check")
    public void checkPlan() {}

    @PostMapping("/createPlan/{contentId}/{currentPlaceName}")
    @ResponseBody
    @Transactional
    public String createPlan(@RequestBody JSONObject ScheVO, @PathVariable("contentId") long contentId,
                             @PathVariable("currentPlaceName") String placeTitle) throws ParseException{
        log.info("schePlaceTitle : {}", placeTitle);
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
            sdsv.insertDetailPlan(scheVO.getSco(), contentId, 1, 1, placeTitle);
        }

        return isOk>0?"1":"0";
    }

    @PostMapping("/course/{sco}/{date}")
    @ResponseBody
    public List<ScheduleDTO> course(@PathVariable("sco") long sco, @PathVariable("date") int date){
        log.info(String.valueOf(sco));
        List<ScheduleDTO> sdDTO = ssv.getSchedule(sco, date);
        log.info("sdDTO : {}",sdDTO);
        return sdDTO;
    }

    @PostMapping("/modifyPlan/{sco}/{sche_date}")
    @ResponseBody
    public String modifyPlan(@RequestBody List<JSONObject> sdtoList, @PathVariable("sco") long sco, @PathVariable("sche_date") int sche_date) throws ParseException {
        log.info("sdtoList : {}", sdtoList);
        sdsv.emptyPlan(sco,sche_date);

        for (JSONObject sche : sdtoList) {
            int planIndex = (int) sche.get("planIndex");

            ScheduleDTO scheDTO = new ScheduleDTO();
            scheDTO.setScheContentId(Long.parseLong((String) sche.get("sche_content_id")));
            scheDTO.setScheIndex(planIndex);
            scheDTO.setScheDate(Integer.parseInt((String) sche.get("sche_date")));
            scheDTO.setScheName((String) sche.get("sche_name"));
            scheDTO.setSco(Long.parseLong((String) sche.get("sco")));
            scheDTO.setScheTitle((String) sche.get("sche_title"));

            sdsv.updatePlan(scheDTO);
            String scheName = (String) sche.get("sche_name");
            int isOk = ssv.updatePlanName(scheName, sco);
        }

        return "1";
    }

    @PostMapping("/plan/{sco}/{date}")
    @ResponseBody
    public List<ScheduleDetailVO> getPlanData(@PathVariable("sco")long sco, @PathVariable("date")int date){
        List<ScheduleDetailVO> scheDVO = sdsv.getPlanDate(sco, date);
        return scheDVO;
    }

    @PostMapping("/memo/{sco}")
    @ResponseBody
    @Transactional
    public String saveMemo(@PathVariable("sco") long sco, @RequestBody String memo){
        log.info("memo :{}", memo);
        int isOk = ssv.insertMemo(1, sco);
        int memoResult = 0;

        if(isOk>0){
            memoResult = smsv.insertMemoContent(memo, sco);
        }
        return memoResult>0?"1":"0";
    }
}