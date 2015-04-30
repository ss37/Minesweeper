var numbers = new Array();
var mines = new Array();
generateRandomMine();
initialiseArray();
checkSurroundingMine();

function generateRandomMine(){
	for(var i=0; i<5; i++){
		var index = Math.floor((Math.random() * 25) + 1);
		mines.push("t"+index);
		if(numbers[index] == "*"){
			i--;
			continue;
		}
		else{
			numbers[index] = "*";
		}
	}
	mines.sort();
}
function initialiseArray(){
	for(var i=0; i<=25; i++)
		if(numbers[i]!="*")
			numbers[i] = 0;
}
function checkSurroundingMine(){
	for(var i=1; i<=25; i++){
		if(numbers[i] == "*")
			continue;
		else{
			checkBottomRow(i);
			checkSameRow(i);
			checkTopRow(i);
		}
	}
	numbers.shift();
}
function checkBottomRow(i){
	//check the bottom row only if it is not the bottom-most row
	if(i<21){
		//check the bottom-left except if it is already in the left-most
		if((i-1)%5!=0)
			if(numbers[i+4] == "*")
				numbers[i]++;
		//check the bottom-right except if it is already in the right-most
		if(i%5!=0)
			if(numbers[i+6] == "*")
				numbers[i]++;
		//check the bottom-middle
		if(numbers[i+5] == "*")
				numbers[i]++;
	}
}
function checkSameRow(i){
	//check left except if it is already in the left-most
	if((i-1)%5!=0)
		if(numbers[i-1] == "*")
			numbers[i]++;
	//check right except if it is already in the right-most
	if(i%5!=0)
		if(numbers[i+1] == "*")
			numbers[i]++;
}
function checkTopRow(i){
	//check top row only if it is not the top-most row
	if(i>5){
		//check top-left except if it is already in the left-most
		if((i-1)%5!=0)
			if(numbers[i-6] == "*")
				numbers[i]++;
		//check top-right except if it is already in the right-most
		if(i%5!=0)
			if(numbers[i-4] == "*")
				numbers[i]++;
		//check top-middle
		if(numbers[i-5] == "*")
			numbers[i]++;
	}
}

var count = 5; // for 5 mines
var count2 = 0;
var timeInSeconds = 0;
var flagTime = false;
var winFlag = null;

/**
 * 
 */
function checkMine(id, event) {
	if (!flagTime) {
		flagTime = true;
		timerFunction();
	}
	var element = document.getElementById(id);
	if (event.button == 2) {
		if (document.getElementById("f"+id).getAttribute("class") == "hidden") {
			if (count > 0) {
				document.getElementById("f"+id).setAttribute("class","visible");
				count--;
			}
		} else {
			document.getElementById("f"+id).setAttribute("class","hidden");
			count++;
		}

	} else if (event.button == 0) {
		if (document.getElementById("f"+id).getAttribute("class") == "hidden") {
			var check = mines.indexOf(element.id);
			if ((mines.indexOf(element.id)) > -1) {
				flagTime = false;
				for (var i = 1; i <= 25; i++) {
					//for wrong mines marked
					if (document.getElementById("ft" + i).getAttribute("class") == "visible"
								&& numbers[i - 1] != "*") {
							document.getElementById("ft" + i).setAttribute("class","hidden");
							document.getElementById("t" + i).innerHTML = "<svg height=\"29\" width=\"29\">"+
							"<circle cx=\"14\" cy=\"14\" r=\"7\" stroke=\"black\" stroke-width=\"1\" fill=\"black\" />"+
							"<line x1=\"7\" y1=\"7\" x2=\"21\" y2=\"21\" stroke=\"black\" stroke-width=\"1\" />"+
							"<line x1=\"21\" y1=\"7\" x2=\"7\" y2=\"21\" stroke=\"black\" stroke-width=\"1\" />"+
							"<line x1=\"14\" y1=\"5\" x2=\"14\" y2=\"23\" stroke=\"black\" stroke-width=\"1\" />"+
							"<line x1=\"5\" y1=\"14\" x2=\"23\" y2=\"14\" stroke=\"black\" stroke-width=\"1\" />"+
							"<line x1=\"5\" y1=\"5\" x2=\"23\" y2=\"23\" stroke=\"red\" stroke-width=\"3\" />"+
							"<line x1=\"23\" y1=\"5\" x2=\"5\" y2=\"23\" stroke=\"red\" stroke-width=\"3\" /></svg>";
							document.getElementById("t" + i).setAttribute("style", "background-color: #A0A0A0;");
						}
					//for mines not marked
					else if ((mines.indexOf("t" + i)) > -1 && document.getElementById("ft" + i).getAttribute("class") == "hidden") {
						document.getElementById("t" + i).innerHTML = "<svg height=\"29\" width=\"29\">"+
						"<circle cx=\"14\" cy=\"14\" r=\"7\" stroke=\"black\" stroke-width=\"1\" fill=\"black\" />"+
						"<line x1=\"7\" y1=\"7\" x2=\"21\" y2=\"21\" stroke=\"black\" stroke-width=\"1\" />"+
						"<line x1=\"21\" y1=\"7\" x2=\"7\" y2=\"21\" stroke=\"black\" stroke-width=\"1\" />"+
						"<line x1=\"14\" y1=\"5\" x2=\"14\" y2=\"23\" stroke=\"black\" stroke-width=\"1\" />"+
						"<line x1=\"5\" y1=\"14\" x2=\"23\" y2=\"14\" stroke=\"black\" stroke-width=\"1\" /></svg>";
						document.getElementById("t" + i).setAttribute("style","background-color: #A0A0A0;");
					}
					// else no change in numbers or mine flags that are correct
				}
				element.setAttribute("style", "background-color: red;"); // red
				winFlag = false;
				changeSmiley();
				alert("You have hit a mine! Game Over!");
				disableTableElements();
			} else {
				element
						.appendChild(document
								.createTextNode(numbers[parseInt(element.id
										.substr(1)) - 1]));
				switch (numbers[parseInt(element.id.substr(1)) - 1]) { 
				case "0":
					element.setAttribute("class","zero");
					break;
				case "1":
					element.setAttribute("class", "one");
					break;
				case "2":
					element.setAttribute("class", "two");
					break;
				}
				element.setAttribute("style", "background-color: #A0A0A0;");
				count2++;
			}
			// disable mouseclick events
			element.setAttribute("onmousedown", "changeSmiley();");
			// check if you won
			if (count2 == 20) {
				flagTime = false;
				for (var i = 0; i < 5; i++) {
					document.getElementById("f"+mines[i]).setAttribute("class","visible");
				}
				count = 0;
				winFlag = true;
				changeSmiley();
				displayBestTime(timeInSeconds);
				alert("You Won!");
				disableTableElements();
			}
		}
	}
	document.getElementById("count").innerHTML = count;
}

function timerFunction() {
	setInterval(function() {
		if (flagTime && timeInSeconds < 999) {
			document.getElementById("timer").innerHTML = (++timeInSeconds);
		}
	}, 1000);
}

function changeSmiley() {
	if (event.button == 0) {
		var svg1 = document.getElementById("svg1");
		var circle2 = svg1.getElementById("circle2");
		var circle3 = svg1.getElementById("circle3");
		if (winFlag == false) {
			document.getElementById("path1").setAttribute("class","hidden");
			document.getElementById("circle2").setAttribute("class","hidden");
			document.getElementById("circle3").setAttribute("class","hidden");
			document.getElementById("circle4").setAttribute("class","hidden");
			document.getElementById("line1").setAttribute("class","visible");
			document.getElementById("line2").setAttribute("class","visible");
			document.getElementById("line3").setAttribute("class","visible");
			document.getElementById("line4").setAttribute("class","visible");
			document.getElementById("path2").setAttribute("class","visible");
		} else if (winFlag == true) {
			circle2.setAttribute("r", "4");
			circle3.setAttribute("r", "4");
			document.getElementById("path1").setAttribute("class","visible");
			document.getElementById("circle4").setAttribute("class","hidden");
			document.getElementById("line1").setAttribute("class","hidden");
			document.getElementById("line2").setAttribute("class","hidden");
			document.getElementById("line3").setAttribute("class","hidden");
			document.getElementById("line4").setAttribute("class","hidden");
			document.getElementById("path2").setAttribute("class","hidden");
		} else if (winFlag == null) {
			if (document.getElementById("path1").getAttribute("class") == "visible") {
				// remove smile
				document.getElementById("path1").setAttribute("class","hidden");
				// add surprise
				document.getElementById("circle4").setAttribute("class","visible");
				// make eyes bigger
				circle2.setAttribute("r", "2");
				circle3.setAttribute("r", "2");
			} else if (document.getElementById("circle4").getAttribute("class") == "visible") {
				// remove surprise
				document.getElementById("circle4").setAttribute("class","hidden");
				// add smile
				document.getElementById("path1").setAttribute("class","visible");
				//eyes become normal
				circle2.setAttribute("r", "1");
				circle3.setAttribute("r", "1");
			}
		}
	} else {
		return false;
	}
}

function disableTableElements() {
	for (var i = 1; i <= 25; i++) {
		document.getElementById("t" + i).setAttribute("onmousedown", null);
		document.getElementById("t" + i).setAttribute("onmouseup", null);
	}
}

function displayBestTime(timeInSeconds){
	document.getElementById("p1").innerHTML = "Congrats! You found all the mines in "+timeInSeconds+" seconds.";
	document.getElementById("p1").setAttribute("class","visible");
}
