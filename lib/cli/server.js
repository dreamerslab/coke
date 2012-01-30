var is_project_root = require( '../utils' ).is_project_root;

module.exports = function (){
  is_project_root( function ( current ){
    require( current + 'server.js' );
  });
};
