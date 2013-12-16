module.exports = function ( base_dir, callback ){
  var env = process.env.NODE_ENV;

  if( env === undefined ){
    env = 'dev';
  }else{
    env = env === 'production' ?
      'prod' : env;
  }

  global.__defineGetter__( 'NODE_ENV', function (){
    return env;
  });

  global.__defineGetter__( 'BASE_DIR', function (){
    return base_dir + '/';
  });

  global.__defineGetter__( 'CORE_DIR', function (){
    return __dirname + '/';
  });

  global.__defineGetter__( 'CONF_DIR', function (){
    return BASE_DIR + 'config/';
  });

  global.__defineGetter__( 'MODEL_DIR', function (){
    return BASE_DIR + 'app/models/';
  });

  global.__defineGetter__( 'CONTROLLER_DIR', function (){
    return BASE_DIR + 'app/controllers/';
  });

  global.__defineGetter__( 'VIEW_DIR', function (){
    return BASE_DIR + 'app/views/';
  });

  global.__defineGetter__( 'HELPER_DIR', function (){
    return BASE_DIR + 'app/helpers/';
  });

  global.__defineGetter__( 'LIB_DIR', function (){
    return BASE_DIR + 'app/libs/';
  });

  global.__defineGetter__( 'LANG_DIR', function (){
    return BASE_DIR + 'app/locales/';
  });

  global.__defineGetter__( 'PUB_DIR', function (){
    return BASE_DIR + 'public/';
  });

  global.__defineGetter__( 'CONF', function (){
    var fs    = require( 'fs' );
    var utils = require( './utils' );
    var path  = CONF_DIR + NODE_ENV + '/config.yml';

    if( !fs.existsSync( path )){
      console.log(
        utils.$alert( 'error' ) +
        '   config path does not exist', path
      );

      return process.exit( 1 );
    }

    var source = fs.readFileSync( path, 'utf8' );
    var yaml   = require( 'js-yaml' );

    return yaml.safeLoad( source );
  });

  global.__defineGetter__( 'Model', function (){
    var Model = require( './model/builder' );

    return Model;
  });

  callback();
};
