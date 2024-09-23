package com.www.triptrav.controller;

import com.www.triptrav.domain.ReviewVO;
import com.www.triptrav.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Controller
@RequestMapping("/review/*")
@RequiredArgsConstructor
@Slf4j
public class ReviewController {

    private final ReviewService rsv;

    @PostMapping("/POST")
    @ResponseBody
    public String writeReview(@RequestParam(value = "image", required = false) MultipartFile[] files,
                              @ModelAttribute ReviewVO rvo) throws IOException {
        log.info("리뷰 데이터: " + rvo);
        rvo.setUno(1);
        int isPost = rsv.post(rvo);
        log.info("리뷰 저장 여부: " + isPost);
        if (isPost > 0) {
            if (files != null && files.length > 0) {
                int imageCount = files.length;
                if (imageCount > 3) {
                    return "이미지는 최대 3장까지 첨부 가능합니다.";
                }
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
            }
        }

        return "리뷰 저장 완료";
    }
}
