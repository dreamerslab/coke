/**
 * Module dependencies.
 * @private
 */
var db = require( './db' );

module.exports = function ( mongoose, callback ){
  var Schema      = mongoose.Schema;
  var schema      = require( BASE_DIR + 'db/schema' )( Schema );
  var fs          = require( 'fs' );
  var path        = BASE_DIR + 'app/models/';
  var files       = fs.readdirSync( path );
  var model_names = [];

  db( mongoose, function ( db ){
    files.forEach( function ( file ){
      if( UTILS.regex.is_js_file.test( file )){
        var model_name = file.replace( '.js', '' );
        var model      = require( path + file );

        LOG.sys( 'Building model: ' + model_name );
        model_names.push( model_name );
        Model( model_name, model, db, schema[ model_name ]);
      }
    });

    LOG.sys( 'All models loaded' );
    callback && callback( model_names );
  })
};