/**
 * Module dependencies.
 * @private
 */
var config = CONF.server;

function setup(){
  return {
    port : process.env.PORT || config.port || 4000,
    host : config.host || '127.0.0.1'
  };
}

function server( app, conf ){
  var host = conf.host;
  var port = conf.port;

  process.on( 'SIGINT', shutdown );
  process.on( 'SIGTERM', shutdown );
  app.on( 'close', function (){
    LOG.sys( 'App connection closed' );
  });

  app.listen( port, host );
  LOG.sys( 'Server running at http://' + host + ':' + port + '/' );

  function shutdown(){
    LOG.sys( 'Shutting down the server at http://' + host + ':' + port + '/' );
    app.close( function (){
      LOG.sys( 'Server connection closed' );
      process.exit();
    });
  }
}

function cluster( app, conf ){
  var cluster = require( 'cluster' );
  var cpus    = require( 'os' ).cpus();
  var stop    = false;

  function shutdown(){
    stop = true;
    LOG.sys( 'Shutting down the cluster at http://' + conf.host + ':' + conf.port + '/' );

    cluster.disconnect( function (){
      LOG.sys( 'Cluster connection closed' );
      process.exit();
    });
  }

  // Worker processes have a http server.
  if( cluster.isMaster ){

    // Fork workers.
    cpus.forEach( function ( cpu ){
      cluster.fork();
    });

    process.on( 'SIGTERM', shutdown );
    process.on( 'SIGINT', shutdown );
    cluster.on( 'exit', function ( worker, code, signal ){
      if( stop ){
        return LOG.sys( 'SIGKINT | SIGTERM received - not respawning workers' );
      }

      cluster.fork();
      LOG.sys( 'Worker PID - '  + worker.process.pid + ' died and it will be re-spawned' );
    });

    LOG.sys( 'Cluster running at http://' + conf.host + ':' + conf.port + '/' );
  }else{
    app.on( 'close', function (){
      LOG.sys( 'Worker connection closed' );
    });

    app.listen( conf.port, conf.host );
    LOG.sys( 'Worker initiated. PID - ' + process.pid );
  }
}

module.exports = function( app, callback ){
  process.env.TZ = config.timezone;

  NODE_ENV === 'prod' && process.on( 'uncaughtException', function( err ){
    LOG.error( 500, 'Error caught from global', err );
  });

  var conf = setup();

  if( config.cluster ){
    cluster( app, conf );
  }else{
    server( app, conf );
  }

  callback( app );
};
