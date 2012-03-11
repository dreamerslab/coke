/**
 * Module dependencies.
 * @private
 */
var yaml = require( 'js-yaml' );
var fs   = require( 'fs' );

var source = fs.readFileSync( CONF_DIR + NODE_ENV + '/config.yml', 'utf8' );
var config = yaml.load( source ).server;

var server = function ( config, app ){
  app.listen( config.port, config.host );
  LOG.sys( 'Server running at http://' + config.host + ':' + config.port + '/' );
};

var cluster = function ( app, server, config ){
  var cluster = require( 'cluster' );
  var cpus    = require( 'os' ).cpus();

  if( cluster.isMaster ){
    // Fork workers.
    cpus.forEach( function ( cpu ){
      cluster.fork();
    });

    cluster.on( 'death', function ( worker ){
      LOG.sys( 'Worker'  + worker.pid + ' died' );
    });
  }else{
    // Worker processes have a http server.
    server( config, app );
  }
};

process.env.TZ = config.timezone;

NODE_ENV === 'prod' && process.on( 'uncaughtException', function( err ){
  LOG.error( 500, UTILS.global_err( 'Error caught from global' ), err );
});



module.exports = function( app, callback ){
  if( config.cluster ){
    cluster( app, server, config );
  }else{
    server( config, app );
  }

  callback( app );
};
