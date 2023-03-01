var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// MORE IMPORTS
require("dotenv").config()
const passport = require("passport")
var mongoose = require("mongoose")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);

// MongoDB CONNECTION
const mongoDB = "mongodb://localhost:27017/courseproject"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error"))
const User = require("./models/User");
const Post = require("./models/Post")
// MongoDB CONNECTION DONE

// JWT SETUP
var JwtStrategy = require("passport-jwt").Strategy, ExtractJwt = require("passport-jwt").ExtractJwt
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({email: jwt_payload.email}, function(err, user) {
    if (err) {
      return done(err, false)
    }
    if(user) {
      return done(null, user)
    } else {
      return done(null, false)
    }

  })
}))
// JWT SETUP DONE





if (process.env.NODE_ENV === "development") {
    var corsOptions = {
        origin: "http//localhost:3000",
        optionsSuccessStatus: 200,
    }
    app.use(cors(corsOptions))
}

module.exports = app;
