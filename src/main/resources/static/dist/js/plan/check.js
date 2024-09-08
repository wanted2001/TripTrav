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
const slideItemWidth = 160;

function updateInnerSlideWidth() {
    //div 개수따라 totalWidth 값 설정되도록
    const totalWidth = slideItems.length * slideItemWidth;
    innerSlide.style.width = `${totalWidth}px`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateInnerSlideWidth();

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

function checkBoundary() {
    const outerRect = slideWrap.getBoundingClientRect();
    const innerRect = innerSlide.getBoundingClientRect();
    const lastSlideItem = slideItems[slideItems.length - 1]; // 마지막 slideItem
    const lastItemRect = lastSlideItem.getBoundingClientRect(); // 마지막 slideItem의 경계

    if (parseInt(innerSlide.style.left) > 0) {
        innerSlide.style.left = '0px';
    }

    if (lastItemRect.right > outerRect.right) {
        const maxLeft = outerRect.width - innerRect.width;
        innerSlide.style.left = `${Math.max(maxLeft, parseInt(innerSlide.style.left))}px`;
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
            item.style.transform = 'scale(1.25)';
            item.style.background='gold';

        } else {
            item.style.transform = 'scale(1)';
            item.style.background='pink';
        }
    });
}