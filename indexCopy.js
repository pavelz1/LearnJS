'use strict';

let btnStart = document.getElementById('start'),
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
  // incomeTitle = document.querySelector('.income-title'),
  // expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  incomeItems = document.querySelectorAll('.income-items');

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  check: function(){
    if (salaryAmount.value !=== ''){
      start.removeAttribute('disabled');
    }
  },
  start: function () {
    if (salaryAmount.value === '') {
      this.start.removeAttribute('disabled', 'true');
      return;
    };

    
    this.budget = +salaryAmount.value;

    this.getExpenses();// Обязательные расходы
    this.getIncome();
    this.getExpensesMonth(); // Месячный бюджет
    this.getAddExpenses(); // Возможные расходы
    this.getAddIcome();// Возможные доходы

    this.getBudget();
    this.showResult();
  },
  showResult: function () { // Результаты вычисления
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', '); // Возможные расходы
    additionalIncomeValue.value = this.addIncome.join(', ');  // Возможные доходы
    targetMonthValue.value = Math.ceil(this.getTargetMonth()); // Срок достижения цели в месяцах
    incomePeriodValue.value = this.calcPeriod();
    console.log(this);
  },
  addExpensesBlock: function () { // Возможные расходы
    let cloneexpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneexpensesItem, btnPlusExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnPlusExpensesAdd.style.display = 'none';
    }
  },
  getExpenses: function () {// Обязательные расходы
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnPlusIncomeAdd.style.display = 'none';
    }
  },
  getIncome: function () { // Доходы
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key]
    }
  },
  getAddExpenses: function () { // Возможные расходы
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    })
  },
  getAddIcome: function () { // Возможные доходы
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    })
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () { // Цель
    return targetAmount.value / appData.budgetMonth;
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
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
  rng: function () {
    return periodAmount.innerHTML = rng.value;
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      appData.percentDeposit = +prompt('Какой годовой процент?', '10'); // Валидация			
      appData.moneyDeposit = +prompt('Какая сумма заложена', '10000'); // Валидация

    }
  },

};

start.addEventListener('click', appData.start);
btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
rng.addEventListener('input', appData.rng);

  // if (appData.getTargetMonth() > 0) {
  //   console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
  // } else {
  //   console.log('Цель не будет достигнута');
  // }

  // for (let key in appData) {
  //   console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
  // }

