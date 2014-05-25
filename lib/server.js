/**
 * Module dependencies.
 * @private
 */

var http   = require( 'http' );
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

  var server = http.createServer( app ).listen( port, host, function (){
    LOG.sys( 'Server running at http://' + host + ':' + port + '/' );
  });

  process.on( 'SIGTERM', function (){
    LOG.sys( 'Shutting down the server at http://' + host + ':' + port + '/' );
    server.close( function (){
      LOG.sys( 'Server connection closed' );
      process.exit();
    });
  });


  return server;
}

function cluster( app, conf ){
  var cluster = require( 'cluster' );
  var cpus    = require( 'os' ).cpus();
  var stop    = false;
  var host    = conf.host;
  var port    = conf.port;
  var servers = [];
  var server;

  // Worker processes have a http server.
  if( cluster.isMaster ){
    // Fork workers.
    cpus.forEach( function ( cpu ){
      cluster.fork();
    });

    process.on( 'SIGTERM', function (){
      stop = true;
      LOG.sys( 'Shutting down the cluster at http://' + host + ':' + port + '/' );

      cluster.disconnect( function (){
        LOG.sys( 'Cluster connection closed' );
        process.exit();
      });
    });

    cluster.on( 'exit', function ( worker, code, signal ){
      if( stop ){
        return LOG.sys( 'SIGKINT | SIGTERM received - not respawning workers' );
      }

      cluster.fork();
      LOG.sys( 'Worker PID - '  + worker.process.pid + ' died and it will be re-spawned' );
    });

    LOG.sys( 'Cluster running at http://' + host + ':' + port + '/' );
  }else{
    app.on( 'close', function (){
      LOG.sys( 'Worker connection closed' );
    });

    server = http.createServer( app ).listen( port, host, function (){
      LOG.sys( 'Worker initiated. PID - ' + process.pid + ' at http://' + host + ':' + port + '/' );
    });

    servers.push( server );
  }

  return servers;
}

module.exports = function ( app, callback ){
  process.env.TZ = config.timezone;

  NODE_ENV === 'prod' && process.on( 'uncaughtException', function ( err ){
    LOG.error( 500, 'Error caught from global', err );
  });

  var conf = setup();

  var servers = config.cluster
    ? cluster( app, conf )
    : [ server( app, conf )];

  callback( servers, app );
};
