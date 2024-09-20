const bottom = document.getElementById("resultMyPage");
const modal = document.querySelector(".updateModal");
const accordionBtn = document.querySelector(".accordionBtn");
const js = "/dist/js/mypage";
const tripList = "/tripList";
const tripReview = "/tripReview";
const wishPlace = "/wishPlace";
const wishTrip = "/wishTrip";

pageCall(tripReview);
pageHover("tripReview");

document.querySelectorAll('#tripList,#tripReview,#wishPlace,#wishTrip').forEach(button=>{
    button.addEventListener('click',(e)=>{
        const id = e.target.id;
        console.log(id);
        bottom.innerHTML= "";
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
        const link = item.querySelector('a');
        if (link.id === id) {
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
function loadScript(page){
    const src = js+page+'.js';
    removeAllScript(src);
    if(!isScriptAlreadyIncluded(src)){
        const script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
    }
}
// src를 keep 할것인지 추후 결정 예정...
//js 삭제
function removeAllScript(src){
    console.log(src);
    const toKeep =['/dist/js/header.js','/dist/js/loginJoin.js',js+'/mypageDetail.js',src];
    const scripts = document.getElementsByTagName('script');
    for(let i = 0; i<scripts.length; i++) {
        let isToKeep = false;
        for (let j = 0; j < toKeep.length; j++) {
            if(scripts[i].src.includes(toKeep[j])){
                isToKeep = true;
            }
        }
        if(!isToKeep){
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
function openUpdateModal(){
    modal.style.display = "flex";
    disableScroll();
}

//모달 닫기
function closeUpdateModal(){
    modal.style.display = "none";
    enableScroll();
}

//파일열기
function fileOpen(){
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
        get: function () { supportsPassive = true; }
    }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
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

// 가져온 정보의 array가 다섯개 이상이면 버튼으로 아코디언 숨김 처리
function lengthOver(length){
    if(length => 5) {
        accordionBtn.backgroundColor = "red";
    }
}




