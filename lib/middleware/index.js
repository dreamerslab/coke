/**
 * Module dependencies.
 * @private
 */
var fs    = require( 'fs' );
var flash = require( './flash' );
var path  = BASE_DIR + '/app/middlewares/';
var files = fs.readdirSync( path );

var middleware = {};

files.forEach( function ( file ){
  if( UTILS.regex.is_js_file.test( file )){
    var name           = file.replace( '.js', '' );
    middleware[ name ] = require( path + file );

    LOG.sys( 'Building middleware: ' + name );
  }
});

middleware.flash = flash;

module.exports = middleware;
