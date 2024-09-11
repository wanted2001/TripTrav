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
        document.querySelector('.details').innerHTML = `<p>소개</p><span>${jsonData.overview}</span>`;
        console.log(jsonData.mapy,jsonData.mapx)
        initTmap(jsonData.mapy,jsonData.mapx,title)
        // document.querySelector('.vsm-marker').style.transform = "translate(700px, 250px)"

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
//지도 함수
function initTmap(mapx,mapy,title){
    let map = new Tmapv3.Map("map",
        {
            center: new Tmapv3.LatLng(mapx,mapy),
            width: "1400px",
            height: "400px",
            zoom: 14
        });
    let marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(mapx, mapy),
        map: map,
    });
}