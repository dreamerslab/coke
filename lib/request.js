var ID = 0;

module.exports = function request( req, res, next ){
  ID++;
  req._id    = ID;
  res._id    = ID;
  res._start = Date.now();
  // log all request including error requests
  LOG.request( req );
  next();
};
