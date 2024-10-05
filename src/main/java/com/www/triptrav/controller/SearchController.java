package com.www.triptrav.controller;

import com.www.triptrav.service.TourDataService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@Slf4j
public class SearchController {

    private final TourDataService tourDataService;

    public SearchController(TourDataService tourDataService) {
        this.tourDataService = tourDataService;
    }

    @GetMapping("/autocomplete")
    @ResponseBody
    public List<String> autoComplete(@RequestParam("query") String query) {
        return tourDataService.getTourDataList().stream()
                .filter(data -> data.getTitle().toLowerCase().contains(query.toLowerCase()))
                .map(data -> "<a href='/place/" + data.getContentId() + "'>" + data.getTitle() + "</a>")
                .collect(Collectors.toList());
    }
}
