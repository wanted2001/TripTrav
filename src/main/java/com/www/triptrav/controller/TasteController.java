package com.www.triptrav.controller;

import com.www.triptrav.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequestMapping("/taste/*")
@RequiredArgsConstructor
public class TasteController {

    private final CategoryService csv;

    @PostMapping("/addTaste")
    @ResponseBody
    public Map<String, String> getCategoryCodes(@RequestBody List<String> categoryNames) {
        return csv.getCategoryCodes(categoryNames);
    }
}
