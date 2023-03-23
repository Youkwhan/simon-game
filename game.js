let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

$(".btn").click(function (event) {
	if (started) {
		let userChosenColor = event.target.id;
		userClickedPattern.push(userChosenColor);

		animatePress(userChosenColor);
		playSound(userChosenColor);

		checkAnswer(userClickedPattern.length - 1);
	}
});

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

function playSound(name) {
	let audio = new Audio(`./sounds/${name}.mp3`);
	audio.play();
}

function animatePress(currentColor) {
	$(`#${currentColor}`).addClass("pressed");
	setTimeout(() => {
		$(`#${currentColor}`).removeClass("pressed");
	}, 100);
}

function startOver() {
	level = 0;
	started = false;
	gamePattern.length = 0;
	console.log(gamePattern);
}

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
