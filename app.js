var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var lives;

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});


 // game settings
var up_key;
var down_key;
var left_key;
var right_key;

var pill_number;
var time_seconds;
var monster_number;

var pill_5Color;
var pill_15Color;
var pill_25Color;

//var num_balls;


function Start() {

	//
	// need to add variable here
	///
	//add Audio
    audio = new Audio('Pac-manMusic.mp3');
    audio.loop = true;
    audio.play();

	board = new Array();
	score = 0;
	lives = 3;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = pill_number;
	var pacman_remain = 1;

	
	/////////////////////
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			//draw pacman
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				//draw food
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "blue"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				//draw wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	// Get`s the key pressed
	var x = GetKeyPressed();
	//left
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	//right
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	//down
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	//up
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	//if there is food, score + 1
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	/**
	 * Game End
	 */
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}




//-------------------------------- settings-------------------------------------------------///

// controls array
var controls = [];
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



function settings_randomValues() {


    var randomValues = {
        up_key : 'ArrowUp',
        down_key : 'ArrowDown',
        left_key : 'ArrowLeft',
        right_key : 'ArrowRight',

       pill_5Points:  getRandomColor(),
       pill_15Points: getRandomColor(),
       pill_25Points: getRandomColor(),
    
        pill_number : 50 + Math.floor(Math.random() * 41), // return a number between 50-90
        time_seconds : 60 + Math.floor(Math.random() * 120),
        monster_number : 1 + Math.floor(Math.random() * 3), // return a number between 1-3
        tick : 0,
        lives : 3,
    }

    

    // up_key = rand["up_key"];
    $("#up_value").html(randomValues["up_key"]);
    $("#left_value").html(randomValues["left_key"]);
    $("#down_value").html(randomValues["down_key"]);
    $("#right_value").html(randomValues["right_key"]);


    $("#settings_numOfBalls").val(randomValues["pill_number"]);
    $("#settings_timeToPlay").val(randomValues["time_seconds"]);
    $("#settings_numOfMonsters").val(randomValues["monster_number"]);


    $("#settings_5Points").val(randomValues["pill_5Points"]);
    $("#settings_15Points").val(randomValues["pill_15Points"]);
    $("#settings_25Points").val(randomValues["pill_25Points"]);



}


var currentDirection = null;

document.addEventListener('keydown', function(event){


    if ( currentDirection != null){
        let keyValue = event.key;
        if(keyValue !== 'p' && keyValue !== ' ' && keyValue !== 'Enter'){

            //document.getElementById("settings_" + currentDirection + "Key").innerHTML = keyValue;
            document.getElementById("settings_" + currentDirection + "Key").style.background='#ffff00';
        }


    }

    currentDirection = null;
} );


function getGameControl(event, id) {
    if (id === "up") {
        document.getElementById("up_value").innerHTML = event.key;
        
    }
    else if (id === "down") {
        document.getElementById("down_value").innerHTML = event.key;
       
    }
    else if (id === "right") {
        document.getElementById("right_value").innerHTML = event.key;
        
    }
    else if (id === "left") {
        document.getElementById("left_value").innerHTML = event.key;
        
    }
  }





function setCurDirection( direction){
    document.getElementById("settings_rightKey").style.background='yellow';
    document.getElementById("settings_leftKey").style.background='yellow';
    document.getElementById("settings_upKey").style.background='yellow';
    document.getElementById("settings_downKey").style.background='yellow';
    document.getElementById("settings_" + direction + "Key").style.background='#33ccff';
    //currentDirection = direction;
}






function saveSettings() {

    if ($("#up_value").html() === '-1' || $("#down_value").html() === '-1' ||
        $("#right_value").html() === '-1' || $("#left_value").html() === '-1'){
        alert("Minus 1 is not a valid key");
        return;
    }

    up_key = $("#up_value").html();
    down_key = $("#down_value").html();
    left_key = $("#left_value").html();
    right_key = $("#right_value").html();


    if ($("#settings_numOfBalls").val() === '' || $("#settings_timeToPlay").val() === '' || $("#settings_numOfMonsters").val() === ''){
        showPopup("Please fill all the fields");
        return;
    }


    pill_number = $("#settings_numOfBalls").val();
    time_seconds = $("#settings_timeToPlay").val();
    monster_number = $("#settings_numOfMonsters").val();

    pill_5Color = $("#settings_5Points").val();
    pill_15Color = $("#settings_15Points").val();
	pill_25Color = $("#settings_25Points").val();
	
	Start();



}