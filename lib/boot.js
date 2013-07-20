var Flow = require( 'node.flow' );

module.exports = function boot( base_dir, callback ){
  var flow = new Flow();

  // set global variables
  flow.series( function ( next ){
    require( './global' )( base_dir, next );
  }).

  // load logger
  series( function ( next ){
    require( CORE_DIR + 'logger' );
    // this has to go after the `require`
    LOG.sys( 'loading core module: logger' );
    next();
  }).

  // load util
  series( function ( next ){
    LOG.sys( 'loading core module: utils' );
    require( CORE_DIR + 'utils' );
    next();
  }).

  // load model
  series( function ( next ){
    var mongoose = require( 'mongoose' );

    LOG.sys( 'loading core module: model' );
    require( CORE_DIR + 'model' )({
      mongoose : mongoose
    }, next );
  }).

  // load express
  series( function ( model_names, next ){
    LOG.sys( 'loading core module: express' );
    require( CORE_DIR + 'express' )( next );
  }).

  // load lib
  parallel( function ( results, ready ){
    var app = results[ 0 ];

    LOG.sys( 'loading core module: lib' );
    require( CORE_DIR + 'lib' )( app, ready );
  }).

  // load helper
  parallel( function ( results, ready ){
    var app = results[ 0 ];

    LOG.sys( 'Loading helper: application' );
    require( HELPER_DIR + 'application' )( app );
    ready();
  }).

  // load assets
  parallel( function ( results, ready ){
    var app = results[ 0 ];

    LOG.sys( 'loading core module: assets' );
    require( CORE_DIR + 'assets' )( app, ready );
  }).

  join().

  //load controller
  series( function ( results, next ){
    var app = results[ 0 ][ 0 ];

    LOG.sys( 'loading core module: controller' );
    require( CORE_DIR + 'controller' )( app, next );
  }).

  // start server
  series( function ( app, next ){
    LOG.sys( 'loading core module: server' );
    require( CORE_DIR + 'server' )( app, next );
  }).

  error( function ( err ){
    if( err ){
      console.log( err );
      process.exit( 1 );
    }
  }).

  // load 'after server start libs'
  end( function ( app ){
    LOG.sys( 'loading core module: started' );
    require( CORE_DIR + 'started' )( app );

    callback && callback();
  });
};
