/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const promoAdv = document.querySelectorAll('.promo__adv img');
const genre = document.querySelector('.promo__genre');
const bg = document.querySelector('.promo__bg');
const movieList = document.querySelector('.promo__interactive-list');
const btn = document.querySelector('button');
const form = document.querySelector('.adding__input');
const trigger = document.querySelector('input[type="checkbox"]');

promoAdv.forEach(item => { //удаление рекламы
    item.remove();
});
genre.textContent = 'драма'; //смена жанра
bg.style.backgroundImage = 'url(img/bg.jpg)'; //смена фотки

updateMovieList(); //обновляем список фильмов

btn.addEventListener('click', (event) => { //добавление фильма
    event.preventDefault();
    let film = form.value;
    if (film.length > 21) {
        film = `${film.slice(0, 21)}...`;
    }
    movieDB.movies.push(film);
    updateMovieList();

    if (trigger.checked) {
        console.log("Добавляем любимый фильм");
    }
});

movieList.addEventListener('click', (event) => { //удавление фильма с использованием делегирования событий
    if (event.target && event.target.classList.contains('delete')) {
        movieList.childNodes.forEach((item, i) => {
            if (event.target.parentNode == item) {
                movieDB.movies.splice(i, 1);
                updateMovieList();
            }
        });
    }
});

function updateMovieList () { //обновление списка фильмов
    movieDB.movies.sort();
    movieList.innerHTML = "";
    movieDB.movies.forEach((item, i) => {
        movieList.insertAdjacentHTML('beforeend', `<li class="promo__interactive-item">${i+1} ${item}
            <div class="delete"></div>
        </li>`);
    });
    //deleteMovie();
}

// function deleteMovie() { //удаление фильма
//     movieList.childNodes.forEach((movie, i) => {
//         movie.firstElementChild.addEventListener('click', (e) => {
//             //movie.remove();
//             movieDB.movies.splice(i, 1);
//             updateMovieList();
//         });
//     });
// }