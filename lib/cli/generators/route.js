/**
 * Module dependencies.
 * @private
 */
var fs         = require( 'fs' );
var lib        = require( './lib' );

module.exports = {

  generate : function ( args, controller, has_namespace, scaffold ){
    var path      = 'config/routes.js';
    var src       = fs.readFileSync( lib.path( path ), 'utf8' );
    var init_code = 'module.exports = function ( map ){';
    var code      = [ init_code ];
    var namespace;

    if( has_namespace ){
      namespace  = has_namespace.namespace;
      controller = has_namespace.controller;

      code.push( '  map.namespace( \'' + namespace + '\', function ( ' + namespace + ' ){' );
    }

    var tmp_code;

    if( scaffold ){
      tmp_code = namespace ?
          '    ' + namespace + '.resources( \'' + controller + '\' );' :
          '  map.resources( \'' + controller + '\' );';

      code.push( tmp_code );
    }else{
      args.forEach( function ( action ){
        var content = controller + '/' + action + '\', \'' + controller + '#' + action;

        tmp_code = namespace ?
          '    ' + namespace + '.get( \'' + content + '\' );' :
          '  map.get( \'' + content + '\' );';

        code.push( tmp_code );
      });
    }

    // routes
    if( namespace ) code.push( '  });' );

    code = code.join( '\n' );
    code = src.replace(
      /module.exports(\n|\r|\r\n|\t+|\s+|)=(\n|\r|\r\n|\t+|\s+|)function(\n|\r|\r\n|\t+|\s+|)\((\n|\r|\r\n|\t+|\s+|)map(\n|\r|\r\n|\t+|\s+|)\)(\n|\r|\r\n|\t+|\s+|)\{(\t+|\s+|)/,
      code + '\n  '
    );

    lib.create_file_f( path, code );
  }
};