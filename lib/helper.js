var fs = require( 'fs' );

var app_helper_path = HELPER_DIR + '/application.js';

var app_helper = fs.existsSync( app_helper_path )
  ? require( app_helper_path )
  : {};

module.exports = function ( full_name ){
  var action_helper_path = HELPER_DIR + '/' + full_name + '.js';

  return fs.existsSync( action_helper_path )
    ? UTILS.merge( app_helper, require( action_helper_path ))
    : app_helper;
};
