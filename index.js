var fs   = require( 'fs' );
var coke = require( './lib/boot' );

coke.version = JSON.parse( fs.readFileSync( __dirname + '/package.json', 'utf8' )).version;
coke.utils   = require( './lib/utils' );

coke.setup_models = function ( base_dir, callback ){
  require( './lib/global' )( base_dir );
  require( CORE_DIR + '/logger' )();
  require( CORE_DIR + '/utils' );
  require( CORE_DIR + '/model' )({
    mongoose : require( base_dir + '/node_modules/mongoose' )
  }, callback );
};

/**
 * Exports module.
 */
module.exports = coke;
