const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/init_mongodb');

const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
    res.send('Hello World!');
});

app.use('/auth', authRoutes);

app.use(async (req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
}    
)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});