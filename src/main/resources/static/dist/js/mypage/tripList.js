console.log("List in");

var next = document.querySelector(".nextMytrip");
var prev = document.querySelector(".prevMyTrip");
var nextList = document.querySelector(".nextTripList");
var prevList = document.querySelector(".prevTripList");

//비동기 씌워서 작업
for (let i = 0; i <= 5; i++) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("tripCard");
    div.innerHTML = `
    <div class="tripImgDiv"><img src="/dist/image/poky.png" alt="프로필 사진" class="tripImg"></div>
    <div class="tripinfo">
        <ul>
            <li class="myTripTitle"><h3>여행이름</h3></li>
            <li class="myTripPlace">여행장소</li>
            <li class="myTripDate">여행날짜</li>
        </ul>
    </div>
    <div class="tripSetting">
        <ul>
            <li><a>수정</a></li>
            <li><a>삭제</a></li>
        </ul>
    </div>`;
    li.appendChild(div);
    nextList.appendChild(li);
}

for (let i = 0; i <= 5; i++) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("tripCard");
    div.innerHTML = `
    <div class="tripImgDiv"><img src="/dist/image/poky.png" alt="프로필 사진" class="tripImg"></div>
    <div class="tripinfo">
        <ul>
            <li><h3>갔다온여행이름</h3></li>
            <li>여행갔던장소</li>
            <li>여행갔던날짜</li>
        </ul>
    </div>
    <div class="tripSetting">
        <ul>
            <li><a>수정</a></li>
            <li><a>삭제</a></li>
        </ul>
    </div>   
</div>`;
    li.appendChild(div);
    prevList.appendChild(li);
}

