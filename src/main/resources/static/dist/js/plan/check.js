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
const container = document.querySelector('body');

container.addEventListener('click', (e) => {
    const target = e.target;
    const dragElement = document.querySelectorAll('.drag');
    const drags = document.querySelectorAll('.oneContent');
    const container = document.querySelector('.mapContentBox');

    if (target.classList.contains('editBtn')) {
        // 편집 버튼을 클릭했을 때
        dragElement.forEach((drag)=>{
            drag.classList.remove('hidden');
        })
        target.innerText = '저장';
        target.classList.remove('editBtn');
        target.classList.add('saveBtn');

        // 드래그 가능하게 설정
            drags.forEach(drag => {
                drag.setAttribute('draggable', true);

                drag.addEventListener('dragstart', () => {
                    drag.classList.add('dragging');
                });

                drag.addEventListener('dragend', () => {
                    drag.classList.remove('dragging');
                });
            });

            // 드래그 후 위치에 따라 삽입할 위치 계산
            function getDragAfterElement(container, y) {
                const draggableElements = [...container.querySelectorAll('.oneContent:not(.dragging)')];

                return draggableElements.reduce((closest, child) => {
                    const box = child.getBoundingClientRect();
                    const offset = y - box.top - box.height / 3;

                    if (offset < 0 && offset > closest.offset) {
                        return { offset: offset, element: child };
                    } else {
                        return closest;
                    }
                }, { offset: Number.NEGATIVE_INFINITY }).element;
            }

            // 드래그 오버 및 드롭 이벤트 설정
            container.addEventListener('dragover', (e) => {
                e.preventDefault(); // 필수: 드래그 오버 시 기본 동작을 막음
                const afterElement = getDragAfterElement(container, e.clientY);
                const draggable = document.querySelector('.dragging');

                if (afterElement == null) {
                    container.appendChild(draggable);
                } else {
                    container.insertBefore(draggable, afterElement);
                }
            });

            container.addEventListener('drop', (e) => {
                e.preventDefault(); // 필수: 드롭 시 기본 동작을 막음
                const draggable = document.querySelector('.dragging');
                const afterElement = getDragAfterElement(container, e.clientY);

                if (afterElement == null) {
                    container.appendChild(draggable);
                } else {
                    container.insertBefore(draggable, afterElement);
                }
            })


    } else if (target.classList.contains('saveBtn')) {
        // 저장 버튼을 클릭했을 때
        console.log('saveBtn 눌림');
        dragElement.forEach((drag)=>{
            drag.classList.add('hidden');
        })
        target.classList.remove('saveBtn');
        target.classList.add('editBtn');
        target.innerText = '편집';
        drags.forEach(drag=>{
            drag.setAttribute('draggable', false);
        })
    }
});

