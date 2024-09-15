//map 위에 띄우는 content
let openBtn = document.querySelector('.mapOpenBtn');
let closeBtn = document.querySelector('.mapCloseBtn');
let mapContentBox = document.querySelector('.mapContentBox');

openBtn.addEventListener('click', () => {
    openBtn.classList.add("hidden");
    mapContentBox.classList.remove("hidden");
    mapContentBox.classList.add("visible");
    closeBtn.classList.remove("hidden");
    closeBtn.classList.add("visible");
    closeBtn.style.left='520px';
});

closeBtn.addEventListener('click', () => {
    openBtn.classList.remove("hidden");
    mapContentBox.classList.remove("visible");
    mapContentBox.classList.add("hidden");
    closeBtn.classList.remove("visible");
    closeBtn.classList.add("hidden");
    depth2.classList.add("hidden");
});

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
        if(item.getAttribute('data-number')===clickNumber){
            item.classList.add('on');
        } else {
            item.classList.remove('on');
        }
    })

    const recommend = document.querySelectorAll('.depth2_recomm');
    const search = document.querySelectorAll('.depth2_search');
    const searchInput = document.querySelector('.depth2_search_input_area');
    const heart = document.querySelectorAll('.depth2_heart');
    if(clickNumber==='1'){
        recommend.forEach(item=>{
            item.classList.remove('hidden');
        })
        search.forEach(item=>{
            item.classList.add('hidden');
        })
        heart.forEach(item=>{
            item.classList.add('hidden');
        })
        searchInput.classList.add('hidden');
    } else if(clickNumber==='2'){
        recommend.forEach(item=>{
            item.classList.add('hidden');
        })
        search.forEach(item=>{
            item.classList.remove('hidden');
        })
        heart.forEach(item=>{
            item.classList.add('hidden');
        })
        searchInput.classList.remove('hidden');
    } else if(clickNumber==='3'){
        recommend.forEach(item=>{
            item.classList.add('hidden');
        })
        search.forEach(item=>{
            item.classList.add('hidden');
        })
        heart.forEach(item=>{
            item.classList.remove('hidden');
        })
        searchInput.classList.add('hidden');
    }
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
        let resultDiv = '';
        let keyword = searchInput.value;
        let url = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${tourAPIKEY}&MobileApp=TripTrav&MobileOS=ETC&pageNo=1&numOfRows=10&listYN=Y&&arrange=A&contentTypeId=12&keyword=${keyword}&_type=json`;
        searchKeyword(url).then(result=>{
            console.log(result);
            result.forEach(key=>{
                resultDiv+=`
                    <div class="depth2_search">
                        <div class="depth2_search_area">
                            <div class="depth2_search_img"></div>
                            <div class="depth2_search_name">${key.title}</div>
                            <div class="depth2_search_addr">${key.addr1}</div>
                        </div>
                    </div>`;
                document.querySelector('.searchResultDiv').innerHTML=resultDiv;
                const imageDiv = document.querySelectorAll('.depth2_search_img');
                imageDiv.forEach(img=>{
                    img.style.backgroundImage=`url(${key.firstimage})`;
                })
            })
        })
    }
}

async function searchKeyword(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        const items = data.response.body.items.item;
        return items;
    } catch(err){
        console.log(err);
    }
}

async function getImage(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const items = data.response.body.items.item;
        return items.map(item => item.firstimage);
    } catch (error) {
        console.log(error);
        return [];
    }
}

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

//상단 슬라이드 길이 계산 함수
function updateInnerSlideWidth() {
    //div 개수따라 totalWidth 값 설정되도록
    const totalWidth = slideItems.length * slideItemWidth;
    innerSlide.style.width = `${totalWidth}px`;
    document.querySelector('.innerLine').style.width=`${totalWidth - 215}px`;
}

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
            //a태그 추가작업 필요
            content += `<li class="oneContent" data-id="${key.subcontentid}">
                    <div class="deletePlan hidden">&times;</div>
                    <div class="drag hidden">
                        <img src="/dist/image/drag.png" class="dragIcon">
                    </div>
                    <div class="name_cate">
                        <span class="placeName">${key.subname}</span>
                        <span class="placeCate">장소카테고리</span>
                    </div>
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

//데이터 불러오기
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

//예제 끝


function checkBoundary() {
    const outerRect = slideWrap.getBoundingClientRect();
    const innerRect = innerSlide.getBoundingClientRect();
    const lastSlideItem = slideItems[slideItems.length - 1]; // 마지막 slideItem
    const lastItemRect = lastSlideItem.getBoundingClientRect(); // 마지막 slideItem의 경계

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

//메모저장
function saveMemo(){
    if(confirm('메모를 저장하시겠습니까?')) {
        console.log("메모저장")
        modal.style.display='none';
    }
}

//편집
let draggingElement = null;
let draggingIndex = null;
let startY = 0;
const container = document.querySelector('.mapContentBox');

container.addEventListener('click', (e) => {
    const target = e.target;
    const dragElements = document.querySelectorAll('.drag');
    const deleteBtn = document.querySelectorAll('.deletePlan');
    //oneContent 배열로 변환
    const oneContents = Array.from(container.querySelectorAll('.oneContent'));

    if (target.classList.contains('editBtn')) {
        deleteBtn.forEach(btn=>{
            btn.classList.remove('hidden');
        })
        dragElements.forEach((drag) => {
            drag.classList.remove('hidden');
            drag.setAttribute('draggable', true);

            // 드래그 시작
            drag.addEventListener('dragstart', (event) => {
                draggingElement = event.target.closest('.oneContent');
                draggingIndex = oneContents.indexOf(draggingElement);
                startY = event.clientY;
                draggingElement.classList.add('dragging');
                draggingElement.style.transition = 'none'; // 드래그 중에는 transition 제거
            });

            // 드래그 종료
            drag.addEventListener('dragend', () => {
                draggingElement.classList.remove('dragging');
                draggingElement.style.transition = 'transform 0.3s ease'; // 드래그 종료 후 애니메이션 추가
                draggingElement.style.transform = 'none';

                // 모든 요소 transform 초기화
                oneContents.forEach(content => content.style.transform = 'none');
                draggingElement = null;
            });
        });

        target.innerText = '저장';
        target.classList.remove('editBtn');
        target.classList.add('saveBtn');

        // 드래그 중 위치 업데이트
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!draggingElement) return;

            const deltaY = e.clientY - startY;

            // 드래그 중인 요소 이동
            draggingElement.style.transform = `translateY(${deltaY}px)`;

            // 다른 요소들의 위치 업데이트
            oneContents.forEach((content, index) => {
                if (content !== draggingElement) {
                    const box = content.getBoundingClientRect();
                    const oneThirdPoint = box.top + (box.height / 2);

                    // 드래그된 요소가 아래로 내려갈 때
                    if (e.clientY > oneThirdPoint && index > draggingIndex) {
                        content.style.transition = 'transform 0.3s ease';
                        content.style.transform = `translateY(-${draggingElement.offsetHeight}px)`
                    }
                    // 드래그된 요소가 위로 올라갈 때
                    else if (e.clientY < oneThirdPoint && index < draggingIndex) {
                        content.style.transition = 'transform 0.3s ease';
                        content.style.transform = `translateY(${draggingElement.offsetHeight}px)`;
                    } else {
                        content.style.transform = 'none';
                    }
                }
            });
        });

        // 드래그 종료 후 위치 고정
        container.addEventListener('drop', (e) => {
            e.preventDefault();
            if (!draggingElement) return;

            const overElement = getDragAfterElement(container, e.clientY);

            if (overElement && container.contains(overElement)) {
                if (oneContents.indexOf(draggingElement) < oneContents.indexOf(overElement)) {
                    container.insertBefore(draggingElement, overElement.nextElementSibling);
                } else {
                    container.insertBefore(draggingElement, overElement);
                }
            } else {
                container.appendChild(draggingElement);
            }

            // 모든 요소 transform 및 순서 초기화
            oneContents.forEach(content => {
                content.style.transition = 'none'; // 애니메이션을 종료한 후 transition 제거
                content.style.transform = 'none'; // 위치 초기화
            });
            updateOneContentsOrder();
        });

        // 위치 계산 함수
        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.oneContent:not(.dragging)')];

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        }

        // DOM 순서 업데이트 함수
        function updateOneContentsOrder() {
            oneContents.length = 0;
            container.querySelectorAll('.oneContent').forEach(content => {
                oneContents.push(content); // 실제 DOM 순서에 맞게 배열 업데이트
            });
        }
    } else if (target.classList.contains('saveBtn')) {
        // 저장 버튼을 클릭했을 때
        dragElements.forEach((drag)=>{
            drag.classList.add('hidden');
        })
        deleteBtn.forEach(btn=>{
            btn.classList.add('hidden');
        })
        target.classList.remove('saveBtn');
        target.classList.add('editBtn');
        target.innerText = '편집';
        oneContents.forEach(drag=>{
            drag.setAttribute('draggable', false);
        })
    }
});


//고민점
//투어 id 가져가서 각 id별 좌표값, 대표이미지, 서브이미지 가져오기(subname수만큼)