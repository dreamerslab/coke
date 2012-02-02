module.exports = function err404( req, res, next ){
  // respond with html page
  if( req.accepts( 'html' )){
    res.status( 404 );
    res.render( 'error/404', {
      status : 404
    });

    return;
  }

  // respond with json
  if( req.accepts( 'json' )){
    res.send({ error : 'Not found' });

    return;
  }

  // default to plain-text. send()
  res.type( 'txt' ).send( 'Not found' );
};