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

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); //генерируем ошибку
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({title, descr, price, img, altimg}) => {
                new MenuItem('.menu__field .container', title, descr, price, img, altimg).addMenu();
            });
        });

    //Modal

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

    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо',
        failure: 'Что-то пошло не так('
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            statusMessage.textContent = message.loading;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    //Slider

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          next = document.querySelector('.offer__slider-next'),
          back = document.querySelector('.offer__slider-prev'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width; //ширина окна слайдера
    
    let currentCount = 1;
    let offset = 0;

    total.textContent = getZero(slides.length);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i <  slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        indicators.append(dot);
        dots.push(dot);
    }

    changeSlide();

    next.addEventListener('click', () => {

        if (currentCount < slides.length) {
            currentCount++;
        } else {
            currentCount = 1;
        }

        changeSlide();
    });

    back.addEventListener('click', () => {

        if (currentCount > 1) {
            currentCount--;
        } else {
            currentCount = slides.length;
        }

        changeSlide();
    });

    indicators.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-slide-to')) {
            currentCount = e.target.getAttribute('data-slide-to');
            changeSlide();
        }
    });

    function changeSlide() {
        offset = +width.replace(/\D/g, '') * (currentCount - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
        current.textContent = getZero(currentCount);
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentCount - 1].style.opacity = '1';
    }

    //Calculator

    const result = document.querySelector('.calculating__result span');
    let height, weight, age, gender, ratio;

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    if (localStorage.getItem('gender')) {
        gender = localStorage.getItem('gender');
    } else {
        gender = 'female';
        localStorage.setItem('ratio', 'female');
    }

    calculatorElementInit('#gender div', 'calculating__choose-item_active');
    calculatorElementInit('.calculating__choose_big div', 'calculating__choose-item_active');
    totalCalculation('.calculating__choose_big', 'calculating__choose-item_active');
    getStaticInf('#gender', 'calculating__choose-item_active');
    getStaticInf('.calculating__choose_big', 'calculating__choose-item_active');
    getDynamicInf('#height');
    getDynamicInf('#weight');
    getDynamicInf('#age');

    function calculatorElementInit(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.remove(activeClass);
            if (element.getAttribute('id') == localStorage.getItem('gender')) {
                element.classList.add(activeClass);
            }
            if (element.getAttribute('data-ratio') == localStorage.getItem('ratio')) {
                element.classList.add(activeClass);
            }
        });
    }

    function totalCalculation() {
        if (gender && height && weight && age && ratio) {
            if (gender == 'female') {
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        } else {
            result.textContent = 'не все поля заполнены(';
        }
    }

    function getStaticInf(parent, activeClass) {
        const elements = document.querySelectorAll(`${parent} div`);
        document.querySelector(parent).addEventListener('click', (e) => {
            if (e.target.classList.contains('calculating__choose-item')) {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', gender);
                }
                elements.forEach(element => element.classList.remove(activeClass));
                e.target.classList.add(activeClass);
                totalCalculation();
            }
        });
    }

    function getDynamicInf(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (/\D/.test(input.value)) {
                input.style.backgroundColor = '#F49191';
                input.value = input.value.replace(/\D/, '');
            } else {
                input.style.backgroundColor = '#FFF';
                switch(input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = + input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }
                totalCalculation();
            }
        });

        input.addEventListener('focusout', () => {
            input.style.backgroundColor = '#FFF';
        });
    }
});