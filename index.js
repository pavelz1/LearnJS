'use strict';

// const mainHead = document.querySelector('h1');
// mainHead.setAttribute('style', 'color:blue');
// mainHead.title = 'Новый заголовок!';
// mainHead.className = 'new_class';
// console.log(mainHead);
// console.dir(mainHead);
// console.log(document.getElementById);
// console.log(document.querySelector('.main'));
// console.log(document.getElementsByTagName('h1')[0]);
// console.log(document.getElementsByClassName('main'));
// console.log(document.querySelectorAll);


const btnStart = document.getElementById('start');
const btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
const btnPlusExpensesAdd = document.getElementsByTagName('button')[1];
const depCheck = document.querySelector('#dep-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value');
const budgetDayValue = document.getElementsByClassName('budget_day-value');
const expensesMonthValue = document.getElementsByClassName('expenses_month-value');
const additionalIncomeValue = document.getElementsByClassName('additional_income-value');
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
const incomePeriodValue = document.getElementsByClassName('income_period-value');
const targetMonthValue = document.getElementsByClassName('target_month-value');
const periodSelect = document.querySelector('input.period-select');
const periodAmount = document.querySelector('.title.period-amount');
const salaryAmount = document.querySelector('input.salary-amount');
const incomeTitle = document.querySelector('input.income-title');
const incomeAmount = document.querySelector('input.income-amount');
const expensesTitle = document.querySelector('input.expenses-title');
const expensesAmount = document.querySelector('input.expenses-amount');
const additionalExpensesItem = document.querySelector('input.additional_expenses-item');
const targetAmount = document.querySelector('input.target-amount');


// btnStart.setAttribute('style', 'color:blue');
// btnPlusIncomeAdd.innerHTML = "Hello World";
// btnPlusExpensesAdd.innerHTML = "Hello World";
// depCheck.innerHTML = "Hello World";
// salaryAmount.setAttribute('style', 'border:1px solid black');
// incomeTitle.setAttribute('style', 'border:1px solid black');
// incomeAmount.setAttribute('style', 'border:1px solid black');
// expensesTitle.setAttribute('style', 'border:1px solid black');
// expensesAmount.setAttribute('style', 'border:1px solid black');
// additionalExpensesItem.setAttribute('style', 'border:1px solid black');
// targetAmount.setAttribute('style', 'border:1px solid black');
// periodSelect.setAttribute('style', 'border:1px solid black');
// periodAmount.setAttribute('style', 'color:pink');

console.log('btnStart');
console.dir('btnPlusIncomeAdd');
console.dir('btnPlusExpensesAdd');
console.log('depCheck');
console.log('budgetMonthValue');
console.log('additionalIncomeItem');
console.log('budgetDayValue');
console.log('expensesMonthValue');
console.log('additionalIncomeValue');
console.log('additionalExpensesValue');
console.log('incomePeriodValue');
console.log('targetMonthValue');
console.log('periodSelect');
console.log('salaryAmount');
console.log('incomeTitle');
console.log('periodAmount');



// function myFunc() {
//   let additionalIncomeItem = document.querySelectorAll(".additional_income-item"); // находим все элементы с классом block
//   for (let i = 0; i < additionalIncomeItem.length; i++) { // проходим циклом по всем элементам объекта
//     additionalIncomeItem[i].style.border = "1px solid blue"; // устанавливаем красный цвет текста каждому элементу
//   }
// }
// myFunc();