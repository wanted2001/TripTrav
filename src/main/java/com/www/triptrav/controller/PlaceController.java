package com.www.triptrav.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/place/*")
@RequiredArgsConstructor
@Slf4j
public class PlaceController {

    @GetMapping("/")
    public String placeIndex() {
        return "place/placeDetail";
    }
}
