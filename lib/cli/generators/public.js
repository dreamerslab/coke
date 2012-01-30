var $ = require();
var _ = require( './private' );

module.exports = {

  init : function ( args ){
    _.parse_options( 'appname' );

    [ 'app/',
      'app/controllers/',
      'app/helpers/',
      'app/libs/',
      'app/locals/',
      'app/locals/en/',
      'app/middlewares/',
      'app/models/',
      'app/controllers/',
      'app/views/',
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
      'public/img/',
      'public/js/',
      'public/tmp/',
      'test/'
    ].forEach( this.create_dir );

    _.create_file_by_template( 'config/routes.js', 'config/routes.js' );

    var srv = createFileByTemplate( 'server', 'server' );

    _.createFile('app/controllers/application_controller.js',
      'before(\'protect from forgery\', function () {\n    protectFromForgery(\'' + secret + '\');\n});\n');

    _.create_file_by_template( 'app/controllers/application',     'config/environment', [ replaceViewEngine, replacePrependMiddleware ]);
    _.create_file_by_template( 'config/environment',              'config/environment', [ replaceViewEngine, replacePrependMiddleware ]);
    _.create_file_by_template( 'config/environments/test',        'config/environments/test');
    _.create_file_by_template( 'config/environments/development', 'config/environments/development');
    _.create_file_by_template( 'config/environments/production',  'config/environments/production');
    _.create_file_by_template( 'config/database.json',            'config/database_' + db + '.json', replaceAppname);
    _.create_file_by_template( 'db/schema', 'schema');
    _.create_fiew_by_template( 'app/views/layouts/application_layout', 'application_layout');
    _.create_file_by_template( 'public/index.html', 'index.html');
    _.create_file_by_template( 'public/stylesheets/reset.css', 'reset.css');
    _.create_file_by_template( 'public/stylesheets/style.css', 'style.css');
    _.create_file_by_template( 'public/javascripts/rails.js', 'rails.js');
    _.create_file('public/javascripts/application.js', '// place your application-wide javascripts here\n');
    _.create_file_by_template('npmfile', 'npmfile', replaceViewEngine);
    _.create_file_by_template('public/favicon.ico', 'favicon.ico');

    var fileExtension = options.coffee ? '.coffee' : '.js';
    var engine = options.coffee ? 'coffee' : 'node';
    // this file is only needed for heroku deployments
    // maybe not produce it by default
    createFile('Procfile', 'web: ' + engine + ' server' + fileExtension);

    create_file_by_template('package.json', 'package.json', [replaceAppname, replaceViewEngine]);

    fs.chmodSync( srv, '0755' );

    process.exit();
  },

  model : function ( args ){
    var options = this.parseOptions( 'model' );
    var model   = options.model;
    var code    = '';

    if( !model ){
      console.log( $( 'Model name required' ).red.bold );
      return;
    }

    var fileExtension = options.coffee ? '.coffee' : '.js';
    var Model         = model[ 0 ].toUpperCase() + model.slice( 1 );
    var attrs         = [];
    var result        = [];
    var driver        = ormDriver();

    options.forEach(function(arg) {
      var property  = arg.split( ':' )[ 0 ];
      var plainType = arg.split( ':' )[ 1 ];
      var type      = formatType(plainType);

      if( options.coffee ){
        attrs.push( '    property \'' + property + '\', ' + type );
      }else{
        attrs.push( '    property(\'' + property + '\', ' + type + ');' );
      }

      result.push({
        name : property,
        type : type,
        plainType : plainType
      });
    });

    createDir( 'app/' );
    createDir( 'app/models/' );
    createFile( 'app/models/' + model + fileExtension, '' );

    if (options.coffee) {
      code = Model + ' = describe \'' + Model + '\', () ->\n' + attrs.join('\n') + '\n';
    } else {
      code = 'var ' + Model + ' = describe(\'' + Model + '\', function () {\n' + attrs.join('\n') + '\n});';
    }
    appendToFile('db/schema' + fileExtension, code);
    return result;
  },

  controller : function(args) {
    parseOptions('controller');
    var controller = options.controller;

    if (!controller) {
      console.log('Usage example: coke g controller controllername actionName anotherActionName');
      console.log('               coke g controller controllername actionName anotherActionName --coffee');
      return;
    }

    var fileExtension;
    var actions;
    if (options.coffee) {
      fileExtension = '.coffee';
      actions = ['load \'application\''];
      options.forEach(function(action) {
        actions.push('action \'' + action + '\', () -> \n    render\n        title: "' + controller + '#' + action + '"');
      });
    } else {
      fileExtension = '.js';
      actions = ['load(\'application\');'];
      options.forEach(function(action) {
        actions.push('action(\'' + action + '\', function () {\n    render({\n        title: "' + controller + '#' + action + '"\n    });\n});');
      });
    }

    var ns = controller.split('/');
    ns.pop();

    createDir('app/');
    createDir('app/controllers/');
    createParents(ns, 'app/controllers/');

    // controller
    var filename = 'app/controllers/' + controller + '_controller' + fileExtension;
    createFile(filename, actions.join('\n\n'));

    createDir('app/helpers/');
    createParents(ns, 'app/helpers/');

    // helper
    filename = 'app/helpers/' + controller + '_helper.js';
    createFile(filename, 'module.exports = {\n};');

    // views
    createDir('app/views/');
    createParents(ns, 'app/views/');
    createDir('app/views/' + controller + '/');

    options.forEach(function(action) {
      createView('app/views/' + controller + '/' + action, 'default_action_view', [controller, action]);
    });
  },

  scaffold : function(args) {
    var driver = ormDriver();
    var model = args[0];
    var models = pluralize(model).toLowerCase();

    if (!model) {
      console.log('Usage example: railway g crud post title:string content:string published:boolean');
      console.log('               railway g crud post title:string content:string published:boolean --coffee');
      return;
    }
    var ns = models.split('/');
    ns.pop();

    var result = modelGenerator.apply(this, Array.prototype.slice.call(arguments));

    createDir('app/');
    createDir('app/controllers/');
    createParents(ns, 'app/controllers/');
    var fileExtension = options.coffee ? '.coffee' : '.js';
    createFile('app/controllers/' + models + '_controller' + fileExtension, controllerCode(model, driver, result));

    createDir('app/helpers/');
    createParents(ns, 'app/helpers/');



    function replaceModel(code) {
      return code.replace(/models/g, models).replace(/model/g, model.toLowerCase()).replace(/Model/g, camelize(model, true)).replace(/VALID_ATTRIBUTES/, result.map(function(attr) {
        return attr.name + ": ''"
      }).join(',\n        '));
    }

    // helper
    createFile('app/helpers/' + models + '_helper.js', 'module.exports = {\n};');

    // layout
    createViewByTemplate('app/views/layouts/' + models + '_layout', 'scaffold_layout', replaceModel);

    // style
    createFileByTemplate('public/stylesheets/scaffold.css', 'scaffold.css');

    // tests
    createDir('test/');
    createFileByTemplate('test/test_helper.js', 'test_helper.js');
    createDir('test/controllers');
    createParents(ns, 'test/controllers/');

    createFileByTemplate('test/controllers/' + models + '_controller_test.js', 'crud_controller_test.js', replaceModel);

    // views
    // _form partial
    createDir('app/views/');
    createDir('app/views/' + models + '/');
    createView('app/views/' + models + '/_form', 'scaffold_form', result);
    createView('app/views/' + models + '/show', 'scaffold_show', result, replaceModel);
    ['new', 'edit', 'index'].forEach(function(template) {
      createViewByTemplate('app/views/' + models + '/' + template, 'scaffold_' + template, replaceModel);
    });

    // route
    var routesConfig = process.cwd() + '/config/routes.js',
      routes = fs.readFileSync(routesConfig, 'utf8').toString().replace(/\s+$/g, '').split('\n'),
      firstLine = routes.shift();

    if (firstLine.match(/^exports\.routes = function \(map\) \{$/) && !routes.some(containRoute)) {
      routes.unshift('    map.resources(\'' + models + '\');');
      routes.unshift(firstLine);
      fs.writeFileSync(routesConfig, routes.join('\n'));
      sys.puts($('patch').bold.blue + '  ' + routesConfig);
    }



    function containRoute(line) {
      var m = line.match(/^\s*map\.resources\('([^']+)'/);
      return m && m[1] == models;
    }
  }

};