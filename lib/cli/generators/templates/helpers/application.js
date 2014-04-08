var moment = require( 'moment' );

module.exports = {

  selected : function ( target, current ){
    return target === current ? 'selected' : '';
  },

  val : function ( obj, prop ){
    return obj === undefined ? '' : obj[ prop ];
  },

  date : function ( date, format ){
    return moment( date ).format( format || 'MMM Do YYYY, h:m:s' );
  }
};
