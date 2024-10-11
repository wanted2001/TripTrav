package com.www.triptrav.controller;

import com.www.triptrav.domain.*;
import com.www.triptrav.service.MyPageService;
import com.www.triptrav.service.PathService;
import com.www.triptrav.service.TourDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;


@Controller
@RequiredArgsConstructor
@RequestMapping("/mypage")
@Slf4j
public class MyPageController {

    private final MyPageService msv;
    private final PasswordEncoder passwordEncoder;
    private final PathService psv;

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
    public List<ScheduleDTO> scheduleCall(@RequestParam long uno) {
        log.info("scheduleCall uno = {}", uno);
        List<ScheduleVO> scheList = msv.scheduleCall(uno);
        List<ScheduleDTO> scheduleDTOList = new ArrayList<>();
        for (ScheduleVO svo : scheList) {
            ScheduleDTO scheDTO = new ScheduleDTO();
            ScheduleDetailVO sdvo = msv.getScheduleDetail(svo.getSco());
            scheDTO.setSco(svo.getSco());
            scheDTO.setScheName(svo.getScheName());
            scheDTO.setScheStart(svo.getScheStart());
            scheDTO.setScheEnd(svo.getScheEnd());
            scheDTO.setScheTitle(sdvo.getScheTitle());
            scheDTO.setScheImg(svo.getScheImg());
            scheduleDTOList.add(scheDTO);
        }
        log.info("scheduleCall scheduleDTOList = {}", scheduleDTOList);
        return scheduleDTOList;
    }

    @ResponseBody
    @GetMapping("/getReview")
    public List<ReviewDTO> getReviewList(@RequestParam long uno) {
        List<ReviewVO> reList = msv.getReviewList(uno);
        List<ReviewDTO> reviewDTOList = new ArrayList<>();
        List<PathVO>mainImg = psv.loadPathList();
        for (ReviewVO review : reList) {
            ReviewDTO reviewDTO = new ReviewDTO();
            for(PathVO pathVO : mainImg) {
                if(review.getReContentId() == pathVO.getContentId()){
                    if(pathVO.getFirstImage().isEmpty()){
                        // 또 다른 js에서 돌려서 가져오기
                    }else {
                        reviewDTO.setFirstImage(pathVO.getFirstImage());
                    }
                }
            }
            reviewDTO.setReview(review);
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
        log.info("reviewList >> {}", reList);
        log.info("reviewDTOListPopup = {}", reviewDTOList);
        model.addAttribute("review", reviewDTOList);
        log.info("model = {}", model);
        return "mypage/reviewPopup";
    }

    @ResponseBody
    @PostMapping("/updateUser")
    public int updateUser(@RequestParam("uno") Long uno,
                             @RequestParam("nickname") String nickname,
                             @RequestParam("pw") String pw,
                             @RequestParam("provider") String provider,
                             @RequestParam(value = "profile", required = false) MultipartFile profile)
                                throws IOException {
        UserVO userVO = new UserVO();
        userVO.setUno(uno);
        if(provider.equals("null")) {
            if(!pw.isEmpty()) {
                log.info("pw = {}", pw.length());
            userVO.setPw(passwordEncoder.encode(pw));
            }
            userVO.setNickname(nickname);
            if (profile != null && !profile.isEmpty()) {
                String uploadFolder = "C:/image";
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
                String dateFolder = sdf.format(new Date());
                File uploadPath = new File(uploadFolder, dateFolder);
                if (!uploadPath.exists()) {
                    uploadPath.mkdirs();
                }
                log.info("이미지 처리: {}", profile.getOriginalFilename());
                String uuid = UUID.randomUUID().toString();
                String originalFilename = profile.getOriginalFilename();
                String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                String savedFilename = uuid + extension;
                Path savePath = Paths.get(uploadPath.getAbsolutePath(), savedFilename);
                profile.transferTo(savePath.toFile());
                String path = savePath.toString().replace("\\","/");
                userVO.setProfile(path.replace("C:/image/", ""));
                log.info(path.replace("C:/image/", ""));
            }
            log.info("userVO11111111 = {}",userVO);
           return msv.updateCommonUser(userVO);
        }else{
            userVO.setUno(uno);
            userVO.setNickname(nickname);
            log.info("userVO = {}",userVO);
          return msv.updateSocialUserName(userVO);
        }

    }

    @ResponseBody
    @DeleteMapping("schedule")
    public int scheduleDelete(@RequestParam long sco) {
        log.info("scheduleDelete sco = {}", sco);
        int isDel = msv.scheduleDelete(sco);
        log.info("isDel = {}", isDel);
        return isDel;
    }

    @ResponseBody
    @GetMapping("likeCall")
    public List<LikeDTO> likeCall(@RequestParam long uno) {
        log.info("likeCall uno = {}", uno);
        List<LikeVO> like = msv.getLikePlace(uno);
        List<LikeDTO> likeDTOList = new ArrayList<>();
        List<PathVO> pathVOList = psv.loadPathList();
        for(LikeVO likeVO : like) {
            LikeDTO likeDTO = new LikeDTO();
            likeDTO.setLike(likeVO);
            for(PathVO pathVO : pathVOList) {
                if(likeVO.getLikeCode() == pathVO.getContentId()){
                    likeDTO.setFirstImage(pathVO.getFirstImage());
                    likeDTO.setContentTypeId(pathVO.getContentTypeId());
                }
            }
            likeDTOList.add(likeDTO);
            log.info("likeDTOList = {}", likeDTOList);
        }
        return likeDTOList;
    }

    @GetMapping("/tripList")
    public void tripList() {
    }

    @GetMapping("/tripReview")
    public void tripReview() {
    }

    @GetMapping("/wishPlace")
    public void wishPlace() {
    }

    @GetMapping("/wishTrip")
    public void wishTrip() {
    }
}
