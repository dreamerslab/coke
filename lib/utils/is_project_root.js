/**
 * Module dependencies.
 * @private
 */
var fs = require( 'fs' );

/**
 * Check if the current process is working in the project root dir.
 * @public
 * @this {utils}
 * @param {Function} callback The success callback function.
 */
module.exports = function ( callback ){
  var current = process.cwd();
  var files   = fs.readdirSync( current );
  var found   = false;

  files.forEach( function ( file ){
    if( file === 'server.js' ){
      callback( current );
      found = true;
    }
  });

  if( !found ){
    console.log(
      this.$alert( 'error' ) +
      '   `server.js` not found, are you in the project root dir?'
    );
    process.exit( 1 );
  }
};
