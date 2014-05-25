var csrf = require( 'csurf' );

module.exports = function (){
  return function ( req, res, next ){
    csrf()( req, res, function (){
      res.locals.csrf = req.csrfToken();

      next();
    });
  };
};
