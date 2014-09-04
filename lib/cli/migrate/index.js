module.exports = function ( args ){
  var utils         = require( '../../utils' );
  var set_global    = require( '../../global' );
  var file_name     = args[ 0 ];
  var force_dev_log = args[ 1 ];

  if( !file_name ){
    console.log(
      utils.$alert( 'error' ) +
      '   no migration file specified'
    );

    return process.exit( 1 );
  }

  if( force_dev_log == '-d' ){
    global.DEV_LOG = true;
  }

// Model is a global builder fn
  utils.is_project_root( function ( current ){
    set_global( current, function (){
      var fs = require( 'fs' );
      var cp = require( 'child_process' );
      var path = BASE_DIR + '/db/migrate/' + file_name + '.js';

      if( !fs.existsSync( path )){
        console.log(
          utils.$alert( 'error' ) +
          '   migration file does not exist'
        );

        return process.exit( 1 );
      }

      var migration = require( path );

      var create_child = function ( method ){
        var child = cp.fork( __dirname + '/lib' );

        child.on( 'message', function( msg ){
          if( msg.exit === true ) child.kill();
          if( msg.next )          create_child( msg.next );
        });

        child.send({
          current       : current,
          file_name     : file_name,
          method        : method,
          force_dev_log : force_dev_log
        });
      };

      if( migration.modify ) return create_child( 'modify' );
      if( migration.export ) return create_child( 'export' );

      migration.import && create_child( 'import' );
    });
  });
};
