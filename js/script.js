const filterByType = (type, ...values) => values.filter(value => typeof value === type),
// 
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
// Показ диалог ошибки
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
// Показываем удачный результат
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
// Показываем блок Пока что нечего показать.
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};
// Выбор кнопки по селектору
const filterButton = document.querySelector('#filter-btn');
// Слушаем событие 
filterButton.addEventListener('click', e => {
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');
// Поле не должно быть пустым!
	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {
		dataInput.setCustomValidity('');
		// Сброс событий браузера
		e.preventDefault();
		// Очистка от пробелов
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

