var DB;

module.exports = function ( name, props, db, schema ){
  if( !props ) return DB.model( name );

  if( !DB ) DB = db;

  // apply hooks
  var hooks = props.hooks;

  if( hooks ){
    Object.keys( hooks ).forEach( function ( name ){
      // name -> init, pre, post
      Object.keys( hooks[ name ]).forEach( function ( methods ){
        // method -> save, remove
        methods.forEach( function ( method ){
          // method -> save, remove
          schema[ name ][ method ] = method;
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