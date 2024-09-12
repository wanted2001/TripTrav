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
});

closeBtn.addEventListener('click', () => {
    openBtn.classList.remove("hidden");
    mapContentBox.classList.remove("visible");
    mapContentBox.classList.add("hidden");
    closeBtn.classList.remove("visible");
    closeBtn.classList.add("hidden");
});

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

    //드래그드랍 부분

});

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
    //oneContent 배열로 변환
    const oneContents = Array.from(container.querySelectorAll('.oneContent'));

    if (target.classList.contains('editBtn')) {
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
        target.classList.remove('saveBtn');
        target.classList.add('editBtn');
        target.innerText = '편집';
        oneContents.forEach(drag=>{
            drag.setAttribute('draggable', false);
        })
    }
});

//고민점
//왔다갔다 애니메이션이 자연스럽지 않다.
//올라갈때 내려갈 div의 위치가 제대로 잡히지않는게 문제인듯?
//올라가든 내려가든 div의 높이를 파악해서 해당 높이가 넘어가면
//옮김당하는 div의 위치가 바로바로 바뀔수있도록 만들어야할듯

