var express = require('express');
var router = express.Router();
const userModel=require("./users");
const postModel=require("./posts");
const passport = require('passport');
const upload = require("./multer");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));    //from these two user can login


router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  }
  res.render('index', { error: req.flash('error') });
});

router.get('/login', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  }
  res.render('index', { error: req.flash('error') });
});

router.get('/register', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  }
  res.render('register', { error: req.flash('error')});
});


router.post('/register', function(req, res){
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res, function(){
      res.redirect("/feed");
    })
  })
});

router.post('/login',passport.authenticate("local", {
  successRedirect: "/feed",
  failureRedirect: "/login",
  failureFlash:true
}), function(req,res){
});

router.get("/logout", function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});


module.exports = router;
