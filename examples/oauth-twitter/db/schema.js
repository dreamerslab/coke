/**
 * Module dependencies.
 * @private
 */
var mongoose = require( 'mongoose' );

var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Model = {

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
Object.keys( Model ).forEach( function ( model ){
  if( Model[ model ].tree.updated_at !== undefined ){
    Model[ model ].pre( 'save', function ( next ){
      this.updated_at = this.isNew?
        this.created_at :
        Date.now();

      next();
    });
  }
});

/**
 * Exports module.
 */
module.exports = Model;