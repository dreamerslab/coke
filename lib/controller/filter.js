/*!
 * COKE
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Controller filters class.
 */

/**
 * Module dependencies.
 * @private
 */
var Class = require( 'node.class' );

/**
 * @public
 * @class
 */
var Filter = Class.extend({

/**
 * Initialize before and after actions trunk.
 * @constructor
 * @this {Filter}
 */
  init : function (){
    this.before_actions = [];
    this.after_actions  = [];
  },

/**
 * Store before filters in the class prop.
 * @public
 * @this {Filter}
 * @param {Function} handler Before filter action.
 * @param {Object} options Before filter options.
 */
  before : function ( handler, options ){
    this._filter( 'before', handler, options );
  },

/**
 * Store after filters in the class prop.
 * @public
 * @this {Filter}
 * @param {Function} handler After filter action.
 * @param {Object} options After filter options.
 */
  after : function ( handler, options ){
    this._filter( 'after', handler, options );
  },

/**
 * Store before or after filters in the class prop.
 * @private
 * @this {Filter}
 * @param {String} type Filter type.
 * @param {Function} handler Filter action.
 * @param {Object} options Filter options.
 */
  _filter : function ( type, handler, options ){
    UTILS.is( handler ) !== 'function' &&
      LOG.error( 500,
        '[route][filter][' + type + ']',
         'handler must be a function.' );

    this[ type + '_actions' ].push({
      handler : handler,
      options : options
    });
  }
});

/**
 * Get matched actions.
 * @public
 * @this {Filter}
 * @param {Array} actions Matched actions.
 * @param {String} action_name Controller action name.
 * @param {Object} filters Filter actions.
 */
Filter.match = function ( actions, action_name, filters ){
  var i = 0;
  var j = filters.length;
  var k, match, tmp;

  for( ; i < j; i++ ){
    match = false;

    if( filters[ i ].options ){
      if( filters[ i ].options.only ){
        tmp = filters[ i ].options.only;
        k   = tmp.length;

        for( ; k--; ){
          if( tmp[ k ] === action_name ){
            match = true;
            break;
          }
        }
      }

      if( filters[ i ].options.except ){
        match = true;
        tmp   = filters[ i ].options.except;
        k     = tmp.length;

        for( ; k--; ){
          if( tmp[ k ] === action_name ){
            match = false;
            break;
          }
        }
      }
    }else{
      match = true;
    }

    match && actions.push( filters[ i ].handler );
  }
};

/**
 * Exports module.
 */
module.exports = Filter;
