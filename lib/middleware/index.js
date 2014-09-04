/**
 * Module dependencies.
 * @private
 */
var fs    = require( 'fs' );
var flash = require( './flash' );
var path  = require( 'path' );
var files = fs.readdirSync( MIDDLEWARE_DIR );

var middleware = {};

files.forEach( function ( file ){
  if( UTILS.regex.is_js_file.test( file )){
    var name           = file.replace( '.js', '' );
    middleware[ name ] = require( path.join( MIDDLEWARE_DIR, file ));

    LOG.sys( 'Building middleware: ' + name );
  }
});

middleware.flash = flash;

module.exports = middleware;
