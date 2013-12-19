var fs   = require( 'fs' );
var coke = require( './lib/boot' )

coke.version = JSON.parse( fs.readFileSync( __dirname + '/package.json', 'utf8' )).version;
coke.utils   = require( './lib/utils' );

/**
 * Exports module.
 */
module.exports = coke;
