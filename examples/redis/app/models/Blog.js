var redis = require( LIB_DIR + 'redis' );

module.exports = {

  statics : {

    create_or_update : function ( blog, props, callback ){
      var client = redis.client();

      blog.title     = props.title;
      blog.desc      = props.desc;
      blog.is_public = props.is_public;

      blog.save( function ( err, blog, count ){
        client.set( blog._id, 'saved', function ( err, r_blog ){
          callback( err, blog, count );
        });
      });
    }
  }
};