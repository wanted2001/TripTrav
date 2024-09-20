(function() {
    const modal = document.getElementById('myModal');
    const modalContent = document.getElementById('modalContent');

    document.body.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'backBtn') {
            e.preventDefault();
            console.log('backBtn 클릭됨');
            pageCall("login");
        } else if (e.target && e.target.id === 'closeModal') {
            closeModal();
        } else if (e.target && e.target.id === 'joinBtn') {
            e.preventDefault();
            pageCall("join");
        } else if (e.target && e.target.id === 'openModal') {
            openModal();
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    function openModal() {
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function pageCall(page) {
        console.log(page);  // 확인용 로그
        const mypage = "/user/" + page;
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
})();


/////////////////////////////// error code /////////////////////////////////////

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

    // 오류나서 수정

    // document.querySelectorAll('#joinBtn, #backBtn, #closeModal, #openModal').forEach(button => {
    //     button.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const id = e.target.id;
    //         console.log(id);
    //
    //         switch (id) {
    //             case 'joinBtn':
    //                 pageCall("join");
    //                 break;
    //             case 'backBtn':
    //                 pageCall("login");
    //                 break;
    //             case 'closeModal':
    //                 closeModal();
    //                 break;
    //             case 'openModal':
    //                 openModal();
    //                 break;
    //         }
    //     });
    // });