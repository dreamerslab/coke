/**
 * Module dependencies.
 * @private
 */
var libs = CONF.libs;

module.exports = function ( express, app, callback ){
  if( libs && libs.length > 0 ){
    libs.forEach( function ( file ){
      var tmp = require( LIB_DIR + '/' + file );

      if( tmp && tmp.init ){
        LOG.sys( 'Loading lib: ' + file.replace( '.js', '' ));
        tmp.init( express, app );
      }
    });

    LOG.sys( 'All libs loaded' );
  }

  callback( express, app );
};
