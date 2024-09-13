console.log("List in");

var next = document.querySelector(".nextMytrip");
var prev = document.querySelector(".prevMyTrip");
var nextList = document.querySelector(".nextTripList");
var prevList = document.querySelector(".prevTripList");

for (let i = 0; i <= 5; i++) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.innerHTML = `<div class="tripCard">
    <div class="tripImgDiv"><img src="/dist/image/poky.png" alt="프로필 사진" class="tripImg"></div>
    <div class="tripinfo">
        <ul>
        <li><h3>여행이름</h3></li>
        <li>여행장소</li>
        <li>여행날짜</li>
        </ul>
        </div>
    </div>`;
    li.appendChild(div);
    nextList.appendChild(li);
}