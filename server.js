const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./middleware/log-events');

const PORT = process.env.PORT || 5000;

// custom middleware logger
app.use( logger)

// built-in middleware to handle urlencoded data, i.e. form data
app.use(express.urlencoded({ extended: false}));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, 'views', 'static')))

app.get('^/$|/home(.html)?', (req, res)=> {
    res.sendFile(path.join(__dirname, 'views', 'templates', 'home.html'))
});

app.get('/shop(.html)?', (req, res)=> {
    res.sendFile(path.join(__dirname, 'views', 'templates', 'shop.html'))
})

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'templates', '404.html'))
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
