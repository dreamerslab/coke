var Flow = require( 'node.flow' );

module.exports = function boot( base_dir, options, callback ){
  if( typeof callback !== 'function' ){
    if( typeof options === 'function' ){
      callback = options;
      options = {};
    }else{
      callback = function(){};
    }
  }

  options = options || {};

  var flow = new Flow();

  // set global variables
  flow.series( function ( next ){
    require( './global' )( base_dir, next );
  }).

  // load logger
  series( function ( next ){
    var logger = ( function (){
      var name = CONF.logger;
      if( !name ) return null;

      return require( LIB_DIR + '/' + name );
    })();

    require( CORE_DIR + '/logger' )( logger );
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
    var mongoose = require( base_dir + '/node_modules/mongoose' );
    var args = {
      mongoose : mongoose
    };

    if( options.schema ){
      args.schema_name = options.schema;
    }

    LOG.sys( 'loading core module: model' );
    require( CORE_DIR + '/model' )( args, next );
  }).

  // load express
  series( function ( model_names, next ){
    LOG.sys( 'loading core module: express' );
    require( CORE_DIR + '/express' )( next );
  }).

  // load lib
  parallel( function ( results, ready ){
    var app = results[ 0 ];

    LOG.sys( 'loading core module: lib' );
    require( CORE_DIR + '/lib' )( app, ready );
  }).

  // load assets
  parallel( function ( results, ready ){
    var app = results[ 0 ];

    LOG.sys( 'loading core module: assets' );
    require( CORE_DIR + '/assets' )( app, ready );
  }).

  join().

  // start server
  series( function ( results, next ){
    var app = results[ 0 ][ 0 ];

    LOG.sys( 'loading core module: server' );
    require( CORE_DIR + '/server' )( app, next );
  }).

  // load 'after server start libs'
  end( function ( servers, app ){
    LOG.sys( 'loading core module: started' );
    require( CORE_DIR + '/started' )( servers, app );

    if( callback ) callback();
  });
};
