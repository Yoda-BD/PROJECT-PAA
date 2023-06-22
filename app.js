require('dotenv').config();

const routes = require('./routes');

const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.use((req, res, next) => {
    return res.status(404).json({
        message: '404. Page Not Found!',
    });
});

app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message,
    });
});

app.listen(PORT || 3000, '0.0.0.0', () => {
    console.log(`Running on port ${PORT || 3000}`);
});
