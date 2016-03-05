var config = require('./config'),
	http = require('http'),
	socketio = require('socket.io'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	MongoStore = require('connect-mongo/es5')(session),
	flash = require('connect-flash'),
	passport = require('passport'),
	// Security modules
	cors = require('cors'),
	helmet = require('helmet');

module.exports = function(db){
	var app = express();
	var server = http.createServer(app);
	var io = socketio.listen(server);

	if(process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	}else if(process.env.NODE_ENV === 'production'){
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	var mongostore = new MongoStore({
		mongooseConnection: db.connection
	});

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: mongostore
	}));

	app.set('views' , './app/views');
	app.set('view engine' , 'ejs');

	app.use(flash());

	app.use(passport.initialize());
	app.use(passport.session());

	// using Security modules
	app.use(cors());

	app.use(helmet.hidePoweredBy({ setTo: 'Python' }));

	app.use(helmet.xssFilter({ setOnOldIE: true }));

	app.use(helmet.frameguard('deny'));

	app.use(helmet.ieNoOpen());

	app.use(helmet.noSniff());

	var ninetyDaysInMilliseconds = 7776000000;
	app.use(helmet.hsts({ maxAge: ninetyDaysInMilliseconds }));

	app.use(helmet.csp({
	  directives: {
	    defaultSrc: ["'self'" , 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/' , 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/'],
	    scriptSrc: ["'self'", "'unsafe-inline'"],
	    styleSrc: ["'self'" , "'unsafe-inline'" , "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" , 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'],
	    imgSrc: ["'self'" , "https://s3.amazonaws.com"],
	    sandbox: ['allow-forms' , 'allow-scripts' , 'allow-same-origin']
	  },

	  reportOnly: false,
	  setAllHeaders: false,
	  disableAndroid: false
	}));

	require('../app/routes/posts.server.routes')(app);
	require('../app/routes/comments.server.routes')(app);
	require('../app/routes/profile.server.routes')(app);
	require('../app/routes/users.server.routes')(app);

	app.use(express.static('./public'));

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Page Not Found');
	  err.status = 404;
	  next(err);
	});

	// production error handler
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {}
	  });
	});

	return server;
};
