
// require our dependencies
var express        = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser     = require('body-parser');
var app            = express();
var port           = process.env.PORT || 8080;

// use ejs and express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// route our app

//init LD
var LaunchDarkly = require('ldclient-node');
var ldclient = LaunchDarkly.init('sdk-464db248-3234-471a-a386-c96964af4120');
var user = {
  firstName: 'Bob',
  lastName: 'Loblaw',
  key: 'bob@example.com',
  custom: {
    groups: 'beta_testers'
  }
};

//check feature flag
ldclient.once('ready', function() {
ldclient.variation('wth-test', user, false, function(err, showFeature) {
  if (showFeature) {
    var router = require('./app/routes1');
	app.use('/', router);	
  } else {
	var router = require('./app/routes2');
	app.use('/', router);	        
  }

  ldclient.flush(function() {
    ldclient.close();
  });
});
});


// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

// start the server
app.listen(port, function() {
  console.log('app started');
});

