var DB;

module.exports = function ( name, props, db, schema ){
  if( !props ) return DB.model( name );

  if( !DB ) DB = db;

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

  // apply virtuals
  var virtuals = props.virtuals;

  if( virtuals ){
    virtuals.forEach( function ( name ){
      require( MODEL_DIR + 'virtuals/' + name )( schema );
    });
  }

  schema.statics = props.statics;
  schema.methods = props.methods;

  DB.model( name, schema );
};