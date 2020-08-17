'use strict';
let money,
	start = function () {
		do {
			money = prompt('Ваш месячный доход?', 50000);
		}
		while (isNaN(money) || money === '' || money === null)
	};
start();

let appData = {
		budget: money,
		budgetDay: 0,
		budgetMonth: 0,
		income: {},
		addIncome: [],
		expenses: {},
		addExpenses: [],
		expensesMonth: 0,
		deposit: false,
		percentDeposit: 0,
		moneyDeposit: 0,
		mission: 50000,
		period: 3,
		asking: function () {

		if (confirm('Есть ли у вас дополнительный источник заработка?')) {
			let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую'); // Валидация			
			let cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете', 10000); // Валидация			
			appData.income[itemIncome] = cashIncome;
		}

		let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
				appData.addExpenses = addExpenses.toLowerCase().split(',');
				appData.deposit = confirm('Есть ли у вас депозит в банке?');
		for (let i = 0; i < 2; i++) {

			let itemExpenses = prompt('Введите обязательную статью расходов?', 'Садик Государственный'); // Валидация
			let cashExpenses;
			do{
				cashExpenses = prompt('Во сколько это обойдется?', 2500);
			}
			while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);
			appData.expenses[itemExpenses] = cashExpenses;
		}
	},
	getExpensesMonth: function () {
		for (let key in appData.expenses) {
			appData.expensesMonth +=  +appData.expenses[key];
		}
	},
	getBudget: function () {
		appData.budgetMonth = appData.budget - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},
	getTargetMonth: function () {
		return appData.mission / appData.budgetMonth;
	},
	getStatusIncome: function () {
		if (appData.budgetDay > 1200) {
			return ('У вас высокий уровень дохода');
		} else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
			return ('У вас средний уровень дохода');
		} else if (appData.budgetDay <= 600) {
			return ('К сожалению у вас уровень дохода ниже среднего');
		} else if (appData.budgetDay <= 0) {
			return ('Что-то пошло не так');
		}
	},
	getInfoDeposit: function() {
		if(appData.deposit){
			appData.percentDeposit = +prompt('Какой годовой процент?', '10'); // Валидация			
			appData.moneyDeposit = +prompt('Какая сумма заложена', '10000'); // Валидация
			
		}
	},
	calcSavedMoney: function() {
		return appData.budgetMonth * appData.period;
	}
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);


if (appData.getTargetMonth() > 0) {
	console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
}  else {
	console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());

for (let key in appData) {
	console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}
// appData.getInfoDeposit();
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());