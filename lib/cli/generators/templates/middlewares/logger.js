var ID = 0;

module.exports = function request ( req, res, next ){
  ID++;
  req._id = ID;
  res._id = ID;

  var end = res.end;
  res.end = function ( chunk, encoding ){
    res.end = end;
    res.end( chunk, encoding );
    LOG.response( res.statusCode, res, res.result );
  };

  // log all request including error requests
  LOG.request( req );
  next();
};
