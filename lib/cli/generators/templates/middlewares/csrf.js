module.exports = function ( express ){
  return function ( req, res, next ){
    express.csrf()( req, res, function (){
      res.locals.csrf = req.csrfToken();

      next();
    });
  };
};
