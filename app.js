require('dotenv').config();

const mongoose = require('mongoose');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const entriesRouter = require('./routes/entries');

const app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);

app.use('/entries', entriesRouter);



mongoose.connect(process.env.MONGODB_URL)

  .then(() => {
    console.log('Connected to MongoDB!');
  })

  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });



app.use(function (req, res, next) {

  next(createError(404));

});



app.use(function (err, req, res, next) {

  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  res.status(err.status || 500);

  res.render('error');

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


module.exports = app;