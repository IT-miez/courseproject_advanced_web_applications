const express = require('express');

const router = express.Router();

// MORE IMPORTS
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const { urlencoded } = require('express');

// AUTHENCTICATION AND MONGO
mongoose.set('strictQuery', true);
const jwt = require('jsonwebtoken');
const passport = require('passport');

// MODELS FOR MONGO
const User = require('../models/User');
const Post = require('../models/Post');
const Comments = require('../models/Comment');
// IMPORT LIST DONE //

router.get('/testi', (req, res, next) => res.status(200).send({ msg: 'Proxy works' }));

// REGISTER ROUTE
router.post(
  '/register',
  body('password').isStrongPassword(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        throw err;
      }
      if (user) {
        return res.status(403).json({ msg: 'Username already in use.' });
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;

          // CREATE DATE FOR USER CREATION DATE
          // ADD USER TO USER DATABASE
          const date = new Date();
          const currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
          User.create(
            {
              email: req.body.email,
              password: hash,
              bio: req.body.bio,
              creationdate: currentDate,
            },
            (err, ok) => {
              if (err) throw err;
              return res.status(200).send({ msg: 'register worked' });
            },
          );
        });
      });
    });
  /* res.send("ok") */
  },
);

// LOGIN ROUTE
router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(403).json({ msg: 'Invalid credentials' });
    }
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const jwtPayload = {
          id: user._id,
          email: user.email,
        };
        jwt.sign(
          jwtPayload,
          process.env.SECRET,
          {
            expiresIn: '1d',
          },
          (err, token) => {
            res.json({ success: true, token, message: 'ok' });
          },
        );
      } else {
        res.status(400).send({ msg: 'Invalid credentials' });
      }
    });
  });
});

// ADD A POST -ROUTE
router.post('/addPost', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const date = new Date();
  const currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

  Post.create(
    {
      title: req.body.title,
      code: req.body.code,
      creator: req.user._id,
      creationdate: currentDate,
    },
    (err) => {
      if (err) throw err;
      return res.status(200).send({ msg: 'post added to database' });
    },
  );

  // res.json({msg:"check console"})
});

// SEND ALL POSTS / FOR POSTSPAGE
router.get('/getPosts', async (req, res, next) => {
  const PostsData = await Post.find({});
  res.status(200).send(PostsData);
});

// SEND ONE POST / OPEN A POST
router.get('/posts/:postID', (req, res, next) => {
  const post = req.params.postID;

  Post.findById(post, (err, gottenPost) => {
    if (err) return next(err);
    if (gottenPost) {
      res.status(200).send(gottenPost);
    }
  });
});

// LOAD COMMENTS TO A POST / FOR A OPENED POST
router.get('/posts/:postID/comments', (req, res, next) => {
  const givenPostID = req.params.postID;

  Comments.find({ commentToPost: givenPostID }, (err, allComments) => {
    if (err) return next(err);
    if (allComments) {
      res.status(200).send(allComments);
    }
  });
});

// LOAD USER DATA FOR PROFILE PAGE
router.get('/profile/:userID', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const user = req.params.userID;

  User.findById(user, (err, gottenUser) => {
    if (err) return next(err);
    if (gottenUser) {
      res.status(200).send(gottenUser);
    }
  });
});

// ADD A COMMENT
// NEED TO BE AUTHENTICATED
router.post('/addComment/:postID', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const date = new Date();
  const currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

  Comments.create(
    {
      commentToPost: req.body.commentToPost,
      comment: req.body.comment,
      creator: req.user._id,
      creationdate: currentDate,
    },
    (err) => {
      if (err) throw err;
      return res.status(200).send({ msg: 'comment added' });
    },
  );

  // res.json({msg:"check console"})
});

// JUST FOR RANDOM TESTING
router.get('/private', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ email: req.user.email });
});

module.exports = router;
