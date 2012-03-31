/**
 * Module dependencies.
 * @private
 */
var fs       = require( 'fs' );
var yaml     = require( 'js-yaml' );
var mongoose = require( 'mongoose' );

var source = fs.readFileSync( CONF_DIR + NODE_ENV + '/config.yml', 'utf8' );
var config = yaml.load( source ).db;
var path   = BASE_DIR + 'app/models/';



module.exports = function ( callback ){
  var files = fs.readdirSync( path );
  var url;

  files.forEach( function ( file ){
    if( UTILS.regex.is_js_file.test( file )){
      LOG.sys( 'Loading model: ' + file.replace( '.js', '' ));
      require( path + file );
    }
  });

  if( /[\s\<\>!@#\$%^&\*,\.]+/g.test( config.db )){
    throw new Error( 'Database name contains illegal characters' );
  }

  url = 'mongodb://';

  if( config.username && config.username.length > 0 ){
    url += config.username + ':' + config.password + '@';
  }

  url += config.host + ':' + config.port;
  url += '/' + config.db;

  if( config.db && config.host ){
    mongoose.connect( url );
    LOG.sys( 'All models loaded' );
    LOG.sys( 'Database connected at: ' + url );
  }else{
    LOG.sys( 'Database or host not specified' );
  }

  callback();
};
