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
    Object.keys( schema ).forEach( function ( model_name ){
      var path  = model_path + model_name;
      var model = fs.existsSync( path + '.js' ) ?
        require( path ) : {};

        LOG.sys( 'Building model: ' + model_name );
        model_names.push( model_name );
        Model( model_name, model, db, schema[ model_name ]);
    });

    LOG.sys( 'All models loaded' );
    callback && callback( model_names );
  })
};
