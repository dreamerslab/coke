module.exports = function ( args ){
/**
 * Module dependencies.
 * @private
 */
  var utils   = require( '../utils' );
  var express = require( 'express' );
  var Map     = require( 'railway-routes' ).Map;

  var add_spaces = utils.add_spaces;
  var app        = express.createServer();
  var router     = function ( namespace, controller, action ){};
  var map        = new Map( app, router );

  utils.is_project_root( function ( current ){
    require( current + '/config/routes' )( map );

    var dump           = map.dump;
    var max_len        = 0;
    var helper_max_len = 0;
    var filter         = ( args.shift() || '' ).toUpperCase();
    var filtered       = [];

    dump.forEach( function ( data ){
        var method = data.method.toUpperCase();

        if( !filter || filter === method || data.helper.toUpperCase().search( filter ) !== -1 ){
          if( data.path.length > max_len ){
            max_len = data.path.length;
          }

          if( data.helper.length > helper_max_len ){
            helper_max_len = data.helper.length;
          }

          filtered.push( data );
        }
    });

    filtered.forEach( function ( data ){
        var method = data.method.toUpperCase();

        console.log(
          add_spaces( data.helper, helper_max_len + 1, true ) + ' ' +
          add_spaces( method, 7 ) +
          add_spaces( data.path, max_len + 1 ) +
          data.file + "#" + data.action
        );
    });
  });
};
