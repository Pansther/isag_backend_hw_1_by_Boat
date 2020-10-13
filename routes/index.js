const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to ISAG Backend Homework#1');
});

module.exports = router;