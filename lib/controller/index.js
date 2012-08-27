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
var Filter = require( './filter' );
var Stack  = require( './stack' );
var Map    = require( 'railway-routes' ).Map;

/**
 * Store controllers and filters to objects in the closure.
 * @private
 */
var controller_trunk = {};
var filter_trunk     = {};

var router = function ( namespace, controller_name, action_name ){
  var full_name       = namespace + controller_name;
  var controller_path = BASE_DIR + 'app/controllers/' + full_name;
  var Controller      = require( controller_path );
  var route           = full_name + '#' + action_name;
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
      var stack = new Stack( controller, actions, req, res, next );

      stack.next();
    };

    LOG.sys( 'Dispatching controller: ' + controller_path + '/'+ action_name + ' for route: ' + route );
  }catch( err ){
    LOG.error( 500,
      ( 'Having trouble with dispatching handler for route: ' + route ),
      err );
  }

  return handler || function ( req, res ){
    res.send( 'Handler not found for ' + route );
  };
};



module.exports = function ( app, next ){
  require( CONF_DIR + 'routes' )( new Map( app, router ));

  next( app );
};