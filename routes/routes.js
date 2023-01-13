const express = require('express');
const path = require('path');

const router = express.Router()

router.get('^/$|/home(.html)?', (req, res)=> {
    res.sendFile(path.join(__dirname, '..', 'views', 'templates', 'home.html'))
});

router.get('/shop(.html)?', (req, res)=> {
    res.sendFile(path.join(__dirname, '..', 'views', 'templates', 'shop.html'))
})

module.exports = router;