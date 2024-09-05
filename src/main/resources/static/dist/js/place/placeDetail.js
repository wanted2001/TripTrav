const contentId = "126676";
const mainImgUrl = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=${tourAPIKEY}&contentTypeId=12&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&_type=json&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`
const imgUrl = `https://apis.data.go.kr/B551011/KorService1/detailImage1?MobileOS=ETC&MobileApp=TripTrav&_type=json&subImageYN=Y&contentId=${contentId}&serviceKey=${tourAPIKEY}`;


// fetch(imgUrl)
//     .then(response => response.json())
//     .then(data => {
//         const imagesContainer = document.getElementById('images-container');
//         const items = data.response.body.items.item;
//         items.forEach(item => {
//             const imgURL = item.originimgurl;
//             const imgElement = document.createElement('img');
//             imgElement.src = imgURL;
//             imagesContainer.appendChild(imgElement);
//         })
//     })
//     .catch(error => {
//         console.error('There has been a problem with your fetch operation:', error);
//     });

// fetch(mainImgUrl)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         const mainImageContainer = document.getElementById('main-image');
//         const item = data.response.body.items.item[0];
//         const mainImgUrl1 = item.firstimage;
//         const mainImgUrl2 = item.firstimage2;
//
//         const mainImgElement1 = document.createElement('img');
//         const mainImgElement2 = document.createElement('img');
//         mainImgElement1.src = mainImgUrl1;
//         mainImgElement2.src = mainImgUrl2;
//         mainImageContainer.appendChild(mainImgElement1);
//         mainImageContainer.appendChild(mainImgElement2);
//     })