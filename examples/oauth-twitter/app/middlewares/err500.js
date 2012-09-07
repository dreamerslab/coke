module.exports = function err500( err, req, res, next ){
  res.status( err.status || 500 );
  res.result = err;

  // respond with html page
  if( req.accepts( 'html' )){
    return res.render( 'error/500' );
  }

  // respond with json
  if( req.accepts( 'json' )){
    return res.end();
  }

  // default to plain-text. send()
  res.type( 'txt' ).send( 'Internal Server Error' );
};