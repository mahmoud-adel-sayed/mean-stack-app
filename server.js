process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var cluster = require('cluster');

if(cluster.isMaster){
  var cpu_count = require('os').cpus().length;

  require('os').cpus().forEach(function(){
    cluster.fork();
  });

  cluster.on('exit', function(worker , code , signal){
    cluster.fork();
  });
}else{

  var mongoose = require('./config/mongoose'),
  	  express = require('./config/express'),
  	  passport = require('./config/passport');

  var db = mongoose();
  var app = express(db);
  var passport = passport();

  var port = normalizePort(process.env.PORT || '3000');

  app.listen(port);

  module.exports = app;

  console.log('Server running on http://localhost:' + port);

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

}