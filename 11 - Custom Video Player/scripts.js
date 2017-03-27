/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build the Functions */
function togglePlay() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
	// the ternary operator
	//const method = video.paused ? 'play' : 'pause'; // if/else statement
	//video[method](); // call the function
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚'; // using this because it's bound to the video
	toggle.textContent = icon;
	// if (icon.paused) {
	// 	'►';
	// } else {
	// 	'❚ ❚';
	// }
	console.log('Update the button');
}

function skip() {
	//console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip); // this is a string so wrap in a parseFloat
}


function handleRangeUpdate() {
	video[this.name] = this.value;
	console.log(this.name);
	console.log(this.value);
}

function handleProgress() {
	//updates in real time
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis =`${percent}%`
}

function scrub(e) {
	const scrubtime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubtime;
	console.log(e);
}
/* Hook up the Event Listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
//progress.addEventListener('mousemove', scrub);
//updated:
// progress.addEventListener('mousemove', () => {
// 	if(mousedown){
// 		scrub();
// 	}
// });
//OR this super slick way
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);