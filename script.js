'use strict';

// Bankist App

// Account Data
const account1 = {
  owner: 'Aditya Saxena',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  movementDates: [
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-03-10T17:01:17.194Z',
    '2021-03-10T17:01:17.194Z',
    '2021-03-15T23:36:17.929Z',
    '2021-03-16T10:51:36.790Z',
  ],
  pin: 1234,
  interestRate: 4, //%
};

const account2 = {
  owner: 'Rashmi Rathore',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movementDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  pin: 1111,
  interestRate: 1.2, //%
};

const account3 = {
  owner: 'Akshay Rawat',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  movementDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  pin: 2222,
  interestRate: 1.5, //%
};

const account4 = {
  owner: 'Pranav Shukla',
  movements: [430, 1000, 700, 50, 90],
  movementDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
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
const labelDate = document.querySelector('.date');
const labelTimer = document.querySelector('.timer');

// Calculating usernames

accounts.forEach(account => {
  account['username'] = account.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
});

//Format date function

const formatMovementDates = date => {
  const calcDaysPassed = date => {
    const daysPassed = Math.round(
      Math.abs((new Date() - date) / (1000 * 60 * 60 * 24))
    );
    return daysPassed;
  };

  const daysPassed = calcDaysPassed(date);

  if (daysPassed == 0) return 'Today';
  if (daysPassed == 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const dateStr = `${date.getDate()}`.padStart(2, 0);
  // const monthStr = `${date.getMonth() + 1}`.padStart(2, 0);
  // const yearStr = `${date.getFullYear()}`.padStart(2, 0);

  // return `${dateStr}/${monthStr}/${yearStr}`;

  // Internationalising date

  return new Intl.DateTimeFormat(navigator.language).format(date);
};

// Displaying Movements

const displayMovements = function (account, sort = false) {
  movementsContainer.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (val, i) {
    //Get Date
    const date = new Date(account.movementDates[i]);

    const finalDateStr = formatMovementDates(date);

    const type = val >= 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${finalDateStr}</div>
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
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplayDeposit(acc.movements);
  calcDisplayWithdrawal(acc.movements);
  calcDisplayInterest(acc);

  //Display Date
  // const currentDate = new Date();
  // const dateStr = `${currentDate.getDate()}`.padStart(2, 0);
  // const monthStr = `${currentDate.getMonth() + 1}`.padStart(2, 0);
  // const yearStr = `${currentDate.getFullYear()}`.padStart(2, 0);

  // const finalDateStr = `${dateStr}/${monthStr}/${yearStr}`;
  // labelDate.textContent = finalDateStr;

  //Internationalising dates
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  labelDate.textContent = new Intl.DateTimeFormat(
    navigator.language,
    options
  ).format(new Date());
};

//--------------- Login Part ---------------------

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Prevent Submitting and reload
  e.preventDefault();

  //Check username and retrieve account

  currentAccount = accounts.find(
    account => account.username === inputUser.value
  );

  //Check pin
  if (currentAccount?.pin === Number(inputPin.value)) {
    //Change welcome message
    labelWelcome.textContent = `Welcome again, ${
      currentAccount.owner.split(' ')[0]
    }`;

    //Lose focus from input
    inputPin.value = inputUser.value = '';
    inputPin.blur();

    //Display App

    mainApp.style.opacity = 100;

    //Update UI
    updateUI(currentAccount);

    if (timer) clearInterval(timer);
    timer = startTimer();
  }
});

// ------------------- Transfer Functionality -------------------

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  //Get amount
  const amount = Number(inputTransferAmount.value);

  //Get transfer account
  const recieverAcc = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });

  //Check valid transfer
  if (
    amount > 0 &&
    recieverAcc &&
    recieverAcc.username !== currentAccount.username &&
    amount <= currentAccount.balance
  ) {
    //Transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    //Store dates
    currentAccount.movementDates.push(new Date().toISOString());
    recieverAcc.movementDates.push(new Date().toISOString());

    //Update UI
    updateUI(currentAccount);

    if (timer) clearInterval(timer);
    timer = startTimer();
  }

  //Loose focus from transfer input
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();
});
//----------- Close Account Functionality --------------

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  //Get the account index
  const index = accounts.findIndex(
    acc => acc.username === inputCloseUser.value
  );

  if (index && accounts[index].pin === Number(inputClosePin.value)) {
    //Delete Account
    accounts.splice(index, 1);

    //Hide UI
    mainApp.style.opacity = 0;
  }

  //Clear and Loose focus
  inputCloseUser.value = inputClosePin.value = '';
  inputClosePin.blur();
  inputCloseUser.blur();
});

// ----------- Loan Functionality -------------

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  //Rule - Give loan if user has atleast one deposit of >0.1*amount

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    currentAccount.movements.push(amount);

    currentAccount.movementDates.push(new Date().toISOString());

    // loose focus
    inputLoanAmount.value = '';
    inputLoanAmount.blur();

    if (timer) clearInterval(timer);
    timer = startTimer();
  }

  updateUI(currentAccount);
});

// ---------------- Sort functionality ----------------

let sorted = false;

btnSort.addEventListener('click', e => {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);

  sorted = !sorted;
});

// Timer functionality
let timer;
function startTimer() {
  let time = 10 * 60;

  const timerCallback = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    //Logout
    if (time == 0) {
      clearInterval(timer);
      //Hide UI
      mainApp.style.opacity = 0;
    }

    time--;
  };

  timerCallback();
  return setInterval(timerCallback, 1000);
}
