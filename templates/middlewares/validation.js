module.exports = function validation( err, req, res, next ){
  if( err.name && err.name == 'ValidationError' ){
    for( var error in err.errors ){
      req.flash( 'flash-error', err.errors[ error ].message );
    }

    res.redirect( 'back' );
    LOG.error( 500, res, err );

    return;
  }

  next( err );
};