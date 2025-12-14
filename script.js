'use strict';

const elements = {
    score0El : document.querySelector('#score--0'),
    score1El : document.querySelector('#score--1'),
    diceEl : document.querySelector('.dice'),
    btnNew : document.querySelector('.btn--new'),
    btnRoll : document.querySelector('.btn--roll'),
    btnHold : document.querySelector('.btn--hold'),
    current0El : document.getElementById('current--0'),
    current1El : document.getElementById('current--1'),
    Player0El : document.querySelector('.player--0'),
    Player1El : document.querySelector('.player--1')
};

let scores = [];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Starting conditions 


const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  elements.score0El.textContent = 0;
  elements.score1El.textContent = 0;
  elements.diceEl.classList.add('hidden');

  elements.score0El.textContent = 0;
  elements.score1El.textContent = 0;
  elements.current0El.textContent = 0;
  elements.current1El.textContent = 0;

  elements.Player0El.classList.remove('player--winner');
  elements.Player1El.classList.remove('player--winner');
  elements.Player0El.classList.add('player--active');
  elements.Player1El.classList.remove('player--active');
};
init();


elements.btnRoll.addEventListener('click', function () {
    //display dice
    if (playing){
    const dice = Math.trunc(Math.random() *6) + 1;
    elements.diceEl.classList.remove('hidden');
    elements.diceEl.src = `dice-${dice}.png`;

    if(dice !== 1){
        currentScore+= dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else{
        switchPlayer();
    }
}
});

elements.btnHold.addEventListener('click', function () {

    if(playing){
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 20) {
            playing = false;
            elements.diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
        switchPlayer();
    }
    
}
});

elements.btnNew.addEventListener('click', init);

const switchPlayer = function () {
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        elements.Player0El.classList.toggle('player--active');
        elements.Player1El.classList.toggle('player--active');
};

