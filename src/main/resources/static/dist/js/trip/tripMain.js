document.addEventListener("DOMContentLoaded", () => {
    console.log('tripCourse in');


    

    courseCall().then(re => {
        appendTrips(re.slice(0, 5)); // 첫 5개 항목 처리
    });

    // 데이터 로드 함수
    async function courseCall() {
        const response = await fetch(`/trip/courseCall`);
        return await response.json();
    }

    async function courseDetailCall(contentId) {
        const url = await fetch(`https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=tr&_type=json&contentId=${contentId}&contentTypeId=25&serviceKey=${tourAPIKEY}`);
        const res = await url.json();
        return res.response.body.items.item; // 전체 아이템 반환
    }

    async function appendTrips(trips) {
        const listContainer = document.getElementById('listContainer');

        for (const trip of trips) {
            const detailInfoArray = await courseDetailCall(trip.contentId); // 각 trip의 contentId를 사용하여 세부정보를 요청

            if (!detailInfoArray || detailInfoArray.length === 0) {
                console.log(`리스트 정보를 추가할 수 없습니다. trip ID: ${trip.contentId}의 detailInfo가 없습니다.`);
                continue;
            }

            const detailInfo = detailInfoArray[0]; // 첫 번째 아이템 사용

            const listItem = document.createElement("div");
            listItem.classList.add("list-item");

            const image = document.createElement("img");
            image.src = trip.firstImage; // 이미지 추가
            image.alt = "코스 이미지"; // 이미지에 대한 설명

            const info = document.createElement("div");

            const title = document.createElement("h3");
            title.innerText = `${trip.title ? trip.title : "정보 없음"}`; // 제목 추가

            const address = document.createElement("p");
            address.innerText = `${trip.addr1 ? trip.addr1 : "정보 없음"}`;

            const distance = document.createElement("p");
            distance.innerText = `총 거리${detailInfo.distance ? detailInfo.distance : "정보 없음"}`; // 거리 추가

            // const taketime = document.createElement("p");
            // taketime.innerText = `소요 시간: ${detailInfo.taketime ? detailInfo.taketime : "정보 없음"}`; // 소요 시간 추가

            const schedule = document.createElement("p");
            schedule.innerText = `일정: ${detailInfo.schedule ? detailInfo.schedule : "정보 없음"}`; // 일정 추가

            const theme = document.createElement("p");
            theme.innerText = `테마: ${detailInfo.theme ? detailInfo.theme : "정보 없음"}`; // 테마 추가

            info.appendChild(title);
            info.appendChild(address);
            info.appendChild(distance);
            // info.appendChild(taketime);
            info.appendChild(schedule);
            info.appendChild(theme);

            listItem.appendChild(image);
            listItem.appendChild(info);
            listContainer.appendChild(listItem);
        }
    }
});
