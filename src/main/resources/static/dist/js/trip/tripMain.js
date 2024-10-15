let currentPage = 1;
const itemsPerPage = 5;
let isLoading = false;
let trips = [];
let isLike = false;

document.addEventListener("DOMContentLoaded", () => {
    console.log('tripCourse in');
    loadTrips(currentPage); // 첫 페이지 데이터 로드

    window.addEventListener("scroll", handleScroll);
});

// document.getElementById("likeBtn").addEventListener('click',()=>{
//     if(typeof userNickname !== 'undefined' && userNickname !== null){
//         if(courseLikeResult == true){
//             alert("찜 취소 하시겠습니까?")
//             deleteLike(unoNum, contentId).then(result =>{
//                 if(result == "deleteSuccess"){
//                     document.querySelector('.placeHeart').src = "/dist/image/heart.svg"
//                     alert("취소 완료")
//                     courseLikeResult = false;
//                 }
//             })
//         }else if(courseLikeResult == false){
//             alert("찜하시겠습니까?")
//             addLike(unoNum, contentId, contentName).then(result => {
//                 if(result == "success"){
//                     document.querySelector('.placeHeart').src = "/dist/image/heart-on.svg"
//                     if(confirm("등록완료 마이페이지에서 확인하시겠습니까?")){
//                         location.href=`/mypage?uno=${unoNum}&location=wishTrip`;
//                     }
//                     placeLikeResult = true;
//                 }
//             })
//         }
//     }else{
//         if(confirm("로그인 한 사용자만 이용가능 한 서비스입니다. \n로그인 페이지로 이동하시겠습니까?")){
//             document.getElementById('myModal').style.display = 'flex';
//         }
//     }
// })

async function courseCall() {
    const response = await fetch(`/trip/courseCall`);
    return await response.json();
}

async function loadTrips(page) {
    if (isLoading) return;

    isLoading = true;

    if (trips.length === 0) {
        trips = await courseCall();
    }

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const tripsToDisplay = trips.slice(start, end);
    appendTrips(tripsToDisplay);
    isLoading = false;
}

function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollTop + windowHeight >= documentHeight - 100) {
        currentPage++;
        loadTrips(currentPage);
    }
}

async function courseDetailCall(contentId) {
    const url = await fetch(`https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=tr&_type=json&contentId=${contentId}&contentTypeId=25&serviceKey=${tourAPIKEY}`);
    const res = await url.json();
    return res.response.body.items.item;
}

async function appendTrips(trips) {
    const listContainer = document.getElementById('listContainer');

    for (const trip of trips) {
        const detailInfoArray = await courseDetailCall(trip.contentId);

        if (!detailInfoArray || detailInfoArray.length === 0) {
            console.log(`리스트 정보를 추가할 수 없습니다. trip ID: ${trip.contentId}의 detailInfo가 없습니다.`);
            continue;
        }
        const detailInfo = detailInfoArray[0];
        const listItem = document.createElement("div");
        listItem.classList.add("list-item");

        const image = document.createElement("img");
        image.src = trip.firstImage;
        image.alt = "코스 이미지";

        const info = document.createElement("div");

        const title = document.createElement("h3");
        title.innerText = `${trip.title ? trip.title : "정보 없음"}`;

        const address = document.createElement("p");
        address.innerText = `${trip.addr1 ? trip.addr1 : "정보 없음"}`;

        const distance = document.createElement("p");
        distance.innerText = `총 거리${detailInfo.distance ? detailInfo.distance : "정보 없음"}`;

        const schedule = document.createElement("p");
        schedule.innerText = `일정: ${detailInfo.schedule ? detailInfo.schedule : "정보 없음"}`;

        const theme = document.createElement("p");
        theme.innerText = `테마: ${detailInfo.theme ? detailInfo.theme : "정보 없음"}`;

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML=`<button type="button" onclick="like" id="likeBtn"><img src="/dist/image/heart.svg"></button>`;

        info.appendChild(title);
        info.appendChild(address);
        info.appendChild(distance);
        info.appendChild(schedule);
        info.appendChild(theme);

        listItem.appendChild(image);
        listItem.appendChild(info);
        listContainer.appendChild(listItem);
    }
}
// 스크롤 이벤트 핸들러 추가
// window.addEventListener('scroll', () => {
//     console.log("스크롤");
//     console.log(this.innerHeight);
//     console.log(this.scrollY);
//     if (this.innerHeight + this.scrollY >= !isLoading) {
//         isLoading = true; // 중복 로드를 방지
//         courseCall(currentPage).then(re => {
//             if (re.length > 0) {
//                 appendTrips(re);
//                 currentPage++;
//             }
//             isLoading = false; // 데이터 로드 완료 후 다시 로드 가능하도록 설정
//         });
//     }
// });

