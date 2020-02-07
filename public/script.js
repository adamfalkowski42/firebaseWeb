/*
  My first javascript plunk
  
  Blackjack 
  by Adam Falk
  
*/


//Card Variables
let suits = ['Hearts', 'Clubs', 'Spades', 'Diamonds'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight',
  'Seven', 'Six', 'Five', 'Four', 'Three', 'Two', 'One'
];

// DOM variables
let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

//Game Variables

let gameStarted = false,
  gameOver = false,
  playerWon = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  deck = [],
  playerTotalWins=0,
  dealerTotalWins=0;

hitButton.style.display = 'none';
stayButton.style.display = 'none';

newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];

  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
});

hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});


function createDeck() {
  let deck = [];
  for (let suitInd = 0; suitInd < suits.length; suitInd++) {
    for (let valueInd = 0; valueInd < values.length; valueInd++) {
      let card = {
        suit: suits[suitInd],
        value: values[valueInd]
      };
      deck.push(card);

    }
  }

  return deck;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIndx = Math.trunc(Math.random() * deck.length);
    console.log(swapIndx);
    let tmp = deck[swapIndx];
    deck[swapIndx] = deck[i];
    deck[i] = tmp;
  }
}

function getNextCard() {
  return deck.shift();
}


function getCardString(card) {
  return card.value + ' of ' + card.suit;
}

function getCardNumericValue(card) {
  switch (card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScores(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }

  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;

}

function updateScores() {
  dealerScore = getScores(dealerCards);
  playerScore = getScores(playerCards);
}

function checkForEndOfGame() {
  updateScores();

  if (gameOver) {
    while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }

  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;

  } else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  } else if (gameOver) {
    if (playerScore > dealerScore) {
      playerWon = true;
    } else {
      playerWon = false;
    }
  }
}

function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack!';
    return;

  }

  let dealerCardString = '';
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }

  let playerCardString = '';
  for (let i = 0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }

  updateScores();

  textArea.innerText = 'Dealer has : \n' +
    dealerCardString +
    '(score ' + dealerScore + ')\n\n' +

    'Player has : \n' +
    playerCardString +
    '(score ' + playerScore + ')\n\n';

  if (gameOver) {
    if (playerWon) {
      textArea.innerText += "YOU WIN!";
      playerTotalWins +=1;
    } else {
      textArea.innerText += "DEALER WINS";
      dealerTotalWins +=1;
    }
    textArea.innerText += '\n'+ 'Player wins: ' + playerTotalWins;
    textArea.innerText += '\n'+'Dealer wins: ' + dealerTotalWins;
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }

}