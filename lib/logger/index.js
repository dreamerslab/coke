/*!
 * COKE
 * Copyright(c) 2012 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileOverview
 * Logger module.
 */

/**
 * Module dependencies.
 * @private
 */
var logs   = CONF.logs || [];
var pid    = process.pid;
var config = {};
var log, sys, request, response, error, debug;
var raw; // expose raw logger interface

logs.forEach( function ( name ){
  config[ name ] = true;
});

var default_logger = function (){
  if ( global.NODE_ENV === 'dev' || global.DEV_LOG || process.env.DEV_LOG ){
    return require( './stdout' );
  } else {
    return require( './file' );
  }
};

var config_logger = function ( logger ){
  var noop = function(){};

  sys = config.sys ? function ( msg ){
    logger.sys({
      pid  : pid,
      msg  : msg
    });
  } : noop;

  request = config.request ? function ( req ){
    logger.request({
      pid     : pid,
      id      : req._id,
      ip      : UTILS.ip( req ),
      url     : req.url,
      method  : req.method,
      headers : req.headers,
      body    : req.body
    });
  } : noop;

  response = config.response ? function ( status, res, body ){
    if( UTILS.regex.bad_req.test( status )){
      return this.error( status, res, body );
    }

    logger.response({
      pid     : pid,
      id      : res._id,
      status  : status,
      time    : Date.now() - res._start,
      headers : res._headers,
      body    : body
    });
  } : noop;

  /**
   * LOG.error( status, res, err ) // 1
   * LOG.error( status, res, msg ) // 2
   * LOG.error( status, msg, err ) // 3
   * LOG.error( status, msg )      // 4
   */
  error = config.error ? function ( status, res, msg ){
    var _msg;
    var _res;
    var _err;

    // deal with third argument
    if( msg ){
      if( UTILS.is( msg ) === 'error' ){
        _err = msg.stack; // for 1 and 3
      }else{
        _msg = msg; // for 2
      }
    }

    // deal with second argument
    if( UTILS.is( res ) === 'string' ){
      _msg = res; // for 3, 4
    }else{
      _res = res; // for 1, 2
    }

    var data = {
      status : status,
      pid    : pid,
    };

    if( _msg ) data.msg = _msg;
    if( _err ) data.err = _err;
    if( _res ){
      data.id   = res._id;
      data.time = Date.now() - res._start;
    }

    logger.error( data );
  } : noop;

  debug = config.debug ? function ( res, msg, obj ){
    if( UTILS.is( res ) === 'string' ){
      obj    = msg;
      msg    = res;
    }

    var data = {
      pid : pid,
      msg : msg,
      obj : obj
    };

    if( UTILS.is( res ) !== 'string' ){
      data.id   = res._id;
      data.time = Date.now() - res._start;
    }

    logger.debug( data );
  } : noop;

  raw = logger.raw;
};

/**
 * Exports module as getter to global.
 */
var export_logger = function (){
  global.__defineGetter__( 'LOG', function (){
    return {
      sys      : sys,
      request  : request,
      response : response,
      error    : error,
      debug    : debug,
      raw      : raw
    };
  });
};

module.exports = function ( logger ){
  if ( !logger ) logger = default_logger();

  config_logger( logger );
  export_logger();
};
