require('dotenv').config()

const express = require('express');
const cors = require('cors');

const app = express();
const routes = require('./routes');
const mysql = require('./configs/sequelize');

mysql.connection();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("API is working");
});

const port = process.env.PORT || 0;
const listener = app.listen(port, () => {
    console.log(`${ process.env.npm_package_name } v${ process.env.npm_package_version }`);
    console.log(`Listen on port ${ listener.address().port }`);
});

module.exports = app;
