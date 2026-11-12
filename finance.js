
export function validateTransaction(transaction) {

    if (!transaction.description.trim()) {
        return false;
    }

    if (!Number.isFinite(Number(transaction.amount)) ||
        Number(transaction.amount) <= 0) {
        return false;
    }

    if (!["income", "expense"].includes(transaction.type)) {
        return false;
    }

    if (!transaction.category || !transaction.date) {
        return false;
    }

    return true;
}


export function calculateTotals(transactions) {

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        const amount = Number(transaction.amount);

        if (transaction.type === "income") {
            income += amount;
        }

        else if (transaction.type === "expense") {
            expense += amount;
        }

    });

    return {
        income,
        expense,
        balance: income - expense
    };
}


export function filterTransactions(
    transactions,
    type = "all",
    category = "all"
) {

    return transactions.filter(transaction => {

        const typeMatches =
            type === "all" || transaction.type === type;

        const categoryMatches =
            category === "all" ||
            transaction.category === category;

        return typeMatches && categoryMatches;

    });
}
