process.on( 'message', function ( msg ){
  var Class      = require( 'node.class' );
  var slice      = [].slice;
  var utils      = require( '../../utils' );
  var set_global = require( '../../global' );

  set_global( msg.current, function (){
    if( msg.force_dev_log == '-d' ){
      global.DEV_LOG = true;
    }

    require( CORE_DIR + 'logger' );
    LOG.sys( 'loading core module: logger' );

    var Migrate = Class.extend({

      init : function ( migration, mongoose, utils ){
        var Flow = require( 'node.flow' );

        this.migration = migration;
        this.mongoose  = mongoose;
        this.utils     = utils;
        this.model     = require( CORE_DIR + 'model' );
        this.flow      = new Flow();
      },

      exit : function (){
        process.send({ exit : true });
        this.exit();
      },

      reset : function ( db, end ){
        db && db.close();
        end ? end() : this.exit();
      },

      series : function ( action ){
        if( this.utils.is( action ) !== 'function' ){
          return this.exit();
        }

        this.flow.series( action );
      },

      parallel : function ( action ){
        if( this.utils.is( action ) !== 'function' ){
          return this.exit();
        }

        this.flow.parallel( action );
      },

      modify : function (){
        var flow     = this.flow;
        var self     = this;
        var callback = function ( model_names ){
          var modify_actions = self.migration.modify( Model );
          var Modify         = Class.extend( modify_actions );

          var series = function ( action ){
            self.series( action );
          };

          var parallel = function ( action ){
            self.parallel( action );
          };

          var join = function (){
            flow.join.call( flow, slice.call( arguments ));
          };

          var end = function ( action ){
            flow.end( function ( args ){
              var db = self.utils.db();

              if( self.utils.is( action ) !== 'function' ){
                return self.reset( db );
              }

              action( function (){
                self.reset( db );
              });
            });
          };

          new Modify( series, parallel, join, end );
        };

        this.model({ mongoose : this.mongoose }, callback );
      },

      import : function (){
        var flow     = this.flow;
        var self     = this;
        var callback = function ( model_names ){
          var import_actions  = self.migration.import( Model );
          var Import          = Class.extend( import_actions );

          var series = function ( action ){
            self.series( action );
          };

          var parallel = function ( action ){
            self.parallel( action );
          };

          var join = function (){
            flow.join.call( flow, slice.call( arguments ));
          };

          var end = function ( action ){
            flow.end( function ( args ){
              var db = self.utils.db();

              if( self.utils.is( action ) !== 'function' ){
                return self.reset( db );
              }

              action( function (){
                self.reset( db );
              });
            });
          };

          new Import( series, parallel, join, end );
        };

        this.model({ mongoose : this.mongoose }, callback );
      },

      export : function (){
        var flow     = this.flow;
        var self     = this;
        var callback = function ( model_names ){
          var export_actions = self.migration.export( Model );
          var Export         = Class.extend( export_actions );

          var series = function ( action ){
            self.series( action );
          };

          var parallel = function ( action ){
            self.parallel( action );
          };

          var join = function (){
            flow.join.call( flow, slice.call( arguments ));
          };

          var end = function ( action ){
            var db = self.utils.db();

            if( self.utils.is( action ) !== 'function' ){
              return self.reset( db, function (){
                flow.end();
              });
            }

            if( !self.migration.import ){
              return self.reset( db, function (){
                flow.end( function (){
                  action( function (){
                    self.exit();
                  })
                });
              });
            }

            // to import
            flow.end( function ( args ){
              action( function (){
                self.reset( db, function (){
                  process.send({ next : 'import' });
                  self.exit();
                });
              });
            });
          };

          new Export( series, parallel, join, end );
        };

        this.model({
          mongoose    : this.mongoose,
          schema_name : this.migration.ori_schema
        }, callback );
      }
    });

    var mongoose  = require( BASE_DIR + 'node_modules/mongoose' );
    var migration = require( BASE_DIR + 'db/migrate/' + msg.file_name );
    var m         = new Migrate( migration, mongoose, utils );

    m[ msg.method ]();
  });
});
