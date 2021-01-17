// variables for telling state of game

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userChosenColor ;

var patternIndex = 0;
var gameStarted = false;
var gameLevel = 0;

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}
function startAgain(){

   // After user pressed wrong color , game must be reinitialized
    gamePattern = [];
    patternIndex = 0;
    gameStarted = false;
    gameLevel = 0;
}

function animatePress(currentColor) {

  var colorId = '#' + currentColor;
  $(colorId).addClass('pressed');
  setTimeout(function () {
    $(colorId).removeClass('pressed');
  }, 100);
}

function blink(randomChosenColor) {
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

function checkAnswer(userChosenColor){
    if(gamePattern[patternIndex] == userChosenColor){
        patternIndex++;
        return true;
    }
    else return false;
}

function falseResult(){

  $('#level-title').text('Wrong!Game Over');
  
  $('body').addClass('game-over');
  setTimeout(function(){
    $('body').removeClass('game-over');
  },300);

  playSound('wrong');

  setTimeout(function(){
    $('#level-title').text("Press a Key to Start");
  },1000);
}

$(".btn").click(function () { 


  userChosenColor = $(this).attr("id"); 

  // no need of response if the game not started 
  if(gameStarted == false) {

    alert('First Start the game by pressing some key.');
    return ;
  }

  var result = checkAnswer(userChosenColor);
  if(result == false) {
    
    falseResult();
    // clear game Parameters
    startAgain();
    
   }
  else {
      if(patternIndex == gamePattern.length){
          patternIndex = 0;
          setTimeout(function(){
            nextSequence();
          },1000);
          
      }
     
  }

  playSound(userChosenColor);
  animatePress(userChosenColor);

});



function nextSequence() {

  gameLevel++;
  $('#level-title').text('Level ' + gameLevel);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  
  blink(randomChosenColor);
  playSound(randomChosenColor);
  
  
}



// start Game

$(document).keypress(function() {
  if (!gameStarted) {

    $("#level-title").text("Level " + gameLevel);
    nextSequence();
    gameStarted = true;
  }
 
});
