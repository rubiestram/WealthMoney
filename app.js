const btnAddUser = document.getElementById('add-user');
const btnDoubleMoney = document.getElementById('double-money');
const btnShowMillionaires = document.getElementById('show-millionaires');
const btnSortMillionaries = document.getElementById('sort-millionaires');
const btnCalculateTotal = document.getElementById('calculate-wealth');
const containerUsers = document.getElementById('container__users');
const sumaryTotal = document.getElementById('total');
const containerTotal = document.getElementById('container-total');

let users = [];

document.addEventListener('DOMContentLoaded', () => {
    btnAddUser.addEventListener('click', addUser);
    btnDoubleMoney.addEventListener('click', doubleMoney);
    btnShowMillionaires.addEventListener('click', showMillionaires);
    btnSortMillionaries.addEventListener('click', sortMillionaires);
    btnCalculateTotal.addEventListener('click', calculateWealth);
});

async function getRandomUser() {
    const url = 'https://randomuser.me/api/';
    const response = await fetch(url);
    const data = await response.json();
    const {first, last} = data.results[0].name;
    const user = {
        first,
        last,
        money: getRandomMoney(1_000_000)
    };
    return user;
}

async function addUser() {
    const randomUser = await getRandomUser();
    users.push(randomUser);
    createUserHtmlElement(randomUser);
}

function doubleMoney() {
    users = users.map(user =>({
        ...user,
        money: user.money * 2
    }));
    updateUI();
}

function showMillionaires() {
    users = users.filter(user => user.money >= 1_000_000);
    updateUI();
}

function sortMillionaires() {
    users.sort((userA, userB) => userB.money - userA.money);
    updateUI();
}

function calculateWealth() {
    const totalValue = users.reduce((accumulator, currentValue) => accumulator + currentValue.money, 0);
    sumaryTotal.textContent = getFormatCurrency(totalValue);
    containerTotal.classList.remove('hidden');
};

function updateUI() {
    containerUsers.replaceChildren();
    users.forEach(user => createUserHtmlElement(user));
}

function createUserHtmlElement(user) {
    const userItem = `
        <div class="container__person">
            <span>${user.first} ${user.last}</span>
            <span>${getFormatCurrency(user.money)}</span>
        </div>
    `;

    containerUsers.insertAdjacentHTML('beforeend', userItem);
}

function getRandomMoney(maxMoney) {
    return Math.floor(Math.random() * (maxMoney -1) + 1);
}

function getFormatCurrency(money) {
    return money.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigit: 2,
        maximumFractionDigit: 2
    });
}