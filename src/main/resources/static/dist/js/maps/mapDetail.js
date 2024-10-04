console.log("map detail js in");

const changeArea = document.querySelector(".infoHere");
const js = "/dist/js/maps";
const searchRegion = "/searchRegion";

document.querySelectorAll('polyline').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.id;
        console.log(id);
        changeArea.innerHTML = "";  // 기존 내용 비우기
        switch (id) {
            case 'gangwon':
                pageCall(searchRegion);
                break;
            // 다른 지역도 추가 가능
        }
    });
});

// 페이지 호출
function pageCall(page) {
    const maps = "/maps" + page;
    console.log("Requesting URL:", maps);
    fetch(maps)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            changeArea.innerHTML = '';
            changeArea.innerHTML = data;
            // loadScript(page);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


// // js 호출
// function loadScript(page) {
//     const src = js + page + '.js';
//     if (src) { // Ensure src is defined
//         removeAllScript(src);
//         if (!isScriptAlreadyIncluded(src)) {
//             const script = document.createElement('script');
//             script.src = src;
//             document.body.appendChild(script);
//         }
//     } else {
//         console.error('Script source is undefined');
//     }
// }
//
//
// // 불필요한 모든 JS 삭제
// function removeAllScript(src) {
//     console.log(src);
//     const toKeep = ['/dist/js/header.js', '/dist/js/loginJoin.js', js + '/mypageDetail.js'];
//     const scripts = document.getElementsByTagName('script');
//     for (let i = scripts.length - 1; i >= 0; i--) {
//         let isToKeep = false;
//         for (let j = 0; j < toKeep.length; j++) {
//             if (scripts[i].src.includes(toKeep[j])) {
//                 isToKeep = true;
//                 break;
//             }
//         }
//         if (!isToKeep && src && scripts[i].src && !scripts[i].src.includes(src)) {
//             document.body.removeChild(scripts[i]);
//         }
//     }
// }
//
// // 이미 포함된 스크립트인지 확인
// function isScriptAlreadyIncluded(src) {
//     const scripts = Array.from(document.getElementsByTagName('script'));
//     return scripts.some(script => script.src && script.src.includes(src)); // src가 존재하는지 확인 후 includes 호출
// }
//
