const express = require('express');
const path = require('path');
const shopController = require('../controllers/shop_controller')
const router = express.Router();


router.route('/')
    .get(shopController.getAllShoes)


router.route('/:id')
    .get(shopController.getShoeDetails);
module.exports = router