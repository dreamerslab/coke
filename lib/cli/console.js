module.exports = function (){
/**
 * Module dependencies.
 * @private
 */
  var utils = require( '../utils' );

  utils.is_project_root( function ( current ){
    require( '../global' )( current, function (){
/**
 * Module dependencies.
 * @private
 */
      var fs         = require( 'fs' );
      var repl       = require( 'repl' );
      var local_path = BASE_DIR + '/node_modules/';
      var ctx        = repl.start({ prompt : 'coke> ', useGlobal : true }).context;

      var LOG = {};

      [ 'sys', 'request', 'response', 'error', 'debug' ].forEach( function ( name ){
        LOG[ name ] = function (){};
      });

      global.LOG = LOG;

      ctx.reload = function (){
        var mongoose = require( local_path + 'mongoose' );
        ctx.mongoose = mongoose;

        require( CORE_DIR + '/model' )({
          mongoose : mongoose
        }, function ( model_names ){
          model_names.forEach( function ( model_name ){
            ctx[ model_name ] = Model( model_name );
          });
        });
      };

      ctx.log = function (){
        console.log( '\n', arguments[ 0 ]);
        // this line of coke took me about 10 fucking hours
        repl.repl.rli.prompt();
      };

      ctx.exit = function (){
        process.exit( 0 );
      };

      process.nextTick( ctx.reload );
    });
  });
};
