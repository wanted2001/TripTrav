package com.www.triptrav.controller;

import com.www.triptrav.domain.ReviewDTO;
import com.www.triptrav.domain.ReviewVO;
import com.www.triptrav.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/review/*")
@RequiredArgsConstructor
@Slf4j
public class ReviewController {

    private final ReviewService rsv;

    @PostMapping("/POST")
    @ResponseBody
    @Transactional
    public String writeReview(@RequestParam(value = "images", required = false) MultipartFile[] files,
                              @RequestParam("uno") long uno,
                              @RequestParam("nickname") String nickname,
                              @RequestParam("reRate") float reRate,
                              @RequestParam("reContent") String reContent,
                              @RequestParam("reImageCount") int reImageCount,
                              @RequestParam("reContentId") long reContentId,
                              @RequestParam("reContentType") long reContentType) throws IOException {
        ReviewVO rvo = new ReviewVO();
        rvo.setUno(uno);
        rvo.setNickname(nickname);
        rvo.setReRate(reRate);
        rvo.setReContent(reContent);
        rvo.setReImageCount(reImageCount);
        rvo.setReContentId(reContentId);
        rvo.setReContentType(reContentType);

        int isPost = rsv.post(rvo);
        if (isPost > 0) {
            if (files != null && files.length > 0) {
                String uploadFolder = "C:/userImage";
                SimpleDateFormat sdf = new SimpleDateFormat("yy/MM/dd");
                String dateFolder = sdf.format(new Date());
                File uploadPath = new File(uploadFolder, dateFolder);
                if (!uploadPath.exists()) {
                    uploadPath.mkdirs();
                }

                for (MultipartFile file : files) {
                    if (!file.isEmpty()) {
                        String uuid = UUID.randomUUID().toString();
                        String originalFilename = file.getOriginalFilename();
                        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                        String savedFilename = uuid + extension;
                        Path savePath = Paths.get(uploadPath.getAbsolutePath(), savedFilename);
                        file.transferTo(savePath.toFile());
                        rsv.saveReviewImage(rvo.getRno(), savePath.toString());
                    }
                }
                return "imageSuccess";
            }
        } else {
            return "fail";
        }
        return "success";
    }

    @GetMapping("/GET/{contentId}")
    @ResponseBody
    public List<ReviewDTO> getReviewList(@PathVariable("contentId") long contentId) {
        List<ReviewVO> reviewList = rsv.getList(contentId);
        List<ReviewDTO> reviewDTOList = new ArrayList<>();
        for (ReviewVO review : reviewList) {
            ReviewDTO reviewDTO = new ReviewDTO();
            reviewDTO.setReview(review);
            if (review.getReImageCount() > 0) {
                List<String> imagePaths = rsv.getImagePathsByReviewId(review.getRno());
                reviewDTO.setImagePaths(imagePaths);
            }
            reviewDTOList.add(reviewDTO);
        }
        return reviewDTOList;
    }
}
