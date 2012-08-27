/**
 * Module dependencies.
 * @private
 */
var db       = require( './db' );
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var schema   = require( BASE_DIR + 'db/schema' )( Schema );
var fs       = require( 'fs' );
var path     = BASE_DIR + 'app/models/';
var files    = fs.readdirSync( path );


module.exports = function ( callback ){

  db( function ( db ){
    files.forEach( function ( file ){
      if( UTILS.regex.is_js_file.test( file )){
        var model_name = file.replace( '.js', '' );
        var model      = require( path + file );

        LOG.sys( 'Building model: ' + model_name );
        Model( model_name, model, db, schema[ model_name ]);
      }
    });

    LOG.sys( 'All models loaded' );
    callback();
  })
};