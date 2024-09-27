package com.www.triptrav.controller;

import com.www.triptrav.domain.UserVO;
import com.www.triptrav.service.MyPageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequiredArgsConstructor
@RequestMapping("/mypage")
@Slf4j
public class MyPageController {

    private final MyPageService msv;

    @GetMapping
    public String mypage(@RequestParam long uno) {
        return "/mypage/myPage";
    }

    @ResponseBody
    @GetMapping("/isSocial")
    public UserVO isSocial(@RequestParam long uno) {
        log.info("isSocialUser uno = {}", uno);
        UserVO uvo = msv.isSocial(uno);
        log.info("isSocialUser uvo = {}", uvo);
        return uvo;
    }

    @ResponseBody
    @GetMapping("/scheduleCall")
    public List<UserVO> scheduleCall(@RequestParam long uno){
        log.info("scheduleCall uno = {}", uno);
        List<UserVO> scheList = msv.scheduleCall(uno);
        return scheList;
    }

    @GetMapping("/reviewPopup")
    public void reviewPopup(@RequestParam String rno, Model model) {

    }
    @GetMapping("/tripList")
    public void tripList() {}

    @GetMapping("/tripReview")
    public void tripReview() {}

    @GetMapping("/wishPlace")
    public void wishPlace() {}

    @GetMapping("/wishTrip")
    public void wishTrip() {}
}
