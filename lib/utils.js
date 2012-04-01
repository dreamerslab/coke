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
var utils  = require( 'connect' ).utils;
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
  db_ill_char                   : /[\s\<\>!@#\$%^&\*,\.]+/g,
  has_format                    : /\..+$/,
  has_none_characters           : /\W/g,
  has_none_characters_but_slash : /(?![\/|\s])\W/g,
  has_none_characters_but_colon : /(?![\:|\s])\W/g,
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
 * Use this instead of the untrusted typeof.
 * @public
 * @this {utils}
 * @param {Object} obj The target string.
 * @returns {String} Returns the capitalized type name.
 * @example
 *
 *     var type = UTILS.is( 'i\'m a string' );
 */
utils.is = function ( obj ){
  return {}.toString.call( obj ).replace( /(\[object )|\]/g, '' );
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
      this.$alert( 'error' ) + '   ' +
      '`server.js` not found, are you in the project root dir?'
    );
    process.exit( 0 );
  }
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
