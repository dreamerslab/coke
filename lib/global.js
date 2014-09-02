var path  = require( 'path' );
var yaml  = require( 'js-yaml' );
var fs    = require( 'fs' );
var utils = require( './utils' );

module.exports = function ( base_dir, callback ){
  var env = process.env.NODE_ENV || 'dev';
  if( env === 'production' ) env = 'prod';

  var config_dir  = path.join( base_dir, 'config' );
  var config_path = path.join( config_dir, env, 'config.yml' );

  // Default global variables
  var globals = {
    NODE_ENV       : env,
    BASE_DIR       : base_dir,
    CORE_DIR       : __dirname,
    CONF_DIR       : config_dir,
    MODEL_DIR      : path.join( base_dir, 'app', 'models' ),
    CONTROLLER_DIR : path.join( base_dir, 'app', 'controllers' ),
    VIEW_DIR       : path.join( base_dir, 'app', 'views' ),
    HELPER_DIR     : path.join( base_dir, 'app', 'helpers' ),
    LIB_DIR        : path.join( base_dir, 'app', 'libs' ),
    LANG_DIR       : path.join( base_dir, 'app', 'locales' ),
    PUB_DIR        : path.join( base_dir, 'public' )
  };

  // Load config
  if( !fs.existsSync( config_path )){
    console.log(
      utils.$alert( 'error' ) +
      '   config path does not exist', path
    );

    return process.exit( 1 );
  }

  var config = globals.CONF = yaml.safeLoad( fs.readFileSync( config_path, 'utf8' ));

  if( config.dir ){
    Object.keys( config.dir ).forEach( function ( i ){
      globals[ i.toUpperCase() + '_DIR' ] = path.resolve( base_dir, config.dir[ i ]);
    });
  }

  // Bind global variables
  Object.keys( globals ).forEach( function ( i ){
    global.__defineGetter__( i, function (){
      return globals[ i ];
    });
  });

  // Load models
  global.__defineGetter__( 'Model', function (){
    var Model = require( './model/builder' );

    return Model;
  });

  callback && callback();
};
