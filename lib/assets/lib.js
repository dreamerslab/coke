var utils = require( '../utils' );
var uid   = utils.uid( 32 );

module.exports = {

  assign_version : function ( assets ){
    var tmp = {};

    Object.keys( assets ).forEach( function ( group ){
      tmp[ group ] = uid;
    });

    return tmp;
  },

  build_assets : function ( config, flow, packer, assets, type, tmp_dir ){
    var self = this;
    var path = config.path[ type ];
    var input;

    Object.keys( assets ).forEach( function ( group ){
      input = [];
      assets[ group ].site &&
        assets[ group ].site.forEach( function ( asset ){
          input.push( self.pub_dir + path + '/' + asset + '.' + type );
        });

      flow.parallel( function ( arg, ready ){
        arg.callback = function ( err, stdout, stderr ){
          if( err ) throw err;
          ready();
          console.log( utils.$good( 'created' ) + '  combine & minify ' + arg.type + ' to ' + arg.output );
        };

        packer( arg );
      }, {
        input  : input,
        output : tmp_dir + group + '.' + type,
        type   : type
      });
    });
  },

  compare_and_replace : function ( fs, config, version, type, tmp_dir, compare, version_path ){
    var self   = this;
    var assets = version[ type ];

    Object.keys( assets ).forEach( function ( group ){
      var tmp_path = tmp_dir + group + '.' + type;
      var tgt_path = self.pub_dir + config.path.output + '/' + group + '-' + assets[ group ] + '.' + type;

       // does not need to compare files just move it to assets dir
       // ex. assets[ group ] = version.css.common -> 32 rand str
      if( !compare ){
        fs.renameSync( tmp_path, tgt_path );
        return console.log( utils.$good( 'moved' ) + '    ' + tmp_path + '->' + tgt_path );
      }

      var tmp = fs.readFileSync( tmp_path, 'utf8' );
      var ori = fs.readFileSync( tgt_path, 'utf8' );

      if( tmp !== ori ){
        var ori_path = tgt_path;

        version[ type ][ group ] = uid;
        tgt_path                 = self.pub_dir + config.path.output + '/' + group + '-' + uid + '.' + type;

        fs.writeFileSync( version_path, JSON.stringify( version, null, 2 ));
        fs.writeFileSync( tgt_path, tmp );
        console.log( utils.$update( 'replace' ) + '  ' + tmp_path + '->' + tgt_path );
      }
    });
  },

  prod_css : function ( config, cache, version, asset_host, asset_host_total, asset_host_current, asset_host_counter ){
    return function ( styles ){
      if( !cache.css[ this.parentView.view ]){
        var css  = config.css;
        var tmp  = '';
        var path = asset_host_total > 0 ?
          function ( group ){
            var tmp = '<link href="' + asset_host[ asset_host_current ] + '/' + group +
              '-' + version.css[ group ] + '.css" rel="stylesheet" /> ';

            asset_host_counter();

            return tmp;
          } :
          function ( group ){
            return '<link href="/' + config.path.output + '/' + group +
              '-' + version.css[ group ] + '.css" rel="stylesheet" /> ';
          };

        styles.forEach( function ( group ){
          css[ group ].cdn && css[ group ].cdn.forEach( function ( style ){
            tmp += '<link href="' + style + '" rel="stylesheet" /> ';
          });

          tmp += path( group );
        });

        cache.css[ this.parentView.view ] = tmp;
      }

      return cache.css[ this.parentView.view ];
    };
  },

  prod_js : function ( config, cache, version, asset_host, asset_host_total, asset_host_current, asset_host_counter ){
    return function ( scripts ){
      if( !cache.js[ this.parentView.view ]){
        var js   = config.js;
        var tmp  = '';
        var path = asset_host_total > 0 ?
          function ( group ){
            var tmp = '<script src="' + asset_host[ asset_host_current ] + '/' + group +
              '-' + version.js[ group ] + '.js"></script> ';

            asset_host_counter();

            return tmp;
          } :
          function ( group ){
            return '<script src="/' + config.path.output + '/' + group +
              '-' + version.js[ group ] + '.js"></script> ';
          };

        scripts.forEach( function ( group ){
          js[ group ].cdn && js[ group ].cdn.forEach( function ( script ){
            tmp += '<script src="' + script + '"></script> ';
          });

          tmp += path( group );
        });

        cache.js[ this.parentView.view ] = tmp;
      }

      return cache.js[ this.parentView.view ];
    };
  },

  dev_css : function ( config ){
    return function ( styles ){
      var css = config.css;
      var tmp = '';

      styles.forEach( function ( group ){
        css[ group ].cdn && css[ group ].cdn.forEach( function ( style ){
          tmp += '<link href="' + style + '" rel="stylesheet" />\n';
        });

        css[ group ].site && css[ group ].site.forEach( function ( style ){
          tmp += '<link href="/' + config.path.css + '/' + style + '.css" rel="stylesheet" />\n';
        });
      });

      return tmp;
    };
  },

  dev_js : function ( config ){
    return function ( scripts ){
      var js = config.js;
      var tmp = '';

      scripts.forEach( function ( group ){
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

  helpers : function ( app ,css, js, callback ){
    app.helpers({
      css : css,
      js  : js
    });

    app.dynamicHelpers({
      styles : function ( req, res ){
        return [ 'common' ];
      },
      scripts : function ( req, res ){
        return [ 'common' ];
      }
    });

    callback();
  }
};