package com.www.triptrav.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@Slf4j
public class WebController {

    @GetMapping("/react")
    public String reactPage() {
        return "redirect:/index.html";
    }

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/index")
    public String search(){
        return "index";
    }
}