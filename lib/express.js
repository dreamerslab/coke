/**
 * Module dependencies.
 * @private
 */
var express = require( 'express' );

var app        = express.createServer();
var middleware = require( './middleware' );



module.exports = function ( callback ){
  // load express
  require( CONF_DIR + NODE_ENV + '/express' )( express, app, middleware );
  callback( app );
};
