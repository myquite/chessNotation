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

      // Add notation text to the square
      const notation = String.fromCharCode(97 + col) + (size - row);
      const notationDiv = document.createElement("div");
      notationDiv.classList.add("notation");
      notationDiv.textContent = notation;
      square.appendChild(notationDiv);

      chessboard.appendChild(square);
    }
  }
}

function toggleChessNotation() {
  const notations = document.querySelectorAll(".notation");
  notations.forEach((notation) => {
    notation.classList.toggle("hidden");
  });
}

createChessBoard();
