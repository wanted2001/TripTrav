console.log('place in');

var place = document.querySelector(".wishPlaceDiv");

for (let i = 0; i <= 5; i++) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("tripCard");
    div.innerHTML = `
    <div class="tripImgDiv"><img src="/dist/image/poky.png" alt="프로필 사진" class="tripImg"></div>
    <div class="tripinfo">
        <ul>
            <li><h3>찜한 장소이름</h3></li>
            <li>찜한 장소 위치</li>
        </ul>
    </div>
    <div class="tripSetting">
        <ul>
            <li><a>X</a></li>
        </ul>
    </div>`;
    li.appendChild(div);
    place.appendChild(li);
}