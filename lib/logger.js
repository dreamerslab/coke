var fs   = require( 'fs' );
var yaml = require( 'js-yaml' );

var config = {};
var stream = {};

var source = fs.readFileSync( CONF_DIR + NODE_ENV + '/config.yml', 'utf8' );
var logs   = yaml.load( source ).logs;
var i      = logs.length;
var json   = JSON.stringify;

var tmp, log, sys, request, response, error, debug;

if( NODE_ENV === 'dev' ){
  var colors = require( 'cli-color' );
  var $desc  = colors.bright.green;
  var $title = colors.cyan;
  var $date  = colors.yellow;

  for( ; i--; ){
    tmp           = logs[ i ];
    config[ tmp ] = true;
  }

  log = function ( buf ){
    console.log( buf );
  };

  sys = config[ 'sys' ] ? function ( msg ){
    log( colors.bgCyan.white.bold( '[ SYSTEM ]' ) + ' ' +
         $date( new Date()) + '\n' +
         $title( '- msg:' ) + ' ' +
         $desc( msg ) + '\n' );
  } : function (){};

  request = config[ 'request' ] ? function ( req ){
    log( colors.bgBlue.white.bold( '[ REQUEST ]' ) + ' ' +
         $date( new Date()) + '\n' +
         $title( '- id:' ) + ' ' +
         $desc( req._id ) + '\n' +
         $title( '- ip:' ) + ' ' +
         $desc( UTILS.ip( req )) + '\n' +
         $title( '- url:' ) + ' ' +
         $desc( req.url ) + '\n' +
         $title( '- method:' ) + ' ' +
         $desc( req.method ) + '\n' +
         $title( '- header:' ) + ' ' +
         $desc( json( req.headers, null, 2 )) + '\n' +
         $title( '- params:' ) + ' ' +
         $desc( json( req.body || req.query, null, 2 )) + '\n' );

  } : function (){};

  response = config[ 'response' ] ? function ( status, res, body ){
    if( status === 500 ){
      this.error( status, res, body );
    }else{
      var _body = body === undefined ? '':
        $title( '- body:' ) + ' ' + $desc( json( body, null, 2 )) + '\n';

      log( colors.bgGreen.white.bold( '[ RESPONSE ]' ) + ' ' +
           $date( new Date()) + '\n' +
           $title( '- id:' ) + ' ' +
           $desc( res._id ) + '\n' +
           $title( '- status:' ) + ' ' +
           $desc( status ) + '\n' +
           $title( '- time:' ) + ' ' +
           $desc(( Date.now() - res._start ) + 'ms' ) + '\n' +
           $title( '- header:' ) + ' ' +
           $desc( json( res._headers, null, 2 )) + '\n' +
           _body );
    }
  } : function (){};

  error = config[ 'error' ] ? function ( status, res, msg ){
    var req  = res.req;
    var _msg = {}.toString.call( msg ) === '[object Error]' ?
      msg : json( msg, null, 2 );

    log( colors.bgRed.white.bold( '[ ERROR ]' ) + ' ' +
         $date( new Date()) + '\n' +
         $title( '- id:' ) + ' ' +
         $desc( res._id ) + '\n' +
         $title( '- status:' ) + ' ' +
         $desc( status ) + '\n' +
         $title( '- time:' ) + ' ' +
         $desc(( Date.now() - res._start ) + 'ms' ) + '\n' +
         $title( '- ip:' ) + ' ' +
         $desc( UTILS.ip( req )) + '\n' +
         $title( '- url:' ) + ' ' +
         $desc( req.url ) + '\n' +
         $title( '- method:' ) + ' ' +
         $desc( req.method ) + '\n' +
         $title( '- header:' ) + ' ' +
         $desc( json( req.headers, null, 2 )) + '\n' +
         $title( '- params:' ) + ' ' +
         $desc( json( req.body || req.query, null, 2 )) + '\n' +
         $title( '- msg:' ) + ' ' +
         $desc( _msg ) + '\n' );
  } : function (){};

  debug = config[ 'debug' ] ? function ( id, msg, obj ){
    var _obj = obj ?
      '\033[m\n\033[36m- obj:\033[m \033[92m' + json( obj, null, 2 ) : '';

    log( colors.bgMagenta.white.bold( '[ DEBUG ]' ) + ' ' +
         $date( new Date()) + '\n' +
         $title( '- id:' ) + ' ' +
         $desc( id ) + '\n' +
         $title( '- msg:' ) + ' ' +
         $desc( _msg ) + '\n' +
         _obj );
  } : function (){};

}else{

  for( ; i--; ){
    tmp           = logs[ i ];
    config[ tmp ] = true;
    stream[ tmp ] = fs.createWriteStream( BASE_DIR + 'log/' + tmp + '.log', { flags : 'a' });
  }

  log = function ( path, buf ){
    stream[ path ].write( buf, 'ascii' );
  };

  sys = config[ 'sys' ] ? function ( msg ){
    log( 'sys',
      '[ SYSTEM ] ' + new Date() +
      '\n- msg: ' + msg +
      '\n' );
  } : function (){};

  request = config[ 'request' ] ? function ( req ){
    log( 'request',
      '[ REQUEST ] ' + new Date() +
      '\n- id: ' + req._id +
      '\n- ip: ' + UTILS.ip( req ) +
      '\n- url: ' + req.url +
      '\n- method: ' + req.method +
      '\n- header: ' + json( req.headers, null, 2 ) +
      '\n- params: ' + json( req.body || req.query ) +
      '\n' );
  } : function (){};

  response  = config[ 'response' ] ? function ( status, res, body ){
    if( status === 500 ){
      this.error( status, res, body );
    }else{
      var _body = body === undefined ? '':
        '\n- body: ' + json( body, null, 2 );

      log( 'response',
        '[ RESPONSE ] ' + new Date +
        '\n- id: ' + res._id +
        '\n- status: ' + status +
        '\n- time: ' + ( Date.now() - res._start ) + ' ms' +
        '\n- header: ' + json( res._headers, null, 2 ) +
        _body + '\n' );
    }
  } : function (){};

  error = config[ 'error' ] ? function ( status, res, msg ){
    var req  = res.req;
    var _msg = {}.toString.call( msg ) === '[object Error]' ?
      msg : json( msg, null, 2 );

    log( 'error',
      '[ ERROR ] ' + new Date() +
      '\n- id: ' + res._id +
      '\n- status: ' + status +
      '\n- time: ' + ( Date.now() - res._start ) + 'ms' +
      '\n- ip: ' + UTILS.ip( req ) +
      '\n- url: ' + req.url +
      '\n- method: ' + req.method +
      '\n- header: ' + json( req.headers, null, 2 ) +
      '\n- params: ' + json( req.body || req.query, null, 2 ) +
      '\n- msg: ' + _msg +
      '\n' );
  } : function (){};

  debug = config[ 'debug' ] ? function ( id, msg, obj ){
    var _obj = obj ?
      '- obj: ' + json( obj ) : '';

    log( 'debug',
      '[ DEBUG ] ' + new Date() +
      '\n- id: ' + id +
      '\n- msg: ' + msg +
      _obj +
      '\n' );
  } : function (){};
}



global.LOG = {

  sys : sys,

  request : request,

  response : response,

  error : error,

  debug : debug
};
