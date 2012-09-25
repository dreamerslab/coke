/**
 * Module dependencies.
 * @private
 */
var express    = require( 'express' );
var app        = express.createServer();
var middleware = require( './middleware' );

module.exports = function ( callback ){
  // request logger
  var ID = 0;

  app.use( function( req, res, next ){
    var start = Date.now();

    ID++;
    req._id    = ID;
    res._id    = ID;
    req._start = start;
    res._start = start;

    next();
  });

  // load express
  require( CONF_DIR + NODE_ENV + '/express' )( express, app, middleware );
  callback( app );
};