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
    }
  }

  if (orientation === "black") {
    rotateBoard();
  }
  toggleChessNotation();
}

function toggleChessNotation() {
  const notations = document.querySelectorAll(".notation");
  notations.forEach((notation) => {
    notation.classList.toggle("hidden");
  });
}

function startChallenge() {
  // Remove highlight from all squares
  clearHighlights();

  // Randomly select a square
  const row = Math.floor(Math.random() * 8);
  const col = Math.floor(Math.random() * 8);
  const selectedSquare = document.getElementById(`square-${row}-${col}`);
  selectedSquare.classList.add("highlight");

  // Store the correct answer for later validation
  const correctNotation = String.fromCharCode(97 + col) + (8 - row);
  selectedSquare.setAttribute("data-notation", correctNotation);
  console.log("correctNotation", correctNotation);
}

function checkNotation(userInput) {
  const highlightedSquare = document.querySelector(".highlight");
  if (highlightedSquare) {
    const correctNotation = highlightedSquare.getAttribute("data-notation");
    if (userInput === correctNotation) {
      displayAnswer("Correct!");
      startChallenge();
    } else {
      displayAnswer("Incorrect, try again!");
    }
  }
}

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const userInput = document.getElementById("userInput").value;
    checkNotation(userInput);
  }
});

function displayAnswer(answer) {
  const answerDiv = document.querySelector(".answer");
  answerDiv.textContent = answer;
  answerDiv.classList.remove("hidden");
  setTimeout(() => {
    answerDiv.classList.add("hidden");
  }, 2000);
}

function clearHighlights() {
  document.querySelectorAll(".square").forEach((sq) => {
    sq.classList.remove("highlight");
  });
}

function quitChallenge() {
  clearHighlights();
  document.querySelector(".answer").classList.add("hidden");
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
  } else {
    viewButton.textContent = "View as White";
  }
  chessboard.classList.toggle("rotated");
  rotateBoard();
}

createChessBoard();
