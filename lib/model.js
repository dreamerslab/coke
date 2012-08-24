/**
 * Module dependencies.
 * @private
 */
var fs       = require( 'fs' );
var mongoose = require( 'mongoose' );

var config = CONF.db;
var path   = BASE_DIR + 'app/models/';

module.exports = function ( callback ){
  if( !config.db ){
    throw new Error( 'Database not specified' );
  }

  if( UTILS.regex.db_ill_char.test( config.db )){
    throw new Error( 'Database name contains illegal characters' );
  }

  var files = fs.readdirSync( path );

  files.forEach( function ( file ){
    if( UTILS.regex.is_js_file.test( file )){
      LOG.sys( 'Loading model: ' + file.replace( '.js', '' ));
      require( path + file );
    }
  });

  var url = 'mongodb://';

  if( config.username && config.username.length > 0 ){
    url += config.username + ':' + config.password + '@';
  }

  url += ( config.host || 'localhost' ) + ':' + ( config.port || 27017 );
  url += '/' + config.db;

  mongoose.connect( url, function ( err ){
    if( err ){
      return LOG.error( 500, '[model][mongoose] Connection error', err );
    }

    LOG.sys( 'All models loaded' );
    LOG.sys( 'Database connected at: ' + url );
    callback();
  });
};