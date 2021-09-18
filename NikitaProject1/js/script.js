"use strict";

const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?');

let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

for (let i = 0; i < 2; i++) {
    let film = prompt('Один из последних просмотренных фильмов?');
    if (film == '' || film == null || film.length > 50) {
        i--;
        continue;
    }
    let rate = prompt('На сколько оцените его?');
    if (rate == '' || rate == null || rate.length > 50) {
        i--;
        continue;
    }
    personalMovieDB.movies[film] = rate;
}

if (personalMovieDB.count < 10) {
    alert('Просмотрено довольно мало фильмов');
} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
    alert('Вы классический зритель');
} else if (personalMovieDB.count >= 30) {
    alert('Вы киноман');
} else {
    alert('Произошла ошибка');
}

console.log(personalMovieDB);