package com.www.triptrav.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
@RequiredArgsConstructor
@RequestMapping("/mypage/*")
@Slf4j
public class MyPageController {

    @GetMapping("/mypage")
    public void mypage(@RequestParam String uno) {
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
