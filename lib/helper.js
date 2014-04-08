var fs = require( 'fs' );

module.exports = function ( full_name ){
  var path = HELPER_DIR + '/' + full_name + '.js';

  return fs.existsSync( path )
    ? require( path )
    : {};
};
