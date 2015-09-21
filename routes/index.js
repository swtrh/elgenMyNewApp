var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Min flotte app' });
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
router.get('/store', function(req, res) {   
   res.render('store', { title: 'Welcome to the store' }); 
 
})

module.exports = router;
