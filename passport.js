var db = require('./db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function (username,password,done) {
 db("Employee")
  .where("username", username)
  .first()
  .then((user)=>{
    console.log(user);
    if(!user || user.password !== password){
      console.log(user);
        return done(null, false);
    }
    done(null, user)
  }, done);
}));

passport.serializeUser((user, done)=>{
  done(null, user.idEmployee);
});

passport.deserializeUser((id, done)=>{
  db("Employee")
  .where("idEmployee", id)
  .first()
  .then((user)=>{
    done(null, user)
  },done);
})