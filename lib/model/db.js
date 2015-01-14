/**
 * Module dependencies.
 * @private
 */
var config = CONF.db;

module.exports = function ( mongoose, callback ){
  if( !config.db ){
    throw new Error( 'Database not specified' );
  }

  if( UTILS.regex.db_ill_char.test( config.db )){
    throw new Error( 'Database name contains illegal characters' );
  }

  var url = 'mongodb://';

  if( config.username && config.username.length > 0 ){
    url += config.username + ':' + config.password + '@';
  }

  url += ( config.host || 'localhost' ) + ':' + ( config.port || 27017 );
  url += '/' + config.db;

  var db = mongoose.createConnection( url );

  db.on( 'error', function ( err ){
    LOG.error( 500, '[model][mongoose] error', err );
  });

  db.on( 'open', function (){
    UTILS.connection( mongoose );
    LOG.sys( 'Database connected at: ' + url );
    callback( db );
  });

  db.on( 'close', function (){
    LOG.sys( 'Database connection closed' );
  });
};
