var Class = require( 'node.class' );

module.exports = Class.extend({

  index : function ( req, res ){
    res.render( 'home/index' );
  }
});
