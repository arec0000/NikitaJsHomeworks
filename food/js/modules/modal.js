function modal() {
    const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; //чтобы при открытии модального окна страницу нельзя было скролить
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; //чтобы при закрытии можно было скролить
    }

    modalTrigger.forEach((button) => {
        button.addEventListener('click', () => {
            openModal();
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.matches('.show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000); //окно само откроется через 5 сек, бесит довольно сильно

    function showModalByScroll() { //открыть окно если страница проскроллена до конца
        if (Math.ceil(window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); //удаляем обработчик после первого вызова
        }
    }

    window.addEventListener('scroll', showModalByScroll); //обработчик сробатывающий при прокрутке страницы
}

module.exports = modal;