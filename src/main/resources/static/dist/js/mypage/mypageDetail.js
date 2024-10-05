var params = new URLSearchParams(window.url);
console.log(params);
const bottom = document.getElementById("resultMyPage");
const modal = document.querySelector(".updateModal");
// const accordionBtn = document.querySelector(".accordionBtn");
// const liList = document.querySelector(".myPageList > li");

const js = "/dist/js/mypage";
const tripList = "/tripList";
const tripReview = "/tripReview";
const wishPlace = "/wishPlace";
const wishTrip = "/wishTrip";

pageCall(tripReview);
pageHover("tripReview");

isSocialUser(unoNum).then(data => {
    console.log(data.provider === null);
    if (data.provider !== null) {
        console.log('들어옴');
        document.getElementById("pw").disabled = true;
    }

})

document.querySelectorAll('.myPageList > li').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.id;
        console.log(id);
        bottom.innerHTML = "";
        pageHover(id);
        switch (id) {
            case 'tripList':
                pageCall(tripList);
                break;
            case 'tripReview':
                pageCall(tripReview);
                break;
            case 'wishPlace':
                pageCall(wishPlace);
                break;
            case 'wishTrip':
                pageCall(wishTrip);
                break;
        }
    })
})

// !important 키워드에 대한 사용법을 알게됨
//페이지 호버
function pageHover(id) {
    const listItems = document.querySelectorAll(".myPageList > li");
    listItems.forEach(item => {
        const link = item.querySelector('p');
        if (link.className === id) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 페이지 호출
function pageCall(page) {
    const mypage = "/mypage" + page;
    console.log(mypage);
    fetch(mypage)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            bottom.innerHTML = data;
            loadScript(page);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

//js 호출
function loadScript(page) {
    const src = js + page + '.js';
    removeAllScript(src);
    if (!isScriptAlreadyIncluded(src)) {
        const script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
    }
}

// src를 keep 할것인지 추후 결정 예정...
//js 삭제
function removeAllScript(src) {
    console.log(src);
    const toKeep = ['/dist/js/header.js', '/dist/js/loginJoin.js', js + '/mypageDetail.js'];
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        let isToKeep = false;
        for (let j = 0; j < toKeep.length; j++) {
            if (scripts[i].src.includes(toKeep[j])) {
                isToKeep = true;
            }
        }
        if (!isToKeep) {
            document.body.removeChild(scripts[i]);
        }
    }
}

//js 체크
function isScriptAlreadyIncluded(src) {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes(src)) {
            return true;
        }
    }
    return false;
}

//모달 열기
function openUpdateModal() {
    modal.style.display = "flex";
    disableScroll();
}

//모달 닫기
function closeUpdateModal() {
    modal.style.display = "none";
    enableScroll();
}

//파일열기
function fileOpen() {
    document.getElementById("profileUpdateImg").click();
}

//스크롤 막기
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    }));
} catch (e) {
}

var wheelOpt = supportsPassive ? {passive: false} : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

//아코디언
document.querySelectorAll('.accordionBtn').forEach(button => {
    button.addEventListener('click', () => accordionToggle(button));
});

function accordionToggle(button) {
    const list = button.nextElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !isExpanded);
    list.classList.toggle('show', !isExpanded);
    if (isExpanded) {
        button.innerText = "펼치기";
    } else {
        button.innerText = "접기";
    }
}

//회원정보
async function isSocialUser(uno) {
    try {
        const config = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const url = await fetch("/mypage/isSocial?uno=" + uno, config);
        return await url.json();
    } catch (e) {
        console.log(e);
    }
}

function changeDate(text) {
    const datePattern = /\d{4}-\d{2}-\d{2}/;  // 날짜 패턴 (YYYY-MM-DD)
    const match = text.match(datePattern);
    return match ? match[0] : null;  // 매칭된 결과가 있으면 반환, 없으면 null 반환
}

function compareDate(text) {
    var date = new Date();
    var endDate = new Date(text);
    return date > endDate;
}

function noChild(trip) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    div.style.width = "1440px";
    div.style.height = "600px";
    p.style.textAlign = "center";
    p.innerText = ''; // 초기화
    switch (trip) {
        case "review":
            p.innerText = "작성한 리뷰가 없습니다.";
            break;
        case "list":
            p.innerText = "생성한 일정이 없습니다.";
            break;
        case "wishPlace":
            p.innerText = "찜한 장소가 없습니다.";
            break;
        case "wishTrip":
            p.innerText = "찜한 여행 일정이 없습니다.";
            break;
        default:
            p.innerText = "알 수 없는 옵션입니다.";
            break;
    }
    div.appendChild(p);
    return div;
}