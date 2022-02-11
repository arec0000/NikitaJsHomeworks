function cards() {
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
}

module.exports = cards;