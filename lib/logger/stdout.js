var colors         = require( 'cli-color' );
var $desc          = colors.greenBright;
var $title         = colors.cyan;
var $date          = colors.yellow;
var json_stringify = require( './json_helper' ).stringify;

var format = require( './format' );
var ms     = format.ms;

var convert_content = format.convert_content({
  title: function ( title ){
    return $title( '- ' + title + ': ' );
  },
  desc : function ( content ){
    return $desc( content );
  },
  json : function ( data ){
    return json_stringify( data, 2 );
  }
});

var log = console.log;

var get_header = function ( bg, type ){
  return bg.white.bold( '[ ' + type + ' ]' ) + ' ' +
         $date( new Date()) + '\n';
};

module.exports = {
  sys : function ( data ){
    log( get_header( colors.bgCyan, 'SYSTEM' ) + convert_content( data, [
      'pid',
      'msg'
    ]));
  },

  request : function ( data ){
    log( get_header( colors.bgBlue, 'REQUEST' ) + convert_content( data, [
      'pid',
      'id',
      'ip',
      'url',
      'method',
      'headers',
      'body'
    ]));
  },

  response : function ( data ){
    log( get_header( colors.bgGreen, 'RESPONSE' ) + convert_content( data, [
      'pid',
      'id',
      'status',
      { 'time' : ms },
      'headers',
      'body'
    ]));
  },

  error : function ( data ){
    log( get_header( colors.bgRed, 'ERROR' ) + convert_content( data, [
      'status',
      'pid',
      'id',
      { 'time' : ms },
      'msg'
    ]));
  },

  debug : function ( data ){
    log( get_header( colors.bgMagenta, 'DEBUG' ) + convert_content( data, [
      'pid',
      'id',
      { 'time': ms },
      'msg',
      'obj'
    ]));
  },

  raw : log
};
