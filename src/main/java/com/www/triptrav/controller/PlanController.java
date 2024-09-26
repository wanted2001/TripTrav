package com.www.triptrav.controller;

import com.www.triptrav.domain.PlanVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/plan/*")
@Slf4j
@RequiredArgsConstructor
public class PlanController {

    @GetMapping("/check")
    public void checkPlan() {}

    @PostMapping("/createPlan")
    @ResponseBody
    public String createPlan(@RequestBody PlanVO pvo) throws ParseException{
//    JSONParser parser = new JSONParser();
//    JSONObject plan = (JSONObject) parser.parse(planVO.toJSONString());
//
//    PlanVO pvo = new PlanVO();
//
//    pvo.setSche_name((String) plan.get("planName"));
//    pvo.setSche_start((String) plan.get("departureDate"));
//    pvo.setSche_end((String) plan.get("returnDate"));
//    pvo.setSche_count(Integer.parseInt((String) plan.get("totalDays")));
//    pvo.setUno(Long.parseLong((String)plan.get("unoNum")));

    log.info("pvo:{}", pvo);
    return "1";
}


}
