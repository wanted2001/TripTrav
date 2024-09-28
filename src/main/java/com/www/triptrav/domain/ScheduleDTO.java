package com.www.triptrav.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDTO {
//    private long sco;
    private String scheName;
    private String scheStart;
    private String scheEnd;
    private int scheCount;
    private long scheContentId;
    private int ScheIndex;
}
