module.exports = function err500( err, req, res, next ){
  res.result = err;
  res.status( err.status || 500 );
  res.render( 'error/500' );
};