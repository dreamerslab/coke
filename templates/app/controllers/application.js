module.exports = {

  record_not_found : function ( obj, req, res, err ){
    err && LOG.error( 500, res, err );

    req.flash( 'flash-error', obj + ' not found' );
    res.redirect( 'back' );
  }
};