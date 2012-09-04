var Class = require( 'node.class' );
var Flow  = require( 'node.flow' );

module.exports = function ( file_name ){
/**
 * Module dependencies.
 * @private
 */
  var utils      = require( '../utils' );
  var set_global = require( '../global' );

  utils.is_project_root( function ( current ){
    set_global( current, function (){
      var mongoose  = require( BASE_DIR + 'node_modules/mongoose' );
      var migration = require( BASE_DIR + 'db/migrate/' + file_name );

      require( CORE_DIR + 'model' )({
        mongoose    : mongoose,
        schema_name : migration.ori_schema
      }, function ( model_names ){
        var export_actions = migration.export( Model );
        var Export         = Class.extend( export_actions );
        var flow           = new Flow();

        var series = function ( action ){
          if( utils.typeof( action ) !== 'function' ) return;

          flow.series( action );
        };

        var parallel = function ( action ){
          if( utils.typeof( action ) !== 'function' ) return;

          flow.parallel( action );
        };

        var join = flow.join;

        var export_instance = new Export( series, parallel, join,
          // end
          function ( action ){
            if( utils.typeof( action ) !== 'function' ) return;

            flow.series( function ( args, next ){
              require( CORE_DIR + 'model' )({
                mongoose : mongoose
              }, function ( model_names ){
                var import_actions  = migration.import( Model );
                var Import          = Class.extend( import_actions );
                var import_instance = new Export( series, parallel, join,
                  function ( action ){
                    if( utils.typeof( action ) !== 'function' ) return flow.end();;

                    flow.end( action );
                  });
              });
            });
          });
      });
    });
  });
};
