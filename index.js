'use strict';

let btnStart = document.getElementById('start'),
  btnCancel = document.getElementById('cancel'),
  btnPlusIncomeAdd = document.getElementsByTagName('button')[0],
  btnPlusExpensesAdd = document.getElementsByTagName('button')[1],
  depCheck = document.querySelector('#dep-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  rng = document.querySelector('input[type="range"]'),
  salaryAmount = document.querySelector('.salary-amount'), // input budget
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  incomeItems = document.querySelectorAll('.income-items');

const AppData = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.addExpenses = [];
};

AppData.prototype.check = function () {
  if (salaryAmount.value !== '') {
    start.removeAttribute('disabled');
  }
};
AppData.prototype.start = function () {
  if (salaryAmount.value === '') {
    start.removeAttribute('disabled', 'true');
    return;
  };
  let allInput = document.querySelectorAll('.data input[type = text]');
  allInput.forEach(function (item) {
    item.setAttribute('disabled', 'true');
  });
  btnPlusExpensesAdd.setAttribute('disabled', 'true');
  btnPlusIncomeAdd.setAttribute('disabled', 'true');
  btnStart.style.display = 'none';
  btnCancel.style.display = 'block';

  this.budget = +salaryAmount.value;

  this.getExpenses();// Обязательные расходы
  this.getIncome();
  this.getExpensesMonth(); // Месячный бюджет
  this.getAddExpenses(); // Возможные расходы
  this.getAddIcome();// Возможные доходы
  this.getBudget();
  this.showResult();
};


AppData.prototype.showResult = function () { // Результаты вычисления

  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', '); // Возможные расходы
  additionalIncomeValue.value = this.addIncome.join(', ');  // Возможные доходы
  targetMonthValue.value = Math.ceil(this.getTargetMonth()); // Срок достижения цели в месяцах
  incomePeriodValue.value = this.calcPeriod();
};
AppData.prototype.addExpensesBlock = function () { // Возможные расходы
  let cloneexpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneexpensesItem, btnPlusExpensesAdd);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    btnPlusExpensesAdd.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function () {// Обязательные расходы
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    btnPlusIncomeAdd.style.display = 'none';
  }
};
AppData.prototype.getIncome = function () { // Доходы
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = cashIncome;
    }
  });
  for (let key in appData.income) {
    appData.incomeMonth += +appData.income[key]
  }
};
AppData.prototype.getAddExpenses = function () { // Возможные расходы
  let addExpenses = additionalExpensesItem.value.split(',');
  const _this = this;
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  })
};
AppData.prototype.getAddIcome = function () { // Возможные доходы
  const _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  })
};
AppData.prototype.getExpensesMonth = function () {
  for (let key in appData.expenses) {
    appData.expensesMonth += appData.expenses[key];
  }
};
AppData.prototype.getBudget = function () {
  appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
  appData.budgetDay = Math.floor(appData.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () { // Цель
  return targetAmount.value / appData.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
  if (appData.budgetDay > 1200) {
    return ('У вас высокий уровень дохода');
  } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
    return ('У вас средний уровень дохода');
  } else if (appData.budgetDay <= 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (appData.budgetDay <= 0) {
    return ('Что-то пошло не так');
  }
};
AppData.prototype.calcPeriod = function () {
  return appData.budgetMonth * periodSelect.value;
};
AppData.prototype.rng = function () {
  return periodAmount.innerHTML = rng.value;
};
AppData.prototype.getInfoDeposit = function () {
  if (appData.deposit) {
    appData.percentDeposit = +prompt('Какой годовой процент?', '10'); // Валидация			
    appData.moneyDeposit = +prompt('Какая сумма заложена', '10000'); // Валидация
  }
};
AppData.prototype.reset = function () {
  let inputTextData = document.querySelectorAll('.data input[type = text]'),
    resultInputAll = document.querySelectorAll('.result input[type = text]');

  inputTextData.forEach(function (elem) {
    elem.value = '';
    elem.removeAttribute('disabled');
    periodSelect.value = '0';
    periodAmount.innerHTML = periodSelect.value;
  });
  resultInputAll.forEach(function (elem) {
    elem.value = '';
  });
  for (let i = 1; i < incomeItems.length; i++) {
    incomeItems[i].parentNode.removeChild(incomeItems[i]);
    btnPlusIncomeAdd.style.display = 'block';
  };

  for (let i = 1; i < expensesItems.length; i++) {
    expensesItems[i].parentNode.removeChild(expensesItems[i]);
    btnPlusIncomeAdd.style.display = 'block';
  };

  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.addExpenses = [];

  btnStart.style.display = 'none';
  btnCancel.style.display = 'block';
  btnPlusExpensesAdd.removeAttribute('disabled');
  btnPlusIncomeAdd.removeAttribute('disabled');
  // checkBox.checked = false;
};

AppData.prototype.addEventListeners = function () {

};

const appData = new AppData();
// addEventListeners();
console.log(appData);


btnStart.addEventListener('click', appData.start.bind(appData));
btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
rng.addEventListener('input', appData.rng);
salaryAmount.addEventListener('keyup', appData.check);
btnCancel.addEventListener('click', appData.reset.bind(appData));

periodSelect.addEventListener('change', function () {
  periodAmount.innerHTML = periodSelect.value;
});

let addExp = [];
for (let i = 0; i < appData.addExpenses.length; i++) {
  let element = appData.addExpenses[i].trim();
  element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
  addExp.push(element);
};