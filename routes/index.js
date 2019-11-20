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
    const result = transactions.filter( (transaction) => transaction.id == id);
    res.json({
        success: true,
        result: result
    });
});

// POST - Commit new transaction to the account
app.post('/transaction', (req, res) => {
    const body = req.body;

    if (!body.type || !body.amount) {
        return res.status(400).json({
            success: false,
            result: 'Missing input value/s'
        });
    }

    if (parseInt(body.amount) <= 0) {
        return res.json({
            success: false,
            result: `Transaction value cannot be less or equal to 0`
        });
    }

    const total = body.type === 'credit' ? accountBalance + parseInt(body.amount) : accountBalance - parseInt(body.amount);

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
        type: body.type,
        amount: body.amount,
        effectiveDate: now.toISOString()
    };

    transactions.push(result);

    res.json({
        success: true,
        result
    });
});

module.exports = app;
