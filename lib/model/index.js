/**
 * Module dependencies.
 * @private
 */
var fs   = require( 'fs' );
var path = require( 'path' );
var db   = require( './db' );

module.exports = function ( args, callback ){
  var mongoose    = args.mongoose;
  var Schema      = mongoose.Schema;
  var schema_name = args.schema_name || 'index';
  var schema_path = path.join( SCHEMA_DIR, schema_name );
  var schema      = require( schema_path )( Schema );
  var model_names = [];

  db( mongoose, function ( db ){
    var install_model = function ( name ){
      if( ~model_names.indexOf( name )) return;

      LOG.sys( 'Building model: ' + name );

      var model_path = path.join( MODEL_DIR, name + '.js' );
      var props      = fs.existsSync( model_path ) ? require( model_path ) : {};

      model_names.push( name );
      Model( name, props, db, schema[ name ]);
    };

    Object.keys( schema ).forEach( install_model );

    fs.readdir( MODEL_DIR, function ( err, files ){
      if( err ) throw err;

      files.forEach( function ( file ){
        var m = file.match( /[\/.]*([^\/.]*).js/ );
        if( !m || !m[ 1 ]) return;

        install_model( name );
      });

      LOG.sys( 'All models loaded' );
      callback && callback( model_names );
    });
  });
};
