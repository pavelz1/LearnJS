'use strict'

// Объявляем переменные
let money; // Ваш месячный доход
// let income; // строка с дополнительными доходом (например: фриланс)
let addExpenses; // Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую” сохранить в переменную addExpenses 

let expenses1; // Трата 1
let expenses2; // Трата 2
let amount1; // Сумма 1
let amount2; // Сумма 2 
let budgetMonth; // Вычислить бюджет на месяц, учитывая обязательные расходы, сохранить в новую переменную budgetMonth и вывести результат в консоль
let mission; // Какую сумму хотите накопить
let period; // число от 1 до 12 (месяцев)
let budgetDay; // дневной бюджет (доход за месяц / 30)

while (isNaN(money = +prompt('Ваш месячный доход?', 'Введите число')));

// console.log( typeof 'money: ', money );
console.log('Месячный доход: ', parseInt(money) );

// income = 'Фриланс';
// бензин, коммунальные платежи, лицензионное поымыы
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');// бензин, коммунальные платежи, лицензионное по
console.log(addExpenses.length); // Вывести в консоль длину строки addExpenses
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(','));

let deposit = confirm('Есть ли у вас депозит в банке?'); // Спросить у пользователя “Есть ли у вас депозит в банке?” и сохранить данные в переменной deposit
if (deposit) {
	console.log('Да, есть');
} else {
	console.log('Нет, нету');
}

expenses1 = prompt('Введите обязательную статью расходов?');
while (isNaN(amount1 = +prompt('Во сколько это обойдется?', 'Введите число')));
expenses2 = prompt('Введите обязательную статью расходов?');
while (isNaN(amount2 = +prompt('Во сколько это обойдется?', 'Введите число')));
console.log('Трата 1:', expenses1);
console.log('Сумма 1:', amount1);
console.log('Трата 2:', expenses2);
console.log('Сумма 2:', amount2);

budgetMonth = (amount1 + amount2);
budgetMonth = money - budgetMonth; //Вычислить бюджет на месяц, учитывая обязательные расходы, сохранить в новую переменную budgetMonth 
console.log('Бюджет на месяц:', budgetMonth);

mission = Number('500000');
period = Number(mission / budgetMonth); // Какую сумму хотите накопить

budgetDay = Math.floor(budgetMonth / 30);

// console.log(income);

console.log('Цель будет достигнута за:' + ' ' + Math.ceil(period) + ' ' + 'месяцев'); // Вывести в консоль “Период равен (period) месяцев
console.log('Цель заработать ' + mission + ' рублей'); // Цель заработать (mission) рублей

console.log('Бюджет на день:', budgetDay);

if (budgetDay > 1200) {
	console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay <=1200) {
	console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600) {
	console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0) {
	console.log('Что-то пошло не так');
}