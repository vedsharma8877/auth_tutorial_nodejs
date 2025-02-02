const express = require('express');
const router = express.Router();

router.post('/register', async (req, res, next) => {
    res.send('Register');
});

router.post('/login', async (req, res, next) => {
    res.send('Login');
});

router.post('/refresh-token', async (req, res, next) => {
    res.send('Refresh Token');
});

router.delete('/logout', async (req, res, next) => {
    res.send('Logout');
});

module.exports = router;