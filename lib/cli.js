var fs    = require( 'fs' );
var regex = require( '.utils' ).regex;
var files = fs.readdirSync( __dirname + '/cli' );
var cli   = {};

files.forEach( function ( file ){
  if( regex.is_js_file.test( file )){
    cli[ file ] = require( path + file );
  }
});

module.exports = cli;
