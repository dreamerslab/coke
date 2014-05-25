/**
 * Module dependencies.
 * @private
 */
var libs = CONF.started;

module.exports = function ( servers, app ){
  if( libs && libs.length > 0 ){
    libs.forEach( function ( file ){
      var tmp = require( LIB_DIR + '/' + file );

      if( tmp && tmp.init ){
        LOG.sys( 'Loading lib: ' + file.replace( '.js', '' ));
        tmp.init( servers, app );
      }
    });

    LOG.sys( 'All libs run after server startup loaded' );
  }
};
