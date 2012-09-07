var passport = require( 'passport' );
var Strategy = require( 'passport-twitter' ).Strategy;
var User     = Model( 'User' );

var config = CONF.passport;

passport.serializeUser( function( user, next ){
  var id = user.id ?
    user.id : user.twitter_id;

  next( null, id );
});

passport.deserializeUser( function ( id, next ){
  User.findOne({
    twitter_id : id
  }, function ( err, user ){
    if( user ) return next( null, user );

    next( null, id );
  });
});

passport.use( new Strategy({
  consumerKey    : config.twitter_consumer_key,
  consumerSecret : config.twitter_consumer_secret,
  callbackURL    : config.callback_url
}, function ( accessToken, refreshToken, profile, next ){
  process.nextTick( function () {
    return next( null, profile );
  });
}));

module.exports = function (){
  return function ( req, res, next ){
    passport.initialize()( req, res, function (){
      passport.session()( req, res, next );
    });
  };
};