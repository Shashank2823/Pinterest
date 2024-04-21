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

router.get('/profile',isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  .populate("posts");
  res.render('profile', {user});
});

router.get('/feed',isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({username : req.session.passport.user});
  const post = await postModel.find().populate('user');
  res.render('feed',{user, post});
});

router.get('/showProfile',isLoggedIn, async function(req,res, next){
  let username = req.query.username;
  try {
      const user = await userModel.findOne({username:username }).populate("posts");
      console.log(username);
      const loggedInUser = await userModel.findOne({ username: req.session.passport.user });
      if(user.username == req.session.passport.user){
        res.redirect('/profile');
      }
      res.render('showProfile', { user, loggedInUser });
  } catch (error) {
      console.error("Error in search:", error);
      res.status(500).send("Error while searching");
  }
})
router.post('/search', isLoggedIn, async function(req, res, next) {
  let searchname = req.body.searchname;
  try {
      const user = await userModel.findOne({username:searchname });
      console.log(searchname);
      //const userIds = user.map(user => user._id);  

      const post = await postModel.find({ user: user._id }).populate('user');  
      res.render('feed', { post, user });
  } catch (error) {
      console.error("Error in search:", error);
      res.status(500).send("Error while searching");
  }
});


router.post('/upload',isLoggedIn, upload.single("file"), async function(req, res, next) {
  if(!req.file){
    return res.status(404).send("no file were given");
  }
  const user = await userModel.findOne({username : req.session.passport.user});
  const post = await postModel.create({
    image: req.file.filename,
    imageText: req.body.filecaption,
    user: user._id
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect('/profile');
});

router.post('/uploadprofile', isLoggedIn, upload.single("Profilepic") , async function(req, res, next) {
  const user = await userModel.findOne({username: req.session.passport.user});
  user.dp = req.file.filename;
   await user.save();
   res.redirect("/profile");
 });



router.post("/del",async (req,res)=>{
  try {
    const postId = req.body.id;
    await postModel.findByIdAndDelete(postId);

    res.redirect("/profile");
} catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Error deleting post");
}
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


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/");
}

module.exports = router;
