package com.www.triptrav.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/mypage/*")
public class MyPageController {

    @GetMapping("/mypage")
    public void mypage() {}

    @GetMapping("/tripList")
    public void tripList() {}

    @GetMapping("/tripReview")
    public void tripReview() {}

    @GetMapping("/wishPlace")
    public void wishPlace() {}

    @GetMapping("/wishTrip")
    public void wishTrip() {}
}
