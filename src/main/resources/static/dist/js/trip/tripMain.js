let currentPage = 1;
const itemsPerPage = 5;
let isLoading = false;
let trips = []; // 전체 데이터를 저장할 변수

document.addEventListener("DOMContentLoaded", () => {
    console.log('tripCourse in');
    loadTrips(currentPage); // 첫 페이지 데이터 로드

    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트 리스너 추가
});

async function courseCall() {
    const response = await fetch(`/trip/courseCall`);
    return await response.json();
}

async function loadTrips(page) {
    if (isLoading) return;

    isLoading = true;

    if (trips.length === 0) { // 데이터가 비어 있으면 전체 데이터 로드
        trips = await courseCall();
    }

    const start = (page - 1) * itemsPerPage; // 시작 인덱스
    const end = start + itemsPerPage; // 끝 인덱스
    const tripsToDisplay = trips.slice(start, end); // 필요한 개수만큼 잘라서 표시
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
