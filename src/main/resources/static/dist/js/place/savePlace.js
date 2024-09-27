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
            const createPage = `<form id="tripForm" method="post">
                                            <div class="createPlan">
                                             <input class="createPlanName" placeholder="일정의 제목을 작성해주세요.">
                                             <img src="/dist/image/calendar.svg" class="departCalendar">
                                             <input id="departureDate" type="text" placeholder="시작일" readonly >
                                             <img src="/dist/image/calendar.svg" class="returnCalendar">
                                             <input id="returnDate" type="text" placeholder="종료일" readonly >
                                             <div class="currentPlaceInfo" data-id="${jsonData.contentid}">
                                                <img src="${jsonData.firstimage}">
                                                <div class="currentPlaceName">${jsonData.title}</div>
                                                <div class="currentPlaceAddr">${jsonData.addr1}</div>
                                             </div>
                                             <button type="submit">일정 생성하기</button>
                                            </div>
                                        </form>`
            document.querySelector('.myPlan').innerHTML+=createPage;

            flatpickr.localize(flatpickr.l10ns.ko);

            const today = new Date();

            const departurePickr = flatpickr('#departureDate',{
                minDate: today,
                dateFormat: "Y-m-d",
                onchange: function (selectedDates, dateStr, instance){
                    returnPickr.clear();
                    returnPickr.set("minDate",dateStr);
                }
            });

            const returnPickr = flatpickr("#returnDate", {
                minDate: today,
                dateFormat: "Y-m-d",
                onChange: function(selectedDates, dateStr, instance) {
                    const departureDate = departurePickr.selectedDates[0];
                    const maxTripDuration = 2 * 24 * 60 * 60 * 1000;

                    if (selectedDates[0] - departureDate > maxTripDuration) {
                        alert("최대 2박 3일까지만 여행을 만들 수 있습니다");
                        returnPickr.clear();
                    }
                }
            });
            setupTripFormListener();
        })
}

function setupTripFormListener() {
    const tripForm = document.getElementById("tripForm");

    if (tripForm) {
        console.log('tripForm');
        tripForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const createPlanName = document.querySelector(".createPlanName").value;
            const departureDate = document.getElementById("departureDate").value;
            const returnDate = document.getElementById("returnDate").value;

            const startDate = new Date(departureDate);
            const endDate = new Date(returnDate);
            const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

            const requestBody = {
                sche_name: createPlanName,
                sche_start: departureDate,
                sche_end: returnDate,
                sche_count: totalDays,
                uno: unoNum
            };
            console.log(requestBody);

            fetch(`/plan/createPlan/${contentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
                .then(response => response.text())
                .then(data => {
                    console.log(data.message);
                    alert('일정이 성공적으로 저장되었습니다!');
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('일정 저장 중 오류가 발생했습니다.');
                });
        });
    } else {
        console.warn("tripForm이 존재하지 않습니다.");
    }
}
