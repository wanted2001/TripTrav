function changeImage() {
    const images = document.querySelectorAll('.mainBackImg img');
    let currentImg = 0;

    setInterval(() => {
        images[currentImg].classList.remove('active');
        currentImg = (currentImg + 1) % images.length;
        images[currentImg].classList.add('active');
    }, 30000);
}

window.onload = function () {
    changeImage();

    const urlParams = new URLSearchParams(window.location.search);

    //search page로 이동
    if (urlParams.has('search')) {
        changeSearch();
    }

    //회원가입 완료 메시지
    if (urlParams.has('joinMsg')) {
        alert('회원가입이 완료되었습니다!');
        history.replaceState(null, '', window.location.pathname); // URL 클린업
    }

    //로그인 실패 메시지
    if (urlParams.has('false')) {
        alert('아이디와 비밀번호를 확인해주세요.');
        openLoginModal();
    }
};

function changeSearch() {
    document.querySelector('.mainText').style.display = 'none';
    document.querySelector('.mainBtnDiv').style.display = 'none';
    document.querySelector('.tasteDiv').style.display = 'none';
    document.querySelector('.inputWrap').style.display = '';

}
//검색 자동완성
function fetchSuggestions() {
    const query = document.getElementById('placeInput').value;
    const suggestions = document.getElementById('suggestions');
    if (query.length < 2) {
        return;
    }
    const encodedQuery = encodeURIComponent(query);
    fetch(`/autocomplete?query=${encodedQuery}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('placeInput').style.borderBottomRightRadius = "0px";
            document.getElementById('placeInput').style.borderBottomLeftRadius = "0px";
            suggestions.innerHTML = "";
            if (data.length === 0) {
                const noResultLi = document.createElement('li');
                noResultLi.textContent = "검색 결과가 없습니다";
                suggestions.appendChild(noResultLi);
            } else {
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = item;
                    suggestions.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function loadTaste(){
    document.querySelector('.tasteDiv').style.display = '';
    document.querySelector('.mainText').style.display = 'none';
    document.querySelector('.mainBtnDiv').style.display = 'none';
}

const buttons = document.querySelectorAll('.taste-button');
let selectedButtons = [];

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.innerText;
        if (selectedButtons.includes(buttonText)) {
            selectedButtons = selectedButtons.filter(item => item !== buttonText);
            this.classList.remove('active');
        }
        else if (selectedButtons.length < 5) {
            selectedButtons.push(buttonText);
            this.classList.add('active');
        }
        else {
            alert('최대 5개까지 선택할 수 있습니다.');
        }

        console.log(selectedButtons);
    });
});