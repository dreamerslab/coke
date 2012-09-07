module.exports = {

  statics : {

    create : function ( args, next, created ){
      var twitter_id = args.twitter_id;
      var self       = this;

      this.findOne({
        twitter_id : twitter_id
      }, function ( err, user ){
        if( err )  return next( err );
        if( user ) return created( user );

        user = new self({
          twitter_id : twitter_id,
          name       : args.name,
          lang       : args.lang,
          avatar     : args.avatar
        }).
        save( function ( err, user, count ){
          if( err ) return next( err );

          created( user );
        });
      });
    }
  }
};