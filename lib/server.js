var yaml = require( 'js-yaml' );
var fs   = require( 'fs' );

var source = fs.readFileSync( CONF_DIR + NODE_ENV + '/config.yml', 'utf8' );
var config = yaml.load( source ).server;

process.env.TZ = config.timezone;

NODE_ENV === 'prod' && process.on( 'uncaughtException', function( err ){
  LOG.error( 500, {
    _id : 'Error caught from global',
    url : 'Error caught from global'
  }, err );
});



module.exports = function( app ){
  // start server
  app.listen( config.port, config.host );

  LOG.sys( 'Server running at http://' + config.host + ':' + config.port + '/' );
};
