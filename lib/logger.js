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
var fs = require( 'fs' );

var logs   = CONF.logs;
var json   = JSON.stringify;
var pid    = process.pid;
var config = {};
var log, sys, request, response, error, debug;

if( NODE_ENV === 'dev' ){
  var colors = require( 'cli-color' );
  var $desc  = colors.greenBright;
  var $title = colors.cyan;
  var $date  = colors.yellow;

  logs.forEach( function ( name ){
    config[ name ] = true;
  });

  log = function ( buf ){
    console.log( buf );
  };

  sys = config.sys ? function ( msg ){
    log( colors.bgCyan.white.bold( '[ SYSTEM ]' ) + ' ' +
         $date( new Date())  + '\n' +
         $title( '- pid: ' ) +
         $desc( pid )        + '\n' +
         $title( '- msg: ' ) +
         $desc( msg )        + '\n'
       );
  } : function (){};

  request = config.request ? function ( req ){
    log( colors.bgBlue.white.bold( '[ REQUEST ]' ) + ' ' +
         $date( new Date())                   + '\n' +
         $title( '- pid: ' )                  +
         $desc( pid )                         + '\n' +
         $title( '- id: ' )                   +
         $desc( req._id )                     + '\n' +
         $title( '- ip: ' )                   +
         $desc( UTILS.ip( req ))              + '\n' +
         $title( '- url: ' )                  +
         $desc( req.url )                     + '\n' +
         $title( '- method: ' )               +
         $desc( req.method )                  + '\n' +
         $title( '- header: ' )               +
         $desc( json( req.headers, null, 2 )) + '\n' +
         $title( '- body: ' )                 +
         $desc( json( req.body, null, 2 ))    + '\n'
       );

  } : function (){};

  response = config.response ? function ( status, res, body ){
    if( UTILS.regex.bad_req.test( status )){
      return this.error( status, res, body );
    }

    body = body === undefined ? '':
      $title( '- body:' ) + ' ' + $desc( json( body, null, 2 )) + '\n';

    log( colors.bgGreen.white.bold( '[ RESPONSE ]' ) + ' ' +
         $date( new Date())                         + '\n' +
         $title( '- pid: ' )                        +
         $desc( pid )                               + '\n' +
         $title( '- id: ' )                         +
         $desc( res._id )                           + '\n' +
         $title( '- status: ' )                     +
         $desc( status )                            + '\n' +
         $title( '- time: ' )                       +
         $desc(( Date.now() - res._start ) + 'ms' ) + '\n' +
         $title( '- header: ' )                     +
         $desc( json( res._headers, null, 2 ))      + '\n' +
         body
       );
  } : function (){};

  error = config.error ? function ( status, res, msg ){
    var req = res.req;
    var _msg;

    if( !msg ){
      _msg = '';
    }else{
      _msg = UTILS.is( msg ) === 'error' ?
        msg : json( msg, null, 2 );
    }

    var detail = UTILS.is( res ) === 'string' ?
     ( $title( '- id: ' ) +
       $desc( res ) + '\n' ) :
     ( $title( '- id: ' )                         +
       $desc( res._id )                           + '\n' +
       $title( '- time: ' )                       +
       $desc(( Date.now() - res._start ) + 'ms' ) + '\n' +
       $title( '- ip: ' )                         +
       $desc( UTILS.ip( req ))                    + '\n' +
       $title( '- url: ' )                        +
       $desc( req.url )                           + '\n' +
       $title( '- method: ' )                     +
       $desc( req.method )                        + '\n' +
       $title( '- header: ' )                     +
       $desc( json( req.headers, null, 2 ))       + '\n' +
       $title( '- body: ' )                       +
       $desc( json( req.body, null, 2 ))          + '\n' );

    log( colors.bgRed.white.bold( '[ ERROR ]' ) + ' ' +
         $date( new Date())     + '\n' +
         $title( '- status: ' ) +
         $desc( status )        + '\n' +
         $title( '- pid: ' )    +
         $desc( pid )           + '\n' +
         detail                 +
         $title( '- msg: ' )    +
         $desc( _msg )          + '\n'
       );
  } : function (){};

  debug = config.debug ? function ( res, msg, obj ){
    var detail;

    if( UTILS.is( res ) === 'string' ){
      detail = '';
      obj    = msg;
      msg    = res;
    }else{
      detail = $title( '- id: ' )                         +
               $desc( res._id )                           + '\n' +
               $title( '- time: ' )                       +
               $desc(( Date.now() - res._start ) + 'ms' ) + '\n';
    }

    obj = obj ?
      $title( '- obj: ' ) + $desc( json( obj, null, 2 )) + '\n' :
      '';

    log( colors.bgMagenta.white.bold( '[ DEBUG ]' ) + ' ' +
         $date( new Date())                         + '\n' +
         $title( '- pid: ' )                        +
         $desc( pid )                               + '\n' +
         detail                                     +
         $title( '- msg: ' )                        +
         $desc( msg )                               + '\n' +
         obj
       );
  } : function (){};

}else{
  var stream = {};

  logs.forEach( function ( name ){
    config[ name ] = true;
    stream[ name ] = fs.createWriteStream( BASE_DIR + 'log/' + name + '.log', {
      flags : 'a'
    });
  });

  log = function ( path, buf ){
    stream[ path ].write( buf, 'ascii' );
  };

  sys = config.sys ? function ( msg ){
    log( 'sys',
      '[ SYSTEM ] ' + new Date() +
      '\n- pid: '   + pid +
      '\n- msg: '   + msg +
      '\n'
    );
  } : function (){};

  request = config.request ? function ( req ){
    log( 'request',
      '[ REQUEST ] ' + new Date() +
      '\n- pid: '    + pid +
      '\n- id: '     + req._id +
      '\n- ip: '     + UTILS.ip( req ) +
      '\n- url: '    + req.url +
      '\n- method: ' + req.method +
      '\n- header: ' + json( req.headers, null, 2 ) +
      '\n- body: '   + json( req.body ) +
      '\n'
    );
  } : function (){};

  response = config.response ? function ( status, res, body ){
    if( UTILS.regex.bad_req.test( status )){
      return this.error( status, res, body );
    }

    body = body === undefined ? '':
      '\n- body: ' + json( body, null, 2 );

    log( 'response',
      '[ RESPONSE ] ' + new Date +
      '\n- pid: '     + pid +
      '\n- id: '      + res._id +
      '\n- status: '  + status +
      '\n- time: '    + ( Date.now() - res._start ) + ' ms' +
      '\n- header: '  + json( res._headers, null, 2 ) +
      body            + '\n'
    );
  } : function (){};

  error = config.error ? function ( status, res, msg ){
    var req = res.req;
    var _msg;

    if( !msg ){
      _msg = '';
    }else{
      _msg = {}.toString.call( msg ) === '[object Error]' ?
        msg : json( msg, null, 2 );
    }

    var detail = UTILS.is( res ) === 'string' ?
     ( '\n- id: '     + res ) :
     ( '\n- id: '     + res._id +
       '\n- time: '   + ( Date.now() - res._start ) + 'ms' +
       '\n- ip: '     + UTILS.ip( req ) +
       '\n- url: '    + req.url +
       '\n- method: ' + req.method +
       '\n- header: ' + json( req.headers, null, 2 ) +
       '\n- body: '   + json( req.body, null, 2 ));


    log( 'error',
      '[ ERROR ] '   + new Date() +
      '\n- status: ' + status +
      '\n- pid: '    + pid + detail +
      '\n- msg: '    + _msg +
      '\n'
    );
  } : function (){};

  debug = config.debug ? function ( res, msg, obj ){
    var detail;

    if( UTILS.is( res ) === 'string' ){
      detail = '';
      obj    = msg;
      msg    = res;
    }else{
      detail = '\n- id: '   + res._id +
               '\n- time: ' + ( Date.now() - res._start ) + 'ms';
    }

    obj = obj ?
      '- obj: ' + json( obj ) : '';

    log( 'debug',
      '[ DEBUG ] ' + new Date() +
      '\n- pid: '  + pid + detail +
      '\n- msg: '  + msg + obj +
      '\n'
    );
  } : function (){};
}

/**
 * Exports module as getter to global.
 */
global.__defineGetter__( 'LOG', function (){
  return {
    sys      : sys,
    request  : request,
    response : response,
    error    : error,
    debug    : debug
  };
});