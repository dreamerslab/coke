var fs         = require( 'fs' );
var path       = require( 'path' );
var inflection = require( 'inflection' );
var regex      = require( '../../utils' ).regex;
var replace    = require( './replace' );

var colors  = require( 'cli-color' );
var $update = colors.bold.yellow;
var $good   = colors.bold.green;
var $fine   = colors.bold.gray;
var $alert  = colors.red;

var tpl_dir_prefix = '/../../../templates/';


module.exports = {

  _create : function ( path, content, method ){
    if( this._options.prefix ){
      path = this._options.prefix + '/' + path;
    }

    this.path_exists( path, function ( full_path ){
      console.log( $fine( 'exists' ) + '  ' + path );
    }, function ( full_path ){
      fs[ method ]( full_path, content );
      console.log( $good( 'create' ) + '  ' + path );
    });
  },

  _full_path : function ( path ){
    return process.cwd() + '/' + ( path === undefined ? '' : path );
  },

  init : function ( options ){
    this._options = options === undefined ?
      {} : options;
  },

  valid_name : function ( geneartor, success ){
    if( regex.none_characters_but_slash.test( geneartor )){
      console.log(
        $alert( 'error' ) + '   \'' +
        geneartor + '\' contains invalid characters. ex. ~!@#$%^...'
      );

      return process.exit( 0 );
    }

    success( geneartor );
  },

  is_args_defined : function ( args, msg ){
    if( args === undefined || args.length === 0 ){
      console.log(
        $alert( 'error' ) + '   arguments not defined.'
      );
      console.log( 'Usage example: coke g ' + msg );

      return process.exit( 0 );
    }
  },

  has_namespace : function ( controller ){
    var tmp = controller.split( '/' );
    var len = tmp.length;

    if( len === 1 ){
      // no namespace
       return false;
    }else if( len === 2 ){
      // has namespace
      return {
        namespace : tmp[ 0 ],
        controller : tmp[ 1 ]
      };
    }else{
      // too many slash
      console.log(
        $alert( 'error' ) +
        '   coke geneartor only supports 1 level deep namespace'
      );

      return process.exit( 0 );
    }
  },

  routes_namespace : function ( namespace, routes_src, routes_code ){
    var tmp = '  map.namespace( \'' + namespace + '\', function ( ' + namespace + ' ){';

    return regex.routes_namespace( namespace ).test( routes_src ) ?
      [ tmp ] : routes_code.push( tmp );
  },

  path_exists : function ( _path, exist, not_exist ){
    var full_path = this._full_path( _path );

    if( path.existsSync( full_path )){
      exist && exist( full_path );
    }else{
      not_exist && not_exist( full_path );
    }
  },

  path_exists_sync : function ( _path, exist, not_exist ){
    var full_path = this._full_path( _path );

    if( path.existsSync( full_path )){
      if( exist ) return exist( full_path );
    }else{
      if( not_exist ) return not_exist( full_path );
    }

    return full_path;
  },

  exist_alert : function ( path ){
    console.log(
      $alert( 'error' ) + '   ' +
      path + ' already exists'
    );
    process.exit();
  },

  create_dir : function ( path ){
    this._create( path, '0755', 'mkdirSync' );
  },

  create_file : function ( path, content ){
    this._create( path, content, 'writeFileSync' );
  },

  create_file_f : function ( path, content ){
    if( this._options.prefix ){
      path = this._options.prefix + '/' + path;
    }

    var full_path = process.cwd() + '/' + path;

    fs.writeFileSync( full_path, content );
    console.log( $update( 'update' ) + '  ' + path );
  },

  create_file_by_template : function ( path, template, replace_rules ){
    if( !path.match( regex.has_format )){
      path     += '.js';
      template += '.js';
    }

    var content = fs.readFileSync( __dirname + tpl_dir_prefix + template, 'utf8' );

    if( replace_rules ){
      if( typeof replace_rules === 'function' ){
        replace_rules = [ replace_rules ];
      }

      replace_rules.forEach( function( replace_rule ){
        content = replace_rule.call( replace, content );
      });
    }

    return this.create_file( path, content );
  },

  create_binary_file : function ( path, template ){
    var content = fs.readFileSync( __dirname + tpl_dir_prefix + template );

    return this.create_file( path, content );
  },

  format : function ( name ){
    name = ( name || 'string' ).toLowerCase();

    switch( name ){
      case 'string':   return 'String';

      case 'date':     return 'Date';

      case 'bool':
      case 'boolean':  return 'Boolean';

      case 'int':
      case 'integer':
      case 'real':
      case 'float':
      case 'decimal':
      case 'number':   return 'Number';
    }

    return '"' + name + '"';
  }
};


