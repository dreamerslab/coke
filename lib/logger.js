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
  
  for( ; i--; ){
    tmp           = logs[ i ];
    config[ tmp ] = true;
  }
  
  log = function ( buf ){
    console.log( buf );
  };
  
  sys = config[ 'sys' ] ? function ( msg ){
    log( '\033[46m[ SYSTEM ]\033[m \033[33m' + new Date() +
      '\033[m\n\033[36m- msg:\033[m \033[92m' + msg +
      '\033[m\n'
    );
  } : function (){};
  
  request = config[ 'request' ] ? function ( req ){
    log( '\033[44m[ REQUEST ]\033[m \033[33m' + new Date() +
      '\033[m\n\033[36m- id:\033[m \033[92m' + req._id +
      '\033[m\n\033[36m- ip:\033[m \033[92m' + UTILS.ip( req ) +
      '\033[m\n\033[36m- url:\033[m \033[92m' + req.url +
      '\033[m\n\033[36m- method:\033[m \033[92m' + req.method +
      '\033[m\n\033[36m- header:\033[m \033[92m' + json( req.headers, null, 2 ) +
      '\033[m\n\033[36m- params:\033[m \033[92m' + json( req.body || req.query, null, 2 ) +
      '\033[m\n'
    );
  } : function (){};
  
  response = config[ 'response' ] ? function ( status, res, body ){
    if( status === 500 ){
      this.error( status, res, body );
    }else{
      log( '\033[42m[ RESPONSE ]\033[m \033[33m' + new Date +
        '\033[m\n\033[36m- id:\033[m \033[92m' + res._id +
        '\033[m\n\033[36m- status:\033[m \033[92m' + status +
        '\033[m\n\033[36m- time:\033[m \033[92m' + ( Date.now() - res._start ) + ' ms' +
        '\033[m\n\033[36m- header:\033[m \033[92m' + json( res._headers, null, 2 ) +
        '\033[m\n\033[36m- body:\033[m \033[92m' + json( body, null, 2 ) +
        '\033[m\n'
      );
    }
  } : function (){};
  
  error = config[ 'error' ] ? function ( status, res, msg ){
    var _msg = {}.toString.call( msg ) === '[object Error]' ?
      msg : json( msg, null, 2 );
    
    log( '\033[41m[ ERROR ]\033[m \033[33m' + new Date() +
      '\033[m\n\033[36m- id:\033[m \033[92m' + res._id +
      '\033[m\n\033[36m- status:\033[m \033[92m' + status +
      '\033[m\n\033[36m- msg:\033[m \033[92m' + _msg +
      '\033[m\n'
    );
  } : function (){};
  
  debug = config[ 'debug' ] ? function ( id, msg, obj ){
    var _obj = obj ? 
      '\033[m\n\033[36m- obj:\033[m \033[92m' + json( obj, null, 2 ) : '';
    
    log( '\033[45m[ DEBUG ]\033[m \033[33m' + new Date() +
      '\033[m\n\033[36m- id:\033[m \033[92m' + id +
      '\033[m\n\033[36m- msg:\033[m \033[92m' + msg +
      _obj +
      '\033[m\n'
    );
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
      '\n'
    );
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
      '\n'
    );
  } : function (){};
  
  response  = config[ 'response' ] ? function ( status, res, body ){
    if( status === 500 ){
      this.error( status, res, body );
    }else{
      log( 'response',
        '[ RESPONSE ] ' + new Date +
        '\n- id: ' + res._id +
        '\n- status: ' + status +
        '\n- time: ' + ( Date.now() - res._start ) + ' ms' +
        '\n- header: ' + json( res._headers, null, 2 ) +
        '\n- body: ' + json( body, null, 2 ) +
        '\n'
      );
    }
  } : function (){};
  
  error = config[ 'error' ] ? function ( status, res, msg ){
    var _msg = {}.toString.call( msg ) === '[object Error]' ?
      msg : json( msg, null, 2 );
    
    log( 'error',
      '[ ERROR ] ' + new Date() +
      '\n- id: ' + res._id +
      '\n- status: ' + status +
      '\n- msg: ' + _msg +
      '\n'
    );
  } : function (){};
  
  debug = config[ 'debug' ] ? function ( id, msg, obj ){
    var _obj = obj ? 
      '- obj: ' + json( obj ) : '';
    
    log( 'debug',
      '[ DEBUG ] ' + new Date() +
      '\n- id: ' + id +
      '\n- msg: ' + msg +
      _obj +
      '\n'
    );
  } : function (){};
}



global.LOG = {
  
  sys : sys,
  
  request : request,
  
  response : response,
  
  error : error,
  
  debug : debug
};
