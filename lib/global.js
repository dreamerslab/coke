module.exports = function ( base_dir, callback ){
  global.BASE_DIR   = base_dir + '/';
  global.CORE_DIR   = __dirname + '/';
  global.CONF_DIR   = BASE_DIR + 'config/';
  global.HELPER_DIR = BASE_DIR + 'app/helpers/';
  global.LANG_DIR   = BASE_DIR + 'app/locals/';
  global.LIB_DIR    = BASE_DIR + 'app/libs/';
  global.PUB_DIR    = BASE_DIR + 'public/';

  // set global var NODE_ENV
  if( process.env.NODE_ENV === undefined ){
    global.NODE_ENV = 'dev';
  }else{
    if( process.env.NODE_ENV === 'production' ){
      global.NODE_ENV = 'prod';
    }else{
      global.NODE_ENV = process.env.NODE_ENV;
    }
  }

  callback();
};
