var fs    = require( 'fs' );
var yaml  = require( 'js-yaml' );
var aws   = require( 'aws2js' );
var Class = require( 'node.class' );
var regex = UTILS.regex;

module.exports = Class.extend({

  init : function (){
    var source = fs.readFileSync( process.cwd() + '/config/prod/config.yml', 'utf8' );
    var config = yaml.safeLoad( source ).aws;

    if( config ){
      var s3 = this.s3 = aws.load( 's3', config.key, config.secret );

      s3.setBucket( config.s3.bucket );
    }
  },

  create : function ( args, callback ){
    var tgt  = args.tgt_path;
    var date = new Date();

    date.setUTCFullYear( date.getUTCFullYear() + 10 );

    var expires     = date.toUTCString();
    var life_second = 3600 * 24 * 365 * 10;//ten years
    var headers     = {
      'Cache-Control' : 'max-age=' + life_second + ', public',
      'Expires'       : expires
    };

    if( regex.is_css_file.test( tgt )){
      headers[ 'Content-Type' ] = 'text/css';
    }

    if( regex.is_js_file.test( tgt )){
      headers[ 'Content-Type' ] = 'application/javascript';
    }

    this.s3.putFile( args.tgt_path, args.src_path, 'public-read', headers, callback );
  },

  destroy : function ( args, callback ){
    this.s3.del( args.tgt_path, callback );
  }
})
