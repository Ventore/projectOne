var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode")
var metaThema = document.getElementsByTagName('meta')[2];

init();

resetButton.addEventListener("click", function() {
  reset();
});

function init() {
  // Mode buttons to change difficulty
  setUpModeButtons();
  gameLogic();
  reset();
}

function generateRandomColors(num) {
  var arr = [];
  for(var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")"
}

function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.background = color
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length)
  return colors[random];
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  h1.style.background = "#4178aa";
  metaThema.content = "rgb(65, 120, 170)";
  colorDisplay.textContent = pickedColor;
  for(var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
};

function setUpModeButtons() {
  for(var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected")
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      reset();
    });
  };
}

function gameLogic() {
  for (var i = 0; i < squares.length; i++) {
    // Add Event Listeners to squares
    squares[i].addEventListener("click", function() {
      var clickedColor = this.style.background;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!"
        changeColors(clickedColor);
        resetButton.textContent = "Play again?"
        h1.style.background = clickedColor;
        metaThema.content = clickedColor;
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "Try Again"
      }
    });
  };
}
