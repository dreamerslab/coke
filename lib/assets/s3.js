var fs    = require( 'fs' );
var yaml  = require( 'js-yaml' );
var aws   = require( 'aws2js' );
var Class = require( 'node.class' );

module.exports = Class.extend({

  init : function (){
    var source = fs.readFileSync( process.cwd() + '/config/prod/config.yml', 'utf8' );
    var config = yaml.load( source ).aws;
    var s3     = this.s3 = aws.load( 's3', config.key, config.secret );

    s3.setBucket( config.s3.bucket );
  },

  create : function ( args, callback ){
    this.s3.putFile( args.tgt_path, args.src_path, 'public-read', {}, callback );
  },

  destroy : function ( args, callback ){
    this.s3.del( args.tgt_path, callback );
  }
})