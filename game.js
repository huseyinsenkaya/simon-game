let randomChosenColour = null;
let gamePattern = new Array();
let userClickedPattern = new Array();
let level = 0;
let started = false;

const buttonColours = ["green", "red", "yellow", "blue"];
const boxes = $(".btn");
const title = $("#level-title");


function randomNumber() {
    randomChosenColour = Math.floor(Math.random() * 4);

}

function playAudio(item) {
    var audio = new Audio('/sounds/' + item + '.mp3');
    audio.play();
}

function makeBlip(random) {
    $("." + random).fadeOut();
    $("." + random).fadeIn();
    playAudio(random);
}

function animatePressed(e) {
    $("." + e).addClass("pressed");
    setTimeout(function () {
        $("." + e).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    title.text("Level " + level);
    randomNumber();

    makeBlip(buttonColours[randomChosenColour]);
    gamePattern.push(buttonColours[randomChosenColour]);
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playAudio("wrong");
        $("body").addClass("game-over");
        title.text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


$(".btn").click(function (e) {
    let userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playAudio(userChosenColour);
    animatePressed(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
    if(!started) {
        title.text("Level "+level);
        started = true;
        nextSequence();
    }
    
})

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }

