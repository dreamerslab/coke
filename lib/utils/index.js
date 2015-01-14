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
var colors     = require( 'cli-color' );
var extend     = require( 'node.extend' );
var inflection = require( 'inflection' );

var utils = {

  extend     : extend,
  inflection : inflection,

/**
 * Shortcuts for terminal colors.
 * @public
 */
  $update : colors.bold.yellow,
  $good   : colors.bold.green,
  $fine   : colors.bold.blackBright,
  $alert  : colors.red,

/**
 * Regular expression collection.
 * @public
 */
  regex : require( './regex' ),

/**
 * Add spaces for better syntax of COKE command line tools.
 * @public
 * @this {utils}
 * @param {Function} str The target string.
 * @param {Function} len Max length inculding the target string plus spaces.
 * @param {Function} to_start Add spaces to the front.
 */
  add_spaces : function ( str, len, to_start ){
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
  },

  connection : require( './mongoose_connection' ),

/**
 * Use this instead of the untrusted typeof.
 * @public
 * @this {utils}
 * @param {Object} obj The target object.
 * @returns {String} Returns the capitalized type name.
 * @example
 *
 *     var type = UTILS.is( 'i\'m a string' );
 */
  is : function ( obj ){
    if( obj === null )         return 'null';
    if( obj === undefined )    return 'undefined';
    if( obj instanceof Error ) return 'error';

    var ret = Object.prototype.toString.call( obj ).match( /^\[object\s+(.*?)\]$/ )[ 1 ];

    ret = ret ? ret.toLowerCase() : '';

    return ret == 'number' && isNaN( obj ) ? 'NaN' : ret;
  },

/**
 * Shows the client ip address.
 * @public
 * @this {utils}
 * @param {Object} req The request object.
 * @returns {String} Returns the client ip.
 */
  ip : function ( req ){
    return req.connection.remoteAddress || req.headers[ 'x-forwarded-for' ];
  },

/**
 * Check if the current process is working in the project root dir.
 * @public
 * @this {utils}
 * @param {Function} callback The success callback function.
 */
  is_project_root : require( './is_project_root' ),

/**
 * Clone objects.
 * @public
 * @this {utils}
 * @param {String} arguments[n] Objects to clone.
 * @returns {Object} Returns the new cloned object.
 * @example
 *
 *     var child = utils.clone( mom, dad );
 */
  merge : function (){
    var args  = Array.prototype.slice.call( arguments );
    var i     = 0;
    var j     = args.length;
    var child = {};
    var parent, prop;

    for( ; i < j; i++ ){
      parent = args[ i ];

      for( prop in parent ){
        child[ prop ] = parent[ prop ];
      }
    }

    return child;
  },

/**
 * Generate random number by the given range.
 * @public
 * @this {utils}
 * @param {Number} min The minimum number.
 * @param {Number} max The maximum number.
 * @returns {Number} Returns the random number.
 * @example
 *
 *     var ran = ran_no( 10, 100 );
 */
  ran_no : function ( min, max ){
    return Math.floor( Math.random() * ( max - min + 1 )) + min;
  },

/**
 * Generate a unic ID string.
 * @public
 * @this {utils}
 * @param {Number} len ID length.
 * @returns {String} Returns the unic ID.
 * @example
 *
 *     var id = uid( 32 );
 */
  uid : function ( len ){
    var str     = '';
    var src     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var src_len = src.length;
    var i       = len;

    for( ; i-- ; ){
      str += src.charAt( this.ran_no( 0, src_len - 1 ));
    }

    return str;
  },

/**
 * Find unique val in an array.
 * @public
 * @this {utils}
 * @param {Array} Array to be checked.
 * @returns {Array} Returns the array with unic val.
 * @example
 *
 *     var unic = unique([ '1', '2', '1' ]);
 */
  unique : function ( array ){
    if( !Array.isArray( array )){
      throw new Error( 'UTILS.unique only accept `array` arg' );
    }

    var result = [];
    var hash   = {};
    var i      = 0;
    var j      = array.length;

    for( ; i < j; i++ ){
      var elem = array[ i ];

      if( !hash[ elem ]){
        result.push( elem );
        hash[ elem ] = true;
      }
    }

    return result;
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
