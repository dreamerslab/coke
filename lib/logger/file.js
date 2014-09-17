var fs             = require( 'fs' );
var json_stringify = require( './json_helper' ).stringify;

var format = require( './format' );
var ms     = format.ms;

var convert_content = format.convert_content({
  title: function ( title ){
    return '- ' + title + ': ';
  },
  desc : function ( content ){
    return content;
  },
  json : function ( data ){
    return json_stringify( data );
  }
});

var stream = fs.createWriteStream( BASE_DIR + '/log/coke.log', {
  flags : 'a'
});

var log = function ( buf ){
  stream.write( buf, 'ascii' );
};

var get_header = function ( type ){
  return '[ ' + type + ' ] ' + new Date();
};

module.exports = {
  sys : function ( data ){
    log( get_header( 'SYSTEM' ) + convert_content( data, [
      'pid',
      'msg'
    ]));
  },

  request : function ( data ){
    log( get_header( 'REQUEST' ) + convert_content( data, [
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
    log( get_header( 'RESPONSE' ) + convert_content( data, [
      'pid',
      'id',
      'status',
      { 'time' : ms },
      'headers',
      'body'
    ]));
  },

  error : function ( data ){
    log( get_header( 'ERROR' ) + convert_content( data, [
      'status',
      'pid',
      'id',
      { 'time' : ms },
      'msg'
    ]));
  },

  debug : function ( data ){
    log( get_header( 'DEBUG' ) + convert_content( data, [
      'pid',
      'id',
      { 'time': ms },
      'msg',
      'obj'
    ]));
  },

  raw : log
};
