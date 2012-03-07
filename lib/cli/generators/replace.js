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

  singular : function ( template ){
    return template.replace( /SINGULAR/g, this._options.singular || 'user' );
  },

  plural : function ( template ){
    return template.replace( /PLURAL/g, this._options.plural || 'users' );
  },

  capital : function ( template ){
    return template.replace( /CAPITAL/g, this._options.capital || 'User' );
  },

  path : function ( template ){
    return template.replace( /PATH/g, this._options.path );
  },

  app_name : function ( template ){
    return template.replace( /APPNAME/g, this._options.app_name.replace( /\./g, '-' ) || 'COKE' );
  },

  controller : function ( template ){
    return template.replace( /CONTROLLER/g, this._options.controller || 'home' );
  },

  action : function ( template ){
    return template.replace( /ACTION/g, this._options.action || 'index' );
  },

  view_path : function ( template ){
    return template.replace( /VIEW_PATH/g, this._options.view_path );
  }
};