/**
 * Module dependencies.
 * @private
 */
var mongoose = require( 'mongoose' );

var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Model = {
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