var fs = require( 'fs' );



module.exports = {

  controller_code : function ( model, driver, result ){
    return fs.readFileSync( __dirname + '/../templates/crud_controller.js', 'utf8' ).
      replace( /models/g, pluralize( model ).toLowerCase()).
      replace( /model/g, model.toLowerCase()).
      replace( /Model/g, camelize( model, true )).
      replace( /FILTER_PROPERTIES/g, '[' + result.map( function ( p ){
        return "'" + p.name + "'";
      }).join( ', ' ) + ']' );;
  },

  parse_options : function( defaultKeyName ){
    var options = [];
        options.tpl = app.settings[ 'view engine' ] || 'thunder';

    var key = defaultKeyName || false;

    args.forEach( function ( arg ){
      if( arg.slice( 0, 2 ) == '--' ){
        key = arg.slice( 2 );
        options[ key ] = true;
      }else if( arg[ 0 ] == '-' ){
        key = arg.slice( 1 );
        options[ key ] = true;
      }else if( key ){
        options[ key ] = arg;
        key = false;
      }else{
        options.push( arg );
      }
    });

    return options;
  },

  create_dir : function ( dir ){
    var root = process.cwd();

    if( options.appname && !createDir.rootCreated ){
      this.create_dir.rootCreated = true;
      this.create_dir( '' );
    }

    if( options.appname ){
      dir = options.appname + '/' + dir;
    }

    if( path.existsSync( root + '/' + dir )){
      sys.puts( $( 'exists' ).bold.grey + '  ' + dir );
    }else{
      fs.mkdirSync( root + '/' + dir, '0755');
      sys.puts( $('create').bold.green + '  ' + dir);
    }
  },

  append_to_file: function(filename, contents) {
    var root = process.cwd() + '/',
      fd = fs.openSync(root + filename, 'a');
    fs.writeSync(fd, contents);
    fs.closeSync(fd);
  },

  create_file: function(filename, contents) {
    var root = process.cwd();
    if (options.appname) {
      filename = options.appname + '/' + filename;
    }
    var fullPath = root + '/' + filename;
    if (path.existsSync(fullPath)) {
      sys.puts($('exists').bold.grey + '  ' + filename);
    } else {
      fs.writeFileSync(fullPath, contents);
      sys.puts($('create').bold.green + '  ' + filename);
    }
    return fullPath;
  },

  create_file_by_template : function( filename, template, prepare ){
    if( !template.match( /\..+$/ )){
      template += '.js';
      filename += '.js';
    }

    var text = fs.readFileSync( __dirname + '/../templates/' + template );

    if( prepare ){
      text = text.toString( 'utf8' );

      if( typeof prepare === 'function' ){
        prepare = [ prepare ];
      }

      prepare.forEach( function( p ){
        text = p( text );
      });
    }

    return this.create_file( filename, text );
  },

  create_view_by_template: function(filename, template, prepare) {
    options.tpl = options.tpl || 'ejs';
    var _package = options.tpl + '-ext',
      tpl;

    try{
      tpl = require( _package );
    } catch(e) {
      sys.puts( $( 'Templating engine ' + options.tpl + ' is not supported' ).red );
      return;
    }
    var text = fs.readFileSync(tpl.template(template));
    if (prepare) {
      text = prepare(text.toString('utf8'));
    }
    return createFile(filename + tpl.extension, text);
  },

  create_view: function(filename, template, data, fn) {
    options.tpl = options.tpl || 'ejs';
    var _package = options.tpl + '-ext';
    try {
      var tpl = require(_package);
    } catch(e) {
      sys.puts($('Templating engine ' + options.tpl + ' is not supported').red);
      return;
    }
    var text = tpl.templateText(template, data);
    if (typeof fn === 'function') {
      text = fn(text.toString());
    }
    return createFile(filename + tpl.extension, text);
  },

  create_parents: function(ns, d) {
    ns.forEach(function(dir) {
      d += dir + '/';
      createDir(d);
    });
  },

  replace_app_name: function(template, appname) {
    return template.replace(/APPNAME/g, appname || 'default');
  },

  replace_view_engine: function(template, tpl) {
    return template.replace(/VIEWENGINE/g, tpl || 'thunder');
  },

  format : function ( name ){
    name = (name || 'string').toLowerCase();
    switch (name) {
    case 'string':
      return 'String';

    case 'date':
      return 'Date';

    case 'bool':
    case 'boolean':
      return 'Boolean';

    case 'int':
    case 'real':
    case 'float':
    case 'decimal':
    case 'number':
      return 'Number';
    }

    return '"' + name + '"';
  }
};


