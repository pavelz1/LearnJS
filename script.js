'use strict';

const book = document.querySelectorAll('.book'),
      adv = document.querySelector('.adv'),
      headTitle = document.querySelectorAll('h2 a'),
      bookList = document.querySelectorAll('.book li'),
      bodyImg = document.querySelector('body'),
      elemClone = bookList[25].cloneNode(true);

bodyImg.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');
book[0].before(book[1]);
book[2].before(book[4]);
book[5].after(book[2]);

headTitle[4].textContent = 'Книга 3. this и Прототипы Объектов'; // Добавить новый текст

adv.remove(); // Удаление рекламы
bookList[4].before(bookList[6]);
bookList[4].before(bookList[8]);
bookList[10].before(bookList[2]);
bookList[51].after(bookList[48]);
bookList[47].after(bookList[55]);
bookList[53].after(bookList[51]);

elemClone.textContent = 'Глава 8: За пределами ES6';

bookList[25].append(elemClone);
console.log(elemClone);


// elemClone.classList.add('newElem');
// elemClone.textContent = 'newElem'; // Добавить новый текст

// console.log(bookList);
// console.log(bookList[48]);

// book[1].append([]); // Вставить внутрь, в конец родителя
// book[1].prepend([]); // Вставить внутрь, в начало родителя
// book[1].remove([]); // Удалить
// book[1].before([]); // До элемента, перед элементом
// book[1].after([]); // После элемента
// book[1].replaseWith([]); // Заменяет элемент
// book[1].replaseWith('Привет'); // Заменяет элемент
// book[1].replaseWith('Привет'); // Заменяет элемент
// const elemClone = book[3].cloneNode(true); // Метод Копировать, Клонировать

// elemClone.classList.add('newElem');
// elemClone.textContent = 'newElem'; // Добавить новый текст
// book[1].before(elemClone);

// book[0].textContent = 'newElem'; // Добавить новый текст

// book[0].innerHTML = '<b>newElem</b>'; // Добавить новый текст с HTML, но затирает все элементы
// console.log(book[0].textContent);

// const newElem = document.createElement('li'); // Содание нового элемента
// newElem.textContent = 'New element'; // Создание содержимого элемента
// newElem.classList.add('new_elem'); // Создание нового класса

// book[1].append(newElem); 

// console.log(newElem);

// headTitle.insertAdjacentText('beforebegin', 'beforebegin');
// headTitle.insertAdjacentText('afterend', 'afterend');
// headTitle.insertAdjacentText('afterbegin', 'afterbegin');
// headTitle.insertAdjacentText('beforeend', 'beforeend');

// headTitle.insertAdjacentHTML('beforebegin', '<h1>Title</h1>');
// headTitle.insertAdjacentHTML('afterend', '<h1>Title</h1>');
// headTitle.insertAdjacentHTML('afterbegin', '<p>Text</p>');
// headTitle.insertAdjacentHTML('beforeend', '<p>Text</p>');