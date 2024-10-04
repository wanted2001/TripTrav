console.log("List in");

var next = document.querySelector(".nextMytrip");
var prev = document.querySelector(".prevMyTrip");
var nextList = document.querySelector(".nextTripList");
var prevList = document.querySelector(".prevTripList");


scheduleCall(unoNum).then(data => {
    console.log(data);
    for (let i = 0; i <= data.length - 1; i++) {
        const li = document.createElement("li");
        const div = document.createElement("div");
        div.classList.add("tripCard");
        div.innerHTML = `
    <div class="tripImgDiv"><img src="/dist/image/poky.png" alt="프로필 사진" class="tripImg"></div>
    <div class="tripinfo">
        <ul>
            <li class="myTripTitle"><a href="/schedule/check?sco=${data[i].sco}"><h3>여행이름</h3></a></li>
            <li class="myTripPlace">여행장소</li>
            <li class="myTripDate">여행날짜</li>
        </ul>
    </div>
    <div class="tripSetting">
           <button type="button" id="tripListBtn">X</button>
    </div>`;
        li.appendChild(div);
        nextList.appendChild(li);
    }

})
// //비동기 씌워서 작업
// for (let i = 0; i <= 5; i++) {
//     const li = document.createElement("li");
//     const div = document.createElement("div");
//     div.classList.add("tripCard");
//     div.innerHTML = `
//     <div class="tripImgDiv"><img src="/dist/image/poky.png" alt="프로필 사진" class="tripImg"></div>
//     <div class="tripinfo">
//         <ul>
//             <li class="myTripTitle"><h3>여행이름</h3></li>
//             <li class="myTripPlace">여행장소</li>
//             <li class="myTripDate">여행날짜</li>
//         </ul>
//     </div>
//     <div class="tripSetting">
//         <ul>
//             <li><a>수정</a></li>
//             <li><a>삭제</a></li>
//         </ul>
//     </div>`;
//     li.appendChild(div);
//     nextList.appendChild(li);
// }
//
// for (let i = 0; i <= 5; i++) {
//     const li = document.createElement("li");
//     const div = document.createElement("div");
//     div.classList.add("tripCard");
//     div.innerHTML = `
//     <div class="tripImgDiv"><img src="/dist/image/poky.png" alt="프로필 사진" class="tripImg"></div>
//     <div class="tripinfo">
//         <ul>
//             <li><h3>갔다온여행이름</h3></li>
//             <li>여행갔던장소</li>
//             <li>여행갔던날짜</li>
//         </ul>
//     </div>
//     <div class="tripSetting">
//         <ul>
//             <li><a>수정</a></li>
//             <li><a>삭제</a></li>
//         </ul>
//     </div>
// </div>`;
//     li.appendChild(div);
//     prevList.appendChild(li);
// }

async function scheduleCall(unoNum) {
    try {
        const config = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const url = '/mypage/scheduleCall?uno=' + unoNum;
        const result = await fetch(url, config);
        return await result.json();
    } catch (e) {
        console.log(e);
    }
}

