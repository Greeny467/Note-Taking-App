const express = require('express');

//Import files with the routes
const notesRouter = require('./notes');

//use instance of express to apply middleware and routing
const app = express();
app.use('/notes', notesRouter);

module.exports = app;