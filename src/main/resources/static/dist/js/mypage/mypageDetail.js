const bottom = document.getElementById("resultMyPage");
const js = "/dist/js/mypage";
const tripList = "/tripList";
const tripReview = "/tripReview";
const wishPlace = "/wishPlace";
const wishTrip = "/wishTrip";

pageCall(tripList);

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

// 호버 관련하여 수정중
function pageHover(id) {
    document.querySelectorAll(".myPageList > li").forEach(li => {
        li.classList.remove('highlighted');
    });
    const selectedItem = document.getElementById(id).parentElement;
    selectedItem.classList.add('highlighted');
}


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
function removeAllScript(src){
    const toKeep =['/dist/js/header.js','/dist/js/loginJoin.js',js+'/mypageDetail.js'];
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

function isScriptAlreadyIncluded(src) {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes(src)) {
            return true;
        }
    }
    return false;
}

