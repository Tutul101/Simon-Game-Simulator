colours=["green","red","yellow","blue"];
game_pattern=[];
user_pattern = [];
var level=0;
var start = false;
 
$(document).keypress(function(){
	if(!start)
	{
		$(".heading").text("Level "+level);
		nextSequence();
		start=true;
	}
}); 

function checkedAnswer()
{
	for(var i=0;i<game_pattern.length;i++)
	{
		if(user_pattern[i]!=game_pattern[i])
		{
			return false;
		}
	}
	return true;	
}
function seq_check()
{
	if(checkedAnswer())
	{
		console.log(true);
		user_pattern=[];
		console.log("after completion of level");
		user_pattern = [];
		setTimeout(function() {
			nextSequence();
		}, 1500);
	}
	else
	{
		$(".heading").text("Game Over Press Any Key To Restart");
		var audio = new Audio("sounds/wrong.mp3");
		audio.play();
		restart();

	}
}
function restart()
{
	game_pattern = [];
	start = false;
	level = 0;
	user_pattern = [];
}
function playSound(name)
{
	console.log(name);
	var audio = new Audio("sounds/"+name+".mp3");
	audio.play();
}
function animatePress(name)
{
	$("#"+name).addClass("pressed");
	setTimeout(function(){
		$("#"+name).removeClass("pressed");
	},100);
}
$(".btn").click(function(){
	var chosen_colour = $(this).attr("id");
	user_pattern.push(chosen_colour);
	playSound(chosen_colour);
	var len = user_pattern.length;
	animatePress(chosen_colour);
	console.log("This is user Pattern");
	console.log(user_pattern);
	if(user_pattern.length==game_pattern.length)
	{
		seq_check();
	}

});

function nextSequence()
{ 
	var rand;
	rand = Math.floor((Math.random()*4));
	var rand_colour = colours[rand];
	game_pattern.push(rand_colour);
	playSound(rand_colour);
	level++;
	$("#"+rand_colour).fadeIn(100).fadeOut(100).fadeIn(100);
	$(".heading").text("Level "+level);
	
}

