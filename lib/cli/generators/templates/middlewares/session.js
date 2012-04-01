var mongoose = require( 'mongoose' );
var Store    = require( 'connect-mongodb' );

var session = CONF.session;
var db      = CONF.db;

var opt = {
  db : mongoose.connections[ 0 ].db
};

if( session.collection ) opt.collection = session.collection;
if( db.username )        opt.username   = db.username;
if( db.password )        opt.password   = db.password;

module.exports = function ( express ){
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