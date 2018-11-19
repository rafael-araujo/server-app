const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const db = require('../db');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);


router.use( function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

router.get('/', function(req, res, next) {
    db('Employee').then((data) => {
      res.send(data);
    }, next)
});

router.get('/:id', function(req, res, next) {
  const {id} = req.params;

  db('Employee')
  .where("idEmployee", id)
  .then((data) => {
      res.send(data);
  }, next)
});

router.post('/', function(req, res, next) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hash;

  db('Employee')
  .insert(req.body)
  .then((data) => {
      res.send(data);
  }, next)
});

router.put('/:id', function(req, res, next) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hash;

  db('Employee')
  .where("idEmployee", id)
  .update(req.body)
  .then((data) => {
    res.send(data);
  }, next)
});

router.delete('/:id', function(req, res, next) {
  const {id} = req.params;

  db('Employee')
  .where("idEmployee", id)
  .delete()
  .then((data) => {
    res.send(data);
  }, next)
});

module.exports = router;
