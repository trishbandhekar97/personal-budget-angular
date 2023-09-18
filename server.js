
const express = require('express');
const app = express();
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
    res.json(budget);
})

app.listen(port, ()=> {
    console.log(`App running on port: ${port}`);
});