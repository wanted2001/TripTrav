const accordionButton = document.querySelector('.accordion');
const buttons = document.querySelectorAll('.taste-button');
const reTasteBtn = document.querySelector('.reTaste');
let selectedButtons = [...cnoList];

//초기페이지
document.querySelector('.tasteTitle').innerText = `${userNickname}님의 취향분석 결과`;

//아코디언처리
accordionButton.addEventListener('click', () => {
    accordionButton.classList.toggle('active');
    const tasteDiv = accordionButton.parentElement.nextElementSibling;
    tasteDiv.style.display = tasteDiv.style.display === 'block' ? 'none' : 'block';
});

// 초기 상태에 맞게 active 클래스 설정
buttons.forEach(button => {
    const cno = Number(button.dataset.cno);
    if (selectedButtons.includes(cno)) {
        button.classList.add('active');
    }
});

// 버튼 클릭 시 처리
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const cno = Number(this.dataset.cno);
        if (this.classList.contains('active')) {
            selectedButtons = selectedButtons.filter(item => item !== cno);
            this.classList.remove('active');
        } else {
            if (selectedButtons.length < 5) {
                selectedButtons.push(cno);
                this.classList.add('active');
            } else {
                alert('최대 5개까지 선택할 수 있습니다.');
            }
        }
        const normalizedSelected = selectedButtons.map(item => Number(item));
        const normalizedCnoList = cnoList.map(item => Number(item));
        const isDifferent = normalizedSelected.sort().toString() !== normalizedCnoList.sort().toString();
        if (isDifferent) {
            if(selectedButtons.length != 0){
                reTasteBtn.style.display = '';
            }
        } else {
            reTasteBtn.style.display = 'none';
        }
    });
});

// "다시 분석" 버튼 이벤트 리스너
document.querySelector('.reTaste').addEventListener('click', function() {
    let changeList = [];
    for(let i = 0; i < selectedButtons.length; i++) {
        changeList.push(changeCno(selectedButtons[i]))
    }
    const requestBody = {
        categoryNames: changeList,
        uno: unoNum
    };
    fetch('/taste/addTaste', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.text())
        .then(result => {
            if (result == "fail") {
                alert("분석에러");
            } else {
                window.location.href = "/taste/";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

//cno 넣으면 categoryName 리턴함수
function changeCno(cno) {
    const buttons = document.querySelectorAll('.taste-button');
    for (let button of buttons) {
        if (button.getAttribute('data-cno') == cno) {
            return button.innerText;
        }
    }
    return null;
}


//나이대 변환 함수
function getAgeGroup(age) {
    const ageGroup = Math.floor(age / 10) * 10;
    return `${ageGroup}대`;
}

//유저정보가져오기
async function getAdditionalInfo() {
    try{
        const url = "/user/getAdditionalInfo/"+unoNum;
        const option = {
            method : "GET"
        }
        const resp = await fetch(url, option);
        return resp.json();
    }catch(error){
        console.log(error)
    }
}

// 분석결과 출력
Promise.all([
    fetch('/dist/json/AITourData.json')
        .then(response => {
            if (!response.ok) throw new Error('AITourData.json 파일 로딩 실패');
            return response.json();
        }),
    fetch('/dist/json/category.json')
        .then(response => {
            if (!response.ok) throw new Error('category.json 파일 로딩 실패');
            return response.json();
        })
])
    .then(([data, category]) => {
        let categoryCodeList = [];
        let similarPlace = [];
        const maxPlaces = 10;
        const userSelectionCount = cnoList.length;

        for (let cno of cnoList) {
            for (let cnoJson of category) {
                if (cno == cnoJson.cno) {
                    categoryCodeList.push(cnoJson.categoryCode);
                }
            }
        }

        let placesPerCategory = Math.floor(maxPlaces / userSelectionCount);
        let remainingPlaces = maxPlaces % userSelectionCount;

        // 카테고리별 유사 장소 추가
        for (let code of categoryCodeList) {
            let matchingPlaces = [];
            for (let tourArray of data) {
                if ((code === tourArray.cat2 || code === tourArray.cat3) && tourArray.firstimage) {
                    matchingPlaces.push(tourArray.contentid);
                }
            }
            matchingPlaces = shuffleArray(matchingPlaces).slice(0, placesPerCategory);
            similarPlace.push(...matchingPlaces);
        }

        // 나머지 장소 추가
        if (remainingPlaces > 0) {
            let remainingMatchingPlaces = [];
            for (let tourArray of data) {
                for (let code of categoryCodeList) {
                    if ((code === tourArray.cat2 || code === tourArray.cat3) && tourArray.firstimage) {
                        remainingMatchingPlaces.push(tourArray.contentid);
                    }
                }
            }
            remainingMatchingPlaces = shuffleArray(remainingMatchingPlaces).slice(0, remainingPlaces);
            similarPlace.push(...remainingMatchingPlaces);
        }

        similarPlace = shuffleArray(similarPlace).slice(0, maxPlaces);

        const displayTasteCodeList = document.querySelector('.displayTasteCodeList');
        displayTasteCodeList.innerHTML = '';
        for (let displayData of data) {
            for (let contentId of similarPlace) {
                if (contentId == displayData.contentid) {
                    const titleText = displayData.title;
                    if (displayData.contenttypeid == "15") {
                        displayTasteCodeList.innerHTML +=
                            `<a href="https://www.google.com/search?q=${encodeURIComponent(displayData.title)}" target="_blank">
                            <div class="oneTasteCode">
                                <img src="${displayData.firstimage ? displayData.firstimage : '/dist/image/noimage.jpg'}" alt="no image">
                                <span title="${titleText}">${titleText}</span>
                            </div>
                        </a>`;
                    } else {
                        displayTasteCodeList.innerHTML +=
                            `<a href="/place/${displayData.contentid}">
                            <div class="oneTasteCode">
                                <img src="${displayData.firstimage ? displayData.firstimage : '/dist/image/noimage.jpg'}" alt="no image">
                                <span title="${titleText}">${titleText}</span>
                            </div>
                        </a>`;
                    }
                }
            }
        }
        //트렌드출력
        getAdditionalInfo().then(result => {
            const tasteUserList = document.querySelector('.tasteUserList');
            const trendText = `${getAgeGroup(result.age)} ${result.gender == 0 ? "남성" : "여성"}에게 인기있는 관광지`;
            const trendTitle = document.createElement('div');
            trendTitle.innerText = trendText;
            tasteUserList.insertBefore(trendTitle, tasteUserList.firstChild);
            trendData(result.age, result.gender).then(trend => {
                const displayTasteUserList = document.querySelector('.displayTasteUserList');
                displayTasteUserList.innerHTML = '';
                const itemsToDisplay = [4, 3, 2, 1];
                let displayCount = 0;
                for (let i = 0; i < itemsToDisplay.length && i < trend.length; i++) {
                    let trendCno = trend[i].cno;
                    let categoryCount = itemsToDisplay[i];
                    const matchedCategory = category.find(c => c.cno == trendCno);
                    if (matchedCategory) {
                        let filteredContent = data.filter(d =>
                            (d.cat2 == matchedCategory.categoryCode || d.cat3 == matchedCategory.categoryCode)
                            && d.firstimage
                        ).sort(() => Math.random() - 0.5);
                        for (let displayData of filteredContent.slice(0, categoryCount)) {
                            const titleText = displayData.title;
                            if (displayData.contenttypeid == "15") {
                                displayTasteUserList.innerHTML +=
                                    `<a href="https://www.google.com/search?q=${encodeURIComponent(displayData.title)}" target="_blank">
                                <div class="oneTasteCode">
                                    <img src="${displayData.firstimage}" alt="no image">
                                    <span title="${titleText}">${titleText}</span>
                                </div>
                            </a>`;
                            } else {
                                displayTasteUserList.innerHTML +=
                                    `<a href="/place/${displayData.contentid}">
                                <div class="oneTasteCode">
                                    <img src="${displayData.firstimage}" alt="no image">
                                    <span title="${titleText}">${titleText}</span>
                                </div>
                            </a>`;
                            }
                        }
                        displayCount++;
                    }
                }
            });
        });
    })
    .catch(error => {
        console.error('데이터 로딩 에러:', error);
    });

//매번 랜덤값 넣기
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//성별,나이로 cno리스트 받아오기
async function trendData(age, gender){
    try{
        const url = "/taste/getTrend/"+age+"/"+gender;
        const option = {
            method : "GET"
        }
        const resp = await fetch(url, option);
        return resp.json();
    }catch(error){
        console.log(error);
    }
}

