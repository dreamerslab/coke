/**
 * Module dependencies.
 * @private
 */
var config = CONF.server;

var server = function ( app ){
  var port = process.env.PORT || config.port || 4000;
  var host = config.host || '127.0.0.1';

  app.listen( port, host );
  LOG.sys( 'Server running at http://' + host + ':' + port + '/' );
};

var cluster = function ( app, server ){
  var cluster = require( 'cluster' );
  var cpus    = require( 'os' ).cpus();

  // Worker processes have a http server.
  if( !cluster.isMaster ) return server( app );

  // Fork workers.
  cpus.forEach( function ( cpu ){
    cluster.fork();
  });

  cluster.on( 'death', function ( worker ){
    LOG.sys( 'Worker'  + worker.pid + ' died' );
  });
};

process.env.TZ = config.timezone;

NODE_ENV === 'prod' && process.on( 'uncaughtException', function( err ){
  LOG.error( 500, 'Error caught from global', err );
});

module.exports = function( app, callback ){
  if( config.cluster ){
    cluster( app, server );
  }else{
    server( app );
  }

  callback( app );
};