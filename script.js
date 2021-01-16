'use strict';

const player1Score = document.querySelector('#current--0');
const player2Score = document.querySelector('#current--1');
const player1totalScore = document.querySelector('#score--0');
const player2totalScore = document.querySelector('#score--1');
const diceImage = document.querySelector('.dice');
const btnDiceRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');


let player1ScoreValue = 0;
let player2ScoreValue = 0;
let player1totalScoreValue = 0;
let player2totalScoreValue = 0;
let currentPlayer = 1;
player1Score.textContent = 0;
player2Score.textContent = 0;
player1totalScore.textContent = 0;
player2totalScore.textContent = 0;

diceImage.classList.add('hidden');


// Utility functions

function changePlayer() {
    if(currentPlayer == 1){
        currentPlayer = 2;
        player1ScoreValue = 0;
        player1Score.textContent = 0;
        player1.classList.remove('player--active');
        player2.classList.add('player--active');
    }else{
        currentPlayer = 1;
        player2ScoreValue = 0;
        player2Score.textContent = 0;
        player2.classList.remove('player--active');
        player1.classList.add('player--active');
    }
}

function incrementScoreOfCurrentPlayer(diceValue) {
    if(currentPlayer == 1){
        player1ScoreValue += diceValue;
        player1Score.textContent = player1ScoreValue;
    }else{
        player2ScoreValue += diceValue; 
        player2Score.textContent = player2ScoreValue;
    }
}

// Creating event handlers

function rollDice() {
    if(diceImage.classList.contains('hidden')){
        diceImage.classList.remove('hidden');
    }
    const diceValue = Math.trunc(Math.random()*6 + 1);

    // console.log(diceValue);
    
    switch(diceValue){
        case 1:
            diceImage.src = 'dice-1.png';
            break;
        case 2:
            diceImage.src = 'dice-2.png';
            break;
        case 3:
            diceImage.src = 'dice-3.png';
            break;
        case 4:
            diceImage.src = 'dice-4.png';
            break;
        case 5:
            diceImage.src = 'dice-5.png';
            break;
        case 6:
            diceImage.src = 'dice-6.png';
            break;
    }

    if(diceValue == 1){
        changePlayer();
    }else{
        incrementScoreOfCurrentPlayer(diceValue);
    }
    
}

function hold() {
    if(currentPlayer == 1){
        player1totalScoreValue += player1ScoreValue;
        player1totalScore.textContent = player1totalScoreValue;
        if(player1totalScoreValue >= 100){
            player1.classList.add('player--winner');
            btnDiceRoll.disabled = true;
            btnHold.disabled = true;
            return;
        }
        player1ScoreValue = 0;
        player1Score.textContent = 0;
        currentPlayer = 2;
        player1.classList.remove('player--active');
        player2.classList.add('player--active');
    }else{
        player2totalScoreValue += player2ScoreValue;
        player2totalScore.textContent = player2totalScoreValue;
        if(player2totalScoreValue >= 100){
            player2.classList.add('player--winner');
            btnDiceRoll.disabled = true;
            btnHold.disabled = true;
            return;
        }
        player2ScoreValue = 0;
        player2Score.textContent = 0;
        currentPlayer = 1;
        player2.classList.remove('player--active');
        player1.classList.add('player--active');
    }
}


function initializeGame() {
    currentPlayer = 1;
    player1.classList.add('.player--active');
    if(player1.classList.contains('player--winner')){
        player1.classList.remove('player--winner');
    }
    else if(player2.classList.contains('player--winner')){
        player2.classList.remove('player--winner');
    }
    player1ScoreValue = 0;
    player2ScoreValue = 0;
    player1totalScoreValue = 0;
    player2totalScoreValue = 0;
    
    player1totalScore.textContent = 0;
    player2totalScore.textContent = 0;
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    btnHold.disabled = false;
    btnDiceRoll.disabled = false;
}

// Adding event listeners

btnDiceRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', hold);
btnNewGame.addEventListener('click', initializeGame);
