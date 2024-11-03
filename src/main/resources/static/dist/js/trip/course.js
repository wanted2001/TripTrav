let currentSlideIndex = 0;
let totalImages = 0;
let currentOverviews = [];
let likeList = [];
let isLike = false;
// 초기 데이터 로드
fetchAndFilterCourseData().then(result => {
    displayCards(result);
});

// JSON 데이터 처리 및 카드 리스트 출력
async function fetchAndFilterCourseData() {
    try {
        const response = await fetch('/dist/json/courseData.json');
        const data = await response.json();
        const filteredData = data.filter(item => item.addr1 && item.firstimage);
        const randomSelection = [];
        const selectedIndices = new Set();
        while (randomSelection.length < 9 && randomSelection.length < filteredData.length) {
            const randomIndex = Math.floor(Math.random() * filteredData.length);
            if (!selectedIndices.has(randomIndex)) {
                selectedIndices.add(randomIndex);
                randomSelection.push(filteredData[randomIndex]);
            }
        }
        return randomSelection;
    } catch (error) {
        console.log(error);
    }
}
//json 데이터처리
async function getTourData(targetContentId) {
    try {
        const response = await fetch('/dist/json/AITourData.json');
        const data = await response.json();
        const filteredData = data.find(item => item.contentid == targetContentId);
        return await filteredData
    } catch (error) {
        console.log(error);
    }
}

// 카드 데이터로 출력
function displayCards(data) {
    const courseWrap = document.querySelector('.courseWrap');
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('cardContainer');

    data.forEach(item => {
        const heartImgSrc = isLikeCourse(`${item.contentid}`) ? "/dist/image/heart-on.svg" : "/dist/image/heart.svg";
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.contentId = item.contentid;

        card.innerHTML = `
            <img src="${item.firstimage}" alt="${item.title}" class="card-image">
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-addr">${item.addr1}</p>
            </div>
            <button class="courseHeartBtn" data-contentId="${item.contentid}" data-isLike="${isLike}"><img src="${heartImgSrc}"></button>
        `;
        card.addEventListener('click', () => {
            handleCardClick(item.contentid, item.title);
        });
        cardContainer.appendChild(card);
    });
    courseWrap.appendChild(cardContainer);
}

// 모달 오픈 시 상세 조회 및 슬라이드 생성
async function handleCardClick(contentId, title) {
    document.getElementById('courseModal').style.display = 'block';
    currentSlideIndex = 0;

    document.querySelector('.course-modal-title').innerText = title;
    document.querySelector('.course-overview').innerText = await getOverView(contentId);

    try {
        const detailResult = await getDetail(contentId);
        const itemsArray = detailResult.response.body.items.item;

        currentOverviews = itemsArray.map(item => item.subdetailoverview);

        const imageUrls = await Promise.all(
            itemsArray.map(async item => {
                const tourData = await getTourData(item.subcontentid);
                if (tourData && tourData.firstimage) {
                    return tourData.firstimage;
                }
                const fetchedImageUrl = await fetchFilteredImageUrl(item.subcontentid);
                if (fetchedImageUrl !== null) {
                    return fetchedImageUrl;
                }
                const moreImageUrl = await getMoreImageUrl(item.subname);
                if (moreImageUrl) {
                    return moreImageUrl;
                }
                return '/dist/image/noimage.jpg';
            })
        );
        createSlidesAndProgressBar(imageUrls);
        showSlide(currentSlideIndex);
        updateModalBodyOverview(currentSlideIndex);
    } catch (error) {
        console.error(error);
    }
}

// 슬라이드에 따라 overview를 업데이트하는 함수
function updateModalBodyOverview(index) {
    const overviewElement = document.querySelector('.detail-overview');
    overviewElement.innerHTML = currentOverviews[index] || '상세 정보가 없습니다.';
}

//슬라이드, 진행바 생성
function createSlidesAndProgressBar(images) {
    const sliderContainer = document.querySelector('.course-slider-container');
    const progressBar = document.querySelector('.course-progress-bar');
    sliderContainer.innerHTML = '';
    progressBar.innerHTML = '';
    totalImages = images.length;
    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.classList.add('course-slide', 'fade');
        slide.innerHTML = `<img src="${image}" alt="Image ${index + 1}" class="course-slide-image">`;
        sliderContainer.appendChild(slide);
        const step = document.createElement('p');
        step.classList.add('course-step');
        step.textContent = index + 1;
        progressBar.appendChild(step);
        if (index < images.length - 1) {
            const line = document.createElement('div');
            line.classList.add('course-line');
            progressBar.appendChild(line);
        }
    });

    if (totalImages <= 3) {
        const leftDottedLine = document.createElement('div');
        leftDottedLine.classList.add('course-line', 'dotted');
        progressBar.insertBefore(leftDottedLine, progressBar.firstChild);

        const rightDottedLine = document.createElement('div');
        rightDottedLine.classList.add('course-line', 'dotted');
        progressBar.appendChild(rightDottedLine);
    }
    currentSlideIndex = 0;
}

//슬라이드출력
function showSlide(index) {
    const slides = document.querySelectorAll('.course-slide');
    const steps = document.querySelectorAll('.course-step');
    const lines = document.querySelectorAll('.course-line');

    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    steps.forEach((step, i) => {
        step.classList.toggle('active', i <= index);
    });

    lines.forEach((line, i) => {
        if (totalImages > 3) {
            line.classList.toggle('active', i < index);
        } else {
            if (i > 0 && i < lines.length - 1) {
                line.classList.toggle('active', i - 1 < index);
            }
        }
    });
}

// 슬라이드 이동 함수
function changeSlide(step) {
    const slides = document.querySelectorAll('.course-slide');
    currentSlideIndex = (currentSlideIndex + step + slides.length) % slides.length;
    showSlide(currentSlideIndex);
    updateModalBodyOverview(currentSlideIndex);
}

// 모달 열기
function openModal() {
    document.getElementById('courseModal').style.display = 'flex';
}

// 모달 닫기
function closeModal() {
    document.getElementById('courseModal').style.display = 'none';
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    const modal = document.getElementById('courseModal');
    if (event.target === modal) {
        closeModal();
    }
};

// 개요 데이터 가져오기
async function getOverView(courseId) {
    try {
        const url = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=TripTrav&_type=json&contentId=${courseId}&overviewYN=Y&serviceKey=${tourAPIKEY}`;
        const response = await fetch(url);
        const result = await response.json();
        return result.response.body.items.item[0].overview;
    } catch (error) {
        console.log(error);
    }
}

//상세 내용 가져오기
async function getDetail(contentId) {
    try {
        const url = `https://apis.data.go.kr/B551011/KorService1/detailInfo1?MobileOS=ETC&MobileApp=triptrav&_type=json&contentId=${contentId}&contentTypeId=25&serviceKey=${tourAPIKEY}`;
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}
//이미지 추가가져오기
async function fetchFilteredImageUrl(subId) {
    try {
        const url = `https://apis.data.go.kr/B551011/KorService1/detailImage1?MobileOS=ETC&MobileApp=triptrav&_type=json&contentId=${subId}&subImageYN=Y&serviceKey=${tourAPIKEY}`;
        const response = await fetch(url);
        const result = await response.json();
        const items = result.response.body.items.item;
        if (items && items.length > 0) {
            const randomIndex = Math.floor(Math.random() * items.length);
            const filteredItem = items[randomIndex];
            return filteredItem.originimgurl;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}
//이미지 추가더 가져오기
async function getMoreImageUrl(title) {
    try {
        const encodedTitle = encodeURIComponent(title);
        const url = `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySyncDetailList1?MobileOS=ETC&MobileApp=triptrav&showflag=1&_type=json&title=${encodedTitle}&serviceKey=${tourAPIKEY}`
        const response = await fetch(url);
        const result = await response.json();
        if (result.response && result.response.body && result.response.body.items && result.response.body.items.item.length > 0) {
            const item = result.response.body.items.item[0];
            return item.galWebImageUrl;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

//코스 찜해놓은거 출력여부
function isLikeCourse(contentId) {
    if (likeList.length == 0) {
        return false;
    }
    for (let like of likeList) {
        if (like == contentId) {
            return true;
        }
    }
    return false;
}
async function likeListCall(unoNum) {
    try {
        console.log(unoNum);
        const response = await fetch("/trip/likeListCall?uno=" + unoNum);
        likeList = await response.json();
    } catch (error) {
        console.error('Error fetching like list:', error);
    }
}
if (typeof userNickname !== 'undefined' && userNickname !== null) {
    likeListCall(unoNum);
}