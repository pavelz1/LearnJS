'use strict';

let money = +prompt('Ваш месячный доход?'),
		income = 'Фриланс',
		addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
		deposit = confirm('Есть ли у вас депозит в банке?'),
		mission = 75000,
		period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(typeof income.length);

let expenses1 = prompt('Введите обязательную статью расходов?', 'интернет'),
		expenses1Amount = +prompt('Во сколько это обойдется?', 5750),
		expenses2 = prompt('Введите обязательную статью расходов?', 'комунальные платежи'),
		expenses2Amount = +prompt('Во сколько это обойдется?', 10000);

console.log('Период ' + period + ' месяца');
console.log(`Цель заработать  + ${mission} +  рублей`);
console.log(addExpenses.toLowerCase().split(','));


let expensesAmount = expenses1Amount + expenses2Amount;
console.log(expensesAmount);
let budgetMonth = (money - (expensesAmount));
console.log('Месячный доход: ' + budgetMonth);
let periodMission = Math.ceil(mission / budgetMonth);

let budgetDay = budgetMonth / 30;

console.log('Бюджет на день: ' + Math.floor(budgetDay));

console.log('Цель будет достигнута за ' + periodMission + ' месяца');


if (budgetDay > 1200) {
	console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay <=1200) {
	console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600) {
	console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0) {
	console.log('Что-то пошло не так');
}