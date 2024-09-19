console.log("review in");
const tripReview = document.querySelector(".tripReviewList");

// 비동기로 씌워서 작업할것
for (let i = 0; i <= 5; i++) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("tripCard");
    div.innerHTML = `
    <div class="tripImgDiv"><img src="/dist/image/poky.png" alt="프로필 사진" class="tripImg"></div>
    <div class="tripinfo">
        <ul>
            <li><h3>장소이름</h3></li>
            <li>리뷰내용</li>
            <li>리뷰쓴 날짜</li>
        </ul>
    </div>
    <div class="tripSetting">
        <ul>
            <li><a>수정</a></li>
            <li><a>삭제</a></li>
        </ul>
    </div>`;
    li.appendChild(div);
    tripReview.appendChild(li);
}