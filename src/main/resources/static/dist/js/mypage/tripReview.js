console.log("review in");
var tripPlaceReviewList = document.querySelector(".tripPlaceReviewList");
var tripFoodReviewList = document.querySelector(".tripFoodReviewList");


// 비동기로 씌워서 작업할것
for (let i = 0; i <= 5; i++) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("tripCard");
    div.innerHTML = `
    <div class="tripReviewImgDiv">
    <img src="/dist/image/poky.png" alt="리뷰사진" class="tripReviewImg">
    <img src="/dist/image/poky.png" alt="리뷰사진" class="tripReviewImg">
    <img src="/dist/image/poky.png" alt="리뷰사진" class="tripReviewImg">   
    </div>
    <div class="tripReviewInfo">
        <ul class="tripReviewUl">
            <li><h3 class="reviewPlaceName">해동용궁사</h3></li>
            <li><p class="reviewRating">⭐⭐⭐⭐⭐ 5</p></li>
            <li><p class="reviewRegDate">2024.09.20</p></li>
            <li><p class="reviewContent">부처님오신날에는 여느 절처럼 연등을 켜는데, 바다 풍경과 어우러져 장관을 이룹니다. 특히 이 사찰은 동해 바닷가에 위치해 있어 부산 내에서 1월 1일 일출 명소로도 유명합니다. 따라서 새해 첫날에는 많은 사람들이 해돋이를 보러 찾아옵니다. 이처럼 입지와 풍광이 독특하여 특별한 날이 아니더라도 찾는 사람이 제법 많습니다. 다만 이 사찰은 입구가 좁은 편이라 방문객이 조금만 많아도 좁게 느껴질 수 있습니다.</p></li>
        </ul>
    </div>
    <div class="tripSetting">
        <ul>
            <li><button type="button" onclick="showPopup()">수정</button></li>
            <li><a>삭제</a></li>
        </ul>
    </div>`;
    li.appendChild(div);
    tripPlaceReviewList.appendChild(li);
}

// 비동기로 씌워서 작업할것
for (let i = 0; i <= 4; i++) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("tripCard");
    div.innerHTML = `
    <div class="tripReviewImgDiv">
    <img src="/dist/image/poky.png" alt="리뷰사진" class="tripReviewImg">
    <img src="/dist/image/poky.png" alt="리뷰사진" class="tripReviewImg">
    <img src="/dist/image/poky.png" alt="리뷰사진" class="tripReviewImg">
    </div>
    <div class="tripReviewInfo">
        <ul class="tripReviewUl">
            <li><h3 class="reviewPlaceName">해동용궁사</h3></li>
            <li><p class="reviewRating">⭐⭐⭐⭐⭐ 5</p></li>
            <li><p class="reviewRegDate">2024.09.20</p></li>
            <li><p class="reviewContent">부처님오신날에는 여느 절처럼 연등을 켜는데, 바다 풍경과 어우러져 장관을 이룹니다. 특히 이 사찰은 동해 바닷가에 위치해 있어 부산 내에서 1월 1일 일출 명소로도 유명합니다. 따라서 새해 첫날에는 많은 사람들이 해돋이를 보러 찾아옵니다. 이처럼 입지와 풍광이 독특하여 특별한 날이 아니더라도 찾는 사람이 제법 많습니다. 다만 이 사찰은 입구가 좁은 편이라 방문객이 조금만 많아도 좁게 느껴질 수 있습니다.</p></li>
        </ul>
    </div>
    <div class="tripSetting">
        <ul>
            <li><button type="button" onclick="showPopup()">수정</button></li>
            <li><a>삭제</a></li>
        </ul>
    </div>`;
    li.appendChild(div);
    tripFoodReviewList.appendChild(li);
}

function showPopup() {
    window.open("/mypage/reviewPopup?rno=1","blank", "width=800, height=800, left=400, top=400");
}

