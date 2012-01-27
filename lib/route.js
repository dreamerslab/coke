var Map = require( 'railway-routes' ).Map;
var router = function ( namespace, controller, action ){
  var controller_path = BASE_DIR + 'app/controllers/' + namespace + controller;
  var route           = namespace + controller + '#' + action;
  var handler;
  
  try{
    handler = require( controller_path )[ action ];
    LOG.sys( 'Dispatching controller: ' + controller_path + '/'+ action + ' for route: ' + route );
  }catch( err ){
    LOG.error( 500, {
      _id : 'Having trouble with dispatching handler for route: ' + route
    }, err );
  }

  return handler || function ( req, res ){
    res.send( 'Handler not found for ' + route );
  };
};



module.exports = function ( app, callback ){
  require( CONF_DIR + 'routes' )( new Map( app, router ));
  
  callback( app );
};