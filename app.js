/**
 * Constans
 */
const EMPTY_CELL = 0;
const FOOD = 1;
const OUR_PACMAN = 2;
const MONSTER = 3;
const WALL = 4;
const MONSTER_AND_FOOD = 5; // roman
const MOVE_UP = 2; // roman
const MOVE_DOWN = 1; // roman
const MOVE_LEFT = 3; // roman
const MOVE_RIGHT = 4; // roman
const MONSTER_AND_5_FOOD = 11;// roman	
const MONSTER_AND_15_FOOD = 12; // roman
const MONSTER_AND_25_FOOD = 13; // roman
const STAY_IN_PLACE = 0; // roman


var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var moveMonster = 0; //roman
var lives;
var monster_alive; // roman
var drawWayOfPacman = 1;//roman
var monster_arr;
var PlayerName = "p";
var placesForMonster = [0, 0, 0, 9, 9, 0, 9, 9]; // roman


var up_key = 'ArrowUp';
var down_key = 'ArrowDown';
var left_key = 'ArrowLeft';
var right_key = 'ArrowRight';
var pill_5Color = '#00cc00'; // green
var pill_15Color = '#ff3300'; // red
var pill_25Color = '#0000ff'; // blue

var pill_number = 50;
var time_seconds = 60;
var monster_number = 1;


/**
 * on click (save settings) move to Game
 */
function moveToGame() {
	saveSettings();
	$("div").hide();

	$("#header").show();
	$("#header-left").show();
	$("#header-center").show();
	$("#header-right").show();

	$("#sidenav").show();

	$("#score").show();
	$("#time").show();
	$("#game").show();

	context = canvas.getContext("2d");
	play();
	Start();

};

function restart() {
	$("div").hide();

	$("#header").show();
	$("#header-left").show();
	$("#header-center").show();
	$("#header-right").show();
	$("#sidenav").show();
	$("#settings_page").show();
	$("#random_settings").show();
	$("#save_settings").show();

	$("#musicForGame").get(0).pause();
};





function play() {
	var audio = $("#musicForGame").get(0);
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
		audio.currentTime = 0;
		audio.play();
	}
}



function Start() {

	//board is 10 X 10 = 100 cells
	board = new Array();
	score = 0;
	lives = 3;
	pac_color = "yellow";
	// cnt make the number double
	var cnt = 100;
	var food_remain = pill_number;
	//only for first draw of pacman - number of pacmans we want to draw -> always 1
	var pacman_remain = 1;
	start_time = new Date();

	monster_alive = monster_number; // roman
	monster_arr = new Array(monster_alive); // roman

	for (var i = 0; i < 10; i++) {
		//new array at board[i]
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				
				(i == 3 && j == 3) ||
				(i == 4 && j == 3) ||
				(i == 5 && j == 3) ||

				 (i == 2 && j == 5) ||
				 (i == 2 && j == 6) ||
				 (i == 2 && j == 7) ||

				(i == 6 && j == 5) ||
				(i == 7 && j == 5) ||
				(i == 8 && j == 5) 


				
			) {
				board[i][j] = WALL;
			} else if ((i == 0 && j == 0 && monster_number > 0) ||
				(i == 9 && j == 0 && monster_number > 0) ||
				(i == 0 && j == 9 && monster_number > 0) ||
				(i == 9 && j == 9 && monster_number > 0)) {
				board[i][j] = MONSTER;
				monster_arr[monster_alive - monster_number] = new Object;
				monster_arr[monster_alive - monster_number].i = i;
				monster_arr[monster_alive - monster_number].j = j;
				monster_number--;
			}
			else {
				var pill_5_number = Math.floor(pill_number * 0.6);
				var pill_15_number = Math.floor(pill_number * 0.3);
				var pill_25_number = Math.floor(pill_number * 0.1);
				//put food on board randomly
				var randomNum = Math.random();
				if (randomNum <= 1.0 * food_remain / cnt) {
					if (randomNum < 1.0 * pill_25_number / food_remain) {
						pill_25_number--;
						board[i][j] = 125;
					}

					else if (randomNum < 1.0 * pill_15_number / food_remain) {
						pill_15_number--;
						board[i][j] = 115;
					}
					else if (randomNum < 1.0 * pill_5_number / food_remain) {
						pill_5_number--;
						board[i][j] = 105;
					}
					food_remain--;
					// if the pacman is not in board find a place for him
				} else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
					//save where is pacman
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					// we draw first time the pacman
					board[i][j] = OUR_PACMAN;
				} else {
					board[i][j] = EMPTY_CELL;
				}
				//not important -> for finishing the run
				cnt--;
			}
		}
	}
	// if we got more food to put on board
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 105;
		food_remain--;
	}
	keysDown = {};
	// if some button was pressed
	// i want to get the key-code of the button
	// save the last button that user clikced on him
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.key] = true;
		},
		false
	);
	// if some button was relesed
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.key] = false;
		},
		false
	);
	//set interval -> evry 0.25 sec -> update position
	interval = setInterval(UpdatePosition, 250);
}

/**
 * find empty cell on board
 * @param {*} board = all the board
 */
function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != EMPTY_CELL) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}
// roman
function GetKeyPressed() {
	if (keysDown[up_key]) {//U
		return MOVE_UP;
	}
	if (keysDown[down_key]) {//D
		return MOVE_DOWN;
	}

	if (keysDown[left_key]) {//L
		return MOVE_LEFT;
	}
	if (keysDown[right_key]) {//R
		return MOVE_RIGHT;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score; // set score from HTML
	lblTime.value = time_elapsed; //set time from HTML
	lblLives.value = lives;
	lblName.value = PlayerName;

	lbTime.value = time_seconds;
	lbFood.value = pill_number;

	lb5.value = pill_5Color;
	lb15.value = pill_15Color;
	lb25.value = pill_25Color;



	// draw all board
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			// from where we want to start draw
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			//draw pacman
			let wayOfPacman = GetKeyPressed();
			if (board[i][j] == OUR_PACMAN) {
				drawPacmanByKeyPressed(wayOfPacman, center); //roman
			}
			//drae food
			else if (board[i][j] === 105) {
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = pill_5Color; //color
				context.fill();
			}
			else if (board[i][j] === 115) {
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
				context.fillStyle = pill_15Color; //color

				context.fill();
			}
			else if (board[i][j] === 125) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = pill_25Color; //color

				context.fill();
			}

			// else if (board[i][j] == FOOD) {
			// 	//draw food
			// 	context.beginPath();
			// 	context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
			// 	context.fillStyle = "blue"; //color
			// 	context.fill();
			// }
			else if (board[i][j] == WALL && i>=j) {
				//draw wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 30); // fill all the cell 60X60 px
				context.fillStyle = "grey"; //color
				context.fill();


				
			}else if (board[i][j] == WALL && i<j) {
					//draw wall
					context.beginPath();
					context.rect(center.x - 30, center.y - 30, 30, 60); // fill all the cell 60X60 px
					context.fillStyle = "grey"; //color
					context.fill();

			} else if (board[i][j] == MONSTER
				|| board[i][j] == MONSTER_AND_5_FOOD
				|| board[i][j] == MONSTER_AND_15_FOOD
				|| board[i][j] == MONSTER_AND_25_FOOD) // roman
			{
				//draw monster
				//roman
				drawMonster(center.x - 30, center.y - 30, 30, 30);
			}

		}
	}
}

// roman
function UpdatePosition() {
	// clear the sell - there was pacman
	board[shape.i][shape.j] = EMPTY_CELL;
	//roman
	//back to normal for monster (empty / food)
	// Get`s the key pressed
	var x = GetKeyPressed();
	if (x == MOVE_UP) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == MOVE_DOWN) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == MOVE_LEFT) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == MOVE_RIGHT) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	//now i and j where pacman moves!
	//draw the pacman!
	//roman
	moveMonster++;
	if (moveMonster % 3 == 0) {
		for (let k = 0; k < monster_arr.length; k++) {
			if (board[monster_arr[k].i][monster_arr[k].j] == MONSTER_AND_5_FOOD) {
				board[monster_arr[k].i][monster_arr[k].j] = 105;
			}
			else if (board[monster_arr[k].i][monster_arr[k].j] == MONSTER_AND_15_FOOD) {
				board[monster_arr[k].i][monster_arr[k].j] = 115;
			}
			else if (board[monster_arr[k].i][monster_arr[k].j] == MONSTER_AND_25_FOOD) {
				board[monster_arr[k].i][monster_arr[k].j] = 125;
			}
			else {
				board[monster_arr[k].i][monster_arr[k].j] = EMPTY_CELL;
			}
		}
		moveMonster = 0;
		UpdatePositionMonster();
	}
	if (board[shape.i][shape.j] === 105) {
		score += 5;
	}
	if (board[shape.i][shape.j] === 115) {
		score += 15;
	}
	if (board[shape.i][shape.j] === 125) {
		score += 25;
	}

	lbArrowUp.value = up_key;
	lbArrowDown.value = down_key;
	lbArrowRight.value = right_key;
	lbArrowLeft.value = left_key;
	lbMonsters.value = monster_number;

	// before we put our PACMAN we check if there is a monster
	//if there is monster
	//life --
	//score -X
	//reset
	if ( checkIfMonsterEatsPacman() )
	{
		//restart
		// random pacman
		// monster in the 0,0 0,9 9,0 9,9
		// life --
		restartPositionInLose();
		moveMonster = 0;
	}
	else
	{
		// continue the game
		board[shape.i][shape.j] = OUR_PACMAN;
	}

	var currentTime = new Date();
	time_elapsed = time_seconds - (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	/**
	 * Game End
	 */
	if (score >= 150) {
	lblTime.value = time_elapsed; //set time from HTML
	lblLives.value = lives;
	lblScore.value = score; // set score from HTML
		//stop the interval
		window.clearInterval(interval);
		window.alert("Winner!");
		moveToGame();
	}else if (time_elapsed==0 || lives==0) {
		lblTime.value = time_elapsed; //set time from HTML
		lblLives.value = lives;
		lblScore.value = score; // set score from HTML
		//stop the interval
		window.clearInterval(interval);
		window.alert("Looser!");
		moveToGame();
	}
	 else {
		//draw the updated board
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
		up_key: 'ArrowUp',
		down_key: 'ArrowDown',
		left_key: 'ArrowLeft',
		right_key: 'ArrowRight',

		pill_5Points: getRandomColor(),
		pill_15Points: getRandomColor(),
		pill_25Points: getRandomColor(),

		pill_number: 50 + Math.floor(Math.random() * 41), // return a number between 50-90
		time_seconds: 60 + Math.floor(Math.random() * 120),
		monster_number: 1 + Math.floor(Math.random() * 4), // return a number between 1-4
		tick: 0,
		lives: 3,
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

document.addEventListener('keydown', function (event) {


	if (currentDirection != null) {
		let keyValue = event.key;
		if (keyValue !== 'p' && keyValue !== ' ' && keyValue !== 'Enter') {

			document.getElementById("settings_" + currentDirection + "Key").innerHTML = keyValue;
			document.getElementById("settings_" + currentDirection + "Key").style.background = '#ffff00';
		}


	}

	currentDirection = null;
});


function getGameControl(event, id) {
	var x = event.which || event.keyCode;
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





function setCurDirection(direction) {
	document.getElementById("settings_rightKey").style.background = 'yellow';
	document.getElementById("settings_leftKey").style.background = 'yellow';
	document.getElementById("settings_upKey").style.background = 'yellow';
	document.getElementById("settings_downKey").style.background = 'yellow';
	document.getElementById("settings_" + direction + "Key").style.background = '#33ccff';
	//currentDirection = direction;
}






function saveSettings() {

	// if ($("#up_value").html() === '-1' || $("#down_value").html() === '-1' ||
	//     $("#right_value").html() === '-1' || $("#left_value").html() === '-1'){
	//     alert("Minus 1 is not a valid key");
	//     return;
	// }

	// up_key = $("#up_value").html();
	// down_key = $("#down_value").html();
	// left_key = $("#left_value").html();
	// right_key = $("#right_value").html();

	// 	if ($("#up_value").html() === '-1' || $("#down_value").html() === '-1' ||
	// 	$("#right_value").html() === '-1' || $("#left_value").html() === '-1'){
	// 	alert("Minus 1 is not a valid key");
	// 	return ;
	// }

	up_key = $("#up_value").html();
	down_key = $("#down_value").html();
	left_key = $("#left_value").html();
	right_key = $("#right_value").html();


	// if ($("#settings_numOfBalls").val() === '' || $("#settings_timeToPlay").val() === '' || $("#settings_numOfMonsters").val() === ''){
	//     showPopup("Please fill all the fields");
	//     return ;
	// }


	pill_number = $("#settings_numOfBalls").val();
	time_seconds = $("#settings_timeToPlay").val();
	monster_number = $("#settings_numOfMonsters").val();

	pill_5Color = $("#settings_5Points").val();
	pill_15Color = $("#settings_15Points").val();
	pill_25Color = $("#settings_25Points").val();

}


//roman
function drawMonster(center_x, center_y, width_m, height_m) {
	let imageObj = new Image();
	let monster_path = 'Photos/pacman-ghosts/pacman-ghost4.png';
	imageObj.src = monster_path;
	context.drawImage(imageObj, center_x, center_y, width_m, height_m);
}

//roman
/**
 * return the value to where to move
 * our pacman click on moster before monster moves!
 * so monster canot move to wall or to "eat" pacman
 * @param {*} monster_x place of monster
 * @param {*} monster_y place of monster
 * @param {*} pacman_x place of pacman
 * @param {*} pacman_y place of pacman
 */
function whereToMoveMonster(pacman_x, pacman_y, monster_x, monster_y) {
	let abs_x = Math.abs(monster_x - pacman_x);
	let abs_y = Math.abs(monster_y - pacman_y);
	if (abs_x > abs_y) {
		if (monster_x > pacman_x) {
			if ( checkIfPossibleMove(monster_x - 1, monster_y) )
			{
				return MOVE_LEFT;
			}
		}
		else {
			if ( checkIfPossibleMove(monster_x + 1, monster_y) ) {
				return MOVE_RIGHT;
			}
		}
	}
	else {
		if (monster_y > pacman_y) {
			if ( checkIfPossibleMove(monster_x, monster_y - 1) ) {
				return MOVE_UP;
			}
		}
		else {
			if ( checkIfPossibleMove(monster_x, monster_y + 1) ) {
				return MOVE_DOWN;
			}
		}
	}
	return findPlaceToMoveMonster(monster_x, monster_y);
}

function moveOneMonster(monster_x) {
	let monster_move = whereToMoveMonster(shape.i, shape.j, monster_x.i, monster_x.j);
	let checkForFood = false;
	if (monster_move == MOVE_UP) {
		checkForFood = checkIfThereIsFood(monster_x.i, monster_x.j - 1);
		monster_x.j--;
	}
	else if (monster_move == MOVE_DOWN) {
		checkForFood = checkIfThereIsFood(monster_x.i, monster_x.j + 1);
		monster_x.j++;
	}
	else if (monster_move == MOVE_RIGHT) {
		checkForFood = checkIfThereIsFood(monster_x.i + 1, monster_x.j);
		monster_x.i++;
	}
	else if (monster_move == MOVE_LEFT) {
		checkForFood = checkIfThereIsFood(monster_x.i - 1, monster_x.j);
		monster_x.i--;
	}
	drawMonsterOnBoard(monster_x, checkForFood);
}

function drawMonsterOnBoard(monster_x, kindOfCellBefore) {
	board[monster_x.i][monster_x.j] = kindOfCellBefore;
}

function UpdatePositionMonster() {
	for (let i = 0; i < monster_alive; i++) {
		moveOneMonster(monster_arr[i]);
	}
}

function checkIfThereIsAWall(x, y) {
	if (board[x][y] == WALL) {
		return true;
	}
	else {
		return false;
	}
}

// function moveRandomly(exept) {
// 	let chosenMove = exept;
// 	while (chosenMove == exept) {
// 		chosenMove = (Math.floor(Math.random() * 4) + 1);
// 	}
// 	return chosenMove;
// }
// function moveRandomly_2Params(exept1, exept2) {
// 	avalibleMoves = new Array();
// 	allMoves = [MOVE_DOWN, MOVE_UP, MOVE_LEFT, MOVE_RIGHT];
// 	for (let i = 0; i < allMoves.length; i++) {
// 		if (allMoves[i] != (exept1 - 1) && allMoves[i] != (exept2 - 1)) {
// 			avalibleMoves.push(allMoves[i]);
// 		}
// 	}
// 	return avalibleMoves;
// }

function drawPacmanByKeyPressed(way, center) {
	//first 4 = DOWN
	//secound 4 = UP
	// third 4 = LEFT
	// fourth 4 = RIGHT
	var valuesForDraw = [0.65, 2.35, 15, -5, 1.65, 3.35, -15, -5, 1.15, 2.85, -5, -15, 0.15, 1.85, 5, -15];
	if (way != null) {
		drawWayOfPacman = way;
	}
	let beginFrom = (drawWayOfPacman - 1) * 4;
	context.beginPath();
	context.arc(center.x, center.y, 20 /* yellow radiuos */, (valuesForDraw[beginFrom]) * Math.PI, (valuesForDraw[beginFrom + 1]) * Math.PI); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	context.arc(center.x + (valuesForDraw[beginFrom + 2]), center.y + (valuesForDraw[beginFrom + 3]), 3, 0, 2 * Math.PI); // circle
	context.fillStyle = "black"; //color of eye
	context.fill();
}


function checkIfThereIsFood(x, y) {
	if (board[x][y] == 105) {
		return 11;
	}
	else if (board[x][y] == 115) {
		return 12;
	}
	else if (board[x][y] == 125) {
		return 13;
	}
	else {
		return MONSTER;
	}
}

function checkIfThereIsMonster(x, y) {
	if (board[x][y] == 11 ||
		board[x][y] == 12 ||
		board[x][y] == 13 ||
		board[x][y] == MONSTER) {
		return true;
	}
	else {
		return false;
	}
}

function checkIfPossibleMove(x, y) {
	if( checkIfThereIsMonster(x, y)
	 || checkIfThereIsAWall (x, y)
	 || (x < 0)
	 || (x > 9)
	 || (y < 0)
	 || (y > 9))
	{
		return false;
	}
	else
	{
		return true;
	}
}

function findPlaceToMoveMonster(x , y)
{
	if(checkIfPossibleMove(x + 1, y))
	{
		return MOVE_RIGHT;
	}
	else if(checkIfPossibleMove(x - 1, y))
	{
		return MOVE_LEFT;
	}
	else if(checkIfPossibleMove(x, y + 1))
	{
		return MOVE_DOWN;
	}
	else if(checkIfPossibleMove(x, y - 1))
	{
		return MOVE_UP;
	}
	else
	{
		return STAY_IN_PLACE;
	}
}

function checkIfMonsterEatsPacman()
{
	for( let i = 0; i < monster_arr.length; i++)
	{
		if(monster_arr[i].i == shape.i && monster_arr[i].j == shape.j)
		{
			return true;
		}
	}
	return false;
}

function restartPositionInLose()
{
	// only monster moves to there places and new place for pacman
	for( let i = 0; i < monster_arr.length; i++)
	{
		// x and y the start place of monster
		let x = placesForMonster[(i * 2)];
		let y = placesForMonster[(i * 2) + 1];
		monster_arr[i].i = x;
		monster_arr[i].j = y;
		board[x][y] = MONSTER;
	}
	clearBoardWhenRestart();
	let emptyCellForPacMan = findRandomEmptyCell(board);
	shape.i = emptyCellForPacMan[0];
	shape.j = emptyCellForPacMan[1];
	board[emptyCellForPacMan[0]][emptyCellForPacMan[1]] = OUR_PACMAN;
	score -= 10;
	lives--;
}

// function findWhatWasBeforeMonster(x, y)
// {
// 	if(board[x][y] == MONSTER_AND_5_FOOD)
// 	{
// 		return 105;
// 	}
// 	else if(board[x][y] == MONSTER_AND_15_FOOD)
// 	{
// 		return 115;
// 	}
// 	else if(board[x][y] == MONSTER_AND_25_FOOD)
// 	{
// 		return 125;
// 	}
// 	else
// 	{
// 		return EMPTY_CELL;
// 	}
// }

function clearBoardWhenRestart()
{
	for(let i = 0; i < board.length; i++)
	{
		for(let j = 0; j< board[0].length; j++)
		{
			if((i == 0 && j == 0)
			|| (i == 9 && j == 0)
			|| (i == 0 && j == 9)
			|| (i == 9 && j == 9))
			{
				continue;
			}
			else if(board[i][j] == MONSTER)
			{
				board[i][j] = EMPTY_CELL;
			}
			else if(board[i][j] == MONSTER_AND_5_FOOD)
			{
				board[i][j] = 105;
			}
			else if(board[i][j] == MONSTER_AND_15_FOOD)
			{
				board[i][j] = 115;
			}
			else if(board[i][j] == MONSTER_AND_25_FOOD)
			{
				board[i][j] = 125;
			}
		}
	}
}