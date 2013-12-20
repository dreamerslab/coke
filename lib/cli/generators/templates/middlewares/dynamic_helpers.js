module.exports = function ( req, res, next ){
  res.locals({
    styles  : [ 'common' ],
    scripts : [ 'common' ]
  });

  next();
};
