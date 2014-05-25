/**
 * Module dependencies.
 * @private
 */
var fs         = require( 'fs' );
var express    = require( 'express' );
var app        = express();
var middleware = require( './middleware' );
var path       = HELPER_DIR + '/application.js';
var controller = require( CORE_DIR + '/controller' );
var helpers    = fs.existsSync( path )
  ? require( path )
  : {};

Object.keys( helpers ).forEach( function ( key ){
  app.locals[ key ] = helpers[ key ];
});

app.routes = function (){
  controller( app );
};

module.exports = function ( callback ){
  app.use( function( req, res, next ){
    var start = Date.now();

    req._start = start;
    res._start = start;

    next();
  });

  // load express
  require( CONF_DIR + '/' + NODE_ENV + '/express' )( app, middleware );
  callback( app );
};
