'use strict';

// Bankist App

// Account Data
const account1 = {
  owner: 'Aditya Saxena',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1234,
  interestRate: 4, //%
};

const account2 = {
  owner: 'Rashmi Rathore',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 1111,
  interestRate: 1.2, //%
};

const account3 = {
  owner: 'Akshay Rawat',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 2222,
  interestRate: 1.5, //%
};

const account4 = {
  owner: 'Pranav Shukla',
  movements: [430, 1000, 700, 50, 90],
  pin: 4444,
  interestRate: 3, //%
};

const accounts = [account1, account2, account3, account4];

// Elements
const movementsContainer = document.querySelector('.movements');
const labelBalance = document.querySelector('.balance__value');
const labelSummaryIn = document.querySelector('.summary__value--in');
const labelSummaryOut = document.querySelector('.summary__value--out');
const labelInterest = document.querySelector('.summary__value--interest');
const btnLogin = document.querySelector('.login_btn');
const inputPin = document.querySelector('.login_input--pin');
const inputUser = document.querySelector('.login_input--user');
const mainApp = document.querySelector('.app');
const labelWelcome = document.querySelector('.welcome');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnClose = document.querySelector('.form__btn--close');
const inputCloseUser = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const btnLoan = document.querySelector('.form__btn--loan');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const btnSort = document.querySelector('.btn--sort');

// Calculating usernames

accounts.forEach(account => {
  account['username'] = account.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
});

// Displaying Movements

const displayMovements = function (movements, sort = false) {
  movementsContainer.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (val, i) {
    const type = val >= 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${val.toFixed(2)}Rs</div>
    </div>
        `;

    movementsContainer.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculating and displaying balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = ``;
  labelBalance.textContent = `${acc.balance.toFixed(2)}Rs`;
};

//Calculating and Displaying In (deposits) and Out (withdrawals)
const calcDisplayDeposit = movements => {
  labelSummaryIn.textContent = movements
    .filter(curr => curr > 0)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);
};

const calcDisplayWithdrawal = movements => {
  labelSummaryOut.textContent = movements
    .filter(curr => curr < 0)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);
};

// Calc and displaying interests
const interestRate = 0.04;
const calcDisplayInterest = account => {
  labelInterest.textContent = `${account.movements
    .filter(cur => cur > 0)
    .map(cur => (account.interestRate * cur) / 100)
    .filter(cur => cur > 1)
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2)}`;
};

//Update UI Function
const updateUI = acc => {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplayDeposit(acc.movements);
  calcDisplayWithdrawal(acc.movements);
  calcDisplayInterest(acc);
};

