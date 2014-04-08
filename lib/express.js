/**
 * Module dependencies.
 * @private
 */
var fs         = require( 'fs' );
var express    = require( 'express' );
var app        = express();
var middleware = require( './middleware' );
var path       = HELPER_DIR + '/application.js';
var helper     = fs.existsSync( path )
  ? require( path )
  : {};

app.locals( helper );

module.exports = function ( callback ){
  app.use( function( req, res, next ){
    var start = Date.now();

    req._start = start;
    res._start = start;

    next();
  });

  // load express
  require( CONF_DIR + '/' + NODE_ENV + '/express' )( express, app, middleware );
  callback( express, app );
};
