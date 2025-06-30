const express = require('express');
const app =express();

app.use(express.static('public'));

//rutas
module.exports = app;
