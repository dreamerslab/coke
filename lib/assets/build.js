/**
 * Module dependencies.
 * @private
 */
var fs     = require( 'fs' );
var Flow   = require( 'node.flow' );
var extend = require( 'node.extend' );
var yaml   = require( 'js-yaml' );
var rmdir  = require( 'rmdir' );
var utils  = require( '../utils' );
var lib    = require( './lib' );

module.exports = function ( current ){
  var source       = fs.readFileSync( current + '/config/assets.yml', 'utf8' );
  var config       = yaml.safeLoad( source );
  var version_path = current + '/public/assets_version.json';
  var tmp_dir      = current + '/tmp/assets/';

  lib.pub_dir = current + '/public/';

  var flow = new Flow({
    log    : true,
    minify : true,
    uglify : false
  });

  // check if the dir exist, if it does remove it
  flow.series( function ( args, next ){
    if( !fs.existsSync( tmp_dir )) return next();

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

  // build assets to tmp
  lib.build_assets( config, flow, 'css', tmp_dir );
  lib.build_assets( config, flow, 'js', tmp_dir );

  flow.join().
  error( function ( err ){
    if( err ){
      console.log(
        utils.$alert( 'error' ) +
        '   [coke][core][assets][build] shit happened ', err
      );
      process.exit( 1 );
    }
  }).
  end( function (){
    var version, compare;

    var tmp = {
      css : lib.assign_version( config.css ),
      js  : lib.assign_version( config.js )
    };

    if( fs.existsSync( version_path )){
      var ori_version = JSON.parse( fs.readFileSync( version_path, 'utf8' ));

      compare = true;
      version = extend( true, tmp, ori_version );
    }else{
      compare = false;
      version = tmp;
    }

    fs.writeFileSync( version_path, JSON.stringify( version, null, 2 ));
    lib.compare_and_replace( config, version, 'css', tmp_dir, compare, version_path );
    lib.compare_and_replace( config, version, 'js', tmp_dir, compare, version_path );
  });
};
