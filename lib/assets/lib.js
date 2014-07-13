var fs     = require( 'fs' );
var packer = require( 'node.packer' );
var utils  = require( '../utils' );
var uid    = utils.uid( 32 );

module.exports = {

  assign_version : function ( assets ){
    var tmp = {};

    Object.keys( assets ).forEach( function ( group ){
      tmp[ group ] = uid;
    });

    return tmp;
  },

  build_assets : function ( config, flow, type, tmp_dir ){
    var self   = this;
    var path   = config.path[ type ];
    var assets = config[ type ];

    Object.keys( assets ).forEach( function ( group ){
      var input = [];

      assets[ group ].site &&
        assets[ group ].site.forEach( function ( asset ){
          input.push( self.pub_dir + path + '/' + asset + '.' + type );
        });

      flow.parallel( function ( arg, ready ){
        arg.callback = function ( err, stdout, stderr ){
          if( err ) throw err;

          ready();
          console.log( utils.$good( 'created  '  ) + 'combine & minify -> ' + arg.output );
        };

        packer( arg );
      }, {
        input  : input,
        output : tmp_dir + group + '.' + type
      });
    });
  },

  compare_and_replace : function ( config, version, type, tmp_dir, compare, version_path ){
    var self    = this;
    var assets  = version[ type ];
    var S3      = require( './s3' );
    var s3      = new S3();
    var tgt_dir = self.pub_dir + config.path.output;

    if( !fs.existsSync( tgt_dir )){
      fs.mkdirSync( tgt_dir );
    }

    Object.keys( assets ).forEach( function ( group ){
      var tmp_path      = tmp_dir + group + '.' + type;
      var tgt_base_path = config.path.output + '/' + group + '-' + assets[ group ] + '.' + type;
      var tgt_path      = self.pub_dir + tgt_base_path;
      var is_existed    = fs.existsSync( tmp_path );

      if( !is_existed ){
        if( version[ type ][ group ]){
          delete version[ type ][ group ];
          return fs.writeFileSync( version_path, JSON.stringify( version, null, 2 ));
        }

        return;
      }

      var tmp = fs.readFileSync( tmp_path, 'utf8' );

      // if the file is empty remove the version and save it
      if( !tmp ){
        if( version[ type ][ group ]){
          delete version[ type ][ group ];
          return fs.writeFileSync( version_path, JSON.stringify( version, null, 2 ));
        }
      }

      if( !compare || !fs.existsSync( tgt_path )){
         // does not need to compare files just move it to assets dir
         // ex. assets[ group ] = version.css.common -> 32 rand str
        fs.renameSync( tmp_path, tgt_path );
        console.log( utils.$good( 'moved    ' ) + tmp_path + ' -> ' + tgt_path );

        if( config.s3 ){
          s3.create({
            tgt_path : tgt_base_path,
            src_path : tgt_path
          }, function (){
            console.log( utils.$good( 'uploaded ' ) + tgt_base_path + ' to s3' );
          });
        }
      }

      var ori = fs.readFileSync( tgt_path, 'utf8' );

      if( tmp == ori ) return;

      // replace the old assets with the new one
      // delete from s3
      if( config.s3 ){
        s3.destroy({
          tgt_path : tgt_base_path
        }, function (){
          console.log( utils.$alert( 'delete   ' ) + tgt_base_path + ' from s3' );
        });
      }

      // remove old file ( the ori file must exist )
      fs.unlinkSync( tgt_path );

      var new_tgt_base_path = config.path.output + '/' + group + '-' + uid + '.' + type;
      var new_tgt_path      = self.pub_dir + new_tgt_base_path;

      version[ type ][ group ] = uid;

      // update version.json
      fs.writeFileSync( version_path, JSON.stringify( version, null, 2 ));
      // write asset file
      fs.writeFileSync( new_tgt_path, tmp );
      console.log( utils.$update( 'replace  ' ) + tmp_path + '->' + new_tgt_path );

      if( config.s3 ){
        s3.create({
          tgt_path : new_tgt_base_path,
          src_path : tmp_path
        }, function (){
          console.log( utils.$good( 'uploaded ' ) + new_tgt_base_path + ' to s3' );
        });
      }
    });
  },

  prod_css : function ( config, cache, version, asset_host, asset_host_counter ){
    var asset_host_total = asset_host ? asset_host.length : -1;

    return function (){
      var styles = this.styles;
      var output = config.path.output;

      // TODO: cache key should be route pattern string + uid
      var key = this.__uid;

      if( !cache.css[ key ]){
        var css  = config.css;
        var tmp  = '';
        var path = asset_host_total >= 0 ?
          function ( group ){
            if( !css[ group ].site ) return '';

            var current = asset_host_counter();
            var host    = asset_host[ current ];
            var id      = version.css[ group ];
            var base    = [ '/', output, '/', group, '-', id, '.css" rel="stylesheet" /> ' ].join( '' );
            var mq      = css[ group ].mq ? 'media="' + css[ group ].mq + '" ' : '';
            var tmp     = '<link ' + mq + 'href="' + host + base;

            return tmp;
          } :
          function ( group ){
            if( !css[ group ].site ) return '';

            var id   = version.css[ group ];
            var base = [ '/', output, '/', group, '-', id, '.css" rel="stylesheet" /> ' ].join( '' );
            var mq   = css[ group ].mq ? 'media="' + css[ group ].mq + '" ' : '';

            return '<link ' + mq + 'href="' + base;
          };

        styles.forEach( function ( group ){
          if( !css[ group ]) return;

          var mq = css[ group ].mq ? 'media="' + css[ group ].mq + '" ' : '';

          css[ group ].cdn && css[ group ].cdn.forEach( function ( style ){
            tmp += '<link ' + mq + 'href="' + style + '" rel="stylesheet" /> ';
          });

          tmp += path( group );
        });

        cache.css[ key ] = tmp;
      }

      return cache.css[ key ];
    };
  },

  prod_js : function ( config, cache, version, asset_host, asset_host_counter ){
    var asset_host_total = asset_host ? asset_host.length : -1;

    return function (){
      var scripts = this.scripts;
      var output  = config.path.output;

      // TODO: cache key should be route pattern string + uid
      var key = this.__uid;

      if( !cache.js[ key ]){
        var js   = config.js;
        var tmp  = '';
        var path = asset_host_total >= 0 ?
          function ( group ){
            if( !js[ group ].site ) return '';

            var current = asset_host_counter();
            var host    = asset_host[ current ];
            var id      = version.js[ group ];
            var base    = [ '/', output, '/', group, '-', id + '.js"></script> ' ].join( '' );
            var tmp     = '<script src="' + host + base;

            return tmp;
          } :
          function ( group ){
            if( !js[ group ].site ) return '';

            var id   = version.js[ group ];
            var base = [ '/', output, '/', group, '-', id + '.js"></script> ' ].join( '' );

            return '<script src="' + base;
          };

        scripts.forEach( function ( group ){
          if( !js[ group ]) return;

          js[ group ].cdn && js[ group ].cdn.forEach( function ( script ){
            tmp += '<script src="' + script + '"></script> ';
          });

          tmp += path( group );
        });

        cache.js[ key ] = tmp;
      }

      return cache.js[ key ];
    };
  },

  dev_css : function ( config ){
    return function (){
      var styles = this.styles;
      var css    = config.css;
      var tmp    = '';

      styles.forEach( function ( group ){
        if( !css[ group ]) return;

        var mq = css[ group ].mq ? 'media="' + css[ group ].mq + '" ' : '';

        css[ group ].cdn && css[ group ].cdn.forEach( function ( style ){
          tmp += '<link ' + mq + 'href="' + style + '" rel="stylesheet" />\n';
        });

        css[ group ].site && css[ group ].site.forEach( function ( style ){
          tmp += '<link ' + mq + 'href="/' + config.path.css + '/' + style + '.css" rel="stylesheet" />\n';
        });
      });

      return tmp;
    };
  },

  dev_js : function ( config ){
    return function (){
      var scripts = this.scripts;
      var js      = config.js;
      var tmp     = '';

      scripts.forEach( function ( group ){
        if( !js[ group ]) return;

        js[ group ].cdn && js[ group ].cdn.forEach( function ( script ){
          tmp += '<script src="' + script + '"></script>\n';
        });

        js[ group ].site && js[ group ].site.forEach( function ( script ){
          tmp += '<script src="/' + config.path.js + '/' + script + '.js"></script>\n';
        });
      });

      return tmp;
    };
  },

  helpers : function ( app, css, js, callback ){
    app.locals.css = css;
    app.locals.js  = js;

    callback();
  }
};
