
// 모든 polyline 요소를 선택
const polylines = document.querySelectorAll('polyline');

// 각 polyline 요소에 클릭 이벤트 리스너를 추가
polylines.forEach(polyline => {
    polyline.addEventListener('click', function() {
        // 클릭된 polyline의 id를 콘솔에 출력
        console.log(this.id);
    });
});
