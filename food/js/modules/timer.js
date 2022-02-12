function timer(id, deadLine) {
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

    setClock(id, deadLine); //Запускаем таймер, задаём селектор таймера и время окончания
}

export default timer;