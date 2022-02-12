export function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; //чтобы при открытии модального окна страницу нельзя было скролить
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

export function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    document.body.style.overflow = ''; //чтобы при закрытии можно было скролить
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector);

    modalTrigger.forEach((button) => {
        button.addEventListener('click', () => {
            openModal(modalSelector, modalTimerId);
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.matches('.show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() { //открыть окно если страница проскроллена до конца
        if (Math.ceil(window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); //удаляем обработчик после первого вызова
        }
    }

    window.addEventListener('scroll', showModalByScroll); //обработчик сробатывающий при прокрутке страницы
}

export default modal;