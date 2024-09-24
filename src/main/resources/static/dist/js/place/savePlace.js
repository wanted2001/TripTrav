const savePlaceModal = document.querySelector('.savePlaceModal');

function savePlace(){
    savePlaceModal.style.display='flex';
    const modal = `<div class="spModalWrap">
                            <div class="spModalCloseBtn" onclick="closeModal()">&times;</div>
                            <div class="myPlan">
                                <span>내 여행일정</span>
                                <ul class="myPlanUl"></ul>
                                <button class="createPlanBtn" onclick="createPlan()">새로운 일정 생성하기</button>
                            </div>
                        </div>`
    savePlaceModal.innerHTML=modal;
}

function closeModal(){
    savePlaceModal.style.display='none';
}


function createPlan(){
    fetch(detailInfoUrl)
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            const jsonData = data.response.body.items.item[0];
            document.querySelector('.myPlan').innerHTML='';
            const createPage = `<div class="createPlan">
                                         <input class="createPlanName" placeholder="일정의 제목을 작성해주세요.">
                                         <img src="/dist/image/calendar.svg" class="departCalendar">
                                         <input id="departureDate" type="text" placeholder="출발일">
                                         <img src="/dist/image/calendar.svg" class="arrivalCalendar">
                                         <input id="arrivalDate" type="text" placeholder="도착일">
                                         <div class="currentPlaceInfo" data-id="${jsonData.contentid}">
                                            <img src="${jsonData.firstimage}">
                                            <div class="currentPlaceName">${jsonData.title}</div>
                                            <div class="currentPlaceAddr">${jsonData.addr1}</div>
                                         </div>   
                                         <button class="create">일정 생성하기</button>
                                        </div>`
            document.querySelector('.myPlan').innerHTML+=createPage;
            document.getElementById('departureDate').flatpickr({
                mode:"range",
                minDate:"today",
                dateFormat:"Y-m-d"
            });
            document.getElementById('arrivalDate').flatpickr();
        })
}
