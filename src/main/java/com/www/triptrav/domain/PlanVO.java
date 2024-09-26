package com.www.triptrav.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PlanVO {
    private long sco;
    private long uno;
    private String sche_name;
    private String sche_start;
    private String sche_end;
    private int sche_count; //여행소요일수
    private String sche_memo;
}
