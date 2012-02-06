var collection = require( './generators/public' );


module.exports = {

  exists : function ( name ){
    return !!collection[ name ];
  },

  execute : function ( name, args ){
    collection[ name ]( args );
  },

  list : function (){
    var list = Object.keys( collection );

    // remove init generator from listing,
    // it belongs to `new` action
    list.shift();

    return list.join( ' ' );
  }
};
