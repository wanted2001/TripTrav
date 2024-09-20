//상단 회색바탕 위 드래그 슬라이드 구현
//상단 일수별 슬라이드
let slideWrap = document.querySelector('.slideWrap');
let innerSlide = document.querySelector('.innerSlide');
let slideItems = document.querySelectorAll('.slideItem');
let pressed = false;
let startPoint;
let x;
const slideItemWidth = 200;

//메모모달
const modal = document.querySelector('.memoModal');
const closeModalBtn = document.querySelector('.memoCloseBtn');
const addMemoBtn = document.querySelector('.addMemoBtn');

//일정편집
const editBtn = document.querySelector('.editBtn');
const saveBtn = document.querySelector('.saveBtn');

document.addEventListener('DOMContentLoaded', () => {
    //드래그 슬라이드 부분
    updateInnerSlideWidth();
    makeDot();

    slideWrap.addEventListener('mousedown', e => {
        pressed = true;
        startPoint = e.offsetX - innerSlide.offsetLeft;
        slideWrap.style.cursor = 'grabbing';
    });

    slideWrap.addEventListener('mousemove', e => {
        if (!pressed) return;
        e.preventDefault();
        x = e.offsetX;
        innerSlide.style.left = `${x - startPoint}px`;

        checkBoundary();
        checkSelectedItem();
    });

    window.addEventListener('mouseup', () => {
        pressed = false;
        slideWrap.style.cursor = 'grab';
    });

    slideWrap.addEventListener('mouseleave', () => {
        pressed = false;
    });

    //메모작성부분
    addMemoBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
    closeModalBtn.addEventListener('click',()=>{
        modal.style.display='none';
    })

    //메모저장부분
    const saveMemoBtn = document.querySelector('.saveMemo');
    saveMemoBtn.addEventListener('click',()=>{
        saveMemo();
    })

    //데이터 불러오기
    getData(detailInfoUrl).then(result=>{
        console.log(result);
        let content='';
        result.forEach(key=>{
            //카테고리 -> 관광지 / 음식점 같은 api 코드 넣기
            //어차피 id별 이미지가져올꺼니까 주소도 가져와서 넣음되겠다
            //a태그 추가작업 필요
            content += `<li class="oneContent" data-id="${key.subcontentid}">
                    <div class="deletePlan hidden">&times;</div>
                    <div class="changePlan hidden">
                        <img src="/dist/image/triangle.svg" class="triangle">
                        <img src="/dist/image/triangle.svg" class="downTriangle">
                    </div>
                    <div class="name_cate">
                        <span class="placeName">${key.subname}</span>
                        <span class="placeCate">장소카테고리</span>
                    </div>
                    <div class="placeAddr">장소</div>
                    <div class="rate_count">
                        <span class="placeRate">별점</span>
                        <span class="placeRateCount">별점개수</span>
                    </div>
                    <div class="placeImgDiv">
                        <div class="placeImg"></div>
                        <div class="placeImg"></div>
                        <div class="placeImg"></div>
                    </div>
                </li>`;
            document.querySelector('.contentArea').innerHTML=content;
        })
    })
});

//상단 슬라이드 길이 계산 함수
function updateInnerSlideWidth() {
    //div 개수따라 totalWidth 값 설정되도록
    const totalWidth = slideItems.length * slideItemWidth;
    innerSlide.style.width = `${totalWidth}px`;
    document.querySelector('.innerLine').style.width=`${totalWidth - 215}px`;
}

//슬라이드 길이 체크(왼쪽, 오른쪽 더 넘어가지 않도록)
function checkBoundary() {
    const outerRect = slideWrap.getBoundingClientRect();
    const innerRect = innerSlide.getBoundingClientRect();
    const lastSlideItem = slideItems[slideItems.length - 1]; // 마지막 slideItem

    if (parseInt(innerSlide.style.left) > 0) {
        innerSlide.style.left = '0px';
    }

    const maxLeft = outerRect.width - innerRect.width;

    if (innerRect.right < outerRect.right) {
        const minLeft = Math.min(outerRect.width - innerRect.width, 0);
        if (parseInt(innerSlide.style.left) < minLeft) {
            innerSlide.style.left = `${minLeft}px`;
        }
    }
}

//일정위치에서 div 사이즈 변경
function checkSelectedItem() {
    const center = slideWrap.getBoundingClientRect().width / 1.5;
    const expandRange = 100;

    slideItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 1.5;
        const distance = Math.abs(center - itemCenter);

        if (distance < expandRange) {
            item.style.width = '195px';
            item.style.height = '195px';
            item.style.marginTop='-35px';
            item.style.background='gold';

            const dot = item.querySelector('.dot');
            if(dot){ dot.classList.add('selectDot'); }
        } else {
            item.style.width = '160px';
            item.style.height = '160px';
            item.style.marginTop='0px';
            item.style.background='pink';

            const dot = item.querySelector('.dot');
            if(dot){ dot.classList.remove('selectDot'); }
        }
    });
}

//슬라이드 div 하단 dot 생성
function makeDot(){
    slideItems.forEach(item=>{
        const dot = document.createElement('div');
        dot.classList.add('dot');
        item.appendChild(dot);
    })
}

//메모저장(아직 DB X)
function saveMemo(){
    if(confirm('메모를 저장하시겠습니까?')) {
        console.log("메모저장")
        modal.style.display='none';
    }
}

//map 위에 띄우는 content
let openBtn = document.querySelector('.mapOpenBtn');
let closeBtn = document.querySelector('.mapCloseBtn');
let mapContentBox = document.querySelector('.mapContentBox');

function toggleVisibility(element, isVisible) {
    element.classList.toggle("hidden", !isVisible);
    element.classList.toggle("visible", isVisible);
}

function toggleVisibilityForEach(element, isVisible) {
    element.forEach(el =>{
        el.classList.toggle("hidden", !isVisible);
    })
    element.forEach(el=>{
        el.classList.toggle("visible", isVisible);
    })
}

openBtn.addEventListener('click', () => {
    toggleVisibility(openBtn, false);
    toggleVisibility(mapContentBox, true);
    toggleVisibility(closeBtn, true);
    closeBtn.style.left = '520px';
});

closeBtn.addEventListener('click', () => {
    if(!depth2.classList.contains('hidden')){
        depth2.classList.add('hidden');
        closeBtn.style.left='520px'
    } else {
        if(btnText.innerText==='저장'){
            if(confirm('현재 일정을 저장하시겠습니까?')){
                closeContent();
            }
        } closeContent();

    }
});

function closeContent(){
    toggleVisibility(openBtn, true);
    toggleVisibility(mapContentBox, false);
    toggleVisibility(closeBtn, false);
    depth2.classList.add("hidden");
    searchInput.value = '';
    document.querySelector('.searchResultDiv').innerHTML = '';

    const deleteBtn = document.querySelectorAll('.deletePlan');
    const changeBtn = document.querySelectorAll('.changePlan');
    deleteBtn.forEach(btn=>{
        btn.classList.add('hidden');
    })
    changeBtn.forEach(btn=>{
        btn.classList.add('hidden');
    })
    btnText.innerText = '편집';
    btnText.classList.remove('saveBtn');
    btnText.classList.add('editBtn');

    const li = ul.querySelectorAll('li');
    li.forEach(item=>{
        item.classList.toggle('on',item.getAttribute('data-number')==='1');
    })
    const depth2_recomm = document.querySelectorAll('.depth2_recomm');
    const depth2_search = document.querySelectorAll('.depth2_search_input_area');
    const depth2_heart = document.querySelectorAll('.depth2_heart');
    const depth2_search_input = document.querySelector('.depth2_search_input_area');
    toggleVisibilityForEach(depth2_recomm, true);
    toggleVisibilityForEach(depth2_search, false);
    toggleVisibilityForEach(depth2_heart, false);
    toggleVisibility(depth2_search_input, false);
}

//일정추가 2depth
const addPlan = document.querySelector('.addPlan');
const depth2 = document.querySelector('.mapContentBox2Depth');
addPlan.addEventListener('click',()=>{
    depth2.classList.remove('hidden');
    depth2.classList.add('visible');
    closeBtn.style.left='883px';
})

const ul = document.querySelector('.depth2_ul');
ul.addEventListener('click',(e)=>{
    const clickNumber = e.target.getAttribute('data-number');
    const li = ul.querySelectorAll('li');

    if(!clickNumber) return;

    li.forEach(item=>{
        item.classList.toggle('on',item.getAttribute('data-number')===clickNumber);
    })

    const elements = {
        recommend:document.querySelectorAll('.depth2_recomm'),
        search:document.querySelectorAll('.depth2_search'),
        heart:document.querySelectorAll('.depth2_heart'),
        searchInput:document.querySelector('.depth2_search_input_area'),
        morePlaceBtn:document.querySelector('.morePlaceBtn')
    }

    const state= {
        '1':{ recommend: false, search: true, heart: true, searchInput: true, morePlaceBtn: true },
        '2':{ recommend: true, search: false, heart: true, searchInput: false, morePlaceBtn: false },
        '3':{ recommend: true, search: true, heart: false, searchInput: true, morePlaceBtn: true }
    }

    const currentState = state[clickNumber];

    Object.keys(currentState).forEach(key=>{
        const element = elements[key];
        if(NodeList.prototype.isPrototypeOf(element)){
            element.forEach(item=>{
                item.classList.toggle('hidden', currentState[key]);
            })
        } else {
            if(element){
                element.classList.toggle('hidden', currentState[key]);
            }
        }
    })
})

//검색(2Depth)
const searchBtn = document.querySelector('.depth2_searchBtn');
const searchInput = document.querySelector('.depth2_input');

searchBtn.addEventListener('click',()=>{
    search();
})

searchInput.addEventListener('keyup',(e)=>{
    if(e.keyCode===13){
        search();
    }
})

function search(){
    if(searchInput.value===''){
        alert('검색어를 입력해주세요.')
    } else {
        let currentPage = 1;
        const itemsPage = 10;
        let totalCount = 0;
        let resultDiv = '';
        let keyword = searchInput.value;
        let url = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${tourAPIKEY}&MobileApp=TripTrav&MobileOS=ETC&pageNo=&numOfRows=100&listYN=Y&&arrange=A&contentTypeId=12&keyword=${keyword}&_type=json`;

        function displayResult(result){
            totalCount = result.totalCount;

            if(totalCount>=1){
                const start = (currentPage-1)*itemsPage;
                const end = Math.min(start+itemsPage, totalCount);
                const itemsDisplay = result.items.item.slice(start, end);

                itemsDisplay.forEach(key=>{
                    resultDiv += `
                    <div class="depth2_search">
                        <div class="depth2_search_area">
                            <div class="depth2_search_img" data-image="${key.firstimage}"></div>
                            <div class="depth2_search_name" data-id="${key.contentid}">${key.title}</div>
                            <div class="depth2_search_addr">${key.addr1}</div>
                        </div>
                        <div class="addPlanBtn" onclick="newPlan(event)"><img src="/dist/image/plus.svg"></div>
                    </div>`;
                })

                document.querySelector('.searchResultDiv').innerHTML=resultDiv;

                if(totalCount > currentPage * itemsPage){
                    const more = `<div class="morePlaceBtn">더보기<img src="/dist/image/chevron-down.svg"></div>`;
                    document.querySelector('.searchResultDiv').innerHTML += more;

                    // Attach event listener programmatically
                    document.querySelector('.morePlaceBtn').addEventListener('click', loadMore);
                    paddingSetting();
                }

                requestAnimationFrame(() => {
                    const imageDivs = document.querySelectorAll('.depth2_search_img');
                    imageDivs.forEach(img => {
                        const imageUrl = img.getAttribute('data-image');
                        img.style.backgroundImage = `url(${imageUrl})`;
                    });
                });
                paddingSetting();
            } else if(totalCount<1){
                const noResult = `<div class="noResult"><img src="/dist/image/alert-circle.svg">검색결과가 없습니다</div>`
                document.querySelector('.searchResultDiv').innerHTML=noResult;
            }
        }

        function loadMore(){
            currentPage++;
            searchKeyword(url).then(result=>{
                displayResult(result);
            })
        }

        function paddingSetting(){
            const name = document.querySelectorAll('.depth2_search_name');
            name.forEach(nameKey=>{
                if (nameKey.innerText.length>=19){
                    nameKey.style.paddingTop='0';
                }
            })
        }

        searchKeyword(url).then(result=>{
            console.log(result);
            displayResult(result);
        })
    }
}

async function searchKeyword(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        const items = data.response.body;
        return items;
    } catch(err){
        console.log(err);
    }
}

//일정삽입하기
const btnText = document.querySelector('.btnText');
function newPlan(event){
    if(btnText.innerText==='편집'){
         if(confirm('일정을 편집하시겠습니까?')){
             const deleteBtn = document.querySelectorAll('.deletePlan');
             const changeBtn = document.querySelectorAll('.changePlan');
             deleteBtn.forEach(btn=>{
                 btn.classList.remove('hidden');
             })
             changeBtn.forEach(btn=>{
                 btn.classList.remove('hidden');
             })
             btnText.innerText = '저장';
             btnText.classList.remove('editBtn');
             btnText.classList.add('saveBtn');

             newPlanF(event);
             countTriangle();
         }
    } else {
        editPlan(event);
        newPlanF(event);
        countTriangle();
    }
}

function newPlanF(event){
    const searchDiv = event.target.closest('.depth2_search');
    const contentId = searchDiv.querySelector('.depth2_search_name').getAttribute('data-id');
    const placeName = searchDiv.querySelector('.depth2_search_name').innerText
    const placeAddress = searchDiv.querySelector('.depth2_search_addr').innerText;

    const newLi = `<li class="oneContent" data-id="${contentId}" draggable="false">
                            <div class="deletePlan">&times;</div>
                            <div class="changePlan">
                                <img src="/dist/image/triangle.svg" class="triangle">
                                <img src="/dist/image/triangle.svg" class="downTriangle">
                            </div>
                            <div class="name_cate">
                                <span class="placeName">${placeName}</span>
                                <span class="placeCate"></span>
                            </div>
                            <div class="rate_count">
                                <span class="placeRate">별점</span>
                                <span class="placeRateCount">별점개수</span>
                            </div>
                            <div class="placeAddr">${placeAddress}</div>
                            <div class="placeImgDiv">
                                <div class="placeImg"></div>
                                <div class="placeImg"></div>
                                <div class="placeImg"></div>
                            </div>
                        </li>`;
    document.querySelector('.contentArea').insertAdjacentHTML('beforeend', newLi);
    document.querySelector('.btnText').innerText='저장';
}

//버튼으로 일정순서 변경
function editPlan(event){
    const target = event.target;
    const deleteBtn = document.querySelectorAll('.deletePlan');
    const changeBtn = document.querySelectorAll('.changePlan');

    if(target.classList.contains('editBtn')){
        deleteBtn.forEach(btn=>{
            btn.classList.remove('hidden');
        })
        changeBtn.forEach(btn=>{
            btn.classList.remove('hidden');
        })
        target.innerText = '저장';
        target.classList.remove('editBtn');
        target.classList.add('saveBtn');
    } else if (target.classList.contains('saveBtn')) {
        // 저장 버튼을 클릭했을 때
        deleteBtn.forEach(btn=>{
            btn.classList.add('hidden');
        })
        changeBtn.forEach(btn=>{
            btn.classList.add('hidden');
        })
        target.classList.remove('saveBtn');
        target.classList.add('editBtn');
        target.innerText = '편집';
    }
}

function countTriangle(){
    const triangleButtons = document.querySelectorAll('.triangle');
    const downTriangleButtons = document.querySelectorAll('.downTriangle');

    //버튼 이벤트 오류생김(triangle 버튼 못찾음)
    console.log(triangleButtons.length);
    console.log(downTriangleButtons.length);

    triangleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let currentLi = button.closest('.oneContent');
            let prevLi = currentLi.previousElementSibling;

            // 이전 li가 있을 때만 동작
            if (prevLi) {
                currentLi.classList.add('moving-up');
                prevLi.classList.add('moving-down');

                requestAnimationFrame(() => {
                    setTimeout(() => {
                        currentLi.parentNode.insertBefore(currentLi, prevLi);
                        currentLi.classList.remove('moving-up');
                        prevLi.classList.remove('moving-down');
                    }, 400); // CSS transition 시간과 맞춰줌
                });
            }
        });
    });

    downTriangleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let currentLi = button.closest('.oneContent');
            let nextLi = currentLi.nextElementSibling;

            // 다음 li가 있을 때만 동작
            if (nextLi) {
                currentLi.classList.add('moving-down');
                nextLi.classList.add('moving-up');

                requestAnimationFrame(() => {
                    setTimeout(() => {
                        currentLi.parentNode.insertBefore(nextLi, currentLi);
                        currentLi.classList.remove('moving-down');
                        nextLi.classList.remove('moving-up');
                    }, 400); // CSS transition 시간과 맞춰줌
                });
            }
        });
    });
}
window.addEventListener('load', ()=>{
    countTriangle();
});

//예제 데이터 불러오기
const contentId = '2383747';
const detailInfoUrl = `https://apis.data.go.kr/B551011/KorService1/detailInfo1?ServiceKey=${tourAPIKEY}&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=TripTrav&_type=json`;

async function getData(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        const items = data.response.body.items.item;
        return items;
    } catch(err){
        console.log(err);
    }
}

//고민점
//투어 id 가져가서 각 id별 좌표값, 대표이미지, 서브이미지 가져오기(subname수만큼)
//일정 편집 안들어갔는데 2depth 열어서 일정추가하면 일정을 편집하시겠습니까? confirm 띄우고 ok하면 일정편집으로 들어가기
//2depth 닫으면 class on 추천 여행지로 돌아가게 만들기
//일정편집 중에 닫기 버튼누르면 편집을 그만히시겠습니까? 띄우고 ok하면 해당 순서 배열로 저장, 버튼 저장으로 돌려서 닫기