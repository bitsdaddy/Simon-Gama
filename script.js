var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function (event) {
  if (!started) {
    if (event.key === "S" || event.key === "s") {
      // Check for 's' or 'S' key press
      nextSequence();
      started = true;
    }
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);

  checkKey(userClickedPattern.length - 1);
});

function checkKey(index) {
  if (gamePattern[index] === userClickedPattern[index]) {
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press 'S' to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
  }
}

function nextSequence() {
  level++;
  $("h1").text("Level " + level);

  setTimeout(function () {
    userClickedPattern = [];

    var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);

    for (var j = 0; j < level; j++) {
      (function (j) {
        setTimeout(function () {
          $("#" + gamePattern[j])
            .fadeIn(100)
            .fadeOut(100)
            .fadeIn(100);
          playSound(gamePattern[j]);
        }, 1000 * j);
      })(j);
    }
  }, 1000);
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}
