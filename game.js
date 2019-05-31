'use strict';

//цвета карточек
const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'orange', 'chocolate', 'darkcyan'];

//создание карточек
let parentDiv = document.getElementById('cardGroup'),
  innerDiv = document.createElement('div');
innerDiv.className = 'card';

const cards = document.getElementsByClassName('card');

//Добавление на страницу
for (let i = 0; i < 16; i++) {
  let nBox = innerDiv.cloneNode(true);
  parentDiv.appendChild(nBox);
}

//Таймер
let time = 0;
let running = 0;

function start() {
  if (running == 0) {
    running = 1;
    randomColors();
    increment();
  }
};

//Секундомер
function increment() {
  if (running == 1) {
    setTimeout(function() {
      time++;
      let mins = Math.floor(time / 10 / 60);
      if (mins <= 9) {
        mins = "0" + mins;
      }
      let secs = Math.floor(time / 10);
      if (secs <= 9) {
        secs = "0" + secs;
      }
      let tenths = Math.floor(time % 10);
      if (tenths <= 9) {
        tenths = "0" + tenths;
      }
      document.getElementById('output').innerHTML = mins + ':' + secs + ':' + tenths;
      increment();
    }, 100);
  }
};

//Флаг перевернутой карты, счетчик открытых карт, метки двух перевернутых карт
let hasFlippedCard = false;
let countCards = 0;
let firstCard, secondCard;

//Поворот карты при клике
function flipCard() {
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    firstCard.style.backgroundColor = firstCard.getAttribute('color');
  } else {
    hasFlippedCard = false;
    secondCard = this;
    secondCard.style.backgroundColor = secondCard.getAttribute('color');

    //Проверка на одинаковые карты
    if (firstCard.getAttribute('color') === secondCard.getAttribute('color')) {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      countCards += 2;
    } else {
      //Иначе карты закрываются
      setTimeout(() => {
        firstCard.style.backgroundColor = 'white';
        secondCard.style.backgroundColor = 'white';
      }, 800);
    }
  }
  //Условие конца игры
  if (countCards == 16) {
    alert('Вы выиграли!\nЗатраченное время: ' + document.getElementById('output').innerHTML);
    document.getElementById('output').innerHTML = '00:00:00';
    running = 0;
    time = 0;
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.backgroundColor = 'white';
    }
  }
}

//Перемешивание карт
function randomColors() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].setAttribute("color", colors[Math.floor(Math.random() * colors.length)]);
    while (document.querySelectorAll('[color="' + cards[i].getAttribute("color") + '"]').length == 3) {
      cards[i].setAttribute("color", colors[Math.floor(Math.random() * colors.length)]);
    }
  }
  [].forEach.call(cards, function(card) {
    card.addEventListener('click', flipCard)
  });
}
