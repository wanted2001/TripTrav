console.log("List in");

var next = document.querySelector(".nextMytrip");
var prev = document.querySelector(".prevMyTrip");
var nextList = document.querySelector(".nextTripList");
var prevList = document.querySelector(".prevTripList");



scheduleCall(unoNum).then(data => {
    let prevNum = 0;
    let nextNum = 0;
    console.log(data)
    if (data.length === 0) {
        nextList.appendChild(noChild("list"));
        prevList.appendChild(noChild("list"));
    } else {
        for (let i = 0; i <= data.length - 1; i++) {
            const li = document.createElement("li");
            const div = document.createElement("div");
            div.classList.add("tripCard");
            div.innerHTML = `
                <div class="tripImgDiv"><img src="/dist/image/poky.png" alt="프로필 사진" class="tripImg"></div>
                <div class="tripinfo">
                    <ul>
                        <li class="myTripTitle"><a href="/schedule/check?sco=${data[i].sco}"><h3>${data[i].scheName}</h3></a></li>
                        <li class="myTripPlace">${data[i].scheTitle}</li>
                        <li class="myTripDate">${changeDate(`${data[i].scheStart}`)} ~ ${changeDate(`${data[i].scheEnd}`)}</li>
                    </ul>
                </div>
                <div class="tripSetting">
                    <button type="button" id="tripListBtn">X</button>
                </div>`;
            li.appendChild(div);

            if (compareDate(`${data[i].scheEnd}`)) {
                prevList.appendChild(li);
                prevNum++;

            } else {
                nextList.appendChild(li);
                nextNum++;
            }
        }
        if(prevNum === 0){
            prevList.appendChild(noChild("list"));
        }
        if(nextNum === 0){
            nextList.appendChild(noChild("list"));
        }
    }
}).catch(err => {
    console.log(err);
});



async function scheduleCall(unoNum) {
    try {
        const config = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const url = '/mypage/scheduleCall?uno=' + unoNum;
        const result = await fetch(url, config);
        return await result.json();
    } catch (e) {
        console.log(e);
    }
}