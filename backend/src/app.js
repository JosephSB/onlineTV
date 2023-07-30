const express = require('express');
const cors = require('cors');
const config = require('./config');
const router = require('./router/app.routes');

const app = express()
app.set("PORT", config.PORT);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

module.exports = app