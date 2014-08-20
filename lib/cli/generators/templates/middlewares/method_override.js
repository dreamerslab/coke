var override = require( 'method-override' );

module.exports = function (){
  return override( function ( req, res ){
    if( req.body && typeof req.body === 'object' && '_method' in req.body ){
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;

      delete req.body._method;

      return method;
    }
  });
};
