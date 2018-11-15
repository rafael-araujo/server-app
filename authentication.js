var db = require('./db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username,password,done) => {
  db("Employee")
  .where("User", username)
  .first()
  .then((data) => {
    if(!data || data.Password !== password){
      return done(null, false);
    }
    done(null, user)
  }, done);
}));

passport.serializeUser((user, done)=>{
  done(null, user.id);
  });

  passport.deserializeUser((id, done)=>{
    db("Employee")
    .where("idEmployee", id)
    .first()
    .then((user)=>{
    done(null, user)
    },done);
    })