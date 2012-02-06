module.exports = {

  init : function ( options ){
    this._options = options === undefined ?
      {} : options;
  },

  set : function ( key, val ){
    this._options[ key ] = val;
  },

  universal : function ( template ){
    return template.replace( this._options.pattern, this._options.universal );
  },

  app_name : function ( template ){
    return template.replace( /APPNAME/g, this._options.app_name || 'COKE' );
  },

  controller : function ( template ){
    return template.replace( /CONTROLLER/g, this._options.controller || 'home' );
  },

  model : function ( template ){
    return template.replace( /Model/g, this._options.model || 'User' );
  },

  singular : function ( template ){
    return template.replace( /model/g, this._options.singular || 'user' );
  },

  plural : function ( template ){
    return template.replace( /models/g, this._options.plural || 'users' );
  },

  model : function ( template ){
    return template.replace( /Model/g, this._options.model || 'User' );
  },

  action : function ( template ){
    return template.replace( /ACTION/g, this._options.action || 'index' );
  },

  path : function ( template ){
    return template.replace( /PATH/g, this._options.path );
  },

  view_engine : function ( template ){
    return template.replace( /VIEWENGINE/g, this._options.view_engine || 'thunder' );
  }
};