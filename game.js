let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

// Processes button clicks if game is running
$(".btn").click(function (event) {
	if (started) {
		let userChosenColor = event.target.id;

		processUserInput(userChosenColor);
	}
});

// Processes keyboard press if game is running
$(document).keydown(function (event) {
	if (started) {
		let color = "";
		switch (event.key) {
			case "w":
			case "ArrowUp":
				color = "green";
				// console.log(color);
				break;

			case "a":
			case "ArrowLeft":
				color = "yellow";
				// console.log(color);
				break;

			case "s":
			case "ArrowDown":
				color = "blue";
				// console.log(color);
				break;

			case "d":
			case "ArrowRight":
				color = "red";
				// console.log(color);
				break;

			default:
				break;
		}
		if (color !== "") {
			processUserInput(color);
		}
	}
});

function processUserInput(userChosenColor) {
	userClickedPattern.push(userChosenColor);
	animatePress(userChosenColor);
	playSound(userChosenColor);
	checkAnswer(userClickedPattern.length - 1);
}

// Next pattern from the game
function nextSequence() {
	userClickedPattern.length = 0;
	level++;
	$("h1").text(`Level ${level}`);

	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);

	$(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);

	console.log(gamePattern);
}

// compare what we inputted with the game pattern
function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (currentLevel + 1 === gamePattern.length) {
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		$("h1").text("Game Over, Press Any Key to Restart");
		setTimeout(() => {
			$("body").removeClass("game-over");
		}, 200);
		startOver();
	}
}

// play audio of buttons
function playSound(name) {
	let audio = new Audio(`./sounds/${name}.mp3`);
	audio.play();
}

// animate button being pressed
function animatePress(currentColor) {
	$(`#${currentColor}`).addClass("pressed");
	setTimeout(() => {
		$(`#${currentColor}`).removeClass("pressed");
	}, 100);
}

// game over
function startOver() {
	level = 0;
	started = false;
	gamePattern.length = 0;
	console.log(gamePattern);
}

// game initalization
function main() {
	$(document).keydown(function () {
		if (!started) {
			// $("h1").text(`Level ${level}`);
			nextSequence();
			started = true;
		}
	});
}

main();
