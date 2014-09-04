var path  = require( 'path' );
var yaml  = require( 'js-yaml' );
var fs    = require( 'fs' );
var merge = require( 'node.extend' );
var utils = require( './utils' );

var dir_map = {
  conf        : 'CONF_DIR',
  config      : 'CONF_DIR',
  model       : 'MODEL_DIR',
  ctrl        : 'CONTROLLER_DIR',
  controller  : 'CONTROLLER_DIR',
  view        : 'VIEW_DIR',
  helper      : 'HELPER_DIR',
  lib         : 'LIB_DIR',
  lang        : 'LANG_DIR',
  locale      : 'LANG_DIR',
  pub         : 'PUB_DIR',
  public      : 'PUB_DIR',
  schema      : 'SCHEMA_DIR',
  middleware  : 'MIDDLEWARE_DIR',
  middlewares : 'MIDDLEWARE_DIR'
};

var env_map = {
  develop     : 'dev',
  development : 'dev',
  testing     : 'test',
  production  : 'prod'
};

var default_dir = {
  config     : 'config',
  model      : 'app/models',
  controller : 'app/controllers',
  view       : 'app/views',
  helper     : 'app/helpers',
  lib        : 'app/libs',
  locale     : 'app/locales',
  public     : 'public',
  schema     : 'db/schema',
  middleware : 'app/middlewares'
}

module.exports = function ( base_dir, callback ){
  var dir = merge({
    base : base_dir
  }, default_dir );

  var env = process.env.NODE_ENV || 'dev';
  if( env_map.hasOwnProperty( env )) env = env_map[ env ];

  var globals = {
    NODE_ENV : env,
    BASE_DIR : path.resolve( dir.base, dir.base ),
    CORE_DIR : __dirname
  };

  var set_dirs = function (){
    Object.keys( dir ).forEach( function ( i ){
      if( !dir_map.hasOwnProperty( i )) return;
      if( !dir[ i ]) return;

      globals[ dir_map[ i ]] = path.resolve( globals.BASE_DIR, dir[ i ]);
    });
  };

  set_dirs();

  var config_path = path.join( globals.CONF_DIR, env, 'config.yml' );

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
    merge( dir, config.dir );
    set_dirs();
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
