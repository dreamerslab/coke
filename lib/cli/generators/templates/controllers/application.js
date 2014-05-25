var Class = require( 'node.class' );

module.exports = Class.extend({

  no_content : function ( err, req, res, next ){
    if( err ){
      LOG.error( 404, res, err );

      if( req.accepts( 'html' )){
        req.flash( 'flash-error', req.msg + ' not found' );
        return res.redirect( 'back' );
      }

      if( req.accepts( 'json' )){
        res.status( 404 );
        return res.end();
      }
    }

    next();
  },

  validation : function ( err, req, res, next ){
    if( err.name && err.name == 'ValidationError' ){
      LOG.error( 400, res, err );

      if( req.accepts( 'html' )){
        var error;

        for( error in err.errors ){
          req.flash( 'flash-error', err.errors[ error ].message );
        }

        return res.redirect( 'back' );
      }

      if( req.accepts( 'json' )){
        return res.json( 400, err.errors );
      }
    }

    next( err );
  },

  unique : function ( err, req, res, next ){
    if( err.name && err.name == 'MongoError' ){
      LOG.error( 409, res, err );

      if( req.accepts( 'html' )){
        req.flash( 'flash-error', err.err );
        return res.redirect( 'back' );
      }

      if( req.accepts( 'json' )){
        return res.json( 409, 'The given field has been taken' );
      }
    }

    next( err );
  }
});
