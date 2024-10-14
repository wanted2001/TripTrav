console.log('tripCourse in');

// courseCall().then(re => {
//     const container = document.getElementById('cardContainer');
//     re.forEach(result => {
//         const card = document.createElement("div");
//         card.classList.add("card");
//         const image = document.createElement("img");
//         image.src = result.firstImage;
//         const content = document.createElement("div");
//         content.classList.add("card-content");
//         const link = document.createElement("a");
//         link.href = `/tripdetail=${result.contentId}`;
//         link.innerText = result.title;
//         content.appendChild(link);
//         card.appendChild(image);
//         card.appendChild(content);
//         container.appendChild(card);
//     });
// });

console.log('tripCourse in');

let currentPage = 1;
const itemsPerPage = 10; // 한 번에 불러올 데이터 개수
let isLoading = false; // 중복 로드를 방지하기 위한 플래그

// 데이터 로드 함수
async function courseCall(page) {
    const response = await fetch(`/trip/courseCall?page=${page}&limit=${itemsPerPage}`);
    return await response.json();
}

// 화면에 카드 추가 함수
function appendTrips(trips) {
    const container = document.getElementById('cardContainer');
    trips.forEach(result => {
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.src = result.firstImage;

        const content = document.createElement("div");
        content.classList.add("card-content");

        const link = document.createElement("a");
        link.href = `/tripdetail=${result.contentId}`;
        link.innerText = result.title;

        content.appendChild(link);
        card.appendChild(image);
        card.appendChild(content);
        container.appendChild(card);
    });
}

// 최초 데이터 로드
courseCall(currentPage).then(re => {
    appendTrips(re);
    currentPage++;
});

// 스크롤 이벤트 핸들러 추가
window.addEventListener('scroll', () => {
    console.log("스크롤");
    console.log(this.innerHeight);
    console.log(this.scrollY);
    if (this.innerHeight + this.scrollY >= !isLoading) {
        isLoading = true; // 중복 로드를 방지
        courseCall(currentPage).then(re => {
            if (re.length > 0) {
                appendTrips(re);
                currentPage++;
            }
            isLoading = false; // 데이터 로드 완료 후 다시 로드 가능하도록 설정
        });
    }
});
