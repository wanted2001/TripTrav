console.log('place in');

var place = document.querySelector(".wishPlaceDiv");
var foodList = document.querySelector(".wishFoodList");
var placeList = document.querySelector(".wishPlaceList");

likeCall(unoNum).then(data => {
    let foodNum = 0;
    let placeNum = 0;
    console.log(data);
    if (data.length === 0) {
        console.log(" 들어옴 !!!");
        place.appendChild(noChild("wishPlace"));
    }
    data.forEach(likeList => {
        console.log(likeList.length);

        let type = `${likeList.contentTypeId}`;
        let likeNum =[`${likeList.like.uno}`,`${likeList.like.likeCode}`];
        const li = document.createElement("li");
        const div = document.createElement("div");
        div.classList.add("tripCardSection");
        div.innerHTML = `
            <div class="tripImgDiv"><img src="${likeList.firstImage ? `${likeList.firstImage}` : "/dist/image/noimage.jpg"}" alt="프로필 사진" class="tripImg"></div>
            <div class="tripinfo">
                <ul>
                    <li><h3><a href="${locationfind(type)}${likeList.like.likeCode}">${likeList.like.likeName}</a></h3></li>
                </ul>
            </div>
            <div class="tripSetting">
                <button type="button" onclick="${delHandler(`${likeNum}`)}"><img src="/dist/image/trash-2.svg"></button>
            </div>`;
        li.appendChild(div);
        if (type === "12" || type === "14") {
            console.log(li);
            const placeLi = li.cloneNode(true);
            placeList.appendChild(placeLi);
        }
        if (type === "39") {
            const foodLi = li.cloneNode(true);
            foodList.appendChild(foodLi);
        }
        place.appendChild(li);
        placeList.style.display = "none";
        foodList.style.display = "none";
    });
}).catch(err => {
    console.log(err);
});

var buttons = document.getElementsByTagName("button");

Array.from(buttons).forEach(button => {
    button.addEventListener("click", function(e) {
        switch (e.target.id) {
            case "allList":
                placeList.style.display = "none";
                foodList.style.display = "none";
                place.style.display = "flex";
                console.log("전체");
                break;
            case "onlyFoodList":
                place.style.display = "none";
                placeList.style.display = "none";
                foodList.style.display = "flex";
                console.log("음식");
                break;
            case "onlyPlaceList":
                place.style.display = "none";
                foodList.style.display = "none";
                placeList.style.display = "flex";
                console.log("장소");
                break;
            default:
                console.log("다른 버튼");
                break;
        }
    });
});


async function delHandler(likeNum){
    const result = await deleteLike(likeNum);
    if(result === "1"){
        alert("찜 삭제");
    }else{
        alert("찜 삭제 실패")
    }
}

// function hoverOption(target){
//     Object.assign(target.style,{
//         backgroundColor: '#f0f0f0',
//     })
// }



async function likeCall(unoNum) {
    const url = "/mypage/likeCall?uno=" + unoNum;
    const config = {
        method: "GET"
    };
    const res = await fetch(url, config);
    return await res.json();
}

async function deleteLike(likeNum){
    const url = "/mypage/likeDel";
    const config = {
        method : "DELETE",
        headers :{
            "content-Type" : "application/json",
        },
        body: json.stringify(likeNum)
    }
    const res = await fetch(url,config);
    return await res.text();
}
