document.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    
    //Timer
    
    function getTimeRemaining(endTime) { //Получаем разницу между конечным временем и текущим и записываем её в объект
        const t = Date.parse(endTime) - Date.now(),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return { //быстрая запись свойств объекта в ES6 
            t,
            days, //эквивалентно 'days': days
            hours,
            minutes,
            seconds
        };
    }

    function getZero(a) { //если число меньше 10, добавлем 0 перед ним
        if (a >= 0 && a < 10) {
            a = `0${a}`;
        }
        return a;
    }

    function setClock(clockSelector, endTime) {
        const timer = document.querySelector(clockSelector), //Записываем элементы таймера в переменные
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); //запускаем функцию обновления таймера с интервалом в сек
        
        updateClock(); //запускаем один раз обновление часов, чтобы не было мигания в начале    
        
        function updateClock () { //записываем время из объекта в элементы таймера
            const t = getTimeRemaining(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.t <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', '2021-11-20'); //Запускаем таймер, задаём селектор таймера и время окончания

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden'; //чтобы при открытии модального окна страницу нельзя было скролить
        clearInterval(modalTimerId);
    }

    function closeModal(modalName) {
        modalName.classList.toggle('show');
        document.body.style.overflow = ''; //чтобы при закрытии можно было скролить
    }

    modalTrigger.forEach((button) => {
        button.addEventListener('click', () => {
            openModal();
        });
    });

    modalCloseBtn.addEventListener('click', () => {
        closeModal(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.matches('.show')) {
            closeModal(modal);
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
});

//menu

class MenuItem {
    constructor(selector, title, text, cost, img, alt, ...classes) {
        this.container = document.querySelector(selector);
        this.title = title;
        this.text = text;
        this.cost = cost;
        this.img = img;
        this.alt = alt;
        this.transfer = 27; //курс валюты, в будущем можно получать с сервера
        this.classes = classes;
        this.changeToUAH();
    }

    changeToUAH() {
        this.cost = Math.round(this.cost * this.transfer);
    }

    addMenu() {
        this.element = document.createElement('div');

        if (!this.classes.length) { //параметр по умолчанию
            this.element.classList.add('menu__item');
        } else {
            this.classes.forEach(newClass => this.element.classList.add(newClass));
        }

        this.element.innerHTML += 
            `<img src=${this.img} alt=${this.alt}>
            <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
            <div class="menu__item-descr">${this.text}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total">
                <span>${this.cost}</span> грн/день</div>
            </div>`;
        this.container.append(this.element);
    }
}

// const secondFintess = new MenuItem(
//     '.menu__field .container', 
//     'Фитнес', 
//     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
//     11.11, 
//     'img/tabs/vegy.jpg', 
//     'vegy');
// secondFintess.addMenu();

//Forms

// const forms = document.querySelectorAll('form');

// const message = {
//     loading: 'Загрузка',
//     success: 'Спасибо',
//     failure: 'Чё-то пошло не так'
// };

// forms.forEach(item => {
//     postData(item);
// });

// function postData(form) {
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();

//         let statusMessage = document.createElement('div');
//         statusMessage.classList.add('status');
//         statusMessage.textContent = message.loading;
//         form.append(statusMessage);

//         const request = new XMLHttpRequest();

//         request.open('POST', 'server.php');
//         request.setRequestHeader('Content-type', 'application/json');

//         const formData = new FormData(form);

//         request.send(formData);

//         request.addEventListener('load', () => {
//             if (request.status === 200) {
//                 console.log(request.response);
//                 statusMessage.textContent = message.success;
//             } else {
//                 statusMessage.textContent = message.failure;
//             }
//         });
//     });
// }

    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);
        
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }