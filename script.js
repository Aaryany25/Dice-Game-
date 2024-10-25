'use strict';
//Selecting Elements
const Player0El = document.querySelector('.player--0');
const Player1El = document.querySelector('.player--1');
const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');
const DiceEl = document.querySelector('.dice ');
const NewBtn = document.querySelector('.btn--new');
const RollBtn = document.querySelector('.btn--roll');
const HoldBtn = document.querySelector('.btn--hold');
const Current01El = document.getElementById('current--0');
const Current02El = document.getElementById('current--1');
let scores, currentScore, active, state;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  active = 0;
  state = true;

  score1El.textContent = 0;
  score2El.textContent = 0;
  Current01El.textContent = 0;
  Current02El.textContent = 0;
  DiceEl.classList.add('hidden');
  Player0El.classList.remove('player--winner');
  Player1El.classList.remove('player--winner');
  Player0El.classList.add('player--active');
  Player1El.classList.remove('player--active');

  DiceEl.classList.add('hidden');
};
init();
const SwitchPlayer = function () {
  document.getElementById(`current--${active}`).textContent = 0;
  currentScore = 0;

  active = active === 0 ? 1 : 0;
  Player0El.classList.toggle('player--active');
  Player1El.classList.toggle('player--active');
};


RollBtn.addEventListener('click', function () {
  if (state) {
    // Generating Dice Number
    const dicenumber = Math.floor(Math.random() * 6 + 1);
    // console.log(dicenumber)
    //Displaying the Dice

    DiceEl.classList.remove('hidden');
    DiceEl.src = `dice-${dicenumber}.png`;
    //Checking the Dicenumber
    if (dicenumber !== 1) {
      currentScore += dicenumber;
      document.getElementById(`current--${active}`).textContent = currentScore;
      // Current01El.textContent = currentScore //Change Later
    } else {
      SwitchPlayer();
    }
  }
});
HoldBtn.addEventListener('click', function () {
  if (state) {
    scores[active] += currentScore;
    //Example : scores[1] = scores[1] + currentScore

    document.getElementById(`score--${active}`).textContent = scores[active];

    if (scores[active] >= 10) {
      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active}`)
        .classList.remove('player--active');
      DiceEl.classList.add('hidden');

      state = false;
    } else {
      SwitchPlayer();
    }
  }
});

NewBtn.addEventListener('click', init);
