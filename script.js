'use strict';

let money = +prompt('Ваш месячный доход?'),
		income = 'Фриланс',
		addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
		deposit = confirm('Есть ли у вас депозит в банке?'),
		mission = 75000,
		period = 6;

let showTypeOf = function(data) {
	console.log(data, typeof (data)); // вызовы функции showTypeOf
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(typeof income.length);

let expenses1 = prompt('Введите обязательную статью расходов?', 'интернет'),
		expenses1Amount = +prompt('Во сколько это обойдется?', 5750),
		expenses2 = prompt('Введите обязательную статью расходов?', 'комунальные платежи'),
		expenses2Amount = +prompt('Во сколько это обойдется?', 10000);

console.log('Период ' + period + ' месяцев');
console.log(`Цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(',')); // Вывод возможных расходов в виде массива (addExpenses)

//Функция возвращает сумму всех обязательных расходов за месяц (1)
let expensesAmount = expenses1Amount + expenses2Amount;
let getExpensesMonth = function () {
	console.log(expensesAmount); // Расходы за месяц вызов getExpensesMonth
};
getExpensesMonth();

//Функция возвращает Накопления за месяц (Доходы минус расходы) (2)
let accumulatedMonth = (money - (expensesAmount));
let getAccumulatedMonth = function () {
	console.log('Месячный доход: ' + accumulatedMonth);
};
getAccumulatedMonth();
//3) Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 

let periodMission = Math.ceil(mission / accumulatedMonth);

let budgetDay = accumulatedMonth / 30;

console.log('Бюджет на день: ' + Math.floor(budgetDay)); // Бюджет на день (budgetDay)

//Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления
let getTargetMonth = function() {
	console.log('Цель будет достигнута за ' + periodMission + ' месяца'); // результат вызова функции getTargetMonth
};
getTargetMonth();


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