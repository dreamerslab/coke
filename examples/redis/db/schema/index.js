var Schema = function ( Schema ){

/**
 * Module dependencies.
 * @private
 */
  var Models = {

    Blog : new Schema({
      title      : { type : String, required : true, index : true },
      desc       : { type : String },
      is_public  : { type : Boolean },
      created_at : { type : Number, 'default' : Date.now },
      updated_at : { type : Number }
    })
  };

  // auto update `updated_at` on save
  Object.keys( Models ).forEach( function ( model ){
    if( Models[ model ].tree.updated_at !== undefined ){
      Models[ model ].pre( 'save', function ( next ){
        this.updated_at = this.isNew?
          this.created_at : Date.now();

        next();
      });
    }
  });

  return Models;
};

/**
 * Exports module.
 */
module.exports = Schema;