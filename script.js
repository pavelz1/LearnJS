'use strict';

let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
		income = 'Фриланс',
		addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
		deposit = confirm('Есть ли у вас депозит в банке?'),
		mission = 75000,
		period = 6;


let start = function() {
	money = prompt('Ваш месячный доход?');

	while (!isNumber(money)) {
		money = prompt('Ваш месячный доход?');
	}
};
start();

let showTypeOf = function(item) {
	console.log(typeof (item)); // вызовы функции showTypeOf
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// let expenses1, expenses2;
let expenses = [];

console.log(addExpenses.toLowerCase().split(','));

let getExpensesMonth = function () {
	let sum = 0;

	for (let i = 0; i < 2; i++) {

		// if(i === 0) {
			expenses[i] = prompt('Введите обязательную статью расходов?');
		// 	expenses1 = prompt('Введите обязательную статью расходов?', 'интернет');
		// } else if {
		// 	expenses2 = prompt('Введите обязательную статью расходов?', 'комунальные платежи');
		// }

		sum += +prompt('Во сколько это обойдется?');
	}
	console.log(expenses);
	return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

let getAccumulatedMonth = function() {
	return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function () {
	return mission / accumulatedMonth
};

let budgetDay = accumulatedMonth / 30;

console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' месяца');

let getStatusIncome = function() {
	if (budgetDay > 1200) {
		return('У вас высокий уровень дохода');
	} else if (budgetDay >= 600 && budgetDay <=1200) {
		return('У вас средний уровень дохода');
	} else if (budgetDay <= 600) {
		return('К сожалению у вас уровень дохода ниже среднего');
	} else if (budgetDay <= 0) {
		return('Что-то пошло не так');
	}
};

console.log(getStatusIncome()); // вызов функции getStatusIncome