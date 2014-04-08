var CAPITAL = Model( 'CAPITAL' );
var Application = require( CONTROLLER_DIR + '/application' );

module.exports = Application.extend({

  init : function ( before, after ){
    after( this.validation, { only : [ 'create', 'update' ]});
    after( this.unique,     { only : [ 'create', 'update' ]});
    after( this.no_content, { except : [ 'new', 'create', 'index' ]});
  },

  'new' : function ( req, res, next ){
    res.render( 'VIEW_PATH/new' );
  },

  create : function ( req, res, next ){
    CAPITAL.create_or_update( new CAPITAL(), req.body.SINGULAR,
      function ( err, SINGULAR ){
        if( err ) return next( err );

        req.flash( 'flash-info', 'CAPITAL created' );
        res.redirect( '/VIEW_PATH/' + SINGULAR._id );
      });
  },

  index : function ( req, res, next ){
    CAPITAL.find( function ( err, PLURAL ){
      if( err ) return next( err );

      res.render( 'VIEW_PATH/index', {
        PLURAL : PLURAL
      });
    });
  },

  show : function ( req, res, next ){
    CAPITAL.findById( req.params.id , function ( err, SINGULAR ){
      if( SINGULAR ){
        return res.render( 'VIEW_PATH/show', {
          SINGULAR : SINGULAR
        });
      }

      req.msg = 'User';
      next( err );
    });
  },

  edit : function ( req, res, next ){
    CAPITAL.findById( req.params.id , function ( err, SINGULAR ){
      if( SINGULAR ){
        return res.render( 'VIEW_PATH/edit', {
          SINGULAR : SINGULAR
        });
      }

      req.msg = 'User';
      next( err );
    });
  },

  update : function ( req, res, next ){
    CAPITAL.findById( req.params.id , function ( err, SINGULAR ){
      if( SINGULAR ){
        return CAPITAL.create_or_update( SINGULAR, req.body.SINGULAR,
          function ( err, SINGULAR ){
            if( err ) return next( err );

            req.flash( 'flash-info', 'CAPITAL updated' );
            res.redirect( '/VIEW_PATH/' + SINGULAR._id );
          });
      }

      req.msg = 'User';
      next( err );
    });
  },

  destroy : function ( req, res, next ){
    CAPITAL.findById( req.params.id , function ( err, SINGULAR ){
      if( SINGULAR ){
        return SINGULAR.remove( function ( err, SINGULAR ){
          if( err ) return next( err );

          req.flash( 'flash-info', 'CAPITAL deleted' );
          res.redirect( '/VIEW_PATH' );
        });
      }

      req.msg = 'User';
      next( err );
    });
  }
});
