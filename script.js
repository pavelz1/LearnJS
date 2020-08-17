'use strict';
let isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
	start = function () {
		do {
			money = prompt('Ваш месячный доход?');
		} while (!isNumber(money))
	};
start();


let appData = {
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	mission: 50000,
	period: 3,
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,	
	asking: function () {
		let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
		appData.addExpenses = addExpenses.toLowerCase().split(',');
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
	},
};

// let showTypeOf = function(item) {
// 	console.log(typeof (item)); // вызовы функции showTypeOf
// };
// showTypeOf(money);
// showTypeOf(appData.income);
// showTypeOf(appData.deposit);

// let expenses1, expenses2;
appData.expenses = [];

appData.getExpensesMonth = function () {
	let sum = 0;

	for (let i = 0; i < 2; i++) {

		appData.expenses[i] = prompt('Введите обязательную статью расходов?');

		// if(i === 0) {
		// 	expenses1 = prompt('Введите обязательную статью расходов?', 'интернет');
		// } else if {
		// 	expenses2 = prompt('Введите обязательную статью расходов?', 'комунальные платежи');
		// }

		sum += +prompt('Во сколько это обойдется?');
	}
	console.log(appData.expenses);
	return sum;
};
appData.expensesMonth = appData.getExpensesMonth(); 

console.log('Расходы за месяц: ' + expensesAmount);

appData.getAccumulatedMonth = function () {
	return money - expensesAmount;
};

appData.accumulatedMonth = appData.getAccumulatedMonth();

appData.getTargetMonth = function () {
	return appData.mission / accumulatedMonth
};

let budgetDay = accumulatedMonth / 30;

('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');

appData.getStatusIncome = function () {
	if (budgetDay > 1200) {
		return ('У вас высокий уровень дохода');
	} else if (budgetDay >= 600 && budgetDay <= 1200) {
		return ('У вас средний уровень дохода');
	} else if (budgetDay <= 600) {
		return ('К сожалению у вас уровень дохода ниже среднего');
	} else if (budgetDay <= 0) {
		return ('Что-то пошло не так');
	}
};

console.log(appData.getStatusIncome()); // вызов функции getStatusIncome