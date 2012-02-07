var fs      = require( 'fs' );
var utils   = require( 'connect' ).utils;
var colors  = require( 'cli-color' );


utils.$update = colors.bold.yellow;
utils.$good   = colors.bold.green;
utils.$fine   = colors.bold.gray;
utils.$alert  = colors.red;

utils.regex = {
  is_js_file : /\.js$/,
  has_format : /\..+$/,
  is_word : /^[a-zA-Z]+$/,
  has_none_characters : /\W/g,
  has_none_characters_but_slash : /(?![\/|\s])\W/g,
  has_none_characters_but_colon : /(?![\:|\s])\W/g,
  routes_namespace : function ( namespace ){
    return new RegExp( 'map\\\.namespace\\\( \\\'' + namespace + '\\\'\\\,', 'g' );
  },
  url : /^(https?):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
};

utils.ip = function ( req ){
  return req.connection.remoteAddress || req.headers[ 'x-forwarded-for' ];
};

utils.is_project_root = function ( callback ){
  var current = process.cwd();
  var files   = fs.readdirSync( current );
  var found   = false;

  files.forEach( function ( file ){
    if( file === 'server.js' ){
      callback( current );
      found = true;
    }
  });

  if( !found ){
    console.log(
      this.$alert( 'error' ) + '   ' +
      '`server.js` not found, are you in the project root dir?'
    );
    process.exit( 0 );
  }
};

utils.add_spaces = function ( str, len, to_start ){
  var str_len = str.length;
  var i       = str_len;

  for( ;i < len; i += 1 ){
    if( !to_start ){
      str += ' ';
    }else{
      str = ' ' + str;
    }
  }

  return str;
};



module.exports = global.UTILS = utils;
