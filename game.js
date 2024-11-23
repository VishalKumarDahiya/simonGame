var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;


$(document).on("keydown", function(){
    if(!started){
        $("#level-title").text("Level 0");
        nextSequence();
        
        started=true;
    }
});


// some difference below
$(".btn").on("click", function(){
    
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1); 
});



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        if (gamePattern.length===userClickedPattern.length) {
            setTimeout(function(){nextSequence();},1000);
        }
        
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}


// below some difference
function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);

    var randomNumber=Math.floor(Math.random()*4); 
    var randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
    

}


function animatePress(currentColour) {
        $("#"+currentColour).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColour).removeClass("pressed"); },100);
}


function playSound(name) {
    var buttonAudio= new Audio("./sounds/"+name+".mp3");
    buttonAudio.play();
}


function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}
















