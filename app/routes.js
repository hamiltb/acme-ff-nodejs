// require express
var express = require('express');
var path    = require('path');
var winston = require('winston');

// create our router object
var router = express.Router();

// export our router
module.exports = router;

//init LD
var LaunchDarkly = require('ldclient-node');
var config = { /*"logger": logger*/ /*"allAttributesPrivate": true,*/ };
console.log("Initializing LD....");
const ldclient = LaunchDarkly.init('sdk-464db248-3234-471a-a386-c96964af4120',config);
var user = {
	"ip": '111.222.333.444',//Must be an IP address. If you provide an IP, LaunchDarkly will use a geolocation service to automatically infer a country for the user (unless you've already specified one).
	"firstName": 'Fred', //Must be a string. If you provide a first name, you can search for users on the Users page by name.
	"lastName": 'Loblaw', //Must be a string. If you provide a last name, you can search for users on the Users page by name.
	"country": 'USA', //Must be a string representing the country associated with the user.
	"email": 'fred@acme.com', //Must be a string representing the user's e-mail address. If an avatar URL is not provided, we'll use Gravatar to try to display an avatar for the user on the Users page.
	"avatar": 'https://pickaface.net/gallery/avatar/unr_mathieu_180629_1713_6u9jhl0s.png', //Must be an absolute URL to an avatar image for the user.
	"name": 'Freddy Loblaw', //Must be a string. You can search for users on the User page by name
	"key": 'fred@acme.com',
	"custom": {
		"groups": 'beta_testers'
	}
	//"privateAttributeNames": ["email","country"]
	//"anonymous": true //Must be a boolean. See the section below on anonymous users for more details.
};
console.log("Identifying user as: ", user.key);
ldclient.identify(user);


// HOME route for our homepage
router.get('/', function(req, res) {
	res.render('pages/home');
});

// REGISTER route for our register page
router.get('/register', function(req, res) {
	res.render('pages/register');
});

router.post('/register', function(req, res) {
	form_submitter=req.body.name;
  	res.send('Thanks for contacting us, ' + req.body.name + '! We will respond shortly!');
});

// ABOUT route for our about page
router.get('/about', function(req, res) {
	ldclient.waitUntilReady().then(function() {
	    ldclient.variation('wth-test', user, false).then(function(showFeature) {
	    	console.log("Flag value is: ", showFeature);
		    if (showFeature) {
		      	users = [{ name: 'FlagON', email: '', avatar: 'http://placekitten.com/300/300'}];
		    } else {
		      	users = [{ name: 'FlagOFF', email: '', avatar: 'http://placekitten.com/300/300'}];
		    }
		    res.render('pages/about', { users: users });      
  		});
	});
});

