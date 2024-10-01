console.log("review in");
var tripPlaceReviewList = document.querySelector(".tripPlaceReviewList");
var tripFoodReviewList = document.querySelector(".tripFoodReviewList");

getReviewList(unoNum)
    .then(data => {
        console.log(data);
        data.forEach(datas => {
            const review = datas.review;
            const imagePaths = datas.imagePaths;
            if (!imagePaths || imagePaths.length === 0) {
                console.log("이미지 경로가 없습니다.");
            } else {
                // console.log(imagePaths);
            }
            const li = document.createElement("li");
            const div = document.createElement("div");
            div.classList.add("tripCard");
            div.innerHTML = `
                <div class="tripReviewImgDiv"></div>
                <div class="tripReviewInfo">
                    <ul class="tripReviewUl">
                        <li><h3 class="reviewPlaceName">${review.reContentId}</h3></li>
                        <li><p class="reviewRating">⭐⭐⭐⭐⭐ ${review.reRate}</p></li>
                        <li><p class="reviewRegDate">${review.reDate}</p></li>
                        <li><p class="reviewContent">${review.reContent}</p></li>
                    </ul>
                </div>
                <div class="tripSetting">
                    <ul>
                        <li><button type="button" onclick="showPopup(${review.rno})">수정</button></li>
                        <li><button type="button" onclick="deleteReview(${review.rno})">삭제</button></li>
                    </ul>
                </div>`;
            const imageDiv = div.querySelector(".tripReviewImgDiv");
            imagePaths.forEach((src) => {
                const image = document.createElement("img");
                const changeSrc = src.replace("C:\\userImage\\", ""); // 경로 수정
                image.classList.add("tripReviewImg");
                image.src = `/reviewImages/${changeSrc}`; // 이미지 경로 설정
                imageDiv.appendChild(image); // 현재 이미지 div에 이미지 추가
            });
            li.appendChild(div);
            switch (review.reContentType) {
                case 39:
                    tripFoodReviewList.appendChild(li);
                    break;
                case 12:
                    tripPlaceReviewList.appendChild(li);
                    break;
            }
        });
    })
    .catch(err => {
        console.log(err); // 에러 로그 출력
    });

function showPopup(rno) {
    window.open("/mypage/reviewPopup?rno="+rno, "blank", "width=800, height=800, left=400, top=400");
}

async function getReviewList(unoNum) {
    try {
        const url = "/mypage/getReview?uno=" + unoNum;
        const config = {
            method: "GET"
        }
        const response = await fetch(url, config);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}


