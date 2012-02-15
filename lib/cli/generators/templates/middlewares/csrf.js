module.exports = function ( app, express ){
  app.dynamicHelpers({
    csrf : function ( req, res ){
      return req.session._csrf;
    }
  });

  return express.csrf();
};
