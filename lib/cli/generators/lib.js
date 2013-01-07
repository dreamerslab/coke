/**
 * Module dependencies.
 * @private
 */
var fs         = require( 'fs' );
var inflection = require( 'inflection' );
var replace    = require( './replace' );
var utils      = require( '../../utils' );
var regex      = utils.regex;

// we must have these 2 declare here because we use `out` in `_`
var _, out;

_ = {

  create : function ( path, content, method ){
    if( _.options && _.options.prefix ){
      path = _.options.prefix + '/' + path;
    }

    out.path_exists( path, function ( full_path ){
      console.log( utils.$fine( 'exists' ) + '  ' + path );
    }, function ( full_path ){
      fs[ method ]( full_path, content );
      console.log( utils.$good( 'create' ) + '  ' + path );
    });
  },

  full_path : function ( path ){
    return process.cwd() + '/' + ( path === undefined ? '' : path );
  },

  valid_name : function ( name, regex ){
    if( !regex.test( name )) return name;

    console.log(
      utils.$alert( 'error' ) + '   \'' +
        name + '\' contains invalid characters.'
    );

    process.exit( 1 );
  }
};



out = {

  init : function ( options ){
    _.options = options === undefined ?
      {} : options;
  },

  valid_action_name : function ( action ){
    var tmp = _.valid_name( action, regex.has_none_characters );

    return tmp.toLowerCase();
  },

  valid_controller_name : function ( controller ){
    var tmp = _.valid_name( controller, regex.has_none_characters_but_slash );

    return inflection.tableize( tmp );
  },

  valid_model_name : function ( model ){
    return inflection.classify( _.valid_name( model, regex.has_none_characters ));
  },

  // lowercase first then
  valid_model_prop_name : function ( prop ){
    var tmp = _.valid_name( prop, regex.has_none_characters_but_colon );

    return tmp.toLowerCase();
  },

  is_args_defined : function ( args, msg ){
    if( args === undefined || args.length === 0 ){
      console.log(
        utils.$alert( 'error' ) + '   arguments not defined.'
      );
      console.log( 'Usage example: coke g ' + msg );

      process.exit( 1 );
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
        namespace  : tmp[ 0 ],
        controller : tmp[ 1 ]
      };
    }

    // too many slash
    console.log(
      utils.$alert( 'error' ) +
      '   coke geneartor only supports 1 level deep namespace'
    );

    process.exit( 1 );
  },

  path : function ( path, template ){
    if( template === undefined ) template = path;

    return this.path_exists_sync( path, undefined, function ( full_path ){
      // not exist, get from template
      return  __dirname + '/templates/' + template;
    });
  },

  path_exists : function ( _path, exist, not_exist ){
    var full_path = _.full_path( _path );

    if( fs.existsSync( full_path )){
      exist && exist( full_path );
    }else{
      not_exist && not_exist( full_path );
    }
  },

  path_exists_sync : function ( _path, exist, not_exist ){
    var full_path = _.full_path( _path );

    if( fs.existsSync( full_path )){
      if( exist ) return exist( full_path );
    }else{
      if( not_exist ) return not_exist( full_path );
    }

    return full_path;
  },

  exist_alert : function ( path ){
    console.log(
      utils.$alert( 'error' ) + '   ' +
      path + ' already exists'
    );
    process.exit();
  },

  create_dir : function ( path ){
    _.create( path, '0755', 'mkdirSync' );
  },

  create_file : function ( path, content ){
    if( content === undefined ) content = '';

    _.create( path, content, 'writeFileSync' );
  },

  create_file_f : function ( path, content ){
    if( _.options.prefix ){
      path = _.options.prefix + '/' + path;
    }

    var full_path = process.cwd() + '/' + path;

    fs.writeFileSync( full_path, content );
    console.log( utils.$update( 'update' ) + '  ' + path );
  },

  create_file_by_template : function ( path, template, replace_rules ){
    if( !path.match( regex.has_format )){
      path     += '.js';
      template += '.js';
    }

    var content = fs.readFileSync( __dirname + '/templates/' + template, 'utf8' );

    if( replace_rules ){
      if( typeof replace_rules === 'function' ){
        replace_rules = [ replace_rules ];
      }

      replace_rules.forEach( function( replace_rule ){
        content = replace_rule.call( replace, content );
      });
    }

    this.create_file( path, content );
  },

  create_binary_file : function ( path, template ){
    var content = fs.readFileSync( __dirname + '/templates/' + template );

    this.create_file( path, content );
  },

  format : function ( name ){
    name = ( name || 'string' ).toLowerCase();

    switch( name ){
      case 'string' :   return 'String';

      case 'date' :     return 'Date';

      case 'bool' :
      case 'boolean' :  return 'Boolean';

      case 'arr' :
      case 'array' :    return 'Array';

      case 'id' :
      case 'objectid' : return 'ObjectId';

      case 'int' :
      case 'integer' :
      case 'real' :
      case 'float' :
      case 'decimal' :
      case 'number' :   return 'Number';
    }

    return name;
  }
};

out.valid_project_name = out.valid_action_name;

module.exports = out;
