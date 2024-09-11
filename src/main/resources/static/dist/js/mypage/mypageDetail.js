const bottom = document.getElementById("resultMyPage");
const tripList = "/tripList";
const tripReview = "/tripReview";
const wishPlace = "/wishPlace";
const wishTrip = "/wishTrip";

document.querySelectorAll('#tripList,#tripReview,#wishPlace,#wishTrip').forEach(button=>{
    button.addEventListener('click',(e)=>{
        const id = e.target.id;
        console.log(id);
        bottom.innerHTML= "";
        switch (id) {
            case 'tripList':
                pageCall(tripList,bottom);
                break;
            case 'tripReview':
                pageCall(tripReview,bottom);
                break;
            case 'wishPlace':
                pageCall(wishPlace,bottom);
                break;
            case 'wishTrip':
                pageCall(wishTrip,bottom);
                break;

        }

    })
})

function pageCall(page) {
    const mypage = "/mypage" + page;
    console.log(mypage);
    fetch(mypage)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            bottom.innerHTML = data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function loadScript(page){
    const scripts = document.getElementsByName("script");
    for(let i = 0; i<scripts.length; i++){

    }

}

