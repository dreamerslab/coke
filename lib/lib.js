var yaml   = require( 'js-yaml' );
var fs     = require( 'fs' );
var source = fs.readFileSync( CONF_DIR + NODE_ENV + '/config.yml', 'utf8' );
var libs   = yaml.load( source ).libs;

module.exports = function (){
  libs.forEach( function ( file ){
    require( LIB_DIR + file );
    LOG.sys( 'Loading lib: ' + file.replace( '.js', '' ));
  });

  LOG.sys( 'All libs loaded' );
};
