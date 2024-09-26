package com.www.triptrav.domain;

import lombok.Data;
import java.util.List;

@Data
public class ReviewDTO {
    private ReviewVO review;
    private List<String> imagePaths;
}
