var mongoose = require( 'mongoose' );
var Model    = mongoose.model( 'Model' );
var _super   = require( './application' );



module.exports = {

  'new' : function ( req, res, next ){
    res.render( 'models/new' );
  },

  create : function ( req, res, next ){
    Model.create_or_update( new Model(), req.body.model,
      function ( err, model ){
        if( err ){
          next( err );
          return;
        }

        req.flash( 'flash-info', 'Model created' );
        res.redirect( '/models/' + model._id );
      });
  },

  index : function ( req, res, next ){
    Model.find( function ( err, models ){
      if( err ){
        next( err );
        return;
      }

      res.render( 'models/index', {
        models : models
      });
    });
  },

  show : function ( req, res, next ){
    Model.findById( req.params.id , function ( err, model ){
      if( model ){
        res.render( 'models/show', {
          model : model
        });

        return;
      }

      _super.record_not_found( 'Model', req, res, err );
    });
  },

  edit : function ( req, res, next ){
    Model.findById( req.params.id , function ( err, model ){
      if( model ){
        res.render( 'models/edit', {
          model : model
        });

        return;
      }

      _super.record_not_found( 'Model', req, res, err );
    });
  },

  update : function ( req, res, next ){
    Model.findById( req.params.id , function ( err, model ){
      if( model ){
        Model.create_or_update( model, req.body.model,
          function ( err, model ){
            if( err ){
              next( err );
              return;
            }

            req.flash( 'flash-info', 'Model updated' );
            res.redirect( '/models/' + model._id );
          });

        return;
      }

      _super.record_not_found( 'Model', req, res, err );
    });
  },

  destroy : function ( req, res, next ){
    Model.findById( req.params.id , function ( err, model ){
      if( model ){
        model.remove( function ( err, model ){
          if( err ){
            next( err );
            return;
          }

          req.flash( 'flash-info', 'Model deleted' );
          res.redirect( '/models' );
        });

        return;
      }

      _super.record_not_found( 'Model', req, res, err );
    });
  }
};
