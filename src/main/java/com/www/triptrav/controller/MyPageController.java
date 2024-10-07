package com.www.triptrav.controller;

import com.www.triptrav.domain.*;
import com.www.triptrav.service.MyPageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    public List<ScheduleDTO> scheduleCall(@RequestParam long uno){
        log.info("scheduleCall uno = {}", uno);
        List<ScheduleVO> scheList = msv.scheduleCall(uno);
        List<ScheduleDTO> scheduleDTOList = new ArrayList<>();
        for(ScheduleVO svo : scheList){
            ScheduleDTO scheDTO = new ScheduleDTO();
            ScheduleDetailVO sdvo = msv.getScheduleDetail(svo.getSco());
            scheDTO.setSco(svo.getSco());
            scheDTO.setScheName(svo.getScheName());
            scheDTO.setScheStart(svo.getScheStart());
            scheDTO.setScheEnd(svo.getScheEnd());
            scheDTO.setScheTitle(sdvo.getScheTitle());
            scheduleDTOList.add(scheDTO);
        }
        return scheduleDTOList;
    }

    @ResponseBody
    @GetMapping("/getReview")
    public List<ReviewDTO> getReviewList(@RequestParam long uno) {
        List<ReviewVO> reList = msv.getReviewList(uno);
        List<ReviewDTO> reviewDTOList = new ArrayList<>();
        for (ReviewVO review : reList) {
            ReviewDTO reviewDTO = new ReviewDTO();
            reviewDTO.setReview(review); // 리뷰 정보 설정
            List<ReviewImageVO> reImageList = msv.getReviewDTOList(review.getRno());
            List<String> imagePaths = new ArrayList<>();
            for (ReviewImageVO image : reImageList) {
                imagePaths.add(image.getImagePath());
            }
            reviewDTO.setImagePaths(imagePaths);
            reviewDTOList.add(reviewDTO);
        }
        log.info("reviewList = {}", reList);
        log.info("reviewDTOList = {}", reviewDTOList);
        return reviewDTOList;
    }


    @GetMapping("/reviewPopup")
    public String reviewPopup(@RequestParam long rno, Model model) {
        log.info("reviewPopup rno = {}", rno);
        ReviewVO reList = msv.getPopReview(rno);
        ReviewDTO reviewDTOList = new ReviewDTO();
            reviewDTOList.setReview(reList); // 리뷰 정보 설정
            List<ReviewImageVO> reImageList = msv.getReviewDTOList(rno);
            List<String> imagePaths = new ArrayList<>();
            for (ReviewImageVO image : reImageList) {
                imagePaths.add(image.getImagePath());
            }
            reviewDTOList.setImagePaths(imagePaths);
        log.info("reviewList >> {}",reList );
        log.info("reviewDTOList = {}", reviewDTOList);
        model.addAttribute("review", reviewDTOList);
        log.info("model = {}", model);
        return "mypage/reviewPopup";
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
