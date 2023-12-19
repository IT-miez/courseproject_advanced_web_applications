const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// MORE IMPORTS
require('dotenv').config();
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');

const JwtStrategy = require('passport-jwt').Strategy;
const
  { ExtractJwt } = require('passport-jwt');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);

// MongoDB CONNECTION
const mongoDB = 'mongodb://localhost:27017/courseproject';
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
// eslint-disable-next-line
db.on('error', console.error.bind(console, 'MongoDB connection error'));
const User = require('./models/User');
const Post = require('./models/Post');
// MongoDB CONNECTION DONE

// JWT SETUP

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
passport.use(new JwtStrategy(opts, ((jwtPayload, done) => {
  User.findOne({ email: jwtPayload.email }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
})));
// JWT SETUP DONE

if (process.env.NODE_ENV === 'development') {
  const corsOptions = {
    origin: 'http//localhost:3000',
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
}

module.exports = app;
