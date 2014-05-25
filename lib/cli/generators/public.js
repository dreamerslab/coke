/*!
 * COKE
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Public generator methods for lib/cli/generators
 * @todo
 * A lot of duplicated codes, need more abstraction.
 * Better error handling.
 */

/**
 * Module dependencies.
 * @private
 */
var fs         = require( 'fs' );
var path       = require( 'path' );
var inflection = require( 'inflection' );
var lib        = require( './lib' );
var replace    = require( './replace' );

var generate_model = require( './model' ).generate;
var generate_view  = require( './view' ).generate;
var generate_route = require( './route' ).generate;



module.exports = {

  // ex. coke new wasabi.fm
  // args = [ 'wasabi.fm' ];
  'new' : function ( args ){
    var app_name = !args.length ? 'coke' : args.shift();

    lib.init({
      prefix : lib.valid_project_name( app_name )
    });

    replace.init({
      app_name : app_name
    });

    // create dirs
    [ '',
      'app/',
      'app/controllers/',
      'app/helpers/',
      'app/libs/',
      'app/locales/',
      'app/locales/en/',
      'app/middlewares/',
      'app/models/',
      'app/models/hooks/',
      'app/models/virtuals/',
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
      'db/migrate/',
      'db/schema/',
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
    lib.create_file_by_template( 'app/controllers/welcome'    , 'controllers/welcome' );

    lib.create_file_by_template( 'app/helpers/application', 'helpers/application' );
    lib.create_file( 'app/libs/.gitkeep' );
    lib.create_file_by_template( 'app/locales/en/welcome' , 'locales/welcome');

    // middlewares
    lib.create_file_by_template( 'app/middlewares/body_parser'    , 'middlewares/body_parser' );
    lib.create_file_by_template( 'app/middlewares/cookie_parser'  , 'middlewares/cookie_parser' );
    lib.create_file_by_template( 'app/middlewares/csrf'           , 'middlewares/csrf' );
    lib.create_file_by_template( 'app/middlewares/dynamic_helpers', 'middlewares/dynamic_helpers' );
    lib.create_file_by_template( 'app/middlewares/err404'         , 'middlewares/err404' );
    lib.create_file_by_template( 'app/middlewares/err500'         , 'middlewares/err500' );
    lib.create_file_by_template( 'app/middlewares/error_handler'  , 'middlewares/error_handler' );
    lib.create_file_by_template( 'app/middlewares/favicon'        , 'middlewares/favicon' );
    lib.create_file_by_template( 'app/middlewares/logger'         , 'middlewares/logger' );
    lib.create_file_by_template( 'app/middlewares/method_override', 'middlewares/method_override' );
    lib.create_file_by_template( 'app/middlewares/multipart'      , 'middlewares/multipart' );
    lib.create_file_by_template( 'app/middlewares/session'        , 'middlewares/session' );
    lib.create_file_by_template( 'app/middlewares/static'         , 'middlewares/static' );

    lib.create_file( 'app/models/hooks/.gitkeep' );
    lib.create_file( 'app/models/virtuals/.gitkeep' );
    lib.create_file( 'db/migrate/.gitkeep' );

    // views
    lib.create_file_by_template( 'app/views/common/_nav.html'    , 'views/nav.html' );
    lib.create_file_by_template( 'app/views/error/404.html'      , 'views/404.html' );
    lib.create_file_by_template( 'app/views/error/500.html'      , 'views/500.html' );
    lib.create_file_by_template( 'app/views/layouts/default.html', 'views/layout.html' , replace.app_name );
    lib.create_file_by_template( 'app/views/welcome/index.html'  , 'views/welcome.html', replace.app_name );

    // configs, we might offer a replace view engine options here in the future
    lib.create_file_by_template( 'config/dev/config.yml' , 'config/dev/config.yml', replace.app_name );
    lib.create_file_by_template( 'config/dev/express'    , 'config/dev/express' );
    lib.create_file_by_template( 'config/prod/config.yml', 'config/prod/config.yml', replace.app_name );
    lib.create_file_by_template( 'config/prod/express'   , 'config/prod/express' );
    lib.create_file_by_template( 'config/test/config.yml', 'config/test/config.yml', replace.app_name );
    lib.create_file_by_template( 'config/test/express'   , 'config/test/express' );
    lib.create_file_by_template( 'config/assets.yml'     , 'config/assets.yml' );
    lib.create_file_by_template( 'config/routes'         , 'config/routes' );

    lib.create_file_by_template( 'db/schema/index', 'schema' );
    lib.create_file_by_template( 'doc/README.md'  , 'doc/README.md', replace.app_name );

    // log
    lib.create_file( 'log/monit.log' );
    lib.create_file( 'log/nginx.log' );
    lib.create_file( 'log/static.log' );
    lib.create_file( 'log/upstart.log' );

    // assets
    lib.create_file( 'public/assets/.gitignore' );
    lib.create_file_by_template( 'public/css/common/base.css'  , 'public/base.css' );
    lib.create_file_by_template( 'public/css/common/flash.css' , 'public/flash.css' );
    lib.create_file_by_template( 'public/css/common/footer.css', 'public/footer.css' );
    lib.create_file_by_template( 'public/css/common/header.css', 'public/header.css' );
    lib.create_file_by_template( 'public/css/common/nav.css'   , 'public/nav.css' );
    lib.create_file_by_template( 'public/css/common/reset.css' , 'public/reset.css' );
    lib.create_file_by_template( 'public/css/common/util.css'  , 'public/util.css' );
    lib.create_binary_file( 'public/img/sprite.png'            , 'public/sprite.png' );
    lib.create_file( 'public/img/.gitkeep' );
    lib.create_file_by_template( 'public/js/common/ga.js'                    , 'public/ga.js' );
    lib.create_binary_file( 'public/apple-touch-icon-57x57-precomposed.png'  , 'public/apple-touch-icon-57x57-precomposed.png' );
    lib.create_binary_file( 'public/apple-touch-icon-72x72-precomposed.png'  , 'public/apple-touch-icon-72x72-precomposed.png' );
    lib.create_binary_file( 'public/apple-touch-icon-114x114-precomposed.png', 'public/apple-touch-icon-114x114-precomposed.png' );
    lib.create_binary_file( 'public/apple-touch-icon-129x129-precomposed.png', 'public/apple-touch-icon-129x129-precomposed.png' );
    lib.create_binary_file( 'public/apple-touch-icon-precomposed.png'        , 'public/apple-touch-icon-precomposed.png' );
    lib.create_binary_file( 'public/apple-touch-icon.png'                    , 'public/apple-touch-icon.png' );
    lib.create_binary_file( 'public/favicon.ico'                             , 'public/favicon.ico' );
    lib.create_file_by_template( 'public/robots.txt'                         , 'public/robots.txt' );

    lib.create_file( 'test/.gitkeep' );
    lib.create_file( 'tmp/.gitkeep' );

    // root
    lib.create_file_by_template( '.gitignore'  , 'gitignore' );
    lib.create_file_by_template( 'package.json', 'package.json', replace.app_name );
    lib.create_file_by_template( 'README.md'   , 'README.md', replace.app_name );
    lib.create_file_by_template( 'server'      , 'server' );
  },



  // ex. coke g model User name:string email:string
  model : function ( args ){
    lib.is_args_defined( args,
      'model [model_name] [porp:format] [another_porp:format]' );

    var model      = lib.valid_model_name( args.shift());
    var model_path = 'app/models/' + model + '/';

    lib.init();

    // if model exist stop it
    lib.path_exists( model_path, lib.exist_alert, function ( full_path ){
      // check if dir exists, if not creates it
      [ 'app/',
        'app/models/'
      ].forEach( lib.create_dir );

      generate_model( args, model );
    });
  },



  // ex. coke g controller users index show
  controller : function ( args ){
    lib.is_args_defined( args,
      'controller [controller_name] [action_name] [another_action_name]' );

    var controller      = lib.valid_controller_name( args.shift());
    var controller_path = 'app/controllers/' + controller + '.js';

    // if controller exist stop it
    lib.path_exists( controller_path, lib.exist_alert, function ( full_path ){
      var view_path = 'app/views/' + controller + '/';
      var dirs = [ 'app/',
        'app/controllers/',
        'app/views/'
      ];

      // namespace checking
      var has_namespace = lib.has_namespace( controller );
      var namespace;

      if( has_namespace ){
        namespace = has_namespace.namespace;

        // add namespace dirs for controller and view
        dirs.push( 'app/controllers/' + namespace + '/' );
        dirs.push( 'app/views/' + namespace + '/' );
      }

      dirs.push( view_path );
      // start manipulation
      lib.init();
      // check if dir exists, if not creates it
      dirs.forEach( lib.create_dir );

      // create controller file
      var controller_code = [];

      controller_code.push( 'var Application = require( CONTROLLER_DIR + \'/application\' );\n' );
      controller_code.push( 'module.exports = Application.extend({' );

      // create view files
      replace.init({
        controller : controller
      });

      // get action names
      args.forEach( function ( action ){
        action = lib.valid_action_name( action );
        var url = controller + '/' + action;

        // controller
        controller_code.push( '\n  ' + action + ' : function ( req, res, next ){' );
        controller_code.push( '    res.render( \'' + url + '\' );' );
        controller_code.push( '  },' );

        // views
        var path = view_path + action + '.html';

        replace.set( 'action', action );
        replace.set( 'path', path );
        lib.create_file_by_template( path, 'views/controller.html', [
          replace.controller,
          replace.action,
          replace.path
        ]);
      });

      // controller
      controller_code.push( '});' );
      controller_code = controller_code.join( '\n' );
      // replace last comma
      controller_code = controller_code.replace( '},\n});', '}\n});' );
      lib.create_file( controller_path, controller_code );

      generate_route( args, controller, has_namespace );
    });
  },



  // ex. coke g scaffold User name:string email:string
  scaffold : function ( args ){
    lib.is_args_defined( args,
      'scaffold [controller_name] [porp:format] [another_porp:format]' );

    var controller      = lib.valid_controller_name( args.shift());
    var model           = controller;
    var controller_path = 'app/controllers/' + controller + '.js';

    // if controller exist stop it
    lib.path_exists( controller_path, lib.exist_alert, function ( full_path ){
      var view_path = 'app/views/' + controller + '/';
      var dirs = [
        'app/',
        'app/controllers/',
        'app/models/',
        'app/views/'
      ];

      var has_namespace      = lib.has_namespace( controller );
      var splited_controller = controller;
      var namespace;

      if( has_namespace ){
        namespace          = has_namespace.namespace;
        splited_controller = has_namespace.controller;
        // add namespace dirs for controller and view
        dirs.push( 'app/controllers/' + namespace + '/' );
        dirs.push( 'app/views/' + namespace + '/' );
      }

      dirs.push( view_path );
      // start manipulation
      lib.init();
      // check if dir exists, if not creates it
      dirs.forEach( lib.create_dir );

      model = lib.valid_model_name( splited_controller );

      replace.init({
        capital   : model,
        plural    : splited_controller,
        singular  : inflection.singularize( splited_controller ),
        view_path : controller
      });

      var replace_rules = [
        replace.capital,
        replace.plural,
        replace.singular,
        replace.view_path
      ];

      generate_model( args, model, true );
      generate_view( args, controller, splited_controller, model, view_path, replace_rules );
      lib.create_file_by_template( controller_path, 'controllers/scaffold.js', replace_rules );
      generate_route( args, controller, has_namespace, true );
    });
  }
};
