var Application = require( CONTROLLER_DIR + 'application' );
var passport    = require( 'passport' );
var mongoose    = require( 'mongoose' );
var User        = Model( 'User' );

module.exports = Application.extend({

  init : function ( before, after ){
    before( this.referer,          { only : [ 'new' ]});
    before( this.failure_redirect, { only : [ 'create' ]});
  },

  referer : function ( req, res, next ){
    var referer = req.headers.referer ?
      req.headers.referer : '/';

    res.cookie( 'referer', referer );
    next();
  },

  failure_redirect : passport.authenticate( 'twitter', {
    failureRedirect : '/'
  }),

  'new' : passport.authenticate( 'twitter' ),

  create : function ( req, res, next ){
    var referer = req.cookies.referer ?
      req.cookies.referer : '/';

    var args = {
      twitter_id : req.user.id,
      name       : req.user.displayName,
      lang       : req.user._json.lang,
      avatar     : req.user._json.profile_image_url
    };

    User.create( args,
      // error
      function ( err ){
        LOG.error( 500, res, err );
        res.redirect( '/logout' );
      },
      // success
      function (){
        res.redirect( referer );
      });
  },

  destroy : function ( req, res, next ){
    req.logout();
    res.redirect( '/' );
  }
});