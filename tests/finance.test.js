
import test from "node:test";
import assert from "node:assert/strict";

import {
    validateTransaction,
    calculateTotals,
    filterTransactions
} from "../finance.js";


test("Calculate total income correctly", () => {

    const transactions = [
        {
            amount: 5000,
            type: "income"
        },
        {
            amount: 3000,
            type: "income"
        }
    ];

    const result = calculateTotals(transactions);

    assert.equal(result.income, 8000);

});


test("Calculate total expenses correctly", () => {

    const transactions = [
        {
            amount: 1000,
            type: "expense"
        },
        {
            amount: 500,
            type: "expense"
        }
    ];

    const result = calculateTotals(transactions);

    assert.equal(result.expense, 1500);

});


test("Calculate remaining balance correctly", () => {

    const transactions = [
        {
            amount: 10000,
            type: "income"
        },
        {
            amount: 3000,
            type: "expense"
        }
    ];

    const result = calculateTotals(transactions);

    assert.equal(result.balance, 7000);

});


test("Reject invalid transaction amount", () => {

    const transaction = {
        description: "Lunch",
        amount: -100,
        type: "expense",
        category: "Food",
        date: "2026-11-10"
    };

    assert.equal(
        validateTransaction(transaction),
        false
    );

});


test("Filter expenses correctly", () => {

    const transactions = [
        {
            amount: 100,
            type: "expense",
            category: "Food"
        },
        {
            amount: 500,
            type: "income",
            category: "Salary"
        }
    ];

    const result = filterTransactions(
        transactions,
        "expense",
        "Food"
    );

    assert.equal(result.length, 1);

});
