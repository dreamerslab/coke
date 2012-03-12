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
var Filter = require( './controller_bridge/Filter' );
var Map    = require( 'railway-routes' ).Map;

/**
 * Store controllers and filters to objects in the closure.
 * @private
 */
var controller_trunk = {};
var filter_trunk     = {};

var match = function ( actions, action_name, filters ){
  var match = false;
  var i     = 0;
  var j     = filters.length;
  var k;

  for( ; i < j; i++ ){
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

var router = function ( namespace, controller_name, action_name ){
  var Stack           = require( './controller_bridge/stack' );
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

    match( actions, action_name, filters.before_actions );
    actions.push( action );
    match( actions, action_name, filters.after_actions );

    handler = function ( req, res, next ){
      // dont worry about the `err` here, express will handle it.
      var stack = new Stack( actions, req, res, next );

      stack.next();
    };

    LOG.sys( 'Dispatching controller: ' + controller_path + '/'+ action_name + ' for route: ' + route );
  }catch( err ){
    LOG.error( 500,
      UTILS.global_err( 'Having trouble with dispatching handler for route: ' + route ),
      err );
  }

  return handler || function ( req, res ){
    res.send( 'Handler not found for ' + route );
  };
};



module.exports = function ( app, callback ){
  require( CONF_DIR + 'routes' )( new Map( app, router ));

  callback( app );
};