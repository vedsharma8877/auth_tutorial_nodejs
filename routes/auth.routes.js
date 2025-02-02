const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const User = require('../models/user.model')
const { authSchema } = require('../helpers/validation_schema');
const { signAccessToken } = require('../helpers/jwt_helper');

router.post('/register', async (req, res, next) => {
    console.log(req.body);
    try {
        const result = await authSchema.validateAsync(req.body)
        const doesExist = await User.findOne({ email: result.email })
        if (doesExist) throw createError.Conflict(`${result.email} is already been registered.`)
        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)
        res.send({ accessToken})
    } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(error)
    }
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