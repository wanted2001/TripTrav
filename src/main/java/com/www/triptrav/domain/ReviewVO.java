package com.www.triptrav.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReviewVO {
    private long rno;
    private long uno;
    private String nickname;
    private float reRate;
    private String reContent;
    private String reImage;
    private String reDate;
    private long reUseful;
    private int reReport;
}
