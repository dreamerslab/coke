/**
 * Module dependencies.
 * @private
 */
var fs = require( 'fs' );

var path  = BASE_DIR + 'app/middlewares/';
var files = fs.readdirSync( path );

var middleware = {};

files.forEach( function ( file ){
  if( UTILS.regex.is_js_file.test( file )){
    var name           = file.replace( '.js', '' );
    middleware[ name ] = require( path + file );

    LOG.sys( 'Building middleware: ' + name );
  }
});

module.exports = middleware;