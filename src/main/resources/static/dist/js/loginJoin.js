    const modal = document.getElementById('myModal');
    const modalContent = document.getElementById('modalContent');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const joinBtn = document.getElementById('joinBtn');
    const backButton = document.getElementById('backButton');

document.addEventListener('click', function (e) {
    const id = e.target.id;
    console.log(id);
    console.log(joinBtn);

    switch(id){
        case 'joinBtn' :
            pageCall("join");
            break;
        case 'backButton':
            pageCall("login");
            break;
        case 'closeModal' :
            closeModal();
            break;
        case 'openModal':
            openModal();
            break;
    }
});

    function openModal() {
        modal.style.display = 'flex';
    }
    function closeModal() {
        modal.style.display = 'none';
    }
    // if (openModalBtn) {
    //     openModalBtn.addEventListener('click', openModal);
    // }
    // if (closeModalBtn) {
    //     closeModalBtn.addEventListener('click', closeModal);
    // }
    // window.addEventListener('click', (event) => {
    //     if (event.target === modal) {
    //         closeModal();
    //     }
    // });



//     function loadJoinContent() {
//         fetch('/dist/html/join.html')
//             .then(response => response.text())
//             .then(data => {
//                 document.querySelector('.modal-content').innerHTML = data;
//
//                 if (backButton) {
//                     backButton.addEventListener('click', function() {
//                         loadLoginContent();
//                     });
//                 }
//
//                 const closeModalBtn = document.getElementById('closeModal');
//                 if (closeModalBtn) {
//                     closeModalBtn.addEventListener('click', closeModal);
//                 }
//             })
//             .catch(error => console.error('err msg >>', error));
//     }
//
//     if (joinBtn) {
//         joinBtn.addEventListener('click', (event) => {
//             event.preventDefault();
//             loadJoinContent();
//         });
//     } else if(backButton){
//         console.log("backBtn 눌림");
//         backButton.addEventListener('click',(event)=>{
//             event.preventDefault();
//             loadLoginContent();
//         })
//     }
//
//    function backBtn(){
//         fetch('/dist/')
//    }
//
//     function loadLoginContent() {
//         fetch('/dist/html/login.html')
//             .then(response => response.text())
//             .then(data => {
//                 document.querySelector('.modal-content').innerHTML = data;
//                 document.getElementById('closeModal').addEventListener('click', closeModal);
//                 const joinBtn = document.getElementById('joinBtn');
//                 if (joinBtn) {
//                     joinBtn.addEventListener('click', (event) => {
//                         event.preventDefault();
//                         loadJoinContent();
//                     });
//                 }
//             })
//             .catch(error => console.error('err msg>>>', error));
//     }
// });

    function pageCall(page) {
        console.log(page);
        const mypage = "/user/" + page;
        console.log(mypage);
        fetch(mypage)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                modalContent.innerHTML = data;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }