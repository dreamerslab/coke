var fs   = require( 'fs' );
var Flow = require( 'node.flow' );



function coke( base_dir ){
  var flow = new Flow();

  // set global variables
  flow.series( function ( next ){
    require( './lib/global' )( base_dir, next );
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
    LOG.sys( 'loading core module: model' );
    require( CORE_DIR + 'model' )( next );
  }).

  // load express
  series( function ( next ){
    LOG.sys( 'loading core module: express' );
    require( CORE_DIR + 'express' )( next );
  }).

  // load lib
  parallel( function ( app, ready ){
    LOG.sys( 'loading core module: lib' );
    require( CORE_DIR + 'lib' )( app, ready );
  }).

  // load helper
  parallel( function ( app, ready ){
    LOG.sys( 'Loading helper: application' );
    require( HELPER_DIR + 'application' )( app );
    ready();
  }).

  // load assets
  parallel( function ( app, ready ){
    LOG.sys( 'loading core module: assets' );
    require( CORE_DIR + 'assets' )( app, ready );
  }).

  // overwrite res.send
  parallel( function ( app, ready ){
    LOG.sys( 'Overwriting express res.send' );
    require( CORE_DIR + 'response' );
    ready();
  }).

  join().

  //load routes
  series( function ( results, next ){
    var app = results[ 0 ][ 0 ];

    LOG.sys( 'loading core module: routes' );
    require( CORE_DIR + 'route' )( app, next );
  }).

  // start server
  end( function ( app ){
    LOG.sys( 'loading core module: server' );
    require( CORE_DIR + 'server' )( app );
  });
};



coke.version = JSON.parse( fs.readFileSync( __dirname + '/package.json', 'utf8' )).version;
coke.utils   = require( './lib/utils' );



module.exports = coke;