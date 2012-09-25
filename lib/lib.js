/**
 * Module dependencies.
 * @private
 */
var libs = CONF.libs;

module.exports = function ( app, callback ){
  if( libs.length > 0 ){
    libs.forEach( function ( file ){
      LOG.sys( 'Loading lib: ' + file.replace( '.js', '' ));
      require( LIB_DIR + file ).init( app );
    });

    LOG.sys( 'All libs loaded' );
  }

  callback( app );
};