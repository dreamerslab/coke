/**
 * Module dependencies.
 * @private
 */
var fs = require( 'fs' );
var db = require( './db' );

module.exports = function ( args, callback ){
  var mongoose    = args.mongoose;
  var Schema      = mongoose.Schema;
  var schema_path = BASE_DIR + 'db/schema/' + ( args.schema_name || 'index' );
  var schema      = require( schema_path )( Schema );
  var model_path  = BASE_DIR + 'app/models/';
  var model_names = [];

  db( mongoose, function ( db ){
    var install_model = function ( model_name ){
      if( model_names.indexOf( model_name ) != -1 ) return;

      LOG.sys( 'Building model: ' + model_name );

      var path  = model_path + model_name;
      var props = fs.existsSync( path + '.js' ) ? require( path ) : {};

      model_names.push( model_name );
      Model( model_name, props, db, schema[ model_name ]);
    };

    // check the declared model first
    fs.readdir( model_path, function ( err, file_paths ){
      // create model with no model js file but schema
      // this has to go first
      Object.keys( schema ).forEach( install_model );

      // create none mongoose model
      file_paths.forEach( function ( each ){
        var m = each.match( /[\/.]*([^\/.]*).js/ );

        if( !m || !m[ 1 ] ) return;

        var model_name = m[ 1 ];

        install_model( model_name );
      });

      LOG.sys( 'All models loaded' );
      callback && callback( model_names );
    });
  });
};
