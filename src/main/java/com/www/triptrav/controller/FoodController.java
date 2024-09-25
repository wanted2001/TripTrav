package com.www.triptrav.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/food/*")
@Slf4j
@RequiredArgsConstructor
public class FoodController{

    @GetMapping("/foodDetail")
    public void foodDetail() {}


}
