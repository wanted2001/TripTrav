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
let pressed = false;
let startPoint;
let x; //마우스 드래그시 x좌표

slideWrap.addEventListener('mousedown',e=>{
    pressed = true;
    startPoint=e.offsetX-innerSlide.offsetLeft
    slideWrap.style.cursor="grabbing";
})
slideWrap.addEventListener('mouseenter',()=>{
    slideWrap.style.cursor='grab';
})
slideWrap.addEventListener('mouseup',()=>{
    slideWrap.style.cursor='grab';
})
window.addEventListener('mouseup',()=>{
    pressed=false;
})
slideWrap.addEventListener('mousemove',e=>{
    if(!pressed) return
    e.preventDefault();
    x = e.offsetX;

    innerSlide.style.left=`${x-startPoint}px`;
})

function checkBoundary(){
    let outer = slideWrap.getBoundingClientRect();
    let inner = innerSlide.getBoundingClientRect();

    if(parseInt(innerSlide.style.left)>0){
        innerSlide.style.left="0px";
    } else if(inner.right<outer.right){
        innerSlide.style.left=`-${inner.width - outer.width}px`
    }
}
