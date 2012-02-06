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
var fs         = require( 'fs' );
var path       = require( 'path' );
var colors     = require( 'cli-color' );
var inflection = require( 'inflection' );
var lib        = require( './lib' );
var replace    = require( './replace' );
var tpl_dir    = '/../../../templates/';

var create_dir = function( path ){
  // it has to be wrap in another function for creating a different scope
  lib.create_dir( path );
};



module.exports = {

  // ex. coke new wasabi.fm
  // args = [ 'wasabi.fm' ];
  init : function ( args ){
    var app_name;

    if( !args ){
      app_name = 'coke';
    }else{
      app_name = args.shift();
    }

    lib.init({
      prefix : app_name
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
    ].forEach( create_dir );

    // create files
    // controllers
    lib.create_file_by_template( 'app/controllers/application', 'controllers/application' );
    lib.create_file_by_template( 'app/controllers/welcome', 'controllers/welcome' );

    lib.create_file_by_template( 'app/helpers/application', 'helpers/application' );
    lib.create_file( 'app/libs/.gitkeep', '' );
    lib.create_file_by_template( 'app/locals/en/welcome', 'locals/welcome');

    // middlewares
    lib.create_file_by_template( 'app/middlewares/csrf', 'middlewares/csrf' );
    lib.create_file_by_template( 'app/middlewares/err400', 'middlewares/err404' );
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
    lib.create_binary_file( 'public/img/sprite.png', 'public/sprite.png' );
    lib.create_file( 'public/img/.gitkeep', '' );
    lib.create_file_by_template( 'public/js/common/ga.js', 'public/ga.js' );
    lib.create_binary_file( 'public/apple-touch-icon-57x57-precomposed.png', 'public/apple-touch-icon-57x57-precomposed.png' );
    lib.create_binary_file( 'public/apple-touch-icon-72x72-precomposed.png', 'public/apple-touch-icon-72x72-precomposed.png' );
    lib.create_binary_file( 'public/apple-touch-icon-114x114-precomposed.png', 'public/apple-touch-icon-114x114-precomposed.png' );
    lib.create_binary_file( 'public/apple-touch-icon-129x129-precomposed.png', 'public/apple-touch-icon-129x129-precomposed.png' );
    lib.create_binary_file( 'public/apple-touch-icon-precomposed.png', 'public/apple-touch-icon-precomposed.png' );
    lib.create_binary_file( 'public/apple-touch-icon.png', 'public/apple-touch-icon.png' );
    lib.create_binary_file( 'public/favicon.ico', 'public/favicon.ico' );
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
    lib.is_args_defined( args,
      'model [model_name] [porp:format] [another_porp:format]' );

    lib.valid_name( args.shift(), function ( model ){
      model          = inflection.classify( args.shift());
      var model_path = 'app/models/' + model + '/';

      lib.init();

      // if model exist stop it
      lib.path_exists( model_path, lib.exist_alert, function ( full_path ){

        // check if dir exists, if not creates it
        [ 'app/',
          'app/models/'
        ].forEach( create_dir );

        replace.init({
          model : model
        });

        // create model file
        lib.create_file_by_template( 'app/models/' + model, 'model', replace.model );

        // modify schema file
        var schema_suffix = 'db/schema';
        var schema_path   = lib.path_exists_sync( schema_suffix + '.js', undefined, function ( full_path ){
          // not exist, get from template
          return  __dirname + tpl_dir + 'schema';
        });

        var schema_code = fs.readFileSync( schema_path, 'utf8' );
        var tmp_schema_code = [ '\n  ' + model + ' : new Schema({' ];

        args.forEach( function ( arg ){
          // split args and do error handling
          var tmp    = arg.split( ':' );
          var prop   = tmp[ 0 ];
          var format = lib.format( tmp[ 1 ]);

          tmp_schema_code.push( '    ' + prop + ' : { type : ' + format + ' },' );
        });

        tmp_schema_code.push( '    created_at : { type : Number, \'default\' : Date.now },' );
        tmp_schema_code.push( '    updated_at : { type : Number, \'default\' : Date.now }' );
        tmp_schema_code.push( '  }),' );
        tmp_schema_code = tmp_schema_code.join( '\n' );
        // we might not need this anymore since we add the updated_at at the last with no comma
        tmp_schema_code = tmp_schema_code.replace( '},\n  })', '}\n  })' );
        schema_code     = schema_code.replace( 'var Model = {', 'var Model = {\n' + tmp_schema_code );
        schema_code     = schema_code.replace( '  }),\n};', '  })\n};' );
        // write file
        lib.create_file_f( schema_suffix + '.js', schema_code );

        process.exit();
      });
    });
  },



  // ex. coke g controller users index show
  controller : function ( args ){
    lib.is_args_defined( args,
      'controller [controller_name] [action_name] [another_action_name]' );

    lib.valid_name( args.shift(), function ( controller ){
      controller = inflection.tableize( args.shift());
      var controller_path = 'app/controllers/' + controller + '.js';

      // if controller exist stop it
      lib.path_exists( controller_path, lib.exist_alert, function ( full_path ){
        // create routes
        var routes_suffix = 'config/routes';
        var routes_path = lib.path_exists_sync( routes_suffix, undefined, function ( full_path ){
          // not exist, get from template
          return  __dirname + tpl_dir + routes_suffix;
        });

        var routes_src       = fs.readFileSync( routes_path + '.js', 'utf8' );
        var routes_init_code = 'module.exports = function ( map ){';
        var routes_code      = [ routes_init_code ];

        // create controller file
        var controller_code = [ 'module.exports = {' ];

        // create view files
        replace.init({
          controller : controller
        });

        // namespace checking
        var has_namespace = lib.has_namespace( controller );
        var view_path = 'app/views/' + controller + '/';
        var dirs = [ 'app/',
          'app/controllers/',
          'app/views/'
        ];

        if( has_namespace ){
          var namespace          = has_namespace.namespace;
          var splited_controller = has_namespace.controller;

          lib.routes_namespace( namespace, routes_src, routes_code );
          routes_code.namespace = true;

          // add namespace dirs for controller and view
          dirs.push( 'app/controllers/' + namespace + '/' );
          dirs.push( 'app/views/' + namespace + '/' );
        }

        dirs.push( view_path );

        // start manipulation
        lib.init();

        // check if dir exists, if not creates it
        dirs.forEach( create_dir );

        // get action names
        args.forEach( function ( action ){
          var url = controller + '/' + action;

          //routes
          var tmp_routes_code = routes_code.namespace ?
            '    ' + namespace + '.get( \'' + url + '\', \'' + splited_controller + '#' + action + '\' );' :
            '  map.get( \'' + url + '\', \'' + controller + '#' + action + '\' );';

          routes_code.push( tmp_routes_code );

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

        // routes
        if( routes_code.namespace ){
          routes_code.push( '  )};' );
        }
        routes_code = routes_code.join( '\n' );
        routes_code = routes_src.replace( routes_init_code, routes_code );
        lib.create_file_f( routes_suffix + '.js', routes_code );

        // controller
        controller_code.push( '};' );
        controller_code = controller_code.join( '\n' );
        // replace last comma
        controller_code = controller_code.replace( '},\n};', '}\n};' );
        lib.create_file( controller_path, controller_code );

        process.exit();
      });
    });
  },



  // ex. coke g scaffold User name:string email:string
  scaffold : function ( args ){
    lib.is_args_defined( args,
      'scaffold [controller_name] [porp:format] [another_porp:format]' );

    lib.valid_name( args.shift(), function ( generator_name ){
      var controller      = inflection.tableize( generator_name );
      var model           = inflection.classify( generator_name );
      var controller_path = 'app/controllers/' + controller + '.js';
      var view_path       = 'app/views/' + controller + '/';
      var dirs = ['app/',
        'app/controllers/',
        'app/models/',
        'app/views/'
      ];

      // check if dir exists, if not creates it
      dirs = dirs.push( view_path );
      dirs.forEach( create_dir );

      lib.init();

      replace.init({
        model : model,
        plural : controller,
        singular : inflection.singularize( controller )
      });

      // if controller exist stop it
      lib.path_exists( controller_path, lib.exist_alert, function ( full_path ){
        // namespace checking
        var has_namespace = lib.has_namespace( controller );
        var view_path = 'app/views/' + controller + '/';
        var dirs = [ 'app/',
          'app/controllers/',
          'app/views/'
        ];

        if( has_namespace ){
          var namespace          = has_namespace.namespace;
          var splited_controller = has_namespace.controller;

          lib.routes_namespace( namespace, routes_src, routes_code );
          routes_code.namespace = true;

          // add namespace dirs for controller and view
          dirs.push( 'app/controllers/' + namespace + '/' );
          dirs.push( 'app/views/' + namespace + '/' );
        }

        // create controller
        lib.create_file_by_template( controller_path, 'controllers/scaffold.js', [
          replace.model,
          replace.plural,
          replace.singular
        ]);

        // create views
        // replace a lot of different matchs
        lib.create_file_by_template( view_path + '/_form.html', 'views/form.html', replace.universal );
        lib.create_file_by_template( view_path + '/edit.html', 'views/edit.html', replace.universal );
        lib.create_file_by_template( view_path + '/index.html', 'views/index.html', replace.universal );
        lib.create_file_by_template( view_path + '/new.html', 'views/new.html', replace.universal );
        lib.create_file_by_template( view_path + '/show.html', 'views/shot.html', replace.universal );
        // modify _nav.html

        // create model

        // modify schema

        // create routes

        // create css
        lib.create_file_by_template( 'public/css/scaffold.css', 'public/scaffold.css' );

        process.exit();
      });
    });
  }

};