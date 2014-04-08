var Flow = require( 'node.flow' );

module.exports = function boot( base_dir, callback ){
  var flow = new Flow();

  // set global variables
  flow.series( function ( next ){
    require( './global' )( base_dir, next );
  }).

  // load logger
  series( function ( next ){
    require( CORE_DIR + '/logger' );
    // this has to go after the `require`
    LOG.sys( 'loading core module: logger' );
    next();
  }).

  // load util
  series( function ( next ){
    LOG.sys( 'loading core module: utils' );
    require( CORE_DIR + '/utils' );
    next();
  }).

  // load model
  series( function ( next ){
    var mongoose = require( 'mongoose' );

    LOG.sys( 'loading core module: model' );
    require( CORE_DIR + '/model' )({
      mongoose : mongoose
    }, next );
  }).

  // load express
  series( function ( model_names, next ){
    LOG.sys( 'loading core module: express' );
    require( CORE_DIR + '/express' )( next );
  }).

  // load lib
  parallel( function ( results, ready ){
    var express = results[ 0 ];
    var app     = results[ 1 ];

    LOG.sys( 'loading core module: lib' );
    require( CORE_DIR + '/lib' )( express, app, ready );
  }).

  // load assets
  parallel( function ( results, ready ){
    var express = results[ 0 ];
    var app     = results[ 1 ];

    LOG.sys( 'loading core module: assets' );
    require( CORE_DIR + '/assets' )( app, ready );
  }).

  join().

  //load controller
  series( function ( results, next ){
    var express = results[ 0 ][ 0 ];
    var app     = results[ 0 ][ 1 ];

    LOG.sys( 'loading core module: controller' );
    require( CORE_DIR + '/controller' )( express, app, next );
  }).

  // start server
  series( function ( express, app, next ){
    LOG.sys( 'loading core module: server' );
    require( CORE_DIR + '/server' )( express, app, next );
  }).

  error( function ( err ){
    if( err ){
      console.log( err );
      process.exit( 1 );
    }
  }).

  // load 'after server start libs'
  end( function ( servers, express, app ){
    LOG.sys( 'loading core module: started' );
    require( CORE_DIR + '/started' )( servers, express, app );

    callback && callback();
  });
};
