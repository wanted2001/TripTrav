const UrlParams = new URLSearchParams(window.location.search);
const sco = UrlParams.get('sco');

window.addEventListener('click',(e)=>{
    let date =  e.target.getAttribute('data-date');
    if(sco && date){
        getUserCourse(sco,date).then(result=>{
            console.log(result);
            let content = '';
            document.querySelector('.contentArea').innerHTML='';
            result.forEach(key=>{
                content=`
                <li class="oneContent" data-id="${key.scheContentId}">
                    <div class="deletePlan hidden" onclick="deletePlan(event)">&times;</div>
                    <div class="changePlan hidden">
                        <img src="/dist/image/triangle.svg" class="triangle">
                        <img src="/dist/image/triangle.svg" class="downTriangle">
                    </div>
                    <div class="name_cate">
                        <span class="placeName"></span>
                        <span class="placeCate">장소카테고리</span>
                    </div>
                    <div class="placeAddr"></div>
                    <div class="rate_count">
                        <img src="/dist/image/star.svg">
                        <div class="placeRate">4.0</div>
                        <div class="placeRateCount">(356)</div>
                    </div>
                    <div class="placeImgDiv">
                        <div class="placeImg"></div>
                    </div>
                </li>`;
                // document.querySelector('.contentArea').innerHTML+=content;
                document.querySelector('.contentArea').insertAdjacentHTML('beforeend', content);
                getAddr(key.scheContentId);
                getImage(key.scheContentId);
            })
        })
    }
})



//day 선택
const days = document.querySelectorAll('.day');
days.forEach(day=>{
    day.addEventListener('click',(e)=>{
        console.log(e.target);
        days.forEach(d=>{
            if(d!==e.target){
                d.classList.remove('day_focus');
            }
        })
        e.target.classList.add('day_focus');
        const date = e.target.getAttribute('data-date');

        getDatePlan(sco, date).then(r=>{
            console.log(r)
            if(r.length===0){
                document.querySelector('.contentArea').innerHTML=`<div class="noPlanText"><span>생성된 일정이 없습니다.</span> 하단의 버튼으로 나만의 여행 일정을 만들어보세요!</div>`
            }
        })

    })
})

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
const memoModal = document.querySelector('.memoModal');
const closeModalBtn = document.querySelector('.memoCloseBtn');
const addMemoBtn = document.querySelector('.addMemoBtn');
const saveMemo = document.querySelector('.saveMemo');
const memoWrap = document.querySelector('.memoWrap');

//일정편집
const editBtn = document.querySelector('.editBtn');
const saveBtn = document.querySelector('.saveBtn');

document.addEventListener('DOMContentLoaded', () => {
    initTmap();

    //일차별 일정출력
    if(sco) {
        getUserCourse(sco, 1).then(result => {
            console.log(result);
            let content = '';
            result.forEach(key => {
                content = `
                <li class="oneContent" data-id="${key.scheContentId}">
                    <div class="deletePlan hidden" onclick="deletePlan(event)">&times;</div>
                    <div class="changePlan hidden">
                        <img src="/dist/image/triangle.svg" class="triangle">
                        <img src="/dist/image/triangle.svg" class="downTriangle">
                    </div>
                    <div class="name_cate">
                        <span class="placeName"></span>
                        <span class="placeCate">장소카테고리</span>
                    </div>
                    <div class="placeAddr"></div>
                    <div class="rate_count">
                        <img src="/dist/image/star.svg">
                        <div class="placeRate">4.0</div>
                        <div class="placeRateCount">(356)</div>
                    </div>
                    <div class="placeImgDiv">
                        <div class="placeImg"></div>
                    </div>
                </li>`;
                document.querySelector('.contentArea').insertAdjacentHTML('beforeend', content);
                getAddr(key.scheContentId);
                getImage(key.scheContentId);

                document.querySelector('.checkName').innerText = result[0].scheName;
                document.querySelector('.nameZone').innerText = result[0].scheName;
                const startDate = result[0].scheStart.substring(0, 10).replaceAll('-', '.')
                const endDate = result[0].scheEnd.substring(0, 10).replaceAll('-', '.')
                document.querySelector('.checkDate').innerHTML = `${startDate} ~ ${endDate}`;

                if (result[0].scheCount === 1) {
                    document.querySelector('.day2').innerText = 'Day 2';
                } else if (result[0].scheCount === 2) {
                    document.querySelector('.day2').innerText = 'Day 2';
                    document.querySelector('.day3').innerText = 'Day 3';
                }
            })
        })
    }

    //메모여부확인
    getMemo(sco).then(r=>{
        console.log(r)
        const memoContents = document.querySelector('.memoContents');
        if(r){
            console.log("메모있음")
            addMemoBtn.innerText='메모확인';
            memoContents.innerHTML=`${r.scheMemoContent}`;
            memoContents.readOnly=true;
            saveMemo.innerText='확인';
            memoWrap.innerHTML+=`<button class="modifyMemo" onclick="modifyMemoContent()">수정</button>`
        } else {
            console.log("메모없음")
        }
    });

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
});

//메모모달 오픈
function openModal(){
    memoModal.style.display = 'flex';
}
function closeModal(){
    memoModal.style.display='none';
}

function modifyMemoContent(){
    const memoContent = document.querySelector('.memoContents');
    memoContent.readOnly=false;
    memoContent.focus();
    const memo = memoContent.value;
    // fetch(`/schedule/memoModify/${sco}`,{
    //     method:'post',
    //     headers:{
    //         'content-type':'application/json'
    //     },
    //     body:JSON.stringify(memo)
    // })
    //     .then(response=>response.text())
    //     .then(data=>{
    //         console.log(data)
    //     })
}

//메모저장부분
const saveMemoBtn = document.querySelector('.saveMemo');
saveMemoBtn.addEventListener('click',()=>{
    console.log(saveMemoBtn.innerText);
    if(saveMemoBtn.innerText==='저장'){
        const memo = document.querySelector('.memoContents').value;
        console.log(memo);
        if(confirm('메모를 저장하시겠습니까?')) {
            fetch(`/schedule/memo/${sco}`,{
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(memo)
            })
                .then(response => response.text())
                .then(data=>{
                    console.log(data)
                    if(data==="1"){
                        alert("메모가 저장되었습니다!")
                    } else {
                        alert("메모 저장 중 오류가 발생했습니다. \n다시 시도해주세요.");
                    }
                })
            memoModal.style.display='none';
        }
    } else {
        closeModal();
    }
})

//이미지로드
function getImage(key){
    const url = `https://apis.data.go.kr/B551011/KorService1/detailImage1?MobileOS=ETC&MobileApp=TripTrav&_type=json&subImageYN=Y&contentId=${key}&serviceKey=${tourAPIKEY}`;
    let imgCount = 0;
    const imgLi = document.querySelector(`li[data-id="${key}"] .placeImg`);

    getData(url).then(res=>{
        // console.log(res);
        if(res.totalCount<1){
            if (imgLi) {
                imgLi.innerHTML += `<img src="/dist/image/noimage.jpg">`;
            }
        } else{
            res.items.item.forEach(img=>{
                if(imgCount<3){
                    if (imgLi) {
                        imgLi.innerHTML += `<img src="${img.originimgurl}">`;
                    }
                    imgCount++;
                }
            })
        }
    })
}

//지도 띄우기
function initTmap() {
    let map = new Tmapv3.Map("checkMap",
        {
            center: new Tmapv3.LatLng(37.566481622437934, 126.98502302169841), // 지도 초기 좌표
            width: "1600px",
            height: "800px",
            zoom: 16
        });
}

//주소삽입
function getAddr(key){
    const detailInfoUrl = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=TripTrav&contentId=${key}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&serviceKey=${tourAPIKEY}&_type=json`;
    const addrLi = document.querySelector(`li[data-id="${key}"] .placeAddr`);
    const titleLi = document.querySelector(`li[data-id="${key}"] .placeName`);
    getData(detailInfoUrl).then(res=>{
        // console.log(res)
        res.items.item.forEach(result=>{
            addrLi.innerHTML=`${result.addr1}`;
            titleLi.innerHTML=`${result.title}`
        })
    })
}

//동행자 추가 모달
const addPerson = document.querySelector('.addPersonBtn');
const personModal = document.querySelector('.personModal');
const pmCloseBtn = document.querySelector('.pmCloseBtn');

let clipboard = new ClipboardJS('.copyUrl');
clipboard.on('success',function(e){
    alert('클립보드에 복사되었습니다.');
    console.log(e)
})
clipboard.on('error',function(e){
    console.log(e);
})

addPerson.addEventListener('click',()=>{
    const url = window.location.href;
    document.querySelector('.pmShareValue').value=url;
    personModal.style.display='flex';
})

pmCloseBtn.addEventListener('click',()=>{
    personModal.style.display='none';
})

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

//여행추가하기 버튼 contentArea 높이에 맞춰 위치 변경
function checkHeight(){
    const contentAreaHeight = document.querySelector('.contentArea');
    let height = contentAreaHeight.offsetHeight;
    console.log(height)
    const addPlan = document.querySelector('.addPlan');

    if(height>980) {
        addPlan.style.marginTop='12px';
        addPlan.style.marginBottom='12px';
    } else {
        addPlan.style.marginTop = '610px';
        addPlan.style.marginBottom = '0px';
    }
}

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
    document.querySelector('.editPlanTitle').classList.add('hidden');

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
             if(document.querySelector('.noPlanText')){
                 document.querySelector('.contentArea').innerHTML='';
             }
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
        if(document.querySelector('.noPlanText')){
            document.querySelector('.contentArea').innerHTML='';
        }
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

    const newLi = `<li class="oneContent" data-id="${contentId}">
                            <div class="deletePlan" onclick="deletePlan(event)">&times;</div>
                            <div class="changePlan">
                                <img src="/dist/image/triangle.svg" class="triangle">
                                <img src="/dist/image/triangle.svg" class="downTriangle">
                            </div>
                            <div class="name_cate">
                                <span class="placeName">${placeName}</span>
                                <span class="placeCate"></span>
                            </div>
                            <div class="placeAddr">${placeAddress}</div>
                            <div class="rate_count">
                                <img src="/dist/image/star.svg">
                                <div class="placeRate">4.0</div>
                                <div class="placeRateCount">(356)</div>
                            </div>
                            <div class="placeImgDiv">
                                <div class="placeImg"></div>
                            </div>
                        </li>`;
    document.querySelector('.contentArea').insertAdjacentHTML('beforeend', newLi);
    document.querySelector('.btnText').innerText='저장';

    getImage(contentId);
}

//버튼으로 일정순서 변경
function editPlan(event){
    const target = event.target;
    const deleteBtn = document.querySelectorAll('.deletePlan');
    const changeBtn = document.querySelectorAll('.changePlan');
    const nameZone = document.querySelector('.nameZone');
    const titleInput = document.querySelector('.titleInput');
    const editPlanTitle = document.querySelector('.editPlanTitle');

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
        editPlanTitle.classList.remove('hidden');
    } else if (target.classList.contains('saveBtn')) {
        // 저장 버튼을 클릭했을 때
        if(confirm("일정을 저장하시겠습니까?")){
            if(titleInput && titleInput.value===''){
                alert('일정의 제목을 작성해주세요.')
            } else if(titleInput){
                deleteBtn.forEach(btn => {
                    btn.classList.add('hidden');
                });
                changeBtn.forEach(btn => {
                    btn.classList.add('hidden');
                });

                target.classList.remove('saveBtn');
                target.classList.add('editBtn');
                target.innerText = '편집';

                nameZone.innerText += titleInput.value;
                titleInput.remove();
                editPlanTitle.classList.add('hidden');
                setPlanData(sco);
            } else {
                deleteBtn.forEach(btn => {
                    btn.classList.add('hidden');
                });
                changeBtn.forEach(btn => {
                    btn.classList.add('hidden');
                });

                target.classList.remove('saveBtn');
                target.classList.add('editBtn');
                target.innerText = '편집';
                editPlanTitle.classList.add('hidden');
                setPlanData(sco);
            }
        }
    }
}

function setPlanData(sco){
    const allLi = document.querySelectorAll('li.oneContent');
    const planArray = [];
    let arrayKey = true;

    allLi.forEach((plan, index) => {
        const sche_content_id = plan.getAttribute('data-id');
        const sche_name = document.querySelector('.nameZone').innerText;
        const sche_date = document.querySelector('.day_focus').getAttribute('data-date');
        const sche_title = plan.querySelector('.placeName').innerText;

        const planData = {
            sche_content_id: sche_content_id,
            sche_name: sche_name,
            sche_date: sche_date,
            planIndex: index + 1,
            sche_title: sche_title,
            sco: sco
        };

        if (planArray.length > 0) {
            const lastPlan = planArray[planArray.length - 1];
            if (
                lastPlan.sche_content_id !== planData.sche_content_id ||
                lastPlan.sche_name !== planData.sche_name ||
                lastPlan.sche_date !== planData.sche_date ||
                lastPlan.planIndex !== planData.planIndex ||
                lastPlan.sche_title !== planData.sche_title ||
                lastPlan.sco !== planData.sco
            ) {
                arrayKey = false;
            }
        }

        planArray.push(planData);

        console.log(planArray);
        console.log(arrayKey)
    });
    const sche_date = document.querySelector('.day_focus').getAttribute('data-date');
    if (!arrayKey && planArray.length>0) {
        fetch(`/schedule/modifyPlan/${sco}/${sche_date}`, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(planArray)
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                if (data == "1") {
                    alert('일정이 저장되었습니다 !');
                } else {
                    alert('일정 저장 중 오류가 발생하였습니다. \n다시 시도해주세요.');
                }
            });
    } else {
        console.log("값 변화없음");
        alert('일정이 저장되었습니다 !');
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

function deletePlan(event){
    if(confirm("해당 일정을 삭제하시겠습니까?")){
        if(event.target.classList.contains('deletePlan')){
            const li=event.target.closest('li');
            if(li){
                li.remove();
            }
        }
    }
}

function editTitle(){
    const titleInput = document.createElement('input');
    const titleText = document.querySelector('.contentTitle');
    const editPlanTitle = document.querySelector('.editPlanTitle');
    const nameZone = document.querySelector('.nameZone');
    titleInput.classList.add('titleInput');
    titleInput.value=titleText.innerText;
    titleInput.placeholder='일정의 제목을 작성해주세요.';
    editPlanTitle.classList.add('hidden');
    nameZone.innerText='';
    titleText.appendChild(titleInput);
}

window.addEventListener('load', ()=>{
    countTriangle();
});

//예제 데이터 불러오기
// const contentId = '2383747';
// const detailCourseInfoUrl = `https://apis.data.go.kr/B551011/KorService1/detailInfo1?ServiceKey=${tourAPIKEY}&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=TripTrav&_type=json`;

async function getData(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        const items = data.response.body;
        return items;
    } catch(err){
        console.log(err);
    }
}

async function getUserCourse(sco, date){
    try{
        const url="/schedule/course/"+sco+"/"+date;
        const config = {
            method:'post'
        }
        const response = await fetch(url,config);
        const result = await response.json();
        return result;
    } catch (err){
        console.log(err);
    }
}

async function getDatePlan(sco, date){
    try{
        const url = "/schedule/plan/"+sco+"/"+date;
        const config={method:'post'}
        const response = await fetch(url,config);
        const result = await response.json();
        return result;
    } catch (err){
        console.log(err);
    }
}

async function getMemo(sco){
    try{
        const url = "/schedule/getMemo/"+sco;
        const config = {method:'post'}
        const response = await fetch(url, config);
        const result = await response.json();
        return result;
    } catch(err){
        console.log(err);
    }
}

//고민점
//투어 id 가져가서 각 id별 좌표값, 대표이미지, 서브이미지 가져오기(subname수만큼)
//일정 편집 안들어갔는데 2depth 열어서 일정추가하면 일정을 편집하시겠습니까? confirm 띄우고 ok하면 일정편집으로 들어가기
//2depth 닫으면 class on 추천 여행지로 돌아가게 만들기
//일정편집 중에 닫기 버튼누르면 편집을 그만히시겠습니까? 띄우고 ok하면 해당 순서 배열로 저장, 버튼 저장으로 돌려서 닫기