// script.js

let participants = [];
let expenses = [];

// Function to add a participant
function addParticipant() {
    const participantName = document.getElementById('participantName').value.trim();

    if (participantName === '') {
        alert("Participant name cannot be empty.");
        return;
    }

    participants.push(participantName);
    updateParticipantList();
    updatePayerOptions();
    document.getElementById('participantName').value = ''; // Clear input after adding
}

// Function to update the participant list UI
function updateParticipantList() {
    const participantList = document.getElementById('participantList');
    participantList.innerHTML = '';

    participants.forEach(participant => {
        const listItem = document.createElement('li');
        listItem.textContent = participant;
        participantList.appendChild(listItem);
    });
}

// Function to update the payer options in the expense form
function updatePayerOptions() {
    const expensePayer = document.getElementById('expensePayer');
    expensePayer.innerHTML = '<option value="" disabled selected>Select Payer</option>';

    participants.forEach(participant => {
        const option = document.createElement('option');
        option.value = participant;
        option.textContent = participant;
        expensePayer.appendChild(option);
    });
}

// Function to add an expense
function addExpense() {
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const payer = document.getElementById('expensePayer').value;

    if (!payer || isNaN(amount) || amount <= 0) {
        alert("Please provide valid inputs for both amount and payer.");
        return;
    }

    expenses.push({ amount, payer });
    updateExpenseSummary();
    document.getElementById('expenseAmount').value = ''; // Clear input after adding
}

// Function to update the expense summary and calculate split
function updateExpenseSummary() {
    const expenseSummary = document.getElementById('expenseSummary');
    const totalExpense = document.getElementById('totalExpense');

    expenseSummary.innerHTML = '';
    let total = 0;

    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.payer} paid ${expense.amount}`;
        expenseSummary.appendChild(listItem);
        total += expense.amount;
    });

    const splitAmount = total / participants.length;
    totalExpense.textContent = `Each participant should pay: ${splitAmount.toFixed(2)}`;
}

// Currency conversion (basic)
function convertCurrency() {
    const currency = document.getElementById('currencyConverter').value;
    const totalExpenseText = document.getElementById('totalExpense').textContent;

    const conversionRates = { 'USD': 1, 'EUR': 0.85, 'INR': 74 };
    const amount = parseFloat(totalExpenseText.match(/\d+\.?\d*/)[0]);

    if (!isNaN(amount)) {
        const convertedAmount = amount * conversionRates[currency];
        document.getElementById('totalExpense').textContent = `Converted amount in ${currency}: ${convertedAmount.toFixed(2)}`;
    }
}

// Reset the app
function resetApp() {
    participants = [];
    expenses = [];
    updateParticipantList();
    updateExpenseSummary();
    document.getElementById('expensePayer').innerHTML = '<option value="" disabled selected>Select Payer</option>';
    document.getElementById('totalExpense').textContent = '';
}