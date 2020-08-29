'use strict';
document.addEventListener('DOMContentLoaded', () => {


  let btnStart = document.getElementById('start'),
    btnCancel = document.getElementById('cancel'),
    btnPlusIncomeAdd = document.getElementsByTagName('button')[0],
    btnPlusExpensesAdd = document.getElementsByTagName('button')[1],
    depositCheck = document.getElementById('deposit-check'),
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
    salaryAmount = document.querySelector('.salary-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

  // periodSelect.setAttribute('disabled', true);

  let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    rng = document.querySelector('input[type="range"]');

  class AppData {
    constructor() {
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
    }

    showResult() { // Результаты вычисления
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', '); // Возможные расходы
      additionalIncomeValue.value = this.addIncome.join(', ');  // Возможные доходы
      targetMonthValue.value = Math.ceil(this.getTargetMonth()); // Срок достижения цели в месяцах
      incomePeriodValue.value = this.calcPeriod();
    }
    /* start addExpensesBlock, addIncomeBlock */
    addExpensesBlock() { // Возможные расходы
      let cloneexpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneexpensesItem, btnPlusExpensesAdd);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
        btnPlusExpensesAdd.style.display = 'none';
      }
    }
    addIncomeBlock() {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
        btnPlusIncomeAdd.style.display = 'none';
      }
    }
    /* end addExpensesBlock, addIncomeBlock*/

    /* start getExpenses, getIncome Обязательные расходы */
    getIncome() { // Доходы
      incomeItems.forEach(item => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
          this.income[itemIncome] = cashIncome;
        }
      });
      for (let key in this.income) {
        this.incomeMonth += +this.income[key]
      }
    }
    /* end getExpenses, getIncome*/

    getExpInc() {
      const count = item => {
        const startStr = item.className.split('-')[0];
        const itemTitle = item.querySelector(`.${startStr}-title`).value;
        const itemAmount = item.querySelector(`.${startStr}-amount`).value;
        if (itemTitle !== '' && itemAmount !== '') {
          this[startStr][itemTitle] = itemAmount;
        }
      }

      expensesItems.forEach(count);
      incomeItems.forEach(count);

      for (let key in this.income) {
        this.incomeMonth += +this.income[key]
      }
    }
    /* end getExpenses, getIncome*/

    /* start getAddExpenses, getAddIcome */
    getAddExpenses() { // Возможные расходы
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(item => {
        item = item.trim();
        if (item !== '') {
          this.addExpenses.push(item);
        }
      })
    }
    getAddIcome() { // Возможные доходы
      additionalIncomeItem.forEach(item => {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
          this.addIncome.push(itemValue);
        }
      })
    }
    /* end getAddExpenses, getAddIcome*/

    getExpensesMonth() {
      let result = 0;
      for (const key in this.expenses) {
        result += +this.expenses[key];
      }
      this.expensesMonth = result;
      return result;
    }
    getBudget() {
      const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
      this.budgetMonth = this.budget + +this.incomeMonth - this.expensesMonth + monthDeposit;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() { // Цель
      return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    getStatusIncome() {
      if (this.budgetDay > 1200) {
        return ('У вас высокий уровень дохода');
      } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
        return ('У вас средний уровень дохода');
      } else if (this.budgetDay <= 600) {
        return ('К сожалению у вас уровень дохода ниже среднего');
      } else if (this.budgetDay <= 0) {
        return ('Что-то пошло не так');
      }
    }
    calcPeriod() {
      return this.budgetMonth * periodSelect.value;
    }
    rng = function () {
      return periodAmount.innerHTML = rng.value;
    }
    getInfoDeposit() {
      if (this.deposit) {
        this.percentDeposit = +prompt('Какой годовой процент?', '10'); // Валидация			
        this.moneyDeposit = +prompt('Какая сумма заложена', '10000'); // Валидация
      }
    }
    reset() {
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
    }

    check() {
      if (salaryAmount.value !== '') {
        start.removeAttribute('disabled');
      }
    }
    start() {
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
      this.getExpInc();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIcome();
      this.calcPeriod();
      this.getStatusIncome();
      this.getInfoDeposit();
      this.getBudget();
      this.showResult();
    }

    getInfoDeposit() {
      if(this.deposit){
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
      }
    }
    changePercent() {
      const valueSelect = this.value;
      if (valueSelect === 'other') {
        // Домашнее задание
      } else {
        depositPercent.value = valueSelect;
      }
    }
    depositHandler() {
      if (depositCheck.checked) {
        depositAmount.style.display = 'inline-block';
        depositBank.style.display = 'inline-block';
        this.deposit = true;
        depositBank.addEventListener('change', this.changePercent);
      } else {
        depositAmount.style.display = 'none';
        depositBank.style.display = 'none';
        depositAmount = '';
        depositBank = '';
        this.deposit = false;
        depositBank.removeEventListener('change', this.changePercent);
      }
    }

    addEventListeners() {
      btnStart.addEventListener('click', this.start.bind(this));

      btnPlusExpensesAdd.addEventListener('click', this.addExpensesBlock);
      btnPlusIncomeAdd.addEventListener('click', this.addIncomeBlock);

      btnCancel.addEventListener('click', this.reset.bind(this));

      depositCheck.addEventListener('change', this.depositHandler.bind(this));

      periodSelect.addEventListener('change', function () {
        periodAmount.innerHTML = periodSelect.value;
      });
      rng.addEventListener('input', this.rng);
      salaryAmount.addEventListener('keyup', this.check);
    }
  }
  const newData = new AppData();
  newData.addEventListeners();
  // console.log(appData);

  // let addExp = [];
  // for (let i = 0; i < this.addExpenses.length; i++) {
  //   let element = this.addExpenses[i].trim();
  //   element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
  //   addExp.push(element);
  // };

});