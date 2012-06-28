/**
 * Module dependencies.
 * @private
 */
var config = CONF.server;

var server = function ( config, app ){
  app.listen( config.port, config.host );
  LOG.sys( 'Server running at http://' + config.host + ':' + config.port + '/' );
};

var cluster = function ( app, server, config ){
  var cluster = require( 'cluster' );
  var cpus    = require( 'os' ).cpus();

  // Worker processes have a http server.
  if( !cluster.isMaster ) return server( config, app );

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
    cluster( app, server, config );
  }else{
    server( config, app );
  }

  callback( app );
};
