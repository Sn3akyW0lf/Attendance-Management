const path = require('path');

const express = require('express');

const groceryController = require('../controllers/grocery');

const router = express.Router();

router.post('/add-item', groceryController.postAddItem)

router.get('/get-items', groceryController.getItems);

router.post('/delete-item/:itmId', groceryController.postDeleteItem);

module.exports = router;