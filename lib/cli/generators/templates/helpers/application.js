var date_format = require( 'dateformat' );

module.exports = function ( app ){
  app.helpers({

    selected : function ( target, current ){
      return target === current ? 'selected' : '';
    },

    val : function ( obj, prop ){
      return obj === undefined ? '' : obj[ prop ];
    },

    date : function ( date, format ){
      return date_format( date, format );
    }
  });

  app.dynamicHelpers({
    messages : require( 'express-messages' )
  });
};
