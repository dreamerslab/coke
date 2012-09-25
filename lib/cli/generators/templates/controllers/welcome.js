var Class = require( 'node.class' );

module.exports = Class.extend({

  index : function ( req, res, next ){
    res.render( 'welcome/index' );
  }
});
