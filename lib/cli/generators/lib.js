var fs         = require( 'fs' );
var path       = require( 'path' );
var inflection = require( 'inflection' );
var regex      = require( '../../utils' ).regex;

var colors = require( 'cli-color' );
var $good  = colors.bold.green;
var $fine  = colors.bold.grey;
var $alert = colors.red;


module.exports = {

  _create : function ( path, content, method ){
    var root = process.cwd();

    if( this._options.prefix ){
      path = this._options.prefix + '/' + path;
    }

    var full_path = root + '/' + path;

    if( path.existsSync( full_path )){
      console.log( $fine( 'exists' ) + '  ' + path );
    }else{
      fs[ method ]( full_path, content );
      console.log( $good( 'create' ) + '  ' + path );
    }
  },

  init : function ( options ){
    if( options === undefined ) options = {};

    this._options = options;
  },

  create_dir : function ( path ){
    this._create( path, '0755', 'mkdirSync' );
  },

  create_file : function ( path, content ){
    this._create( path, content, 'writeFileSync' );
  },

  create_file_by_template : function ( path, template, replace_rules ){
    var content = fs.readFileSync( __dirname + '/../../../templates/' + template, 'utf8' );

    if( replace_rules ){
      if( typeof replace_rules === 'function' ){
        replace_rules = [ replace_rules ];
      }

      replace_rules.forEach( function( replace_rule ){
        content = replace_rule( content, this._options.replace_target );
      });
    }

    if( !regex.is_js_file.test( path )) path += '.js';

    return this.create_file( path, content );
  }
};


