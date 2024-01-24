let correctCount = 0;
let incorrectCount = 0;
let feedbackTimeout;

let rounds = 0;
let maxRounds = 10;
let results = [];

function createChessBoard(orientation = "white") {
  const chessboard = document.querySelector(".chessboard");
  if (!chessboard) {
    console.error("Chessboard element not found");
    return;
  }

  chessboard.innerHTML = "";
  const size = 8;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.id = `square-${row}-${col}`;

      // Determine square color
      const isDarkSquare = (row + col) % 2 === 1;
      square.classList.add(isDarkSquare ? "dark" : "light");
      square.id = `square-${row}-${col}`; // Add an identifier
      // Add notation text to the square
      const notation = String.fromCharCode(97 + col) + (size - row);
      const notationDiv = document.createElement("div");
      notationDiv.classList.add("notation");
      notationDiv.textContent = notation;
      square.appendChild(notationDiv);

      // Add the square to the chessboard
      chessboard.appendChild(square);

      // Add click event listener to the square
      square.addEventListener("click", function () {
        checkSquare(this, `square-${row}-${col}`);
        console.log(`${notation} clicked`);
      });
    }
  }

  if (orientation === "black") {
    rotateBoard();
  }
  toggleChessNotation();
}

function rotateBoard() {
  const chessboard = document.querySelector(".chessboard");
  if (!chessboard) {
    return;
  }

  // Create an array of rows
  let rows = [];
  for (let i = 0; i < 8; i++) {
    rows.push(Array.from(chessboard.children).slice(i * 8, (i + 1) * 8));
  }

  // Reverse each row and the order of rows
  rows.reverse().forEach((row) => {
    row.reverse().forEach((square) => {
      chessboard.appendChild(square);
    });
  });
}

function toggleView() {
  const chessboard = document.querySelector(".chessboard");
  if (!chessboard) {
    return;
  }
  const viewButton = document.querySelector(".view-button");
  if (viewButton.textContent === "View as White") {
    viewButton.textContent = "View as Black";
    viewButton.classList.remove("white");
    viewButton.classList.add("black");
  } else {
    viewButton.textContent = "View as White";
    viewButton.classList.remove("black");
    viewButton.classList.add("white");
  }
  chessboard.classList.toggle("rotated");
  rotateBoard();
}

function toggleChessNotation() {
  const notations = document.querySelectorAll(".notation");
  notations.forEach((notation) => {
    notation.classList.toggle("hidden");
  });
}

function checkSquare(clickedSquare, squareId) {
  const correctSquareId = document
    .getElementById("notationDisplay")
    .getAttribute("data-correct-square");
  const notation = document
    .getElementById("notationDisplay")
    .textContent.replace("Find the square: ", "");

  let isCorrect = squareId === correctSquareId;
  results.push({ notation, isCorrect });

  const feedbackMessage = document.getElementById("feedbackMessage");

  if (squareId === correctSquareId) {
    showFeedbackMessage("Correct!", "correct");
    // Handle correct answer
  } else {
    showFeedbackMessage("Incorrect, try again!", "incorrect");
    // Handle incorrect answer
  }

  if (rounds < maxRounds) {
    startChallenge();
  } else {
    showResults();
  }
}

function showFeedbackMessage(message, className) {
  const feedbackMessage = document.getElementById("feedbackMessage");
  feedbackMessage.textContent = message;
  feedbackMessage.className = `feedback-message ${className}`;
  feedbackMessage.style.opacity = 1;

  // Clear existing timeout
  clearTimeout(feedbackTimeout);

  // Hide the message after some time
  feedbackTimeout = setTimeout(() => {
    feedbackMessage.style.opacity = 0;
  }, 2000);
}

function startChallenge() {
  if (rounds < maxRounds) {
    // Choose a random square
    const row = Math.floor(Math.random() * 8);
    const col = Math.floor(Math.random() * 8);
    const correctNotation = String.fromCharCode(97 + col) + (8 - row);

    // Display the notation for the user to find
    const notationDisplay = document.getElementById("notationDisplay"); // Make sure you have this element in HTML
    notationDisplay.textContent = `${correctNotation}`;
    notationDisplay.setAttribute("data-correct-square", `square-${row}-${col}`);
    rounds++;
  } else {
    showResults();
  }
}

function showResults() {
  const resultsList = document.getElementById("resultsList"); // Make sure you have this element in HTML
  resultsList.innerHTML = "";

  results.forEach((result, index) => {
    const resultItem = document.createElement("li");
    resultItem.textContent = `Round ${index + 1}: ${result.notation} - ${
      result.isCorrect ? "Correct" : "Incorrect"
    }`;
    resultItem.className = result.isCorrect ? "correct" : "incorrect";
    resultsList.appendChild(resultItem);
  });
}

createChessBoard();
