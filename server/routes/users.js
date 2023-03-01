var express = require('express');
var router = express.Router();

// MORE IMPORTS
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const { body, validationResult } = require("express-validator")
const { urlencoded } = require('express');

// AUTHENCTICATION AND MONGO
mongoose.set("strictQuery", true)
const jwt = require("jsonwebtoken")
const passport = require("passport")


//MODELS FOR MONGO
const User = require("../models/User");
const Post = require("../models/Post")
const Comments = require("../models/Comment")
// IMPORT LIST DONE //


router.get("/testi", function(req, res, next) {
  console.log("TOIMII")
  return res.status(200).send({msg: "Proxy works"})
})



// REGISTER ROUTE
router.post("/register",
body("password").isStrongPassword(),
function(req, res, next) {
  console.log("apua")
  console.log(req.body)
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  console.log("testi")
  User.findOne({email: req.body.email}, (err, user) => {
    console.log("testi2")
    if(err) {
      console.log(err)
      throw err
    }
    console.log("eka")
    if(user){
      return res.status(403).json({msg: "Username already in use."})
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if(err) throw err;

          // CREATE DATE FOR USER CREATION DATE 
          // ADD USER TO USER DATABASE
          let date = new Date()
          let currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
          console.log(currentDate)
          console.log("TESTI")
          User.create(
            {
              email: req.body.email,
              password: hash,
              bio: req.body.bio,
              creationdate: currentDate
            },
            (err, ok) => {
              if(err) throw err;
              return res.status(200).send({msg:"register worked"})
            }
          )
        })
      })
    }
  })
  /*res.send("ok") */
})

// LOGIN ROUTE
router.post("/login", function(req, res, next) {
  const user = User.findOne({email: req.body.email}, (err, user) => {
    if(err) throw err
    if(!user){
      return res.status(403).json({msg: "Invalid credentials"})
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if(err) throw err
        if(isMatch) {
          const jwtPayload = {
            id: user._id,
            email: user.email
          }
          jwt.sign(
            jwtPayload,
            process.env.SECRET,
            {
              expiresIn: "1d"
            },
            (err, token) => {
              res.json({success: true, token, message:"ok"})
            }
          )

        }
        else {
          console.log("wrong password")
          res.status(400).send({msg: "Invalid credentials"})
        }
      })
    }
  })
})

router.post("/addPost", passport.authenticate("jwt",{session: false}), function(req, res, next) {
  console.log(req.user)

  let date = new Date()
  let currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`

  Post.create(
    {
      title: req.body.title,
      code: req.body.code,
      creator: req.user._id,
      creationdate: currentDate
    },
    (err, ok) => {
      if(err) throw err;
      return res.status(200).send({msg:"post added to database"})
    }
  )

  //res.json({msg:"check console"})
})


// SEND ALL POSTS
router.get("/getPosts", async function(req, res, next) {
  let PostsData = await Post.find({})
  //console.log(PostsData)
  PostsData.forEach((x, i) => {
    console.log(x.title)
  })
  res.status(200).send(PostsData)
})


// SEND ONE POST
router.get("/posts/:postID", function(req, res, next) {
 
  console.log(req.params.postID)
  let post = req.params.postID

  Post.findById(post, (err, gottenPost) => {
    if(err) return next(err)
    if(!gottenPost){
      console.log("No posts found!")
    }
    else {
      console.log(gottenPost)
      console.log("POST FOUND")
      //res.status(200).json(recipes)
      res.status(200).send(gottenPost)
    }
  })
  
})


// LOAD COMMENTS TO A POST
router.get("/posts/:postID/comments", function(req, res, next) {
  console.log("LOAD ALL COMMENTS TO THIS POST")
  console.log(req.params.postID)
  let givenPostID = req.params.postID

  Comments.find({commentToPost: givenPostID}, (err, allComments) => {
    if(err) return next(err)
    if(!allComments){
      console.log("No comments found!")
    }
    else {
      console.log(allComments)
      console.log("COMMENTS FOUND")
      //res.status(200).json(recipes)
      res.status(200).send(allComments)
    }
  })
  
})



// LOAD USER DATA FOR PROFILE PAGE
router.get("/profile/:userID", passport.authenticate("jwt",{session: false}), function(req, res, next) {
 
  console.log(req.params.userID)
  let user = req.params.userID

  User.findById(user, (err, gottenUser) => {
    if(err) return next(err)
    if(!gottenUser){
      console.log("No user found!")
    }
    else {
      console.log(gottenUser)
      console.log("USER PROFILE FOUND")
      //res.status(200).json(recipes)
      res.status(200).send(gottenUser)
    }
  })
  
})


// ADD A COMMENT
// NEED TO BE AUTHENTICATED
router.post("/addComment/:postID", passport.authenticate("jwt",{session: false}), function(req, res, next) {
  console.log("DATA FROM THE COMMENT TO BE ADDED")
  console.log(req.user)
  console.log(req.body)
  let date = new Date()
  let currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`

  Comments.create(
    {
      commentToPost: req.body.commentToPost,
      comment: req.body.comment,
      creator: req.user._id,
      creationdate: currentDate
    },
    (err, ok) => {
      if(err) throw err;
      return res.status(200).send({msg:"comment added"})
    }
  )

  //res.json({msg:"check console"})
})









// JUST FOR RANDOM TESTING
router.get("/private", passport.authenticate("jwt",{session: false}), function(req, res, next) {
  res.json({email: req.user.email})
})

module.exports = router;
