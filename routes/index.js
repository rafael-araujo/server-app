var express = require('express');
var router = express.Router();
var passport = require('passport');

router.use( function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/', passport.authenticate('local',{
  successRedirect: '/home',
  failureRedirect: '/error',

}));

router.get('/', (req, res, next)=> {
  if (req.isAuthenticated()) {
    res.redirect('/home')
  }
  else{
    res.redirect('/');
    }
});

router.get('/home', (req, res, next)=> {
  if (!req.isAuthenticated()) {
    return res.redirect('/')
  }
});

router.get('/logout', (req, res, next)=> {
  req.session.destroy();
  res.redirect('/')
});

module.exports = router;