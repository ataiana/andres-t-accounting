const express = require('express');

const app = express();

let transactions = [];
let accountBalance = 0;

// GET - Fetches transactions history
app.get('/transaction/balance', (req, res) => {
    res.json({
        success: true,
        result: accountBalance
    });
});

// GET - Fetches transactions history
app.get('/transaction', (req, res) => {
    res.json({
        success: true,
        result: transactions
    });
});

// GET - Fetches transaction
app.get('/transaction/:id', (req, res) => {
    const id = req.params.id;
    const result = transactions.filter((transaction) => transaction.id == id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            result: `Transaction's id must be a number`
        });
    }

    if (result.length === 0) {
        return res.status(400).json({
            success: false,
            result: `The transaction does not exists`
        });
    }

    res.json({
        success: true,
        result: result
    });
});

// POST - Commit new transaction to the account
app.post('/transaction', (req, res) => {
    const type = req.body.type;
    const amount = parseInt(req.body.amount);

    if (isNaN(req.body.amount)) {
        return res.status(400).json({
            success: false,
            result: `Transaction's amount must be a number`
        });
    }

    if (!['debit', 'credit'].includes(type)) {
        return res.status(400).json({
            success: false,
            result: `Transaction's type must be either 'credit' or 'debit'`
        });
    }

    if (!type || !amount) {
        return res.status(400).json({
            success: false,
            result: 'Missing input value/s'
        });
    }

    if (amount <= 0) {
        return res.json({
            success: false,
            result: `Transaction value cannot be less or equal to 0`
        });
    }

    const total =
        type === 'credit' ? accountBalance + amount : accountBalance - amount;

    if (total < 0) {
        return res.json({
            success: false,
            result: `You don't have enough money in your account`
        });
    }

    accountBalance = total;

    const now = new Date();

    const result = {
        id: transactions.length + 1,
        type: type,
        amount: amount,
        effectiveDate: now.toISOString()
    };

    transactions.push(result);

    res.json({
        success: true,
        result
    });
});

module.exports = app;
