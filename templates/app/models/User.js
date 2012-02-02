var User = require( BASE_DIR + 'db/schema' ).User;

User.statics = {

  create_or_update : function ( user, props, callback ){
    user.name  = props.name;
    user.email = props.email;
    user.save( callback );
  }
};

require( 'mongoose' ).model( 'User', User );
