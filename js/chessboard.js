function createChessBoard() {
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

      const isDarkSquare = (row + col) % 2 === 1;
      square.classList.add(isDarkSquare ? "dark" : "light");
      square.id = `square-${row}-${col}`; // Add an identifier
      // Add notation text to the square
      const notation = String.fromCharCode(97 + col) + (size - row);
      const notationDiv = document.createElement("div");
      notationDiv.classList.add("notation");
      notationDiv.textContent = notation;
      square.appendChild(notationDiv);

      chessboard.appendChild(square);
    }
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
  console.log("startChallenge");
  // Remove highlight from all squares
  document.querySelectorAll(".square").forEach((sq) => {
    sq.classList.remove("highlight");
  });

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
  console.log("userInput", userInput);
  const highlightedSquare = document.querySelector(".highlight");
  if (highlightedSquare) {
    const correctNotation = highlightedSquare.getAttribute("data-notation");
    if (userInput === correctNotation) {
      displayAnswer("Correct!");
    } else {
      displayAnswer("Incorrect, try again!");
    }
  }
}

function displayAnswer(answer) {
  const answerDiv = document.querySelector(".answer");
  answerDiv.textContent = answer;
  answerDiv.classList.remove("hidden");
  setTimeout(() => {
    answerDiv.classList.add("hidden");
  }, 2000);
}

function displayModal() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("hidden");
}

createChessBoard();
