var session = CONF.session;
var db      = CONF.db;

var opt = {
  db : UTILS.db()
};

if( session.collection ) opt.collection = session.collection;
if( db.username )        opt.username   = db.username;
if( db.password )        opt.password   = db.password;

module.exports = function ( express ){
  var Store = require( 'connect-mongo' )( express );

  return express.session({
    secret : session.secret,
    cookie : {
      maxAge : 3600000 // 60 minutes
    },
    store : new Store( opt ),
    fingerprint : function (){
      return '';
    }
  });
};
