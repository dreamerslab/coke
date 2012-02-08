var collection = require( './generators/public' );
var utils      = require( '../utils' );


module.exports = {

  init : function ( args ){
    var self = this;

    utils.is_project_root( function ( current ){
      var action = args.shift();

      if( typeof action == "undefined" || action == null ){
        console.log(
          utils.$alert( 'error' ) + '   \'' +
          'Generator not specified, available generators: ', self.list()
        );
      }else{
        if( self.exists( action )){
          self.execute( action, args );
        }else{
          console.log(
            utils.$alert( 'error' ) + '   \'' +
            'Generator "' + action + '" not found, available generators: ', self.list()
          );

        }
      }
    });
  },

  exists : function ( name ){
    return !!collection[ name ];
  },

  execute : function ( name, args ){
    collection[ name ]( args );

    process.exit( 0 );
  },

  list : function (){
    var list = Object.keys( collection );

    // remove init generator from listing,
    // it belongs to `new` action
    list.shift();

    return list.join( ' ' );
  }
};
