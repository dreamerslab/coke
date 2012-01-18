var Model = require( BASE_DIR + 'db/schema' ).Model;

Model.statics = {
  
  create_or_update : function ( model, props, callback ){
    model.name  = props.name;
    model.email = props.email;
    model.save( callback );
  }
};

require( 'mongoose' ).model( 'Model', Model );
