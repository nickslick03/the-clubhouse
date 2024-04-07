const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const User = require('./models/User');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();

// View
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Database
mongoose.connect(process.env.MONGODB)
.then((m) => console.log("database connected"))
.catch((err) => console.log(err));

// Authentication
app.use(session({ 
  secret: 'Jesus', 
  resave: false, 
  saveUninitialized: true,
  cookie: {
    sameSite: 'strict'
  }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (user == null) {
        return done(null, false, { message: "User does not exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


// Routing
const indexRouter = require('./routes/index');
const signupRouter = require('./routes/sign-up');
const loginRouter = require('./routes/login');
const joinClubRouter = require('./routes/join-club');
const newMessageRouter = require('./routes/new-message');
const joinAdminRouter = require('./routes/join-admin');
const deleteMessageRouter = require('./routes/delete-message');
app.use('/', indexRouter);
app.use('/sign-up', signupRouter);
app.use('/login', loginRouter);
app.use('/join-club', joinClubRouter);
app.use('/new-message', newMessageRouter);
app.use('/join-admin', joinAdminRouter);
app.use('/delete-message', deleteMessageRouter);
app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
})

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

module.exports = app;