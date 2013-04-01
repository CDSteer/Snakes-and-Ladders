var turn = "p1";
var turnCount = 0;
var p1Square = 0;
var p2Square = 0;

function reloadPage() {
	window.location.reload()
}

function diceRoll() {
	var roll = randomNum(1,6);
	$("p").remove(".diceText");
	$(".dice").append("<p>Roll: " + roll + "Turn: " + turn + " Turn Count: " + turnCount + " squs: " + p1Square+"/"+p2Square+"</p>");
	if(turn == "p1") {
		p1Square = move(roll, p1Square);
		turn = "p2";
	} else if (turn == "p2") {
		p2Square = move(roll, p2Square);
		turn = "p1";
	}
	turnCount++;
	win(p1Square, p2Square);
}


function move(roll, square) {
	$('#'+square).removeClass(turn);
	square = square + roll;
	//if (turnCount > 0){
		//p1Square = collison();
	//}
	$('#'+square).addClass(turn);
	if (square == 27){
		$('#'+square).removeClass(turn);
		//p1Square = collison();
		$('#4').addClass(turn);
		square = 4;
	}
	if (square == 31){
		$('#'+square).removeClass(turn);
		//p1Square = collison();
		$('#39').addClass(turn);
		square = 39;
	}
	return square;

}

function collison() {
	if (p1Square == p2Square){
		if (turn == "p1"){
			p1Square--;
		} else if (turn == "p2"){
			p2Square--;
		}
	}
}

function win(p1Square, p2Square) {
	if (p1Square >= 40){
		$('#'+p1Square).removeClass('p1');
		$('#40').addClass('p1');
		alert("Player 1 has won!");
		window.location.reload()
	} else if (p2Square >= 40){
		$('#'+p2Square).removeClass('p2');
		$('#40').addClass('p2');
		alert("Player 2 has won!");
		window.location.reload()
	}
}

function randomNum(from,to) {
    return Math.floor(Math.random()*(to-from+1)+from);
}

/*
function setSnakes() {
	snakeSquare1 = randomNum(2,31);
	$('#'+snakeSquare1).addClass('snake1');
	snakeSquare2 = randomNum(1, (snakeSquare1-1));
	$('#'+snakeSquare2).addClass('snake2');
}
function setLadder() {
	ladderSquare1 = randomNum(2,29);
	$('#'+ladderSquare1).addClass('ladder1');
	ladderSquare2 = randomNum((square1, 30);
	$('#'+ladderSquare2).addClass('ladder2');
}
*/
