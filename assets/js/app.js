(function (window, document, undefined) {
	'use strict';

	const mainContainer = document.querySelector('.container');
	const countContainer = document.querySelector('.count--number');
	const scoreContainer = document.querySelector('.score--number');
	const scoreButtons = document.querySelectorAll('[data-score]');
	let ballCount = 1;
	let scoreTotal = 0;
	let hundos = 0;
	let fullCircle = true;
	let cherry = true;
	let highFive = true;

	function ballCounter() {
    // TODO: convert to balls left
		if (ballCount < 9) {
			ballCount++;
			countContainer.textContent = ballCount;
		} else if (ballCount === 9) {
			ballCount++;
			gameOver();
		} else {
			return false;
		}
	}

	function tallyScore() {
		let rollScore = parseInt(this.getAttribute('data-score'));
		if (ballCount <= 9) {
			scoreTotal = scoreTotal + rollScore;
			scoreContainer.textContent = scoreTotal;
			if (rollScore === 100) hundos++;
			if (rollScore !== 40) fullCircle = false;
			if (rollScore !== 50) highFive = false;
			// TODO: figure out how to exclude fullCircle and highFive from this
			// if (rollScore < 40 || rollScore > 50) cherry = false;
		}
	}

  function resetGame(e) {
    // lazy!
    if (e.target.id == 'resetButton') location.reload();

    // reset variables
    // remove results container
  }

	function gameOver() {
		const gameOver = document.createElement('section');
    gameOver.classList.add('results');
		gameOver.innerHTML = `<p>All done! You scored ${scoreTotal}</p>`;

		// TODO: refactor achievement title as variable
		if (fullCircle) gameOver.innerHTML += '<p>Congratulations! You scored a FULL CIRCLE!</p>';
		// if (cherry) gameOver.innerHTML += '<p>Congratulations! You scored a CHERRY!</p>';
		if (highFive) gameOver.innerHTML += '<p>Congratulations! You scored a HIGH FIVE!</p>';
		if (!cherry && !highFive && scoreTotal >=370 && scoreTotal <= 450) gameOver.innerHTML += '<p>Congratulations! You scored a CHIP!</p>';
		if (scoreTotal >= 460) gameOver.innerHTML += '<p>Congratulations! You scored a FISH!</p>';
		if (scoreTotal === 900) gameOver.innerHTML += '<p>Holy shit! You scored a PERFECT FRAME!</p>'
		if (scoreTotal === 90) gameOver.innerHTML += '<p>Oh no! You scored a RIGHT ANGLE!</p>';
		if (scoreTotal === 80) gameOver.innerHTML += '<p>Oh no! You scored a SNOWMAN!</p>';
		if (hundos > 0) gameOver.innerHTML += `<p>Congratulations! You scored ${hundos} hundos!</p>`;

    gameOver.innerHTML += '<button id="resetButton" class="reset" href="#">Reset</button>';

    document.body.appendChild(gameOver);
	}

	scoreButtons.forEach(hole => {
		hole.addEventListener('click', tallyScore);
    hole.addEventListener('touchstart', tallyScore);
		hole.addEventListener('click', ballCounter);
    hole.addEventListener('touchstart', ballCounter);
	});

  document.addEventListener('click', resetGame);
  document.addEventListener('touch', resetGame);

})(window, document);

$(function() {
  $('.container').on('click tap', function() {
    alert('yay');
  });
});
