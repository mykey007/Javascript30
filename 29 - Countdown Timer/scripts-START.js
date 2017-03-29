let countdown; 
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
//const



function timer(seconds) {
	// to reset the timer if more than 1 button is clicked
	clearInterval(countdown);

	//amt of time to have and then lapse that time
	// setInterval(function() {
	// 	seconds--;
	// }, 1000);
	const now = Date.now();
	const then = now + (seconds * 1000);
	//console.log({now, then});
	displayTimeLeft(seconds); // run it once immedeately
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		//check when to stop the timer
		if(secondsLeft < 0) {
			clearInterval(countdown);
			return; //not going to stop it from running, only displaying
		}

		// display
		displayTimeLeft(secondsLeft); // then run it in second intervals
	}, 1000);
}

function displayTimeLeft(seconds) {
	//const minutes = seconds /  60;
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
	document.title = display;
	timerDisplay.textContent = display;

	//console.log({minutes, remainderSeconds});
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// hookup the buttons
buttons.forEach(button => button.addEventListener('click', startTimer));

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

// get the form going
// if the element has a name, you dont need to do the doc.querySelector
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value; // this is the form
	console.log(mins);
	timer(mins * 60); // because we need seconds to countdown
	this.reset(); //clear out the value
});