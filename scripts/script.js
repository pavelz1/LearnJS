window.addEventListener('DOMContentLoaded', () => {
	'use strict';

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

	// Menu
	const toggleMenu = () => {

		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
			// if (!menu.style.transform || menu.style.transform === `translateX(-100%)`) {
			// 	menu.style.transform = `translateX(0%)`;
			// } else {
			// 	menu.style.transform = `translateX(-100%)`;
			// }
		};
		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);

		// for (let i = 0; i < menuItems.length; i++) {
		// 	menuItems[i].addEventListener('click', handlerMenu);
		// }

		menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

	};

	toggleMenu();

	// popup
	const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popUpClose = document.querySelector('.popup-close');

		popupBtn.forEach((elem) => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
			});
		});

		popUpClose.addEventListener('click', () => {
			popup.style.display = 'none';
		});
	};

	togglePopUp();


});