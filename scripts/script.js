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
			return { timeRemaining, hours, minutes, seconds };
		}
		function addZero(num) {
			if (num >= 0 && num <= 9) {
				return '0' + num;
			} else {
				return num;
			}
		}

		function updateClock() {
			const timer = getTimeRemaining();

			timerHours.textContent = addZero(timer.hours);
			timerMinutes.textContent = addZero(timer.minutes);
			timerSeconds.textContent = addZero(timer.seconds);

			if (timer.timeRemaining >= 0) {
				setTimeout(updateClock, 1000);
			} else if (timer.timeRemaining <= 0) {
				clearInterval(timer);
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			}
		}
		updateClock();
	}

	countTimer('15 sept 2020 18:50:00');

	// Menu
	const toggleMenu = () => {

		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};
		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);

		menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));

	};

	toggleMenu();



	// popup
	const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popUpBtn = document.querySelectorAll('.popup-btn');

		popUpBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
			});
		});
		popup.addEventListener('click', () => {
			let target = event.target;
			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
			} else {
				target = target.closest('.popup-content');
				if (!target) {
					popup.style.display = 'none';
				}
			}
		});

	};
	togglePopUp();

	// tabs
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}

			}
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};

	tabs();

	// slider
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			btn = document.querySelectorAll('.portfolio-btn'),
			dot = document.querySelectorAll('.dot'),
			slider = document.querySelector('.portfolio-content');

		let currentSlide = 0,
			interval;

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 3000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};


		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');

		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') ||
				event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') ||
				event.target.matches('.dot')) {
				startSlide();
			}
		});

		startSlide(1500);

	};

	slider();


	// Calculator
	const calc = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcCount = document.querySelector('.calc-count'),
			calcDay = document.querySelector('.calc-day'),
			totalValue = document.getElementById('total');

		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;

			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}

			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			}
			// console.log(!!typeValue);
			// console.log(!!squareValue);
			totalValue.textContent = Math.ceil(total);

		};

		calcBlock.addEventListener('change', event => {
			const target = event.target;
			// if (target.matches('.calc-type') || target.matches('.calc-square') ||
			// 	target.matches('.calc-day') || target.matches('.calc-count')) {
			// 	console.log(1);
			// }

			// if (target === calcType || target === calcSquare ||
			// 	target === calcDay || target === calcCount) {
			// 	console.log(1);
			// 	}

			if (target.matches('select') || target.matches('input')) {
				countSum();
			}
			// calcSquare.value = calcSquare.value.replace(/\D/g, '');
			// calcCount.value = calcCount.value.replace(/\D/g, '');
			// calcDay.value = calcDay.value.replace(/\D/g, '');
		});
	};

	calc();

	//  Плавная прокрутка
	const anchors = document.querySelectorAll('a[href*="#"]');
	for (const anchor of anchors) {
		anchor.addEventListener('click', e => {
			e.preventDefault();

			const blockID = anchor.getAttribute('href').substr(1);

			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	}

	// Data img

	img = document.querySelector('.command__photo');
	for (const img of document.querySelectorAll('[data-img]')) {
		img.addEventListener('mouseover', e => {
			event.target.src = event.target.dataset.img;
		});
		// img.addEventListener('mouseout', (e) => {
		// 	event.target.src = event.target.src
		// });
	}

});
