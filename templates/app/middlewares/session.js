var mongoose = require( 'mongoose' );
var Store    = require( 'connect-mongodb' );

module.exports = function ( express ){
  return express.session({
    secret : 'COKE Rocks :3',
    cookie : {
      // 60 minutes
      maxAge : 3600000
    },
    store : new Store({
      db : mongoose.connections[ 0 ].db
    }),
    fingerprint : function (){
      return '';
    }
  });
};