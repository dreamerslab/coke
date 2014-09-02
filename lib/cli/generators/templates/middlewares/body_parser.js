var body_parser = require( 'body-parser' );

module.exports = function ( options ){
  options = options || {};

  if( options.extended === undefined ) options.extended = true;

  var urlencoded = body_parser.urlencoded( options );
  var json       = body_parser.json( options );

  return function ( req, res, next ){
    json( req, res, function ( err ){
      if( err ) return next( err );

      urlencoded( req, res, next );
    });
  };
};