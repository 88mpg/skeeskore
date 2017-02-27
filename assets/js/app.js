(function (window, document, undefined) {
	'use strict';

	const mainContainer = document.querySelector('.container');
	const countContainer = document.querySelector('.count--number');
	const scoreContainer = document.querySelector('.score--number');
	const scoreButtons = document.querySelectorAll('[data-score]');

	let ballCount = 9;
	let scoreTotal = 0;
	let hundos = 0;
	let fullCircle = true;
	let cherry = true;
	let highFive = true;

	if ('addEventListener' in document) {
	    document.addEventListener('DOMContentLoaded', function() {
	        FastClick.attach(document.body);
	    }, false);
	}

  function removeBall() {
    let currentBall = document.querySelector('.ball-count-'+ballCount);
    currentBall.classList.add('js-hidden');
  }

  function updateGame() {
    removeBall();
    ballCount--;
    countContainer.textContent = ballCount;
  }

	function ballCounter() {
		if (ballCount <= 9 && ballCount > 1) {
      updateGame();
		} else if (ballCount === 1) {
			updateGame();
			gameOver();
		} else {
			return false;
		}
	}

  function updateScore() {
    let resultsScoreContainer = document.querySelector('.resultsScoreContainer');
    // TODO: maybe refactor to use one class
    scoreContainer.textContent = scoreTotal;
    if (document.body.contains(resultsScoreContainer)) resultsScoreContainer.textContent = scoreTotal;
  }

	function tallyScore() {
		let rollScore = parseInt(this.getAttribute('data-score'));

		if (ballCount >= 1) {
			scoreTotal = scoreTotal + rollScore;

      if (rollScore === 100) hundos++;
      // TODO: figure out how to exclude fullCircle and highFive from this
			// if (rollScore < 40 || rollScore > 50) cherry = false;
			if (rollScore !== 40) fullCircle = false;
			if (rollScore !== 50) highFive = false;

			updateScore();
		}
	}

  function editScore() {
    let newScore = prompt('What score did you get?', scoreTotal);
    scoreTotal = newScore;
    updateScore();
  }

  function resetGame(e) {
    // lazy!
    if (e.target.id == 'resetButton') {
      location.reload();
      // ballCount = 9;
      // scoreTotal = 0;
    	// hundos = 0;
    	// fullCircle = true;
    	// cherry = true;
    	// highFive = true;
      // updateScore();
      // countContainer.textContent = ballCount;
    };
    if (e.target.id == 'editScore') editScore();
  }

	function gameOver() {
		const gameOver = document.createElement('section');
    gameOver.classList.add('results');
		gameOver.innerHTML = `<p>All done! You scored <span class="resultsScoreContainer">${scoreTotal}</p>`;

		// TODO: refactor achievement title as variable
		if (fullCircle) gameOver.innerHTML += '<p>Congratulations! You scored a FULL CIRCLE!</p>';
		// if (cherry) gameOver.innerHTML += '<p>Congratulations! You scored a CHERRY!</p>';
		if (highFive) gameOver.innerHTML += '<p>Congratulations! You scored a HIGH FIVE!</p>';
		if (!cherry && !highFive && scoreTotal >=370 && scoreTotal <= 450) gameOver.innerHTML += '<p>Congratulations! You scored a CHIP!</p>';
		if (scoreTotal >= 460 && scoreTotal !== 900) gameOver.innerHTML += '<p>Congratulations! You scored a FISH!</p>';
		if (scoreTotal === 900) gameOver.innerHTML += '<p>Holy shit! You scored a PERFECT FRAME!</p>'
		if (scoreTotal === 90) gameOver.innerHTML += '<p>Oh no! You scored a RIGHT ANGLE!</p>';
		if (scoreTotal === 80) gameOver.innerHTML += '<p>Oh no! You scored a SNOWMAN!</p>';
		if (hundos > 0) gameOver.innerHTML += `<p>Congratulations! You scored ${hundos} hundos!</p>`;

    gameOver.innerHTML += '<button id="resetButton" class="reset" href="#">Reset</button>';
    gameOver.innerHTML += '<a href="#" id="editScore" class="edit" href="#">Wrong score? Click here to edit.</a>';

    document.body.appendChild(gameOver);
	}

	scoreButtons.forEach(hole => {
		hole.addEventListener('click', tallyScore);
		hole.addEventListener('click', ballCounter);
	});

  document.addEventListener('click', resetGame);

})(window, document);
