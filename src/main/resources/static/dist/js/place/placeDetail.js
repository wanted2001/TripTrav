const contentId = "126676";
const imgUrl = `https://apis.data.go.kr/B551011/KorService1/detailImage1?MobileOS=ETC&MobileApp=TripTrav&_type=json&subImageYN=Y&contentId=${contentId}&serviceKey=${tourAPIKEY}`;

fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
        const imagesContainer = document.getElementById('images-container');
        const items = data.response.body.items.item;
        items.forEach(item => {
            const imgURL = item.originimgurl;
            console.log(imgURL);
            const imgElement = document.createElement('img');
            imgElement.src = imgURL;
            imagesContainer.appendChild(imgElement);
        })
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });