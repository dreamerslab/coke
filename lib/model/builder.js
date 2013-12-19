var model_store = {};
var DB;

module.exports = function ( name, props, db, schema ){
  if( !props ) return model_store[ name ] || DB.model( name );
  if( !DB ) DB = db;

  var virtuals = props.virtuals;
  var statics  = props.statics;
  var instance = props.methods;
  var model;

  // if no schema then make a normal js class
  if( !schema ){
    model = function(){};

    if( statics ){
      Object.keys( statics ).forEach( function ( static_method_name ){
        model[ static_method_name ] = statics[ static_method_name ];
      });
    }

    if( instance ) model.prototype = instance;

    model_store[ name ] = model;

    return model;
  }

  // -- make js class by mongoose --

  // apply hooks
  var hooks = props.hooks;

  if( hooks ){
    Object.keys( hooks ).forEach( function ( hook_name ){
      // hook_name -> init, pre, post
      var methods = hooks[ hook_name ];

      Object.keys( methods ).forEach( function ( method_name ){
        // method_name -> save, remove
        var handlers = methods[ method_name ];

        handlers.forEach( function ( handler ){
          // method -> save, remove
          schema[ hook_name ]( method_name, handler );
        });
      });
    });
  }

  if( virtuals ){
    virtuals.forEach( function ( name ){
      require( MODEL_DIR + '/virtuals/' + name )( schema );
    });
  }

  if( statics )  schema.statics = statics;
  if( instance ) schema.methods = instance;

  DB.model( name, schema );
};
