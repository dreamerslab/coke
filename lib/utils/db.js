var db;

module.exports = function ( mongoose ){

  if( !mongoose ){
    return db;
  }

  var i = mongoose.connections.length;

  for( ;i-- ; ){
    if( mongoose.connections[ i ].db ){
      db = mongoose.connections[ i ].db;

      break;
    }
  }
};