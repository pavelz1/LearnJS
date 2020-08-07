// Объявляем переменные
let money; // любое число “Доход за месяц”
money = 100000;

let income; // строка с дополнительными доходом (например: фриланс)
income = 'Фриланс';

let addExpenses; // строка с перечислением дополнительных расходов через запятую (например: интернет, такси, коммуналка)
addExpenses = 'Интернет, Такси, Коммуналка';

let deposit; // любое булево значение
deposit = (Boolean(NaN));

let mission; // любое число (Какую сумму хотите накопить)
mission = 1200000;

let period; // число от 1 до 12 (месяцев)
period = 12;

let budgetDay; // дневной бюджет (доход за месяц / 30)
budgetDay = 100000 / 30;

console.log(money);

console.log(income);

console.log(deposit);

console.log(addExpenses.length); // Вывести в консоль длину строки addExpenses
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(','));

console.log('Период равен' + ' ' + period + ' ' + 'месяцев'); // Вывести в консоль “Период равен (period) месяцев
console.log('Цель заработать ' + mission + ' рублей'); // Цель заработать (mission) рублей

console.log(budgetDay);

