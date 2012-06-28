/**
 * Module dependencies.
 * @private
 */
var fs     = require( 'fs' );
var path   = require( 'path' );
var Flow   = require( 'node.flow' );
var packer = require( 'node.packer' );
var yaml   = require( 'js-yaml' );
var rmdir  = require( 'rmdirr' );
var lib    = require( './lib' );

var source = fs.readFileSync( CONF_DIR + 'assets.yml', 'utf8' );
var config = yaml.load( source );

var version_path = BASE_DIR + 'tmp/assets_version.json';
var uid          = UTILS.uid( 32 );
var tmp_dir      = BASE_DIR + 'tmp/assets/';

var cache = {
  css : {},
  js  : {}
};

var asset_host         = config.asset_host;
var asset_host_current = 0;
var asset_host_total, asset_host_counter;

if( Array.isArray( asset_host )){
  asset_host_total   = asset_host.length;
  asset_host_counter = function (){
    asset_host_current = asset_host_current == asset_host_total ?
      0 : asset_host_current += 1;
  };
}else{
  asset_host_total   = 0;
  asset_host_counter = function (){};
}



module.exports = function ( app, callback ){
  var css, js;

  if( NODE_ENV === 'prod' ){
    var flow = new Flow({
      log    : true,
      minify : true,
      uglify : false
    });

    // check if the dir exist, if it does remove it
    flow.series( function ( args, next ){
      if( !path.existsSync( tmp_dir )) return next();

      rmdir( tmp_dir, function ( err, dirs, files ){
        if( err ) throw err;

        next();
      });
    }).

    // create assets dir
    series( function ( args, next ){
      fs.mkdirSync( tmp_dir );
      next();
    });

    // build assets
    lib.build_assets( config, flow, packer, config.css, 'css', tmp_dir );
    lib.build_assets( config, flow, packer, config.js, 'js', tmp_dir );

    flow.join().end( function (){
      var version, compare, css, js;

      if( path.existsSync( version_path )){
        version = JSON.parse( fs.readFileSync( version_path, 'utf8' ));
        compare = true;
      }else{
        version = {
          css : lib.assign_version( config.css, uid ),
          js  : lib.assign_version( config.js, uid )
        };

        fs.writeFileSync( version_path, JSON.stringify( version, null, 2 ));
        compare = false;
      }

      lib.compare_and_replace( fs, config, version.css, 'css', tmp_dir, compare );
      lib.compare_and_replace( fs, config, version.js, 'js', tmp_dir, compare );

      css = lib.prod_css( config, cache, version, asset_host, asset_host_total, asset_host_current, asset_host_counter );
      js  = lib.prod_js( config, cache, version, asset_host, asset_host_total, asset_host_current, asset_host_counter );

      lib.helpers( app ,css, js, callback );
    });
  }else{
    // dev mode
    css = lib.dev_css( config );
    js  = lib.dev_js( config );

    lib.helpers( app ,css, js, callback );
  }
};