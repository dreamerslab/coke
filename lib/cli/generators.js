var collection = require( './generators/public' );


module.exports = {
  
  exists : function ( name ){
    return !!collection[ name ];
  },
  
  execute : function ( name, args ){
    collection[ name ]( args );
  },
  
  list : function (){
    return Object.keys( collection ).join( ' ' );
  }
};
