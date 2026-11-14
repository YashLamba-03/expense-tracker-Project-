
import {
    validateTransaction,
    calculateTotals,
    filterTransactions
} from "./finance.js";

// Get HTML elements
const form = document.getElementById("transaction-form");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");

const transactionList =
    document.getElementById("transaction-list");

const emptyMessage =
    document.getElementById("empty-message");

const typeFilter = document.getElementById("filter-type");
const categoryFilter =
    document.getElementById("filter-category");

// Load saved transactions
let transactions = [];

try {
    transactions = JSON.parse(
        localStorage.getItem("transactions")
    ) || [];
} catch {
    transactions = [];
}

// Format currency
function formatMoney(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
    }).format(amount);
}

// Save transactions
function saveData() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

// Update dashboard
function updateDashboard() {

    const totals = calculateTotals(transactions);

    balanceElement.textContent =
        formatMoney(totals.balance);

    incomeElement.textContent =
        formatMoney(totals.income);

    expenseElement.textContent =
        formatMoney(totals.expense);
}

// Display transactions
function displayTransactions() {

    const filtered = filterTransactions(
        transactions,
        typeFilter.value,
        categoryFilter.value
    );

    transactionList.innerHTML = "";

    emptyMessage.style.display =
        filtered.length === 0 ? "block" : "none";

    filtered.forEach(transaction => {

        const row = document.createElement("tr");

        const description = document.createElement("td");
        description.textContent = transaction.description;

        const category = document.createElement("td");
        category.textContent = transaction.category;

        const date = document.createElement("td");
        date.textContent = transaction.date;

        const type = document.createElement("td");
        type.textContent = transaction.type;

        const amount = document.createElement("td");
        amount.textContent = formatMoney(
            Number(transaction.amount)
        );

        amount.className =
            transaction.type === "income"
                ? "income-text"
                : "expense-text";

        const action = document.createElement("td");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            deleteTransaction(transaction.id);
        });

        action.appendChild(deleteButton);

        row.append(
            description,
            category,
            date,
            type,
            amount,
            action
        );

        transactionList.appendChild(row);

    });
}

// Add new transaction
function addTransaction(event) {

    event.preventDefault();

    const transaction = {

        id: crypto.randomUUID(),

        description:
            document.getElementById("description").value.trim(),

        amount:
            Number(document.getElementById("amount").value),

        type:
            document.getElementById("type").value,

        category:
            document.getElementById("category").value,

        date:
            document.getElementById("date").value

    };

    if (!validateTransaction(transaction)) {
        alert("Please enter valid transaction details.");
        return;
    }

    transactions.push(transaction);

    saveData();

    form.reset();

    updateDashboard();
    displayTransactions();
}

// Delete transaction
function deleteTransaction(id) {

    transactions = transactions.filter(
        transaction => transaction.id !== id
    );

    saveData();

    updateDashboard();
    displayTransactions();
}

// Event listeners
form.addEventListener("submit", addTransaction);

typeFilter.addEventListener(
    "change",
    displayTransactions
);

categoryFilter.addEventListener(
    "change",
    displayTransactions
);

// Initial application display
updateDashboard();
displayTransactions();
