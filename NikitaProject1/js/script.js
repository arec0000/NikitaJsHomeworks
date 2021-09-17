"use strict";

const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?');

let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

let film1 = prompt('Один из последних просмотренных фильмов?');
personalMovieDB.movies[film1] = prompt('На сколько оцените его?');
let film2 = prompt('Один из последних просмотренных фильмов?');
personalMovieDB.movies[film2] = prompt('На сколько оцените его?');
console.log(personalMovieDB);