var Schema = function ( Schema ){

/**
 * Module dependencies.
 * @private
 */

  var ObjectId = Schema.ObjectId;

  var Models = {

    User : new Schema({
      twitter_id : { type : String },
      name       : { type : String, required : true },
      lang       : { type : String, 'default' : 'en' },
      avatar     : { type : String, required : true },
      created_at : { type : Number, 'default' : Date.now },
      updated_at : { type : Number, 'default' : Date.now }
    }),
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