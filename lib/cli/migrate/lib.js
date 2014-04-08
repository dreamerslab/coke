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
        process.exit();
      },

      reset : function ( db, end ){
        if( db ) db.close();
        if( end ) end(); else this.exit();
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

      _run_migration : function ( method, schema_name, cb ){
        var flow     = this.flow;
        var self     = this;
        var callback = function ( model_names ){
          var migration_actions = self.migration[ method ]( Model );
          var Runner            = Class.extend( migration_actions );

          var series = function ( action ){
            self.series( action );
          };

          var parallel = function ( action ){
            self.parallel( action );
          };

          var join = function (){
            flow.join.apply( flow, slice.call( arguments ));
          };

          var end = function ( action ){
            flow.end( function (){
              var args = slice.call( arguments );
              var db   = self.utils.db();

              if( self.utils.is( action ) !== 'function' ){
                return self.reset( db );
              }

              args.pop();
              args.push( function (){
                cb();
              });

              action.apply( flow, args );
            });
          };

          new Runner( series, parallel, join, end );
        };

        var model_args = { mongoose : this.mongoose };

        if( schema_name ){
          model_args.schema_name = schema_name;
        }

        this.model( model_args, callback );
      },

      modify : function (){
        var self = this;
        var db   = self.utils.db();

        this._run_migration( 'modify', null, function(){
          self.reset( db );
        });
      },

      import : function (){
        var self = this;
        var db   = self.utils.db();

        this._run_migration( 'import', null, function(){
          self.reset( db );
        });
      },

      export : function (){
        var self        = this;
        var schema_name = this.migration.ori_schema;
        var db          = self.utils.db();

        this._run_migration( 'export', schema_name, function(){
          if( !self.migration.import ){
            return self.reset( db );
          }

          self.reset( db, function (){
            // to import
            process.send({ next : 'import' });
            self.exit();
          });
        });
      }
    });

    var mongoose  = require( BASE_DIR + 'node_modules/mongoose' );
    var migration = require( BASE_DIR + 'db/migrate/' + msg.file_name );
    var m         = new Migrate( migration, mongoose, utils );

    m[ msg.method ]();
  });
});
