"use strict";

const box = document.getElementById('box'),
      btns = document.getElementsByTagName('button'),
      circles = document.getElementsByClassName('circle'),
      hearts = document.querySelectorAll('heart'),
      oneHeart = document.querySelector('.heart');

box.style.backgroundColor = prompt('write collor');