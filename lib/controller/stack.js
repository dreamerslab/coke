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

/**
 * Module dependencies.
 * @private
 */
var Class = require( 'node.class' );

/**
 * @public
 * @class
 */
var Stack = Class.extend({

  init : function ( instance, actions, handler_id, helpers, req, res, next ){
    this.index    = 0;
    this.instance = instance;
    this.stack    = actions;
    this.req      = req;
    this.res      = res;
    this.out      = next;

    res.locals.__handler_id = handler_id;

    Object.keys( helpers ).forEach( function ( key ){
      res.locals[ key ] = helpers[ key ];
    });
  },

  // it's so stupid we have to deal with it again here.
  // it should be express's job.
  next : function ( err ){
    var self = this;

    var out = function ( err ){
      self.out( err );
    };

    var next = function ( err ){
      self.index++;
      self.next( err );
    };

    var wrap = this.index === ( this.stack.length - 1 ) ?
      out : next;

    var action = this.stack[ this.index ];

    if( !action ){
      var id  = this.res.locals.__handler_id;
      var msg = '[controller][stack] handler not found; action: ' + id;

      return out( new Error( msg ));
    }

    try{
      if( err === undefined ){
        action.call( this.instance, this.req, this.res, wrap );
      }else{
        action.call( this.instance, err, this.req, this.res, wrap );
      }
    }catch( e ){
      out( e );
    }
  }
});

/**
 * Exports module.
 */
module.exports = Stack;
