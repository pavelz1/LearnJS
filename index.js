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
      periodSelect = document.querySelector('period-select'),
      periodAmount = document.querySelector('.title.period-amount'),
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      expensesTitle = document.querySelector('.expenses-title'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      incomeItem = document.querySelectorAll('.income-items');

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
  start: function () {
    if (salaryAmount.value === ''){
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    };
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIcome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
  },
  addExpensesBlock: function () {
    let cloneexpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneexpensesItem, btnPlusExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3){
      btnPlusExpensesAdd.style.display = 'none';
    }
  },
  getExpenses: function(){
    expensesItems.forEach(function(item){
     let itemExpenses = item.querySelector('.expenses-title').value;
     let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== ''){
            appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  // addIncomeBlock: function () {
  //   let cloneIncomeItem = itemIncome[0].cloneNode(true);
  //   itemIncome[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
  //   cashIncome = document.querySelectorAll('.income-amount');
  //   if (itemIncome.length === 3) {
  //     btnPlusIncomeAdd.style.display = 'none';
  //   }
  // },
  getIncome: function () {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую'); // Валидация			
      let cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете', 10000); // Валидация			
      appData.income[itemIncome] = cashIncome;
    }

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key]
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    })
  },
  getAddIcome: function() {
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== ''){
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
  getTargetMonth: function () {
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      appData.percentDeposit = +prompt('Какой годовой процент?', '10'); // Валидация			
      appData.moneyDeposit = +prompt('Какая сумма заложена', '10000'); // Валидация

    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * periodSelect.value;
  }
};

start.addEventListener('click', appData.start);

btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);

// if (appData.getTargetMonth() > 0) {
//   console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
// } else {
//   console.log('Цель не будет достигнута');
// }

// for (let key in appData) {
//   console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
// }