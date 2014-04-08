/**
 * Module dependencies.
 * @private
 */
var fs    = require( 'fs' );
var yaml  = require( 'js-yaml' );
var lib   = require( './lib' );
var build = require( './build' );

var source = fs.readFileSync( CONF_DIR + '/assets.yml', 'utf8' );
var config = yaml.safeLoad( source );

var version_path = PUB_DIR + '/assets_version.json';

var cache = {
  css : {},
  js  : {}
};

var asset_host         = CONF.asset_host;
var asset_host_current = 0;
var asset_host_total, asset_host_counter;

if( Array.isArray( asset_host )){
  asset_host_total   = asset_host.length - 1;
  asset_host_counter = function (){
    asset_host_current = asset_host_current == asset_host_total ?
      0 : asset_host_current += 1;

    return asset_host_current;
  };
}else{
  asset_host_total   = 0;
  asset_host_counter = function (){};
}

lib.pub_dir = PUB_DIR + '/';

module.exports = function ( app, callback ){
  var css, js;

  if( NODE_ENV === 'dev' ){
    css = lib.dev_css( config );
    js  = lib.dev_js( config );
  }else{
    // prod, test mode
    if( fs.existsSync( version_path )){
      var version = JSON.parse( fs.readFileSync( version_path, 'utf8' ));
    }else{
      build( BASE_DIR );
    }

    css = lib.prod_css( config, cache, version, asset_host, asset_host_counter );
    js  = lib.prod_js( config, cache, version, asset_host, asset_host_counter );
  }

  lib.helpers( app, css, js, callback );
};
