/*!
 * COKE
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Controller stack control for before and after filters.
 * We should have used express to handle this.
 * However railway routes does not support it.
 * We might need to write our own router class someday.
 */

var props = {

  init : function ( instance, actions, handler_id, req, res, next ){
    props.index    = 0;
    props.instance = instance;
    props.stack    = actions;
    props.req      = req;
    props.res      = res;
    props.out      = next;

    res.local( '__handler_id', handler_id );
  },

  // it's so stupid we have to deal with it again here.
  // it should be express's job.
  next : function ( err ){
    var out = function ( err ){
      props.out( err );
    };

    var next = function ( err ){
      props.index++;
      props.next( err );
    };

    var wrap = props.index === ( props.stack.length - 1 ) ?
      out : next;

    var action = props.stack[ props.index ];

    // now we have to call try catch again...
    try{
      if( err === undefined ){
        action.call( props.instance, props.req, props.res, wrap );
      }else{
        action.call( props.instance, err, props.req, props.res, wrap );
      }
    }catch( e ){
      out( e );
    }
  }
};

/**
 * Module dependencies.
 * @private
 */
var Class = require( 'node.class' );

/**
 * @public
 * @class
 */
var Stack = Class.extend( props );

/**
 * Exports module.
 */
module.exports = Stack;
