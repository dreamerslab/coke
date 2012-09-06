module.exports = function ( file_name ){
  var utils      = require( '../../utils' );
  var set_global = require( '../../global' );

// Model is a global builder fn
  utils.is_project_root( function ( current ){
    set_global( current, function (){
      var migration = require( BASE_DIR + 'db/migrate/' + file_name );
      var cp        = require( 'child_process' );

      var create_child = function ( method ){
        var child = cp.fork( __dirname + '/lib' );

        child.on( 'message', function( msg ){
          if( msg.exit === true ) child.kill();
          if( msg.next )          create_child( msg.next );
        });

        child.send({
          current   : current,
          file_name : file_name,
          method    : method
        });
      };

      if( migration.modify ) return create_child( 'modify' );
      if( migration.export ) return create_child( 'export' );

      migration.import && create_child( 'import' );
    });
  });
};
