/*!
 * COKE
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * The bridge of controllers and routes.
 */

/**
 * Module dependencies.
 * @private
 */
var Filter        = require( './filter' );
var Stack         = require( './stack' );
var Map           = require( 'railway-routes' ).Map;
var helper_loader = require( '../helper' );
var path          = require( 'path' );

/**
 * Store controllers and filters to objects in the closure.
 * @private
 */
var controller_trunk = {};
var filter_trunk     = {};

var router = function ( namespace, controller_name, action_name ){
  var full_name       = namespace + controller_name;
  var controller_path = path.join( CONTROLLER_DIR, full_name );
  var Controller      = require( controller_path );
  var handler_id      = full_name + '#' + action_name;
  var helper          = helper_loader( full_name );
  var handler;

  try{
    if( controller_trunk[ full_name ] === undefined ){
      filter_trunk[ full_name ]     = new Filter();
      controller_trunk[ full_name ] = new Controller(
        function ( handler, options ){
          filter_trunk[ full_name ].before( handler, options );
        },
        function ( handler, options ){
          filter_trunk[ full_name ].after( handler, options );
        }
      );
    }

    var actions    = [];
    var filters    = filter_trunk[ full_name ];
    var controller = controller_trunk[ full_name ];
    var action     = controller[ action_name ];

    Filter.match( actions, action_name, filters.before_actions );
    actions.push( action );
    Filter.match( actions, action_name, filters.after_actions );

    handler = function ( req, res, next ){
      // dont worry about the `err` here, express will handle it.
      var stack = new Stack( controller, actions, handler_id, helper, req, res, next );

      stack.next();
    };

    LOG.sys( 'Dispatching handler: ' + controller_path + '/' + action_name + ' -> ' + handler_id );
  }catch( err ){
    LOG.error( 500,
      ( 'Having trouble with dispatching handler: ' + handler_id ),
      err );
  }

  return handler || function ( req, res ){
    res.send( 'Handler not found for ' + handler_id );
  };
};



module.exports = function ( app ){
  require( CONF_DIR + '/routes' )( new Map( app, router ));
};
