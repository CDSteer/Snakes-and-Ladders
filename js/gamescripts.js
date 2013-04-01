var turnCount = 0;
function player(icon, square, turn) {
	this.icon = icon;
	this.square = square;
	this.turn = turn;
	
	this.setSquare = setSquare;
	function setSquare(newSquare){
		this.square = newSquare;
	}
	this.setTurn = setTurn;
	function setTurn(newTurn){
		this.turn = newTurn;
	}
}

var p1 = new player("p1", 0, true);
var p2 = new player("p2", 0, false);

function changTurn() {
	if(p1.turn == true) {
		p1.setTurn(false);
		p2.setTurn(true);
		$('.p1Box').removeClass('currentturn');
		$('.p2Box').addClass('currentturn');
	} else if (p2.turn == true) {
		p1.setTurn(true);
		p2.setTurn(false);
		$('.p1Box').addClass('currentturn');
		$('.p2Box').removeClass('currentturn');
	}
}

function diceRoll() {
	var roll = randomNum(1,6);
	$("p").remove(".diceText");
	$(".dice").append("<p>Roll: " + roll + " " + p1.turn + p1.square + "/" + p2.turn + p2.square + "</p>");
	if(p1.turn == true) {
		var p1Move = move(p1.icon, roll, p1.square);
		p1.setSquare(p1Move);
	} else if (p2.turn == true){
		var p2Move = move(p2.icon, roll, p2.square);
		p2.setSquare(p2Move);
	}
	changTurn();
	turnCount++;
	win(p1.square, p2.square);
}


function move(player, roll, square) {
	$('#'+square).removeClass(player);
	square = square + roll;
	if (turnCount > 0){
		square = collision(square);
	}
	$('#'+square).addClass(player);
	square = spcSquare(player, square, 27, 4);
	square = spcSquare(player, square, 31, 39);
	return square;

}

function collision(square) {
	//alert(p1.square, p2.square);
	if (p1.square == p2.square){
		square--;
	}
	return square;
}

function spcSquare(player, square, type1, type2) {
	if (square == type1){
		$('#'+square).removeClass(player);
		square = collision(square);
		$('#'+type2).addClass(player);
		square = type2;
		return square;
	} else {
		return square;
	}
}

function win(p1Square, p2Square) {
	if (p1Square >= 40){
		$('#'+p1Square).removeClass('p1');
		$('#40').addClass('p1');
		alert("Player 1 has won!");
		reloadPage();
	} else if (p2Square >= 40){
		$('#'+p2Square).removeClass('p2');
		$('#40').addClass('p2');
		alert("Player 2 has won!");
		reloadPage();
	}
}

function randomNum(from,to) {
    return Math.floor(Math.random()*(to-from+1)+from);
}

function reloadPage() {
	window.location.reload()
}
