var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET employee listing. */
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
  db('Employee')
  .insert(req.body)
  .then((data) => {
      res.send(data);
  }, next)
});

router.put('/:id', function(req, res, next) {
  const {id} = req.params;

  db('Employee')
  .where("idEmployee", id)
  .update(req.body)
  .then((data) => {
    if (data === 0) {
      return res.send(400);
    }
    res.send({result: 'alterou'});
  }, next)
});

router.delete('/:id', function(req, res, next) {
  const {id} = req.params;

  db('Employee')
  .where("idEmployee", id)
  .delete()
  .then((data) => {
    if (data === 0) {
      return res.send(400);
    }
    res.send({result: 'deletou'});
  }, next)
});

module.exports = router;
