const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect(process.env.MONGODB)
.then((m) => console.log("database connected"))
.catch((err) => console.log(err));

app.get('/', asyncHandler(async (req, res) => {
    res.render('index');
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  

app.listen(process.env.PORT || 3000, () => console.log('server up!'));