"use strict";

let personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,

    start: function() {
        personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?');
        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?');
        }
    },

    rememberMyFilms: function() {
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
    },

    detectPersonalLevel: function() {
        if (personalMovieDB.count < 10) {
            alert('Просмотрено довольно мало фильмов');
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
            alert('Вы классический зритель');
        } else if (personalMovieDB.count >= 30) {
            alert('Вы киноман');
        } else {
            alert('Произошла ошибка');
        }
    },

    writeYourGenres: function() {
        for (let i = 0; i < 3; i++) {
            personalMovieDB.genres[i] = prompt(`Ваш любимый жанр под номером ${i+1}`);
            if (personalMovieDB.genres[i] == null || personalMovieDB.genres[i] == '') {
                i--;
            }
        }
        personalMovieDB.genres.forEach(function(genre, number) {
            console.log(`Любимый жанр ${number+1} - ${genre}`);
        });
    },

    toggleVisibleMyDB: function () {
        // if (personalMovieDB.privat) {
        //     personalMovieDB.privat = false;
        // } else {
        //     personalMovieDB.privat = true;
        // }
        personalMovieDB.privat = !personalMovieDB.privat;
    },

    showMyDB: function(hidden) {
        if (!hidden) {
            console.log(personalMovieDB);
        }
    }
};

personalMovieDB.start();
personalMovieDB.rememberMyFilms();
personalMovieDB.detectPersonalLevel();
personalMovieDB.writeYourGenres();
personalMovieDB.showMyDB(personalMovieDB.privat);