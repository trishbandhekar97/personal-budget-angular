
const express = require('express');
const app = express();
const fs = require("fs");
const port = 3000;

const budget = {
    myBudget: [
    {
        title: 'Rent',
        budget: 515
    },
    {
        title: 'Movies',
        budget: 50
    },
    {
        title: 'Groceries',
        budget: 150
    },
    {
        title: 'Netflix',
        budget: 15
    },
    {
        title: 'Shopping',
        budget: 100
    },
    {
        title: 'Restaurant',
        budget: 65
    },
    {
        title: 'Fuel',
        budget: 120
    },
]}


app.use('/', express.static('public'));


app.get('/hello', (req,res) => {
    res.send('Hello World!');
});

app.get('/budget', (req,res)=>{
    fs.readFile("data.json", "utf-8", (err,jsonData) => {

        if (err) {
            console.log("Error reading file:", err);
            return;
        }

        try {
            const budgetData = JSON.parse(jsonData);
            res.json(budgetData);

        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
})

app.listen(port, ()=> {
    console.log(`App running on port: ${port}`);
});