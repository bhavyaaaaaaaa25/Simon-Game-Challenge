var gamePattern =[];  //storing the random colours that will be given by the computer
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = []; //storing the ones that the user clicks

var started = false;  // game not started yet
var level = 0;    // starts from level 0
$(document).keydown(function(){  // to start the game, we need to press a key according to rules, so this statement does that
if(!started)    //if started is true
{
    $("#level-title").text("Level "+level);    // the heading becomes Level 1 or 2 or 3...
    gameSequence();    // calling the game sequence now
    started=true;   // making started = true
}
});

 
$(".btn").click(function(){                                                // if any button (colour box) is clicked
    var userChosenColour = $(this).attr("id");             // the id of that box is stored in userChosenColour
    userClickedPattern.push(userChosenColour);               // then that id is pushed in the array of user
   playSound(userChosenColour);              // sound is played for that box
   animatePress(userChosenColour);              // animation is done for that box
   checkAnswer(userClickedPattern.length-1);    // checked if that is the correct box to be clicked by the user
});

function checkAnswer(currentLevel)
{
if(gamePattern[currentLevel]===userClickedPattern[currentLevel])     // checking if the user and the computer choice is same
{
if(userClickedPattern.length===gamePattern.length)                    // checking if the array length is same
{ 
    setTimeout(function()                                                    //if it is
    {
        gameSequence();                                     // then continue the sequence after 1000 ms
    },1000); 
}
}
else{
var wrongAudio = new Audio("./sounds/wrong.mp3");                         // if not then play the wrong audio
    wrongAudio.play(); 
    $("body").addClass("game-over");                                            // change the bg colour of the page
    $("h1").text("Game Over, Press Any Key to Restart");                // display this message
    setTimeout(function(){$("body").removeClass("game-over");},200);               // bg colour back to original after 200 ms
    
    startOver();                                              // restart the game
}}
function gameSequence()                                                  // the logic of the game
{
    userClickedPattern=[];                                                   // since it is called again, we need an empty user array
    level++;                                                             // the level is increased
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);                            // a random number is generated
    var randomChosenColour = buttonColours[randomNumber];         // from the buttoncolor array a random colour is chosen
    gamePattern.push(randomChosenColour);                           // and pushed into the array of the computer

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);   // and once a box is chosen, it animates
  playSound(randomChosenColour);                                // and a sound is played
}


function playSound(name)
{
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play(); 
   
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}


function startOver()
{
    started = false;                                      // started is false again
    level =0;                               // level is back to 0
    gamePattern=[];  // gamepattern is empty again
}

