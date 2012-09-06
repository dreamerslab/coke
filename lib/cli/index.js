/**
 * Module dependencies.
 * @private
 */
var fs    = require( 'fs' );
var regex = require( '../utils' ).regex;

var files = fs.readdirSync( __dirname );
var cli   = {};

files.forEach( function ( file ){
  if( regex.is_js_file.test( file ) && file !== 'index.js' ){
    cli[ file.replace( '.js', '' )] = require( './' + file );
  }
});

cli.generators = require( './generators' );
cli.migrate    = require( './migrate' );

/**
 * Exports module.
 */
module.exports = cli;
