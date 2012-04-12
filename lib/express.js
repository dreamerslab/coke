/**
 * Module dependencies.
 * @private
 */
var express = require( 'express' );

var app        = express.createServer();
var middleware = require( './middleware' );



module.exports = function ( callback ){
  // request logger
  var ID = 0;

  app.use( function( req, res, next ){
    ID++;
    req._id    = ID;
    res._id    = ID;
    res._start = Date.now();

    next();
  });

  // load express
  require( CONF_DIR + NODE_ENV + '/express' )( express, app, middleware );
  callback( app );
};
