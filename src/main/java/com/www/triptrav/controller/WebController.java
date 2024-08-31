package com.www.triptrav.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/react")
    public String reactPage() {
        return "redirect:/index.html";
    }

    @GetMapping("/")
    public String index() {
        return "index";
    }
}