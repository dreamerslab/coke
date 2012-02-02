module.exports = {
  app_name : function ( template, app_name ){
    return template.replace( /APPNAME/g, app_name || 'COKE' );
  },

  view_engine : function ( template, view_engine ){
    return template.replace( /VIEWENGINE/g, view_engine || 'thunder' );
  }
};