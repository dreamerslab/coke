var fs   = require( 'fs' );
var Flow = require( 'node.flow' );
var coke = require( './lib/boot' )

coke.version = JSON.parse( fs.readFileSync( __dirname + '/package.json', 'utf8' )).version;
coke.utils   = require( './lib/utils' );

coke.setup_models = function ( base_dir, callback ){
  var flow = new Flow();

  // set global variables
  flow.series( function ( next ){
    require( './lib/global' )( base_dir, next );
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
  end( function (){
    var mongoose = require( 'mongoose' );

    LOG.sys( 'loading core module: model' );
    require( CORE_DIR + '/model' )({
      mongoose : require( 'mongoose' )
    }, callback );
  });
};

/**
 * Exports module.
 */
module.exports = coke;
