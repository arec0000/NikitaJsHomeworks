function slider() {
    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          next = document.querySelector('.offer__slider-next'),
          back = document.querySelector('.offer__slider-prev'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width; //ширина окна слайдера

    function getZero(a) { //если число меньше 10, добавлем 0 перед ним
        if (a >= 0 && a < 10) {
            a = `0${a}`;
        }
        return a;
    }
    
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
}

module.exports = slider;