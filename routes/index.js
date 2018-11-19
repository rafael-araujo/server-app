const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db');
const authConfig = require('../config/auth');
const date = require('../util/date');

router.use( function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorizatioon");
  next();
});

router.post('/login', (req, res, next)=> {

  var username = req.body.username;
  var password = req.body.password;

  db("Employee")
  .where("username", username)
  .first()
  .then((user)=>{
    if(!user || !bcrypt.compareSync(password, user.password)){
      res.send('Login not found');
    }
    
    const jwtHash = jwt.sign({id : user.idEmployee}, authConfig.token,{
      expiresIn: 86400
    });
    insertToken(jwtHash);
    res.send({token: jwtHash});
  }, next);
});

router.get('/', function(req, res, next) {
  if (req.session.nome) {
    res.send({result: 'ok'});
  }
});

router.get('/logout', (req, res, next)=> {
  req.session.destroy();
  res.redirect('/')
});

function insertToken (token){
  db('Authorization')
  .insert({
    'token': token,
    'expirationDate' : date.dateNowPlusHourFormated(5)
  })
  .then((data) => {
    if (data){
      return true;
    }
    else {
      return false;
    }
  })
}

module.exports = router;