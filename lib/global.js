module.exports = function ( base_dir, callback ){
  var constant = {

    BASE_DIR : function (){
      return base_dir + '/';
    },

    CORE_DIR : function (){
      return __dirname + '/';
    },

    CONF_DIR : function (){
      return BASE_DIR + 'config/';
    },

    CONTROLLER_DIR : function (){
      return BASE_DIR + 'app/controllers/';
    },

    HELPER_DIR : function (){
      return BASE_DIR + 'app/helpers/';
    },

    LIB_DIR : function (){
      return BASE_DIR + 'app/libs/';
    },

    LANG_DIR : function (){
      return BASE_DIR + 'app/locals/';
    },

    PUB_DIR : function (){
      return BASE_DIR + 'public/';
    }
  };

  Object.keys( constant ).forEach( function ( key ){
    global.__defineGetter__( key, constant[ key ]);
  });

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

  callback();
};
