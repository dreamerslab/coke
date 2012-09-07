var redis   = require( "redis" );
var configs = CONF.redis;

module.exports = {

  _client : null,

  init : function ( app ){

    var port    = configs.port || '6379';
    var host    = configs.host || '127.0.0.1';
    var options = configs.options;

    this._client = redis.createClient( port, host, options );

    configs.password && this._client.auth( configs.password );
    this._client.on( 'error', function ( err ){
      console.log( 'Error :' + err );
    });
  },

  client : function (){

    return this._client;
  },

  statics : redis
};