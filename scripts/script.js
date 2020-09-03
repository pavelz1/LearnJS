window.addEventListener('DOMContentLoaded', () => {

	// Timer
	function countTimer(deadLine) {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimeRemaining() {
			const dateStop = new Date(deadLine).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return { timeRemaining, seconds, minutes, hours };
		}


		function updateClock() {
			const timer = getTimeRemaining();

			timerHours.textContent = timer.hours;
			timerMinutes.textContent = timer.minutes;
			timerSeconds.textContent = timer.seconds;

			if (timer.timeRemaining >= 0) {
				setTimeout(updateClock, 1000);
			} else if (timer.timeRemaining <= 0) {
				clearInterval(timer);
				timerHours.textContent = "00";
				timerMinutes.textContent = "00";
				timerSeconds.textContent = "00";
			}
		}
		updateClock();
	}

	countTimer('05 sept 2020 03:17:00');

});
