package com.www.triptrav.controller;

import com.www.triptrav.domain.ReviewVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
