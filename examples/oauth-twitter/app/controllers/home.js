var Class = require( 'resig-class' );

module.exports = Class.extend({

  index : function ( req, res ){
    res.render( 'home/index' );
  }
});
