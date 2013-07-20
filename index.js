var fs   = require( 'fs' );
var boot = require( './lib/boot' )

function coke( base_dir ){
  boot( base_dir );
};

coke.version = JSON.parse( fs.readFileSync( __dirname + '/package.json', 'utf8' )).version;
coke.utils   = require( './lib/utils' );

/**
 * Exports module.
 */
module.exports = coke;
