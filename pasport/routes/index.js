var express = require('express');
var router = express.Router();
var Controller = require('../Controller/main');
var varifyToken = require('../TokenVerify');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',Controller.login);

module.exports = router;
