function calculator() {
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
}

module.exports = calculator;