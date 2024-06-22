const express = require('express');

const {
    getCurrencies,
    getCurrencyBySymbol

}= require('../controllers/currencies.controller');

const router = express.Router();

router.get('/',getCurrencies);
router.get('/:symbol', getCurrencyBySymbol);

module.exports = router;
