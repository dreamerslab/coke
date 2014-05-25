module.exports = function ( req, res, next ){
  res.locals.styles  = [ 'common' ];
  res.locals.scripts = [ 'common' ];

  next();
};
