const balanceEl = document.getElementById('balance');
const moneyPlusEl = document.getElementById('money-plus');
const moneyMinusEl = document.getElementById('money-minus');
const form = document.getElementById('form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const transactionList = document.getElementById('list');

const localStorageTransactions = JSON.parse(localStorage.getItem("transaction"));

let transactions = localStorageTransactions !== null ? localStorageTransactions : [] ;


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
        
        updateLocalStorage();
        updateDOMValues();
         
        console.log(transaction);
        console.log(transactions);
        
        textInput.value = '';
        amountInput.value = '';
    }
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

    balanceEl.innerText = `$${balanceTotal}`;
    moneyMinusEl.innerText = `-$${expenses}`;
    moneyPlusEl.innerText = `+$${incomes}`;
}