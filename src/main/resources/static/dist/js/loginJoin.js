document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('myModal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const joinBtn = document.getElementById('joinBtn');
    const backButton = document.getElementById('backButton');

    function openModal() {
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    function loadJoinContent() {
        fetch('/dist/html/join.html')
            .then(response => response.text())
            .then(data => {
                document.querySelector('.modal-content').innerHTML = data;

                const backButton = document.getElementById('backButton');
                if (backButton) {
                    backButton.addEventListener('click', function() {
                        loadLoginContent();
                    });
                }

                const closeModalBtn = document.getElementById('closeModal');
                if (closeModalBtn) {
                    closeModalBtn.addEventListener('click', closeModal);
                }
            })
            .catch(error => console.error('err msg >>', error));
    }

    if (joinBtn) {
        joinBtn.addEventListener('click', (event) => {
            event.preventDefault();
            loadJoinContent();
        });
    }

    function loadLoginContent() {
        fetch('/dist/html/login.html')
            .then(response => response.text())
            .then(data => {
                document.querySelector('.modal-content').innerHTML = data;
                document.getElementById('closeModal').addEventListener('click', closeModal);
                const joinBtn = document.getElementById('joinBtn');
                if (joinBtn) {
                    joinBtn.addEventListener('click', (event) => {
                        event.preventDefault();
                        loadJoinContent();
                    });
                }
            })
            .catch(error => console.error('err msg>>>', error));
    }
});