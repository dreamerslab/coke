var redis       = require( LIB_DIR + 'redis' );
var Application = require( CONTROLLER_DIR + 'application' );
var Blog        = Model( 'Blog' );

module.exports = Application.extend({

  init : function ( before, after ){
    after( this.validation,       { only : [ 'create', 'update' ]});
    after( this.unique,           { only : [ 'create', 'update' ]});
    after( this.record_not_found, { except : [ 'new', 'create', 'index' ]});
  },

  'new' : function ( req, res, next ){
    res.render( 'blogs/new' );
  },

  create : function ( req, res, next ){
    Blog.create_or_update( new Blog(), req.body.blog,
      function ( err, blog ){
        if( err ) return next( err );

        req.flash( 'flash-info', 'Blog created' );
        res.redirect( '/blogs/' + blog._id );
      });
  },

  index : function ( req, res, next ){
    Blog.find( function ( err, blogs ){
      if( err ) return next( err );

      res.render( 'blogs/index', {
        blogs : blogs
      });
    });
  },

  show : function ( req, res, next ){
    var client = redis.client();

    Blog.findById( req.params.id , function ( err, blog ){
      if( blog ){
        client.get( blog._id, redis.statics.print );
        return res.render( 'blogs/show', {
          blog : blog
        });
      }

      req.msg = 'User';
      next( err );
    });
  },

  edit : function ( req, res, next ){
    Blog.findById( req.params.id , function ( err, blog ){
      if( blog ){
        return res.render( 'blogs/edit', {
          blog : blog
        });
      }

      req.msg = 'User';
      next( err );
    });
  },

  update : function ( req, res, next ){
    Blog.findById( req.params.id , function ( err, blog ){
      if( blog ){
        return Blog.create_or_update( blog, req.body.blog,
          function ( err, blog ){
            if( err ) return next( err );

            req.flash( 'flash-info', 'Blog updated' );
            res.redirect( '/blogs/' + blog._id );
          });
      }

      req.msg = 'User';
      next( err );
    });
  },

  destroy : function ( req, res, next ){
    Blog.findById( req.params.id , function ( err, blog ){
      if( blog ){
        return blog.remove( function ( err, blog ){
          if( err ) return next( err );

          req.flash( 'flash-info', 'Blog deleted' );
          res.redirect( '/blogs' );
        });
      }

      req.msg = 'User';
      next( err );
    });
  }
});
