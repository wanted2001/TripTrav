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
// fetch(detailInfoUrl)
//     .then(response => response.json())
//     .then(data => {
//         const jsonData = data.response.body.items.item[0];
//         const locationDiv = document.querySelector('.location');
//         let city = splitAddr(jsonData.addr1)[0];
//         let district = splitAddr(jsonData.addr1)[1];
//         let title = jsonData.title;
//         locationDiv.innerHTML = `<span>${city} > </span><span>${district} > </span><span>${title}</span>`;
//
//         const mainImgUrl = jsonData.firstimage;
//         imageUrls.push(mainImgUrl);
//
//         // 추가 이미지를 가져오고 슬라이더에 반영
//         getImage(imgUrl).then(result => {
//             imageUrls.push(...result);
//             updateImages();
//         });
//
//         contentTypeId = jsonData.contenttypeid;
//         document.querySelector('.title').innerText = jsonData.title
//         document.querySelector('.locationInfo').innerHTML = `주소 : ${jsonData.addr1}`;
//
//         getIntroInfo(contentTypeId).then(result=>{
//             const introData = result.response.body.items.item[0];
//             document.querySelector('.telInfo').innerHTML = `전화번호 : ${introData.infocenter}`
//             document.querySelector('.restInfo').innerHTML = `쉬는날 : ${introData.restdate}`
//             document.querySelector('.timeInfo').innerHTML = `이용시간 : ${introData.usetime}`
//         })
//         getAdditionalInfo(contentTypeId).then(result => {
//             const additionalInfoData = result.response.body.items.item[0];
//             document.querySelector('.priceInfo').innerHTML = `${additionalInfoData.infoname} : ${additionalInfoData.infotext}`
//         })
//         document.querySelector('.homepageInfo').innerHTML = `홈페이지 : ${jsonData.homepage}`
//         document.querySelector('.details').innerHTML = `<p>소개</p><span>${jsonData.overview}</span>`;
//         mapx = jsonData.mapx;
//         mapy = jsonData.mapy;
//
//         let marker = {
//             position: new kakao.maps.LatLng(mapy, mapx),
//             text: '눌러서 경로를 검색해보세요!'
//         };
//         let staticMapContainer  = document.getElementById('staticMap'),
//             staticMapOption = {
//                 center: new kakao.maps.LatLng(mapy, mapx),
//                 level: 4,
//                 marker: marker
//             };
//         let staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
//         document.getElementById('staticMap').addEventListener('click', () => {
//             const anchorTag = document.querySelector('#staticMap a');
//             if (anchorTag) {
//                 anchorTag.href = `https://map.kakao.com/link/to/${title},${mapy},${mapx}`;
//             }
//         });
//
//         //주변지역 처리
//         processNearbySightsAndFood(mapx, mapy).then(result => {
//             renderNearbySightsAndFood(result.sights, result.food);
//         }).catch(error => {
//             console.log(error)
//         });
//     });

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

//리뷰관련 부분
//리뷰등록
async function writeReview() {
    const files = document.getElementById('imageInput').files;
    const data = new FormData();
    data.append('reContent', document.querySelector('.reviewArea').value);
    data.append('nickname', 'Test');
    data.append('reRate', document.getElementById('rating-value').textContent);
    data.append('reImageCount', files.length);
    data.append('reContentType', 12); //임시값 나중에 불러와
    data.append('uno', 1); // 임시값 나중에 불러와
    data.append('reContentId', contentId)

    for (let i = 0; i < files.length; i++) {
        data.append('images', files[i]);
    }
    try {
        const url = '/review/POST';
        const config = {
            method: 'POST',
            body: data
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}

document.querySelector('.addButton').addEventListener('click', () => {
    writeReview().then(result =>{
        if(result == "success" || result == "imageSuccess"){
            alert("댓글 작성 완료");
            window.location.reload();
        }else{
            alert("댓글 작성 실패")
        }
    });
});

//이미지업로드 관련 함수
const MAX_FILE_SIZE = 10 * 1024 * 1024;
function handleFileUpload(event) {
    const files = Array.from(event.target.files);
    const fileCountElement = document.getElementById('fileCount');
    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = '';
    if (files.length > 3) {
        alert('최대 3장만 업로드할 수 있습니다.');
        event.target.value = '';
        return;
    }
    let validFiles = [];
    files.forEach(file => {
        if (file.size > MAX_FILE_SIZE) {
            alert(`파일 "${file.name}" 크기가 10MB를 초과했습니다. 다른 파일을 선택해주세요.`);
        } else {
            validFiles.push(file);
        }
    });
    if (validFiles.length === 0) {
        event.target.value = '';
        fileCountElement.innerText = '';
        return;
    }
    fileCountElement.innerText = `${validFiles.length}/3 첨부 완료`;
    validFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgContainer = document.createElement('div');
            imgContainer.style.position = 'relative';
            imgContainer.style.display = 'inline-block';
            imgContainer.style.margin = '5px';
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '120px';
            img.style.height = '120px';
            img.style.objectFit = 'cover';
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'X';
            deleteButton.style.position = 'absolute';
            deleteButton.style.top = '2px';
            deleteButton.style.right = '2px';
            deleteButton.style.fontSize = '20px';
            deleteButton.style.color = 'white';
            deleteButton.style.cursor = 'pointer';
            deleteButton.onclick = function() {
                validFiles.splice(index, 1);
                handleFileUpload({ target: { files: new DataTransfer().files } });
            };
            imgContainer.appendChild(img);
            imgContainer.appendChild(deleteButton);
            previewContainer.appendChild(imgContainer);
        };
        reader.readAsDataURL(file);
    });
}


//별점관리
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.getElementById('stars');
    const ratingValue = document.getElementById('rating-value');
    let currentRating = 0;
    let isClickSet = false;

    stars.addEventListener('mousemove', function (e) {
        const rect = stars.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const starWidth = rect.width / 5;
        const rating = Math.ceil((offsetX / starWidth) * 2) / 2;

        if (offsetX >= 0 && offsetX <= rect.width) {
            highlightStars(rating);
            ratingValue.textContent = rating;
        }
    });

    stars.addEventListener('click', function () {
        currentRating = parseFloat(ratingValue.textContent);
        isClickSet = true;
    });

    stars.addEventListener('mouseleave', function (e) {
        if (isClickSet) {
            highlightStars(currentRating);
            ratingValue.textContent = currentRating;
        }
    });

    function highlightStars(rating) {
        const starElements = stars.children;
        for (let i = 0; i < starElements.length; i++) {
            const starValue = i + 1;
            if (starValue <= rating) {
                starElements[i].classList.add('full');
                starElements[i].classList.remove('half');
            } else if (starValue - 0.5 === rating) {
                starElements[i].classList.add('half');
                starElements[i].classList.remove('full');
            } else {
                starElements[i].classList.remove('full');
                starElements[i].classList.remove('half');
            }
        }
    }
});

// 리뷰 가져오기 함수
async function getReviewList(){
    try {
        const url = "/review/GET/"+contentId;
        const config = {
            method: 'GET'
        };
        const resp = await fetch(url, config);
        return await resp.json();
    } catch (error) {
        console.log(error);
    }
}

getReviewList().then(result => {
    const reviewContainer = document.querySelector('.review');

    result.forEach(reviewDTO => {
        const review = reviewDTO.review;
        const imagePaths = reviewDTO.imagePaths;

        const reviewWrapper = document.createElement("div");
        reviewWrapper.className = "review-wrapper";

        const reviewInfoDiv = document.createElement("div");
        reviewInfoDiv.className = "review-info";

        let profileImgPath;
        getUserProfile(review.uno).then(result => {
            profileImgPath = result;
            const starHTML = convertRatingToStars(review.reRate);

            reviewInfoDiv.innerHTML = `
                <img class="profileImage" alt="noPic" src="/profile/${profileImgPath}">
                <span class="nickName">${review.nickname}</span><br>
                <span class="review-rating">${starHTML}</span>
                <span class="regDate">${review.reDate}</span>
                <button class="helpButton">
                    <span class="reUseful">${review.reUseful}</span><img src="/dist/image/thumbs-up.svg">
                </button>
                <button class="reportButton">
                    <img src="/dist/image/alert-triangle.svg">
                </button>`;
        });

        const reviewDetailDiv = document.createElement("div");
        reviewDetailDiv.className = "review-detail";
        reviewDetailDiv.innerHTML = `<p class="reviewContent">${review.reContent}</p>`;
        if (imagePaths && imagePaths.length > 0) {
            const imageDiv = document.createElement("div");
            imageDiv.className = "review-images";
            imagePaths.forEach(imagePath => {
                const relativePath = imagePath.replace("C:\\userImage\\", "");
                const img = document.createElement("img");
                img.src = `/reviewImages/${relativePath}`;
                img.alt = "리뷰 이미지";
                img.classList.add('review-img');
                imageDiv.appendChild(img);
            });
            reviewDetailDiv.appendChild(imageDiv);

        }



        reviewWrapper.appendChild(reviewInfoDiv);
        reviewWrapper.appendChild(reviewDetailDiv);

        reviewContainer.appendChild(reviewWrapper);
    });
});


//별점 별로 변환함수
function convertRatingToStars(rating) {
    const starFull = '<img src="/dist/image/star-full.png" alt="Full Star">';
    const starHalf = '<img src="/dist/image/star-half.png" alt="Half Star">';
    const starEmpty = '<img src="/dist/image/star-empty.png" alt="Empty Star">';

    let stars = '';

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars += starFull;
        } else if (rating >= i - 0.5) {
            stars += starHalf;
        } else {
            stars += starEmpty;
        }
    }
    return stars;
}
//유저프로필 가져오기
async function getUserProfile(uno){
    try{
        const url = "/user/profile/"+uno;
        const config = {
            method: 'GET'
        };
        const resp = await fetch(url, config);
        return await resp.text();
    }catch(error){
        console.log(error);
    }
}

//전체 리뷰갯수 가져오기
async function getReviewCount(){
    try{
        const url = "/review/getCount/"+contentId;
        console.log(typeof contentId)
        const config = {
            method : "GET"
        };
        const resp = await fetch(url,config);
        const result = await resp.text();
        return parseInt(result);
    }catch (error){
        console.log(error)
    }
}
getReviewCount().then(result => {
    document.querySelector('.reviewCount').innerText = result+" 개"
})

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

// 버튼누르면 섹션 이동하는 함수
function scrollToSection(buttonClass, sectionClass) {
    const button = document.querySelector(buttonClass);
    const section = document.querySelector(sectionClass);
    if (button && section) {
        button.addEventListener('click', function() {
            section.scrollIntoView({ behavior: 'smooth' });
        });
    }
}
scrollToSection('.outlineMove', '.details');
scrollToSection('.reviewMove', '.reviews');
scrollToSection('.findRouteMove', '.transportation');
scrollToSection('.nearbyMove', '.nearby');

checkLogin();
//로그인 체크 함수
function checkLogin(){
    if(typeof userNickname !== 'undefined' && userNickname !== null){
        document.querySelector('.reviewArea').placeholder = '타인에게 불쾌감을 줄 수 있는 리뷰는 삭제될 수 있습니다. ';
    }else{
        console.log("로그인")
    }
}