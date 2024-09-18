const contentId = "126676";
const imgUrl = `https://apis.data.go.kr/B551011/KorService1/detailImage1?MobileOS=ETC&MobileApp=TripTrav&_type=json&subImageYN=Y&contentId=${contentId}&serviceKey=${tourAPIKEY}`;
const detailInfoUrl = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=TripTrav&contentId=${contentId}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&serviceKey=${tourAPIKEY}&_type=json`;
const foodContainer = document.querySelector('.food');
const attractionsContainer = document.querySelector('.attractions');
const imageUrlsDiv = document.querySelector('.imageUrls');

let currentIndex = 0;
let contentTypeId = 0;
let imageUrls = [];
let mapx = 0;
let mapy = 0;

// 기본정보 가져오기
fetch(detailInfoUrl)
    .then(response => response.json())
    .then(data => {
        const jsonData = data.response.body.items.item[0];
        const locationDiv = document.querySelector('.location');
        let city = splitAddr(jsonData.addr1)[0];
        let district = splitAddr(jsonData.addr1)[1];
        let title = jsonData.title;
        locationDiv.innerHTML = `<span>${city} > </span><span>${district} > </span><span>${title}</span>`;

        const mainImgUrl = jsonData.firstimage;
        imageUrls.push(mainImgUrl);

        // 추가 이미지를 가져오고 슬라이더에 반영
        getImage(imgUrl).then(result => {
            imageUrls.push(...result);
            updateImages();
        });

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
        mapx = jsonData.mapx;
        mapy = jsonData.mapy;



        let marker = {
            position: new kakao.maps.LatLng(mapy, mapx),
            text: '눌러서 경로를 검색해보세요!'
        };
        let staticMapContainer  = document.getElementById('staticMap'),
            staticMapOption = {
                center: new kakao.maps.LatLng(mapy, mapx),
                level: 4,
                marker: marker
            };
        let staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
        document.getElementById('staticMap').addEventListener('click', () => {
            const anchorTag = document.querySelector('#staticMap a');
            if (anchorTag) {
                anchorTag.href = `https://map.kakao.com/link/to/${title},${mapy},${mapx}`;
            }
        });


        //주변지역 처리
        processNearbySightsAndFood(mapx, mapy).then(result => {
            renderNearbySightsAndFood(result.sights, result.food);
        }).catch(error => {
            console.log(error)
        });
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

// 이미지 URL 배열을 동적으로 추가하는 함수
function updateImages() {
    imageUrlsDiv.innerHTML = '';
    const visibleImages = imageUrls.slice(currentIndex, currentIndex + 5);

    visibleImages.forEach(url => {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.classList.add('slideImage');
        imageUrlsDiv.appendChild(imgElement);
    });
}

// 이전 버튼 클릭 시
document.querySelector('.prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = imageUrls.length - 5;
    }
    updateImages();
});

// 다음 버튼 클릭 시
document.querySelector('.next').addEventListener('click', () => {
    if (currentIndex < imageUrls.length - 5) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateImages();
});

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

//주변 관광지 조회 함수
async function getNearBySights(mapx, mapy, radius) {
    try {
        const url = `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?MobileOS=ETC&MobileApp=TripTrav&_type=json&arrange=O&mapX=${mapx}&mapY=${mapy}&radius=${radius}&contentTypeId=12&serviceKey=${tourAPIKEY}`;
        const response = await fetch(url);
        const result = await response.json();
        return result.response.body.items.item;
    } catch (error) {
        console.log(error);
    }
}

//주변 음식점 조회 함수
async function getNearByFoodInfo(mapx, mapy, radius){
    try {
        const url = `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?MobileOS=ETC&MobileApp=TripTrav&_type=json&arrange=O&mapX=${mapx}&mapY=${mapy}&radius=${radius}&contentTypeId=39&serviceKey=${tourAPIKEY}`
        const response = await fetch(url);
        const result = await response.json()
        return result.response.body.items.item;
    }catch (error){
        console.log(error);
    }
}
//리뷰관련 부분
//리뷰등록
async function writeReview() {
    const data = {
        reContent : document.querySelector('.reviewArea').value
    };
    try {
        const url = '/place/review';
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data)
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}
document.querySelector('.addButton').addEventListener('click', ()=>{
    console.log(document.querySelector('.reviewArea').value)
    writeReview().then(result => console.log(result))
})

// 주변 관광지와 음식점 조회 후 조건 처리 함수
async function processNearbySightsAndFood(mapx, mapy) {
    let range = 1000;
    async function fetchAndProcess() {
        const [sightsArray = [], foodArray = []] = await Promise.all([
            getNearBySights(mapx, mapy, range).catch(() => []),
            getNearByFoodInfo(mapx, mapy, range).catch(() => [])
        ]);
        const filteredSights = (sightsArray || []).filter(sight => sight.firstimage);
        const filteredFood = (foodArray || []).filter(food => food.firstimage);
        if (filteredSights.length < 5 || filteredFood.length < 5) {
            range += 1000;
            return fetchAndProcess();
        }
        filteredSights.sort((a, b) => a.dist - b.dist);
        filteredFood.sort((a, b) => a.dist - b.dist);

        const topSights = filteredSights.slice(1, 5);
        const topFood = filteredFood.slice(1, 5);
        return {
            sights: topSights,
            food: topFood
        };
    }
    return fetchAndProcess();
}
//주변 관광지, 음식점 화면출력 함수
function renderNearbySightsAndFood(sights, food) {
    foodContainer.innerHTML = '';
    attractionsContainer.innerHTML = '';

    food.forEach(item => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('locations');
        const img = document.createElement('img');
        img.src = item.firstimage;
        img.alt = item.title;
        foodDiv.appendChild(img);
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');
        const titleP = document.createElement('p');
        titleP.classList.add('title');
        titleP.textContent = item.title;
        const distP = document.createElement('p');
        distP.classList.add('distance');
        distP.textContent = convertDistance(item.dist);
        infoDiv.appendChild(titleP);
        infoDiv.appendChild(distP);
        foodDiv.appendChild(infoDiv);
        foodContainer.appendChild(foodDiv);
    });

    sights.forEach(item => {
        const sightDiv = document.createElement('div');
        sightDiv.classList.add('locations');
        const img = document.createElement('img');
        img.src = item.firstimage;
        img.alt = item.title;
        sightDiv.appendChild(img);
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');
        const titleP = document.createElement('p');
        titleP.classList.add('title');
        titleP.textContent = item.title;
        const distP = document.createElement('p');
        distP.classList.add('distance');
        distP.textContent = convertDistance(item.dist);
        infoDiv.appendChild(titleP);
        infoDiv.appendChild(distP);
        sightDiv.appendChild(infoDiv);
        attractionsContainer.appendChild(sightDiv);
    });
}

//거리 변환 함수
function convertDistance(dist) {
    let number = parseFloat(dist);
    let integerNumber = Math.floor(number);
    let kilometers = integerNumber / 1000;
    if (kilometers < 1) {
        return integerNumber + ' m';
    } else {
        return kilometers.toFixed(0) + ' km';
    }
}