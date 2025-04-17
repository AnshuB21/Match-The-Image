const card = document.querySelectorAll('.cell');
const front = document.querySelectorAll('.front');
const container = document.querySelector('.container');
const container_10 = document.querySelector('.container-10');
const container_12 = document.querySelector('.container-12');
const score = document.querySelector('.score span');
let attempts = 0; // Track the number of attempts
let correctMatches = 0; // Track correct matches
let elapsedTime = 0;
let playerName = ''; // To store player's name
const myDiv = document.getElementById('count');
const value = myDiv.getAttribute('data-value');
let totalCards = card.length;
let flippedCards = 0; // Track flipped cards

// Display leaderboard at the top
const leaderboardDiv = document.createElement('div');
leaderboardDiv.classList.add('leaderboard');
leaderboardDiv.innerHTML = '<h3>Leaderboard (Top 5)</h3>';
document.body.insertBefore(leaderboardDiv, document.body.firstChild);

startTimer();
shuffleImage();
clicking();

function startTimer() {
  const timer = document.getElementById('timer');

  setInterval(() => {
    elapsedTime++;

    let timeLimit;
    if (value == 8) {
      timeLimit = 120;
      timer.textContent = `Time: ${elapsedTime} seconds out of 120 seconds!`;
    } else if (value == 10) {
      timeLimit = 150;
      timer.textContent = `Time: ${elapsedTime} seconds out of 150 seconds!`;
    } else if (value == 12) {
      timeLimit = 180;
      timer.textContent = `Time: ${elapsedTime} seconds out of 180 seconds!`;
    }

    // End game if time limit exceeded
    if (elapsedTime > timeLimit) {
      endGame();
    }
  }, 1000);
}

function shuffleImage() {
  card.forEach(c => {
    const num = [...Array(card.length).keys()];
    const random = Math.floor(Math.random() * card.length);
    c.style.order = num[random];
  });
}

function clicking() {
  for (let i = 0; i < card.length; i++) {
    front[i].classList.add('show');
    setInterval(() => {
      front[i].classList.remove('show');
    }, 2000);
    card[i].addEventListener('click', () => {
      if (card[i].classList.contains('match')) {
        return; // Don't do anything if the card is already matched
      }

      front[i].classList.add('flip');
      const flippedCard = document.querySelectorAll('.flip');

      if (flippedCard.length === 2) {
        handleAttempt(flippedCard[0], flippedCard[1]);
      }
    });
  }
}

function handleAttempt(cardOne, cardTwo) {
  attempts++;
  flippedCards += 2; // Increase flipped card count

  if (cardOne.dataset.index === cardTwo.dataset.index) {
    correctMatches++;
    score.innerHTML = calculateScore();

    cardOne.classList.remove('flip');
    cardTwo.classList.remove('flip');
    cardOne.classList.add('match');
    cardTwo.classList.add('match');

    // If all cards are matched, trigger game completion
    if (correctMatches === totalCards / 2) {
      setTimeout(() => {
        recordScore();
      }, 500); // Delay to allow last match animation to finish
    }
  } else {
    setTimeout(() => {
      cardOne.classList.remove('flip');
      cardTwo.classList.remove('flip');
      score.innerHTML = calculateScore();
    }, 1000);
  }
}

function calculateScore() {
  // Points for correct matches
  let scoreValue = correctMatches * 10;

  // Subtract points for incorrect attempts
  scoreValue -= (attempts - correctMatches) * 5;

  // Deduct points for time taken
  const timeLimit = value === 8 ? 120 : value === 10 ? 150 : 180;
  const timePenalty = Math.max(elapsedTime - timeLimit, 0);
  scoreValue -= timePenalty;

  return scoreValue;
}

function endGame() {
  alert("Time's up! The game is over.");
  recordScore();
  window.location.reload();
}

function recordScore() {
  const name = prompt("Enter your name to be added to the leaderboard:");
  if (name) {
    playerName = name;
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    leaderboard.push({
      name: playerName,
      score: parseInt(score.innerHTML),
    });

    // Sort leaderboard by score (descending)
    leaderboard.sort((a, b) => b.score - a.score);

    // Keep only top 5 players
    leaderboard.splice(5);

    // Save leaderboard to localStorage
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    displayLeaderboard(leaderboard);
  }
}

function displayLeaderboard(leaderboard) {
  // Clear previous leaderboard entries
  leaderboardDiv.innerHTML = '<h3>Leaderboard (Top 5)</h3>';

  leaderboard.forEach(player => {
    const playerDiv = document.createElement('div');
    playerDiv.textContent = `${player.name}: ${player.score} points`;
    leaderboardDiv.appendChild(playerDiv);
  });
}
