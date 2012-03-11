/**
 * Module dependencies.
 * @private
 */
var yaml = require( 'js-yaml' );
var fs   = require( 'fs' );

var source = fs.readFileSync( CONF_DIR + NODE_ENV + '/config.yml', 'utf8' );
var libs   = yaml.load( source ).started;



module.exports = function( app ){
  if( libs.length > 0 ){
    libs.forEach( function ( file ){
      var tmp = require( LIB_DIR + file );

      if( tmp && tmp.init ){
        LOG.sys( 'Loading lib: ' + file.replace( '.js', '' ));
        tmp.init( app );
      }
    });

    LOG.sys( 'All libs run after server startup loaded' );
  }
};
