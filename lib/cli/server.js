module.exports = function (){
  require( '../utils' ).regex.is_project_root( function ( current ){
    require( current + 'server.js' );
  });
};
