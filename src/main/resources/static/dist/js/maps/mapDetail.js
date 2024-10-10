// const regionData = {
//     gygg: 31,     // 경기도
//     incheon: 2,   // 인천광역시
//     gangwon: 32,  // 강원도
//     chungbuk: 33, // 충청북도
//     chungnam: 34, // 충청남도
//     daejeon: 3,   // 대전광역시
//     ulsan: 7,     // 울산광역시
//     seoul: 1,     // 서울특별시
//     jeju: 39,     // 제주도
//     gwangju: 5,   // 광주광역시
//     busan: 6,     // 부산광역시
//     gyeongbuk: 35,// 경상북도
//     gyeongnam: 36,// 경상남도
//     daegu: 4,     // 대구광역시
//     sejong: 8,    // 세종특별자치시
//     jeonbuk: 37,  // 전라북도
//     jeonnam: 38   // 전라남도
// };
//
// const contentTypeIdMap = {
//     12: "관광지",
//     39: "음식점",
//     32: "숙박",
//     15: "축제/공연/행사",
//     25: "여행코스",
//     28: "레포츠",
//     38: "쇼핑",
// };
//
// const API_BASE_URL = 'http://apis.data.go.kr/B551011/KorService1/areaBasedList1';
// let selectedContentTypeId = null;
//
// function fetchTourInfo(regionCode, contentTypeId = null) {
//     const areaCode = regionData[regionCode];
//
//     if (areaCode) {
//         const contentTypeQuery = contentTypeId ? `&contentTypeId=${contentTypeId}` : '';
//         const apiUrl = `${API_BASE_URL}?numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${tourAPIKEY}&listYN=Y&arrange=A${contentTypeQuery}&areaCode=${areaCode}&sigunguCode=&cat1=&cat2=&cat3=&_type=json`;
//
//         fetch(apiUrl)
//             .then(response => {
//                 // JSON 형식이 아닌 응답을 확인하기 위해 먼저 텍스트로 출력
//                 return response.text().then(text => {
//                     try {
//                         return JSON.parse(text); // 유효한 JSON일 경우 파싱
//                     } catch (error) {
//                         console.error("응답이 JSON 형식이 아닙니다:", text);
//                         throw new Error("Invalid JSON format");
//                     }
//                 });
//             })
//             .then(data => {
//                 const tourInfoList = document.getElementById('tourInfoList');
//                 const infoText = document.getElementById('infoText');
//                 infoText.innerHTML = ''; // 기존 리스트 비우기
//                 tourInfoList.innerHTML = '';
//
//                 if (data?.response?.body?.items?.item) {
//                     const items = data.response.body.items.item;
//
//                     if (items.length > 0) {
//                         items.forEach(item => {
//                             const li = document.createElement('li');
//                             const title = item.title || '제목 없음';
//                             const addr1 = item.addr1 || '주소 없음';
//                             const contentId = item.contenttypeid;
//                             const contentType = contentTypeIdMap[contentId] || '알 수 없는 유형';
//
//                             const firstImage = item.firstimage || '';
//                             const noImageSrc = '/dist/image/noimage.jpg';
//
//                             li.innerHTML = `
//                                 <span class="infoTitle">${title} </span>
//                                 <span class="infoType">${contentType}</span> <br>
//                                 <span class="infoAddr">${addr1}</span> <br>
//                                 <img src="${firstImage}" alt="No image available" onerror="this.onerror=null; this.src='${noImageSrc}'" />
//                                 <hr>
//                             `;
//                             tourInfoList.appendChild(li);
//                         });
//                     } else {
//                         displayNoTourInfo(tourInfoList);
//                     }
//                 } else {
//                     displayNoTourInfo(tourInfoList);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 displayNoTourInfo(document.getElementById('tourInfoList'));
//             });
//     } else {
//         console.error('Invalid region code');
//     }
// }
//
// function displayNoTourInfo(container) {
//     const li = document.createElement('li');
//     li.textContent = '관광 정보가 없습니다.';
//     container.appendChild(li);
// }
//
// window.addEventListener('hashchange', () => {
//     const regionCode = window.location.hash.replace('#', '');
//     if (regionCode) {
//         // contentTypeId가 선택되지 않았으면 전체 데이터 (null)로 요청
//         fetchTourInfo(regionCode, selectedContentTypeId);
//     } else {
//         console.error('url에 hash정보 없음');
//     }
// });
//
// // 셀렉트 박스 값 변경 시
// document.getElementById('options').addEventListener('change', (event) => {
//     const selectedOption = event.target.value;
//     selectedContentTypeId = selectedOption === 'option1' ? null : selectedOption;
//     const regionCode = window.location.hash.replace('#', '');
//     if (regionCode) {
//         fetchTourInfo(regionCode, selectedContentTypeId);
//     }
// });

//무한스크롤 테스트중 (위에 주석 코드로 실행하면 오류 안남 .. 아마도 + 대신 무한스크롤 X)
//아직 무한스크롤 구현 안됨

const regionData = {
    gygg: 31,     // 경기도
    incheon: 2,   // 인천광역시
    gangwon: 32,  // 강원도
    chungbuk: 33, // 충청북도
    chungnam: 34, // 충청남도
    daejeon: 3,   // 대전광역시
    ulsan: 7,     // 울산광역시
    seoul: 1,     // 서울특별시
    jeju: 39,     // 제주도
    gwangju: 5,   // 광주광역시
    busan: 6,     // 부산광역시
    gyeongbuk: 35,// 경상북도
    gyeongnam: 36,// 경상남도
    daegu: 4,     // 대구광역시
    sejong: 8,    // 세종특별자치시
    jeonbuk: 37,  // 전라북도
    jeonnam: 38   // 전라남도
};

const contentTypeIdMap = {
    12: "관광지",
    39: "음식점",
    32: "숙박",
    15: "축제/공연/행사",
    25: "여행코스",
    28: "레포츠",
    38: "쇼핑",
};

const API_BASE_URL = 'http://apis.data.go.kr/B551011/KorService1/areaBasedList1';
let selectedContentTypeId = null;
let currentPage = 1;
let isLoading = false;
const perPage = 12;

function fetchTourInfo(regionCode, contentTypeId = null) {
    const areaCode = regionData[regionCode];

    if (areaCode) {
        const contentTypeQuery = contentTypeId ? `&contentTypeId=${contentTypeId}` : '';
        const apiUrl = `${API_BASE_URL}?numOfRows=${perPage}&pageNo=${currentPage}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${tourAPIKEY}&listYN=Y&arrange=A${contentTypeQuery}&areaCode=${areaCode}&sigunguCode=&cat1=&cat2=&cat3=&_type=json`;

        isLoading = true; // 데이터 요청 중
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const tourInfoList = document.getElementById('tourInfoList');
                const infoText = document.getElementById('infoText');
                infoText.innerHTML = '';

                if (data?.response?.body?.items?.item) {
                    const items = data.response.body.items.item;

                    if (items.length > 0) {
                        items.forEach(item => {
                            const li = document.createElement('li');
                            const title = item.title || '제목 없음';
                            const addr1 = item.addr1 || '주소 없음';
                            const contentId = item.contenttypeid;
                            const contentType = contentTypeIdMap[contentId] || '알 수 없는 유형';
                            const firstImage = item.firstimage || '';
                            const noImageSrc = '/dist/image/noimage.jpg';

                            li.innerHTML = `
                                <span class="infoTitle">${title}</span>
                                <span class="infoType">${contentType}</span><br>
                                <span class="infoAddr">${addr1}</span><br>
                                <img src="${firstImage}" alt="No image available" onerror="this.onerror=null; this.src='${noImageSrc}'" />
                                <hr>
                            `;
                            tourInfoList.appendChild(li);
                        });
                        currentPage++; // 다음 페이지로 증가
                    } else {
                        displayNoTourInfo(tourInfoList); // 관광 정보 없음
                    }
                } else {
                    displayNoTourInfo(tourInfoList); // 관광 정보 없음
                }
            })
            .catch(error => {
                console.error('Error:', error);
                displayNoTourInfo(document.getElementById('tourInfoList'));
            })
            .finally(() => {
                isLoading = false; // 데이터 로딩 완료
            });
    } else {
        console.error('Invalid region code');
    }
}

function displayNoTourInfo(container) {
    const li = document.createElement('li');
    li.textContent = '관광 정보가 없습니다.';
    container.appendChild(li);
}

// 무한 스크롤 구현
document.addEventListener('DOMContentLoaded', () => {
    const tourInfoList = document.getElementById('tourInfoList');

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', () => {
        console.log("스크롤 중");
        const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
        console.log(`nearBottom: ${nearBottom}`);

        // 스크롤 위치와 로딩 상태 확인
        if (nearBottom && !isLoading && tourInfoList.children.length > 0) {
            const regionCode = window.location.hash.replace('#', '');
            if (regionCode) {
                console.log("ul 바닥에 닿음");
                fetchTourInfo(regionCode, selectedContentTypeId); // 추가 데이터 요청
            }
        }
    });

    // URL 해시 변경 시 데이터 로드
    window.addEventListener('hashchange', () => {
        const regionCode = window.location.hash.replace('#', '');
        if (regionCode) {
            currentPage = 1; // 페이지 리셋
            tourInfoList.innerHTML = ''; // 리스트 비우기
            fetchTourInfo(regionCode, selectedContentTypeId);
        } else {
            console.error('URL에 hash 정보 없음');
        }
    });

    // 셀렉트 박스 값 변경 시
    document.getElementById('options').addEventListener('change', (event) => {
        const selectedOption = event.target.value;
        selectedContentTypeId = selectedOption === 'all' ? null : selectedOption;
        const regionCode = window.location.hash.replace('#', '');
        if (regionCode) {
            currentPage = 1; // 페이지 리셋
            tourInfoList.innerHTML = ''; // 리스트 비우기
            fetchTourInfo(regionCode, selectedContentTypeId);
        }
    });
});

// // 초기 데이터 로드
// const initialRegionCode = window.location.hash.replace('#', '');
// if (initialRegionCode) {
//     fetchTourInfo(initialRegionCode, selectedContentTypeId);
// }