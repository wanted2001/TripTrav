//아코디언 처리
document.querySelectorAll('.accordion').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        const tasteDiv = document.querySelector('.tasteDiv')
        tasteDiv.style.display = tasteDiv.style.display === 'none' ? 'block' : 'none';
    });
});

const buttons = document.querySelectorAll('.taste-button');
const reTasteBtn = document.querySelector('.reTaste');
let selectedButtons = [...cnoList];

//화면출력
document.querySelector('.tasteTitle').innerText = `${userNickname}님의 취향분석 결과`;
getAdditionalInfo().then(result =>{
    document.querySelector('.tasteUserList').innerText = `${getAgeGroup(result.age)} ${result.gender == 0? "남성": "여성"}에게 인기있는 관광지`;
})

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

