/*!
 * COKE
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * COKE utility functions.
 */

/**
 * Module dependencies.
 * @private
 */
var fs     = require( 'fs' );
var colors = require( 'cli-color' );

/**
 * Shortcuts for terminal colors.
 * @public
 */
utils.$update = colors.bold.yellow;
utils.$good   = colors.bold.green;
utils.$fine   = colors.bold.gray;
utils.$alert  = colors.red;

/**
 * Regular expression collection.
 * @public
 */
utils.regex = {
  bad_req                       : /^[45][0-9][0-9]$/,
  db_ill_char                   : /[\s\<\>!@#\$%^&\*,\.]+/g,
  has_format                    : /\..+$/,
  has_none_characters           : /\W/g,
  has_none_characters_but_slash : /(?![\/])\W/g,
  has_none_characters_but_colon : /(?![\:])\W/g,
  is_js_file                    : /\.js$/,
  is_word                       : /^[a-zA-Z]+$/,
  routes_namespace : function ( namespace ){
    return new RegExp( 'map\\\.namespace\\\( \\\'' + namespace + '\\\'\\\,', 'g' );
  },
  url : /^(https?):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
};

/**
 * Add spaces for better syntax of COKE command line tools.
 * @public
 * @this {utils}
 * @param {Function} str The target string.
 * @param {Function} len Max length inculding the target string plus spaces.
 * @param {Function} to_start Add spaces to the front.
 */
utils.add_spaces = function ( str, len, to_start ){
  var str_len = str.length;
  var i       = str_len;

  for( ;i < len; i += 1 ){
    if( !to_start ){
      str += ' ';
    }else{
      str = ' ' + str;
    }
  }

  return str;
};

/**
 * Shows the client ip address.
 * @public
 * @this {utils}
 * @param {Object} req The request object.
 * @returns {String} Returns the client ip.
 */
utils.ip = function ( req ){
  return req.connection.remoteAddress || req.headers[ 'x-forwarded-for' ];
};

/**
 * Check if the current process is working in the project root dir.
 * @public
 * @this {utils}
 * @param {Function} callback The success callback function.
 */
utils.is_project_root = function ( callback ){
  var current = process.cwd();
  var files   = fs.readdirSync( current );
  var found   = false;

  files.forEach( function ( file ){
    if( file === 'server.js' ){
      callback( current );
      found = true;
    }
  });

  if( !found ){
    console.log(
      this.$alert( 'error' ) +
      '   `server.js` not found, are you in the project root dir?'
    );
    process.exit( 0 );
  }
};

/**
 * Generate random number by the given range.
 * @public
 * @this {utils}
 * @param {Number} min The minimum number.
 * @param {Number} max The maximum number.
 * @returns {Number} Returns the random number.
 * @example
 *
 *     var ran = utils.ran_no( 10, 100 );
 */
utils.ran_no = function ( min, max ){
  return Math.floor( Math.random() * ( max - min + 1 )) + min;
};

/**
 * Use this instead of the untrusted typeof.
 * @public
 * @this {utils}
 * @param {Object} obj The target object.
 * @returns {String} Returns the capitalized type name.
 * @example
 *
 *     var type = UTILS.typeof( 'i\'m a string' );
 */
utils.typeof = function ( obj ){
  if( obj === null )      return 'null';
  if( obj === undefined ) return 'undefined';

  var ret = {}.toString.call( obj ).match( /^\[object\s+(.*?)\]$/ )[ 1 ];

  ret = ret ? ret.toLowerCase() : '';

  return ret == 'number' && isNaN( obj ) ? 'NaN' : ret;
};

/**
 * Generate a unic ID string.
 * @public
 * @this {utils}
 * @param {Number} len ID length.
 * @returns {String} Returns the unic ID.
 * @example
 *
 *     var id = utils.uid( 32 );
 */
utils.uid = function ( len ){
  var str     = '';
  var src     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var src_len = src.length;
  var i       = len;

  for( ; i-- ; ){
    str += src.charAt( this.ran_no( 0, src_len - 1 ));
  }

  return str;
};

/**
 * Exports module as getter to global.
 */
global.__defineGetter__( 'UTILS', function (){
  return utils;
});

/**
 * Exports module.
 */
module.exports = utils;