var mongooseConnection;

module.exports = function ( mongoose ){

  if( !mongoose ){
    return mongooseConnection;
  }

  var i = mongoose.connections.length;

  for( ;i-- ; ){
    if( mongoose.connections[ i ].db ){
      mongooseConnection = mongoose.connections[ i ];

      break;
    }
  }
};
