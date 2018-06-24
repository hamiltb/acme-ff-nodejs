// require express
var express = require('express');
var path    = require('path');

// create our router object
var router = express.Router();

// export our router
module.exports = router;

// route for our homepage
router.get('/', function(req, res) {
  res.render('pages/home');
});


// route for our about page
router.get('/about', function(req, res) {

  var users = [
    { name: 'Murali', email: '', avatar: 'http://placekitten.com/300/300'},
    { name: 'Bill', email: '', avatar: 'http://placekitten.com/400/400'},
    { name: 'John B', email: '', avatar: 'http://placekitten.com/500/500'},
    { name: 'John F', email: '', avatar: 'http://placekitten.com/600/600'},
    { name: 'John P', email: '', avatar: 'http://placekitten.com/700/700'},
    { name: 'Shirley', email: '', avatar: 'http://placekitten.com/800/800'},
    { name: 'Hyung', email: '', avatar: 'http://placekitten.com/900/900'},
    { name: 'Zach', email: '', avatar: 'http://placekitten.com/300/300'},
    { name: 'Lata', email: '', avatar: 'http://placekitten.com/400/400'},
    { name: 'Zach', email: '', avatar: 'http://placekitten.com/500/500'},
    { name: 'Raihaan', email: '', avatar: 'http://placekitten.com/600/600'},
    { name: 'Shan', email: '', avatar: 'http://placekitten.com/700/700'}
  ];

  res.render('pages/about', { users: users });      

});

router.get('/contact', function(req, res) {
  res.render('pages/contact');
});

router.post('/contact', function(req, res) {
  res.send('Thanks for contacting us, ' + req.body.name + '! We will respond shortly!');
});