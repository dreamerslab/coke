var fs      = require( 'fs' );
var colors  = require( 'cli-color' );
var lib     = require( './lib' );
var replace = require( './replace' );



module.exports = {

  // ex. coke new wasabi.fm
  // args = [ 'wasabi.fm' ];
  init : function ( args ){
    var app_name;

    if( !args ){
      app_name = args.shift();
    }else{
      app_name = 'coke';
    }

    lib.init({
      prefix : app_name,
      replace_target : app_name
    });

    // create dirs
    [ 'app/',
      'app/controllers/',
      'app/helpers/',
      'app/libs/',
      'app/locals/',
      'app/locals/en/',
      'app/middlewares/',
      'app/models/',
      'app/views/',
      'app/views/common/',
      'app/views/error/',
      'app/views/layouts/',
      'app/views/welcome/',
      'config/',
      'config/dev/',
      'config/prod/',
      'config/test/',
      'db/',
      'doc/',
      'log/',
      'public/',
      'public/assets/',
      'public/css/',
      'public/css/common/',
      'public/img/',
      'public/js/',
      'public/js/common/',
      'tmp/',
      'test/'
    ].forEach( lib.create_dir );

    // create files
    // controllers
    lib.create_file_by_template( 'app/controllers/application', 'controllers/application' );
    lib.create_file_by_template( 'app/controllers/welcome', 'controllers/welcome' );

    lib.create_file_by_template( 'app/helpers/application', 'helpers/application' );
    lib.create_file( 'app/libs/.gitkeep', '' );
    lib.create_file_by_template( 'app/locals/en/welcome', 'locals/welcome');

    // middlewares
    lib.create_file_by_template( 'app/middlewares/csrf', 'middlewares/csrf' );
    lib.create_file_by_template( 'app/middlewares/err400', 'middlewares/err400' );
    lib.create_file_by_template( 'app/middlewares/err500', 'middlewares/err500' );
    lib.create_file_by_template( 'app/middlewares/session', 'middlewares/session' );
    lib.create_file_by_template( 'app/middlewares/validation', 'middlewares/validation' );

    lib.create_file( 'app/models/.gitkeep', '' );

    // views
    lib.create_file_by_template( 'app/views/common/_nav.html', 'views/nav.html' );
    lib.create_file_by_template( 'app/views/error/404.html', 'views/404.html' );
    lib.create_file_by_template( 'app/views/error/500.html', 'views/500.html' );
    lib.create_file_by_template( 'app/views/layouts/default.html', 'views/layout.html', replace.app_name );
    lib.create_file_by_template( 'app/views/welcome/index.html', 'views/welcome.html', replace.app_name );

    // configs, we might offer a replace view engine options here in the future
    lib.create_file_by_template( 'config/dev/config.yml', 'config/dev/config.yml', replace.app_name );
    lib.create_file_by_template( 'config/dev/express', 'config/dev/express' );
    lib.create_file_by_template( 'config/prod/config.yml', 'config/prod/config.yml', replace.app_name );
    lib.create_file_by_template( 'config/prod/express', 'config/prod/express' );
    lib.create_file_by_template( 'config/test/config.yml', 'config/test/config.yml', replace.app_name );
    lib.create_file_by_template( 'config/test/express', 'config/test/express' );
    lib.create_file_by_template( 'config/assets.yml', 'config/assets.yml' );
    lib.create_file_by_template( 'config/routes', 'config/routes' );

    lib.create_file_by_template( 'db/schema', 'schema' );
    lib.create_file_by_template( 'doc/README.md', 'doc/README.md' );

    // log
    lib.create_file( 'log/monit.log', '' );
    lib.create_file( 'log/nginx.log', '' );
    lib.create_file( 'log/static.log', '' );
    lib.create_file( 'log/upstart.log', '' );

    // assets
    lib.create_file( 'public/assets/.gitignore', '' );
    lib.create_file_by_template( 'public/css/common/base.css', 'public/base.css' );
    lib.create_file_by_template( 'public/css/common/flash.css', 'public/flash.css' );
    lib.create_file_by_template( 'public/css/common/footer.css', 'public/footer.css' );
    lib.create_file_by_template( 'public/css/common/header.css', 'public/header.css' );
    lib.create_file_by_template( 'public/css/common/nav.css', 'public/nav.css' );
    lib.create_file_by_template( 'public/css/common/reset.css', 'public/reset.css' );
    lib.create_file_by_template( 'public/css/common/util.css', 'public/util.css' );
    lib.create_file_by_template( 'public/img/sprite.png', 'public/sprite.png' );
    lib.create_file( 'public/img/.gitkeep', '' );
    lib.create_file_by_template( 'public/js/common/ga.js', 'public/ga.js' );
    lib.create_file_by_template( 'public/apple-touch-icon-57x57-precomposed.png', 'public/apple-touch-icon-57x57-precomposed.png' );
    lib.create_file_by_template( 'public/apple-touch-icon-72x72-precomposed.png', 'public/apple-touch-icon-72x72-precomposed.png' );
    lib.create_file_by_template( 'public/apple-touch-icon-114x114-precomposed.png', 'public/apple-touch-icon-114x114-precomposed.png' );
    lib.create_file_by_template( 'public/apple-touch-icon-129x129-precomposed.png', 'public/apple-touch-icon-129x129-precomposed.png' );
    lib.create_file_by_template( 'public/apple-touch-icon-precomposed.png', 'public/apple-touch-icon-precomposed.png' );
    lib.create_file_by_template( 'public/apple-touch-icon.png', 'public/apple-touch-icon.png' );
    lib.create_file_by_template( 'public/favicon.ico', 'public/favicon.ico' );
    lib.create_file_by_template( 'public/robots.txt', 'public/robots.txt' );

    lib.create_file( 'test/.gitkeep', '' );
    lib.create_file( 'tmp/.gitkeep', '' );

    // root
    lib.create_file_by_template( '.gitignore', 'gitignore' );
    lib.create_file_by_template( 'package.json', 'package.json', replace.app_name );
    lib.create_file_by_template( 'README.md', 'README.md' );
    lib.create_file_by_template( 'server', 'server' );

    process.exit();
  },

  // ex. coke g model User name:string email:string
  model : function ( args ){
    process.exit();
  },

  // ex. coke g controller users index show
  controller : function ( args ){
    process.exit();
  },

  // ex. coke g scaffold User name:string email:string
  scaffold : function ( args ){
    process.exit();
  }

};