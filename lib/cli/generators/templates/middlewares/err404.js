module.exports = function err404( req, res, next ){
  res.status( 404 );

  // respond with html page
  if( req.accepts( 'html' )){
    return res.render( 'error/404' );
  }

  // respond with json
  if( req.accepts( 'json' )){
    return res.end();
  }

  // default to plain-text. send()
  res.type( 'txt' ).send( 'Not found' );
};