var mongoose = require( 'mongoose' );
var CAPITAL = mongoose.model( 'CAPITAL' );
var _super = require( CONTROLLER_DIR + 'application' );



module.exports = {

  'new' : function ( req, res, next ){
    res.render( 'VIEW_PATH/new' );
  },

  create : function ( req, res, next ){
    CAPITAL.create_or_update( new CAPITAL(), req.body.SINGULAR,
      function ( err, SINGULAR ){
        if( err ){
          next( err );
          return;
        }

        req.flash( 'flash-info', 'CAPITAL created' );
        res.redirect( '/VIEW_PATH/' + SINGULAR._id );
      });
  },

  index : function ( req, res, next ){
    CAPITAL.find( function ( err, PLURAL ){
      if( err ){
        next( err );
        return;
      }

      res.render( 'VIEW_PATH/index', {
        PLURAL : PLURAL
      });
    });
  },

  show : function ( req, res, next ){
    CAPITAL.findById( req.params.id , function ( err, SINGULAR ){
      if( SINGULAR ){
        res.render( 'VIEW_PATH/show', {
          SINGULAR : SINGULAR
        });

        return;
      }

      _super.record_not_found( 'CAPITAL', req, res, err );
    });
  },

  edit : function ( req, res, next ){
    CAPITAL.findById( req.params.id , function ( err, SINGULAR ){
      if( SINGULAR ){
        res.render( 'VIEW_PATH/edit', {
          SINGULAR : SINGULAR
        });

        return;
      }

      _super.record_not_found( 'CAPITAL', req, res, err );
    });
  },

  update : function ( req, res, next ){
    CAPITAL.findById( req.params.id , function ( err, SINGULAR ){
      if( SINGULAR ){
        CAPITAL.create_or_update( SINGULAR, req.body.SINGULAR,
          function ( err, SINGULAR ){
            if( err ){
              next( err );
              return;
            }

            req.flash( 'flash-info', 'CAPITAL updated' );
            res.redirect( '/VIEW_PATH/' + SINGULAR._id );
          });

        return;
      }

      _super.record_not_found( 'CAPITAL', req, res, err );
    });
  },

  destroy : function ( req, res, next ){
    CAPITAL.findById( req.params.id , function ( err, SINGULAR ){
      if( SINGULAR ){
        SINGULAR.remove( function ( err, SINGULAR ){
          if( err ){
            next( err );
            return;
          }

          req.flash( 'flash-info', 'CAPITAL deleted' );
          res.redirect( '/VIEW_PATH' );
        });

        return;
      }

      _super.record_not_found( 'CAPITAL', req, res, err );
    });
  }
};
