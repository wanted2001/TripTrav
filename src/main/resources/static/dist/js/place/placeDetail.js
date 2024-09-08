const contentId = "126676";
const imgUrl = `https://apis.data.go.kr/B551011/KorService1/detailImage1?MobileOS=ETC&MobileApp=TripTrav&_type=json&subImageYN=Y&contentId=${contentId}&serviceKey=${tourAPIKEY}`;
const detailInfoUrl = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=TripTrav&contentId=${contentId}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&serviceKey=${tourAPIKEY}&_type=json`
let imageUrls = [];

//기본정보가져오기
fetch(detailInfoUrl)
    .then(response => response.json())
    .then(data => {
        const jsonData = data.response.body.items.item[0];
        const locationDiv = document.querySelector('.location');
        //시군구, 이름정보
        let city =  splitAddr(jsonData.addr1)[0];
        let district = splitAddr(jsonData.addr1)[1];
        let title = jsonData.title
        locationDiv.innerHTML = `<span>${city}  >  </span><span>${district}  >  </span><span>${title}</span>`;

        //타이틀이미지
        const mainImageContainer = document.querySelector('.bg-image');
        const mainImgUrl = jsonData.firstimage;
        // imageUrls.push(mainImgUrl);
        // const mainImgElement1 = document.createElement('img');
        // mainImgElement1.src = mainImgUrl1;
        // mainImgElement1.classList.add('main-image');
        // document.body.appendChild(mainImgElement1);
    })

//주소처리 함수
function splitAddr(address){
    let addrParts = address.split(' ');
    let city = addrParts[0];
    let district = addrParts[1];
    return [city, district];
}
async function getImage(url){
    const response = await fetch(url);
    return await response.json();
}

fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
        const items = data.response.body.items.item;
        const additionalImages = items.map(item => item.originimgurl);
        imageUrls.push(...additionalImages);
    })
    .catch(error => {
        console.log(error);
    });
