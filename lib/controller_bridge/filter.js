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
var Class = require( 'resig-class' );

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
    UTILS.is( handler ) !== 'Function' &&
      LOG.error( 500, UTILS.global_err(),
        '[route][filter][' + type + '] handler must be a function.' );

    this[ type + '_actions' ].push({
      handler : handler,
      options : options
    });
  }
});

/**
 * Exports module.
 */
module.exports = Filter;