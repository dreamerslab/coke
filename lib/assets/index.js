/**
 * Module dependencies.
 * @private
 */
var fs    = require( 'fs' );
var yaml  = require( 'js-yaml' );
var lib   = require( './lib' );
var build = require( './build' );

var source = fs.readFileSync( CONF_DIR + 'assets.yml', 'utf8' );
var config = yaml.load( source );

var version_path = BASE_DIR + 'public/assets_version.json';

var cache = {
  css : {},
  js  : {}
};

var asset_host         = config.asset_host;
var asset_host_total   = asset_host.length - 1;
var asset_host_current = 0;
var asset_host_counter = Array.isArray( asset_host ) ?
  function (){
    asset_host_current = asset_host_current == asset_host_total ?
      0 : asset_host_current += 1;

    return asset_host_current;
  } : function (){};

lib.pub_dir = PUB_DIR;

module.exports = function ( app, callback ){
  var css, js;

  if( NODE_ENV === 'prod' ){
    if( fs.existsSync( version_path )){
      var version = JSON.parse( fs.readFileSync( version_path, 'utf8' ));
    }else{
      build( BASE_DIR );
    }

    css = lib.prod_css( config, cache, version, asset_host, asset_host_counter );
    js  = lib.prod_js( config, cache, version, asset_host, asset_host_counter );
  }else{
    // dev mode
    css = lib.dev_css( config );
    js  = lib.dev_js( config );
  }

  lib.helpers( app, css, js, callback );
};