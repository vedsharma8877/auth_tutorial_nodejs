const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
    console.log('MongoDB is connected');
}).catch((err) => {
    console.error(err);
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});