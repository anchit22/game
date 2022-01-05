
var gamePattern = [];
var userPattern = [];

var flag = false;
var level = 0;

$(".bttn").click(function() {
  if (!flag) {
    flag = true;
    $("#level-header").text("Level " + level);
    nextSequence();

  }
});

$(".btn").click(function() {

  var userChosenNumber = $(this).text();
  userPattern.push(userChosenNumber);

  playSound("button");
  animatePress(userChosenNumber);

  checkAnswer(userPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
      if (userPattern.length === gamePattern.length){
          $("#level-header").text("Bravo!");
        setTimeout(function () {

          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-header").text("Game Over, Press Start to start over.");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userPattern = [];
  gamePattern = [];
  level++;
  $("#level-header").text("Level " + level);

  for(var i=0;i<level;i++){
  var randomNumber = Math.floor(Math.random() * 4);
  randomNumber++;
  var numberString = String(randomNumber);
  gamePattern.push(numberString);
  animatePres(0);
  /*setTimeout(function(){
    animatePress(numberString);
    playSound("button");
  },500*i);*/

}
}
 function animatePres(k){
  var num = gamePattern[k];
  setTimeout(function(){
    animatePress(num);
    playSound("button");

    k++;
    if(k<gamePattern.length){
      animatePres(k);
    }

  },500);

}



function animatePress(number) {
  $(".btn" + number).addClass("pressed");
  setTimeout(function () {
    $(".btn" + number).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sound/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  userPattern = [];
  flag = false;
}
