const balanceEl = document.getElementById('balance');
const moneyPlusEl = document.getElementById('money-plus');
const moneyMinusEl = document.getElementById('money-minus');
const form = document.getElementById('form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const transactionList = document.getElementById('list');

const localStorageTransactions = JSON.parse(localStorage.getItem("transaction"));

let transactions = localStorageTransactions !== null ? localStorageTransactions : [] ;


const starter = () => {
    transactionList.innerHTML = "";
    
    updateDOMValues();
    transactions.forEach(transaction => addTransactionToHistory(transaction));
}

starter();


form.addEventListener("submit", (event) => {
    event.preventDefault();
    doStaff();
})

const doStaff = () => {
    if(textInput.value.trim() === "" && amountInput.value.trim() === ""){
        alert("Please add text and amount!")
    } else {
        const transaction = {
            id: Math.floor(Math.random() * 1000),
            text: textInput.value,
            amount: +amountInput.value
        };

        transactions.push(transaction);
        
        addTransactionToHistory(transaction);

        updateDOMValues();

        updateLocalStorage();
         
        console.log(transaction);
        console.log(transactions);
        
        textInput.value = '';
        amountInput.value = '';
    }
}

const addTransactionToHistory = (transaction) => {
    const { text, amount, id } = transaction;
    const customClass = amount < 0 ? 'minus' : 'plus'
    const customSign = amount < 0 ? '-' : '+'
    const historyItem = `
    <li class=${customClass}>
         ${text}<span>${customSign}$${Math.abs(amount)}</span><button onclick='deleteHistory(${id})' class="delete-btn">x</button>
    </li> 
    `


    transactionList.innerHTML += historyItem;

    
}

const deleteHistory = (id) => {
    transactions = transactions.filter(el => el.id !== id);
    updateLocalStorage();

    starter();
}

const updateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

const updateDOMValues = () => {
    const amounts = transactions.map(amount => amount.amount);

    const balanceTotal = amounts.reduce((acc, el) =>{
        acc+=el;
        return acc;
    }, 0).toFixed(2);

    const incomes = amounts.filter(el => el > 0).reduce((acc, el) => acc+el, 0).toFixed(2);
    const expenses = (amounts.filter(el => el < 0).reduce((acc, el) => acc+el, 0) * -1).toFixed(2);

    const customSign = balanceTotal < 0 ? "-" : "+"
    balanceEl.innerText = `${customSign}$${Math.abs(balanceTotal)}`;
    moneyMinusEl.innerText = `-$${expenses}`;
    moneyPlusEl.innerText = `+$${incomes}`;
}