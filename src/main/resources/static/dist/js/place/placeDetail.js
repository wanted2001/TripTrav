const contentId = "126676";
const imgUrl = `https://apis.data.go.kr/B551011/KorService1/detailImage1?MobileOS=ETC&MobileApp=TripTrav&_type=json&subImageYN=Y&contentId=${contentId}&serviceKey=${tourAPIKEY}`;
const detailInfoUrl = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=TripTrav&contentId=${contentId}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&serviceKey=${tourAPIKEY}&_type=json`;

let contentTypeId = 0;
let imageUrls = [];
let currentIndex = 0;
let slideInterval;

// 기본정보 가져오기
fetch(detailInfoUrl)
    .then(response => response.json())
    .then(data => {
        const jsonData = data.response.body.items.item[0];
        console.log(jsonData)
        const locationDiv = document.querySelector('.location');
        let city = splitAddr(jsonData.addr1)[0];
        let district = splitAddr(jsonData.addr1)[1];
        let title = jsonData.title;
        locationDiv.innerHTML = `<span>${city} > </span><span>${district} > </span><span>${title}</span>`;

        const mainImgUrl = jsonData.firstimage;
        // imageUrls.push(mainImgUrl);

        // // 추가 이미지를 가져오고 슬라이더에 반영
        // getImage(imgUrl).then(result => {
        //     imageUrls.push(...result);
        //     updateCarousel(); // 캐러셀 업데이트
        //     startAutoSlide(); // 자동 슬라이드 시작
        // });
        contentTypeId = jsonData.contenttypeid;
        document.querySelector('.title').innerText = jsonData.title
        document.querySelector('.locationInfo').innerHTML = `주소 : ${jsonData.addr1}`;

        getIntroInfo(contentTypeId).then(result=>{
            const introData = result.response.body.items.item[0];
            document.querySelector('.telInfo').innerHTML = `전화번호 : ${introData.infocenter}`
            document.querySelector('.restInfo').innerHTML = `쉬는날 : ${introData.restdate}`
            document.querySelector('.timeInfo').innerHTML = `이용시간 : ${introData.usetime}`
        })
        getAdditionalInfo(contentTypeId).then(result => {
            const additionalInfoData = result.response.body.items.item[0];
            document.querySelector('.priceInfo').innerHTML = `${additionalInfoData.infoname} : ${additionalInfoData.infotext}`
        })
        document.querySelector('.homepageInfo').innerHTML = `홈페이지 : ${jsonData.homepage}`


        document.querySelector('.detailsInfo').innerText = `${jsonData.overview}`;

    });

// 주소 처리 함수
function splitAddr(address) {
    let addrParts = address.split(' ');
    let city = addrParts[0];
    let district = addrParts[1];
    return [city, district];
}

// 이미지 처리 함수
async function getImage(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = data.response.body.items.item;
        return items.map(item => item.originimgurl);
    } catch (error) {
        console.log(error);
        return [];
    }
}

// 캐러셀 업데이트 함수
function updateCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    for (let i = 0; i < 3; i++) {
        let imgIndex = (currentIndex + i) % imageUrls.length;
        const imgElement = document.createElement('img');
        imgElement.src = imageUrls[imgIndex];
        carouselItems[i].innerHTML = '';
        carouselItems[i].appendChild(imgElement);
    }
    updateScale();
}

// 이미지 크기 조정 함수
function updateScale() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach((item, index) => {
        if (index === 0) {
            item.style.transform = 'scale(1.2)';
            item.style.zIndex = '3';
        } else if (index === 1 || index === 2) {
            item.style.transform = 'scale(0.9)';
            item.style.zIndex = '2';
        }
    });
}

// 다음 이미지로 이동
function nextImage() {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    updateCarousel();
}

// 이전 이미지로 이동
function prevImage() {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    updateCarousel();
}

// 자동 슬라이드 기능
function startAutoSlide() {
    slideInterval = setInterval(() => {
        nextImage();
    }, 5000); // 5초마다 이미지 전환
}

// 자동 슬라이드를 멈추고 다시 시작하는 기능
function restartAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// 버튼을 통해 슬라이드를 조작할 때 자동 슬라이드를 멈췄다가 다시 시작
document.querySelector('.next').addEventListener('click', () => {
    nextImage();
    restartAutoSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
    prevImage();
    restartAutoSlide();
});

// 페이지 로드 시 자동 슬라이드 시작
startAutoSlide();

//인트로정보 조회 함수
async function getIntroInfo(contentTypeId) {
    try {
        const url = `https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=TripTrav&_type=json&contentId=126676&contentTypeId=${contentTypeId}&serviceKey=${tourAPIKEY}`;
        const response = await fetch(url);
        const result = await response.json()
        return result;
    }catch (error){
        console.log(error)
    }
}
//추가정보 조회 함수
async function getAdditionalInfo(contentTypeId) {
    try{
        const url = `https://apis.data.go.kr/B551011/KorService1/detailInfo1?MobileOS=ETC&MobileApp=TripTrav&_type=json&contentId=126676&contentTypeId=${contentTypeId}&serviceKey=${tourAPIKEY}`
        const response = await fetch(url);
        const result = await response.json()
        return result;
    }catch (error){
        console.log(error)
    }
}