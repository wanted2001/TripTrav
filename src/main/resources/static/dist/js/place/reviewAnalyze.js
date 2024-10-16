function analyzeReviews() {
    // 리뷰 목록을 가져오기
    getReviewList().then(result => {
        // reReport가 3개 미만인 리뷰들의 reContent만 추출
        const filteredReviews = result
            .filter(item => item.review.reReport < 3)
            .map(item => item.review.reContent);

        // 분석 요청을 위한 데이터 준비
        const reviewData = {
            reviews: filteredReviews
        };

        // 서버로 POST 요청 보내기
        fetch('/ai/analyzeReviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(response => response.json())
            .then(data => {
                const str = data.choices[0].message.content;
                const result = str.split("종합결과: ")[1];
                console.log(result);
            })
            .catch(error => {
                console.error('분석 요청 중 오류 발생:', error);
            });
    }).catch(error => {
        console.error('리뷰 목록 가져오기 오류:', error);
    });
}

// 함수 호출
analyzeReviews();
