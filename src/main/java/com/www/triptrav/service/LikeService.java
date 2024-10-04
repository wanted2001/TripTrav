package com.www.triptrav.service;

import com.www.triptrav.domain.LikeVO;

public interface LikeService {

    int addLike(LikeVO likeVO);

    int likeStatus(long uno, long likeCode);

    int deleteLike(LikeVO likeVO);
}
